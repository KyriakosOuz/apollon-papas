// Runtime guard: verify Manrope actually renders Greek; if not, the CSS
// per-language stack flips EL headlines to Inter 800.
// (Manrope ships a Greek subset, so this should always resolve to "manrope" -
// the guard exists so an EL hero never breaks if font loading fails.)
export function installGreekDisplayGuard(): void {
  if (!document.fonts || !document.fonts.ready) return;
  document.fonts.ready.then(() => {
    let ok = true;
    try {
      ok = document.fonts.check('700 16px "Manrope Variable"', 'Απόλλων');
    } catch {
      ok = true;
    }
    document.documentElement.dataset.elDisplay = ok ? 'manrope' : 'inter';
  });
}
