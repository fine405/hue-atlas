# Gemstone photographic fidelity revision

final result: passed

## Findings and resolution

- [P1, resolved] Previous geometric SVG artwork lost the source minerals' silhouettes, natural fractures and internal texture. The user chose reference-photo texture with Canvas recoloring. Replaced all eight illustrations with source crops; removed the procedural renderer and its unused shape metadata.
- [P2, resolved] Unprotected RGB recoloring can tint a white backdrop and flatten bright highlights. Gemstone recoloring now fades at neutral highlights and deep shadows while keeping the unedited photo exact.

## Visual evidence

- Source: 東丁设计, https://www.douyin.com/note/7353602417352641844. Source slides 1080 × 1440 from `/var/folders/nn/272k0ds16mq_7vpy9jn7xrp80000gn/T/browser-use/assets/4238e82d-cc65-4920-9f6b-b41ba385c8ce/`.
- Each source crop: (180, 370)–(900, 980), resized proportionally to 519 × 440 and centered on a 720 × 440 white canvas. New assets: `public/artwork/{aquamarine,fluorite,morganite,peridot,barite,dioptase,quartz,tourmaline}.webp`.
- Opened combined comparison: `test-results/gemstone-photo-comparison.jpg`; all eight original source crops and rendered Canvas screenshots shown together at equal normalized sizes, original colors. Shapes, fractures and textures match; no source title or swatch fragments enter the crops.
- Focused screenshots: `test-results/gem-{id}.png`, rendered 868 × 531 CSS pixels. Source normalized to the same composition before comparison.
- Full-view desktop evidence: `test-results/gemstone-gallery.png`, `test-results/quartz-recolored.png`, 1280 × 720 viewport, deviceScaleFactor 1. Mobile evidence: `test-results/gemstone-mobile.png`, 390 × 844 viewport, deviceScaleFactor 1.
- In-app browser: refreshed the user's current tourmaline detail page and inspected the photographic crystal at original colors. No console errors.

## Required fidelity surfaces

- Typography: app's existing Geist/Chinese fallback and text hierarchy unchanged; source poster typography excluded from artwork deliberately.
- Spacing/layout: existing 720:440 artwork proportions retained; full mineral silhouettes visible without stretching or clipping; desktop/mobile controls remain in place.
- Colors/tokens: exact four source HEX colors and ordering retained. Default canvas pixels equal the local source asset. Tests verify altered pixels, unchanged white background, original comparison and exact restoration.
- Image quality: lossless WebP retains natural photographic textures after proportional downsampling. Preview is a two-dimensional recolorable photo, not an independently reconstructed 3D crystal. Extreme palette changes can still compress tonal range.
- Copy/content: no additional UI text, controls or source-reference panels. Existing group browsing and personal palettes retained.

## Verification

- Production build/TypeScript and lint passed.
- 12 browser tests passed, with no page errors. New pixel-level coverage visits all eight gems and checks original-image equality, real recoloring, neutral backdrop and exact reset. Updated persistence tests verify gemstone Canvas editing alongside legacy five-color personal records.
- Existing group navigation, clipboard, feedback, storage error, mobile, personal save/reload/delete/undo and classic artwork checks pass.

## Checklist

- [x] Replace all eight geometric previews and covers with source-derived photographic assets.
- [x] Preserve four-color editing, Canvas texture and neutral background.
- [x] Keep existing personal palettes compatible.
- [x] Compare source and rendered images, inspect browser and run checks.

Earlier implementation reports below are historical and superseded by this revision.

---

# Gemstone groups and procedural artwork QA

Final result: passed for grouping, exact palette data, editable SVG illustrations and persistence. Photographic fidelity is outside this implementation; the difference was explained before coding.

## Source and visual comparison

- User reference: 東丁设计, https://www.douyin.com/note/7353602417352641844, 2024-04-03. Nine 1080 × 1440 slides (cover plus eight palettes).
- Exact four HEX colors and order transcribed for all eight gems. Existing six five-color palettes remain unchanged.
- Local reference assets: `/var/folders/nn/272k0ds16mq_7vpy9jn7xrp80000gn/T/browser-use/assets/4238e82d-cc65-4920-9f6b-b41ba385c8ce/`. These source photographs are not shipped in the app.
- Opened combined photo/SVG comparison: `test-results/gemstone-reference-comparison.jpg`. Source crops use x=160–920, y=340–960; both sides scaled proportionally.
- Render evidence: `test-results/gemstone-gallery.png`, `test-results/gemstone-mobile.png`, and `test-results/gem-{id}.png` for all eight styles. Desktop 1280 × 720; mobile 390 × 844.
- Eight distinct mineral compositions capture the source's main crystal form, palette and texture cues: pale aquamarine prisms, fluorite cubes, squat pink morganite, green peridot columns, golden barite blades, teal dioptase clusters, pointed blue quartz and striated tourmaline.
- Intentional fidelity limit: polygonal SVG illustrations simplify rough edges, transparency, inclusions and natural fractures. They do not reproduce photographic refraction or the exact source silhouettes. Covers and detail previews share the same renderer and live colors.
- Existing typography and minimal app layout retained. Only two group controls were added; no source-reference sidebar or additional marketing copy.

