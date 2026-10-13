# Maison Doree: capture preparation and provenance

Status: preparation only. No current capture files received or verified.
This record does not register a visual preview or authorize publication.

## Version to capture

- Independent source: StudioB22/boulangerie-01.
- Source commit: `534e0ba43551c79e871241c034df1026cc846490`.
- Source branch: `codex/maison-doree-brief`.
- Working tree checked clean after the local commit.
- Local static export: `out/`, built using `npm run build -- --webpack`.
- Export HTML SHA256: `a5a46dbdbd07c2429ea942a8676fe7d23f9964c986eb7f6411b23a9c262ba123`.
- Intended manual preview: `http://127.0.0.1:4332/`.

The export was built before the commit from the reviewed source. This identifies
the intended capture artifact, not proof that a browser displayed it. Recheck
the source revision, working tree and artifact before capturing. If any differ,
update this record rather than assigning this commit to different source.

## Capture protocol

| Capture | Requested viewport in CSS pixels | Planned filename |
| --- | --- | --- |
| Desktop | 1280 x 900, browser zoom 100% | `desktop-534e0ba.png` |
| Mobile | 412 x 924, browser zoom 100% | `mobile-534e0ba.png` |

These are planned viewport settings, not measured PNG dimensions. Record the
actual browser/version, viewport, device pixel ratio, capture date and image
dimensions when the original files are supplied. Do not populate missing facts
with estimates or the preparation date.

Use the static export, not the development server. Let fonts and photographs
load, scroll through the page to trigger lazy images, then return to the top.
Capture the viewport without DevTools chrome, development controls, retouching,
generated device frames or removal of the fictional-project notice. Leave the
simulation empty and avoid personal data. Keep full-page images as separate
supplementary evidence if supplied; do not silently relabel them as viewport shots.

## Evidence awaiting receipt

| Evidence | Status |
| --- | --- |
| Original desktop PNG and actual dimensions | Pending |
| Original mobile PNG and actual dimensions | Pending |
| Capture date, browser, viewport and device scale | Pending |
| Capture source/artifact confirmation | Pending |
| Inspection of loaded images, text, notice and clipping | Pending |
| Owner acceptance of selected portfolio captures | Pending |

Previous owner screenshots remain historical evidence in the bakery's project
records. They are not relabelled as captures of this committed version.

## Rights and truthful presentation

Use the bakery's `documentation/media-inventory.md` and
`public/third-party-notices.txt` as authoritative source records, not a duplicate
licensing assessment. Photographs are credited to Wesual Click, Richard Bell,
Monaz Nazary and Balint Mendlik / Unsplash; Inter and Playfair Display notices
use SIL OFL 1.1. Record which assets are actually visible after image inspection.
Screenshots do not remove licence obligations or establish all depicted rights.

Maison Doree is fictional, not a client commission or operating shop. There is
no purchase, reservation or message transmission. Test results and owner
observations do not establish universal accessibility, security or compliance.
Reduced-motion and JavaScript-disabled browser checks remain pending; the
development dependency reservation remains open. Capture approval cannot waive
those separate acceptance/publication conditions.

## Planned integration, not yet implemented

Once genuine captures and their provenance are verified, propose a coordinated
change to `src/data/local-project-previews.ts` and relevant tests. Keep
`published: false`, store draft PNGs here rather than under `public/`, and use
their measured dimensions. Preserve the two existing homepage selections by
appending the bakery preview. The existing local gallery can show the third
entry without expanding the homepage selection policy.

The visual page should link to the existing local editorial case study; that
small template change and its tests require the normal reviewed implementation
plan. Do not weaken the capture schema or add synthetic images to make an
incomplete entry render. No registry entry, template change, push, deployment
or public gallery activation is performed by this preparation record.
