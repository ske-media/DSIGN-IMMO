/**
 * Hero "fake 3D" en WebGL brut (≈4 ko, sans Three.js).
 * L'image est déplacée selon une carte de profondeur (fournie ou
 * procédurale), pilotée par la souris / le gyroscope et le scroll.
 * Résultat : un effet de relief façon Framer / Spline, à coût quasi nul.
 */

const VERT = `
attribute vec2 p;
varying vec2 v;
void main(){ v = p * 0.5 + 0.5; v.y = 1.0 - v.y; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 v;
uniform sampler2D img;
uniform sampler2D depth;
uniform vec2 mouse;
uniform vec2 res;
uniform vec2 imgRes;
uniform float t;
uniform float hasDepth;
uniform float strength;

vec2 cover(vec2 uv){
  float ra = res.x / res.y; float ia = imgRes.x / imgRes.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
void main(){
  vec2 uv = cover(v);
  float d;
  if (hasDepth > 0.5) d = texture2D(depth, uv).r;
  else {
    // profondeur procédurale : centre proche, bords lointains + relief bruité
    float r = distance(uv, vec2(0.5, 0.55));
    d = smoothstep(0.75, 0.05, r) * 0.7 + noise(uv * 6.0 + t * 0.05) * 0.3;
  }
  vec2 off = (d - 0.5) * mouse * strength;
  vec3 c = texture2D(img, uv + off).rgb;
  // très légère aberration chromatique sur les bords
  float ab = length(mouse) * 0.0025;
  c.r = texture2D(img, uv + off + vec2(ab, 0.0)).r;
  c.b = texture2D(img, uv + off - vec2(ab, 0.0)).b;
  // vignette douce
  float vg = smoothstep(1.25, 0.35, distance(v, vec2(0.5)));
  c *= mix(0.72, 1.0, vg);
  gl_FragColor = vec4(c, 1.0);
}`;

export function mountHeroGL(canvas: HTMLCanvasElement) {
  const imgEl = canvas.parentElement?.querySelector('img') as HTMLImageElement | null;
  if (!imgEl) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uMouse = U('mouse'), uRes = U('res'), uImgRes = U('imgRes'), uT = U('t'), uHasDepth = U('hasDepth'), uStrength = U('strength');
  gl.uniform1i(U('img'), 0);
  gl.uniform1i(U('depth'), 1);

  const makeTex = (unit: number, source: TexImageSource) => {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
    return tex;
  };

  // Texture principale : réutilise l'image déjà décodée (LCP), pas de second téléchargement.
  const useImage = (im: HTMLImageElement) => {
    makeTex(0, im);
    gl.uniform2f(uImgRes, im.naturalWidth, im.naturalHeight);
  };

  // Carte de profondeur optionnelle (data-depth sur le canvas)
  gl.uniform1f(uHasDepth, 0);
  const depthSrc = canvas.dataset.depth;
  if (depthSrc) {
    const d = new Image();
    d.crossOrigin = 'anonymous';
    d.decoding = 'async';
    d.onload = () => {
      makeTex(1, d);
      gl.uniform1f(uHasDepth, 1);
    };
    d.src = depthSrc;
  }

  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const mobile = window.matchMedia('(hover: none)').matches;
  gl.uniform1f(uStrength, mobile ? 0.03 : 0.045);

  window.addEventListener(
    'pointermove',
    (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );
  if (mobile && 'DeviceOrientationEvent' in window) {
    window.addEventListener(
      'deviceorientation',
      (e) => {
        if (e.gamma == null || e.beta == null) return;
        target.x = Math.max(-1, Math.min(1, e.gamma / 25));
        target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      },
      { passive: true }
    );
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }
  };
  window.addEventListener('resize', resize, { passive: true });

  let raf = 0;
  let visible = true;
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && !raf) loop(performance.now());
  });
  io.observe(canvas);

  const loop = (now: number) => {
    if (!visible) {
      raf = 0;
      return;
    }
    // inertie
    cur.x += (target.x - cur.x) * 0.06;
    cur.y += (target.y - cur.y) * 0.06;
    // dérive lente quand la souris est immobile
    const drift = Math.sin(now * 0.0004) * 0.12;
    gl.uniform2f(uMouse, cur.x + drift, cur.y + Math.cos(now * 0.0003) * 0.08);
    gl.uniform1f(uT, now * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(loop);
  };

  const start = () => {
    resize();
    useImage(imgEl);
    canvas.classList.add('is-ready');
    loop(performance.now());
  };
  if (imgEl.complete && imgEl.naturalWidth) start();
  else imgEl.addEventListener('load', start, { once: true });
}