## Iteration and verification

1. Initial clustered minerals were too narrow because adjacent random seeds produced similar first values. Replaced the deterministic generator with mixed seeds and checked all eight rendered scenes.
2. Adjusted aquamarine highlight color, dioptase darkness, cubic crowns and overall scene scale. Opened the gallery, mobile editor and combined reference comparison.
3. Build/TypeScript and lint passed. All 11 browser tests passed with no page errors, including the previous eight regression cases.
4. New checks cover eight palettes/32 colors, SSR group selection, refresh persistence, valid unique SVG IDs and references, same-group next/back navigation, native picker updating SVG, original/reset, four-color clipboard/save/reload and compatibility with existing five-color records. Mobile controls, dialog and overflow checks passed.

Personal palettes remain browser-local. No new dependencies or account system were introduced. Local screenshots regenerate from the browser suite.

---

# Reference artwork and palette editor QA

final result: passed

## Source and evidence

- Source visual truth: user-provided Y设计 photo carousel, https://www.douyin.com/note/7308946796603067667. Original slides are 1080 × 1620. Exact lower artwork crops are in `public/artwork/*.webp`; crop coordinates are documented in README.
- Rendered screenshots: `test-results/gallery-desktop.png`, `test-results/palette-desktop.png`, `test-results/gallery-mobile.png`, `test-results/feedback-mobile.png`, and `test-results/artwork-{id}.png` for all six styles.
- Combined source/render comparison: `test-results/reference-comparison.png`. Both sides opened in one image; each style normalized to 390 px wide, retaining its full aspect ratio.
- Desktop viewport: 1280 × 720 CSS pixels, deviceScaleFactor 1. Source artwork: 1080 × 654–664 px; rendered artwork: 868 × 526–534 px. Mobile automated viewport: 390 × 844 CSS pixels, deviceScaleFactor 1.
- State: original five colors, default artwork, no saved personal palettes. The source supplies artwork, not a web UI; existing app typography and spacing were retained deliberately.
- Additional in-app review: Morandi original and third color changed from #9FACA1 to #D790B2, native color input, reset, responsive editor, and return to gallery. No in-app console errors.

## Findings and required fidelity surfaces

- Typography: existing Geist / Chinese system font retained for the app; source's poster headline is intentionally excluded from the artwork crop. Editor labels, HEX inputs, and headings remain readable.
- Spacing/layout: full source composition is visible at its native aspect ratio, without stretching or extra cover cropping. Desktop preview and controls are adjacent; mobile controls follow the preview. Existing automated no-horizontal-overflow check passed.
- Colors/tokens: original five HEX values and order retained. Default Canvas pixels match the source; tests verify changed pixels, original comparison, and restoration. Text on swatches uses existing readableInk contrast selection.
- Image quality: all six source/render pairs match subject, framing, and texture. Source compression is retained with lossless crops; the painting, mural, photography, and impasto are source assets, with Canvas recoloring rather than independent vector/3D reconstruction. This implementation choice was stated before coding.
- Copy/content: removed “色系参考”, generic studio mock, semantic mapping sidebar, and contrast claims. Only preview, editing, copying, saving, personal collection, and feedback remain.
- Focused evidence: six artwork-only source/render comparisons cover the fidelity-critical area. The full desktop and mobile app screenshots cover the surrounding controls and copy.

## Iteration history

1. First visual source/render comparison: no actionable visual mismatch. Full original compositions and source textures are preserved.
2. Interaction review found native color input changes were not reflected until the change event in the in-app browser (P1). Added an input-event handler for continuous updates alongside change-event handling. Rechecked in the same browser: native picker, HEX field, swatches and pink-tinted Morandi texture now update together; reset restores the original. Existing source/render comparison remains unchanged.

## Verification

- Production build and TypeScript check passed; lint passed.
- 8 browser tests passed: SSR six-palette gallery and copying; pixel-level live recoloring/original/reset; persistence/reload/reopen/update/delete/undo with preset isolation; storage failure retaining edits; feedback validation/encoding/focus; mobile layout; 404 recovery; all six artwork loads and missing personal-link recovery.
- No browser page errors in the test suite. Feedback tests prepare drafts without publishing issues.
- Personal records are browser-local; account sync is intentionally out of scope.

## Implementation checklist

- [x] Six reference covers and matching effect previews.
- [x] Live native picker and HEX editing with original comparison/reset.
- [x] Named personal palettes, matching covers, persistence, editing and deletion/undo.
- [x] Remove source-reference UI and preserve feedback flow.
- [x] Build, lint, browser checks, visual comparison and local preview.

No remaining P0/P1/P2 findings. Screenshots are local test artifacts and regenerate when the browser suite runs.
