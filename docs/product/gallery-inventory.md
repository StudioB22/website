# StudioB22 gallery inventory and publication queue

- Snapshot date: 2026-09-25
- Source: GitHub organisation repository metadata
- Publication rule: private repositories are inventory inputs, never public runtime dependencies

## Inventory summary

The organisation currently contains 157 repositories. Nine have a reported size of at least 10 KiB;
147 non-website repositories are currently small placeholders or embryonic experiments. Repository
size does not prove quality, rights, or readiness, but it prevents empty placeholders from being
mistaken for completed work.

The substantial set includes web-showcase candidates (`barbier-01`, `bijouterie-01`,
`agence-immobiliere-01`, `boulangerie-01`, `boulangerie-02`, `cos_`, and
`portfolio-showcases`) and non-showcase technical projects (`Visio-Back` and `bad-bird`).

## Initial publication review queue

| Priority | Candidate | Sector or role | Provisional public status | Decision required |
| --- | --- | --- | --- | --- |
| 1 | `barbier-01` | Local personal service / craft | Demonstrator candidate | Review completeness, assets, copy, responsive behaviour, rights, and deployability |
| 2 | `bijouterie-01` | Specialist retail / premium craft | Demonstrator candidate | Review product claims, imagery rights, catalogue realism, and deployability |
| 3 | `boulangerie-01` and `boulangerie-02` | Food craft / local retail | Competing concept candidates | Select the stronger direction or explain a purposeful comparison; do not publish duplicates without value |
| 4 | `agence-immobiliere-01` | Local professional service | Demonstrator candidate | Review listing data, imagery, legal wording, and whether fictional content is unmistakable |
| 5 | `cos_` | Creative portfolio / experimental interface | Experiment candidate | Decide whether its interface demonstrates a commercially relevant capability |
| Audit source | `portfolio-showcases` | Cross-sector collection | Inventory only | Inspect whether it contains reusable source, duplicated concepts, or prior catalogue decisions |

The first public gallery should contain four to six reviewed entries across distinct sectors or visual
directions. `Visio-Back` and `bad-bird` may later support a separate innovation or technical work
section, but they do not belong in the initial website-showcase journey.

## Long-term sector backlog

The placeholder repositories cover many sectors, including artisans and trades, food and hospitality,
retail, beauty and personal services, health-related professions, property, sport, photography, and
other local services. They express an ambition and a design backlog, not publishable evidence.

The goal remains to present every meaningful, completed, rights-cleared creation that improves the
visitor's understanding. `Every creation` does not mean publishing empty repositories, near-identical
variants, unsafe demos, or weak work that reduces trust.

### Progressive enrichment plan

The repository inventory is a long-term production programme spanning the coming weeks and months.
Work proceeds incrementally rather than through one mass migration:

1. select one sector or coherent visual family;
2. audit its repositories and choose the strongest variants;
3. complete, differentiate, test, and document the selected work;
4. prepare truthful catalogue content and current preview assets;
5. publish only after the entry checklist passes;
6. observe visitor interest and use it to prioritise the next sector without treating traffic as a
   substitute for quality.

A sustainable target is a small reviewed batch rather than a numerical promise. The maintainer may
adjust cadence to client delivery capacity. The catalogue records `reviewedAt` and `publishedAt` so
older examples can be refreshed or archived when they no longer represent the studio's standard.

## Entry publication checklist

An entry remains unpublished until all applicable checks pass:

- source and responsible maintainer identified;
- public status selected: concept, mock-up, demonstrator, client work, or archived experiment;
- sector and visual direction use controlled vocabulary;
- factual description separates demonstrated capability from hypothetical business claims;
- trademarks, names, text, imagery, fonts, and generated media have documented usage rights;
- mobile and desktop presentation has been reviewed;
- accessibility, performance, dependency, content, and basic security review completed;
- screenshots are current, optimised, dimensioned, and carry useful alternative text where needed;
- any live demo contains no secrets, unsafe form, misleading data, or broken critical flow;
- credits and known limitations are visible;
- explicit `published: true` decision recorded in the public catalogue.

## Catalogue fields

The implementation schema should include at least:

- stable slug and title;
- sector and optional visual-direction tags;
- truthful status and publication flag;
- short summary and demonstrated capabilities;
- preview assets with dimensions, alternative text, credits, and rights note;
- optional reviewed demo URL;
- optional source reference kept private at build time;
- review dates for content, rights, security, and demo maturity;
- display order based on editorial relevance, never repository creation date alone.

The initial sector vocabulary uses stable identifiers: `artisans-et-metiers`,
`restauration-et-hospitalite`, `commerce`, `beaute-et-bien-etre`, `sante`, `immobilier`, `sport`,
`photographie`, and `services-locaux`. The initial visual-direction vocabulary is `editoriale`,
`chaleureuse-et-organique`, `contemporaine-et-affirmee`, `elegante-et-minimale`,
`ludique-et-coloree`, and `technique-et-fonctionnelle`. Visitor-facing French labels remain a
presentation concern; changing an identifier requires an explicit catalogue migration.
