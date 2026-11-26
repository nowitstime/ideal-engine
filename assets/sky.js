// Starfield for any <canvas class="sky" data-n="200" [data-twinkle]>. Seeded, so every visit looks the same.
(function () {
  const skies = new Map();
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function build(c) {
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const n = Number(c.dataset.n) || 200;
    const stars = Array.from({ length: n }, () => ({
      x: rnd() * c.width, y: rnd() * c.height,
      r: (rnd() ** 3 * 1.6 + 0.3) * dpr, a: rnd() * 0.7 + 0.2,
      p: rnd() * 6.28, s: rnd() * 0.02 + 0.005,
    }));
    skies.set(c, { ctx: c.getContext('2d'), stars });
    paint(c, 0);
  }

  function paint(c, t) {
    const { ctx, stars } = skies.get(c);
    ctx.clearRect(0, 0, c.width, c.height);
    for (const s of stars) {
      ctx.globalAlpha = c.dataset.twinkle ? s.a * (0.55 + 0.45 * Math.sin(s.p + t * s.s)) : s.a;
      ctx.fillStyle = s.r > 1.6 ? '#f6e8c3' : '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.28);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function all() { document.querySelectorAll('canvas.sky').forEach(build); }
  addEventListener('resize', all);
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', all); else all();

  if (!still) {
    const tick = (t) => {
      for (const [c] of skies) if (c.dataset.twinkle) paint(c, t / 16);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
