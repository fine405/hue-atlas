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
