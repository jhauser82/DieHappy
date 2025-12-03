# Gang Bang Crime Font Installation

To use the Gang Bang Crime font:

1. Go to https://www.dafont.com/gang-bang-crime.font
2. Click "Download" button
3. Extract the downloaded ZIP file
4. Find the font file (should be named something like `GangBangCrime.ttf` or `gangbangcrime.ttf`)
5. Copy the font file to: `die-happy/public/fonts/GangBangCrime.ttf`

The font is already configured in the CSS and will automatically load once you add the file.

If the font file has a different name, update the path in `src/App.css`:
```css
@font-face {
  font-family: 'Gang Bang Crime';
  src: url('/fonts/YOUR_FONT_FILE_NAME.ttf') format('truetype');
}
```
