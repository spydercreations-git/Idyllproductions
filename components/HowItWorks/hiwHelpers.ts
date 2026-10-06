export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const back = (t: number) => {
  const c = 1.6;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export const fadeLoop = (t: number, loop: number, out = 500) =>
  t > loop - out ? 1 - clamp((t - (loop - out)) / (out * 0.6)) : 1;
