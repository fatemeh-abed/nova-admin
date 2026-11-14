# Fonts

No font files are bundled yet. The theme font stack (`theme.fontFamily` in
`src/Shared/Styles/theme.ts`) names **Vazirmatn** first and falls back to Tahoma and system fonts,
which already render Persian, Latin and digits.

To bundle Vazirmatn locally: put the `.woff2` files here and add an `@font-face` block (using
`import`ed font URLs so Vite fingerprints them) to `GlobalStyles.ts`.
