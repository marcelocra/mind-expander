import "../vendored/twind-ext-forms-line_clamp-typography.js";

twind.install({
  presets: [
    twind.presetExt(),
    twind.presetLineClamp(),
    twind.presetTailwindForms(),
    twind.presetTypography(),
  ],
});
