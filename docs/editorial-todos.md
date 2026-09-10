# Editorial checklist before public deployment

Repository administration: GitHub Actions was disabled (`enabled: false`) when PR #2 was created. Enable Actions in repository settings to run the supplied CI/CodeQL workflows remotely. The complete pipeline has passed locally.

The implementation does not infer missing facts. The pages below remain explicit about their editorial status.

- **Legal notice:** confirm responsible provider, service address, representation and registration details. The previous page contained unresolved environment variables, a school-site title and outdated boilerplate; it did not establish current facts. Do not substitute the meetup venue for a legal address.
- **Privacy:** confirm hosting provider, logging, retention, controller, legal bases, rights and email handling for the actual production environment. The application itself has no trackers, third-party embeds, external fonts or locale cookie.
- **Association:** the supporting role of DatenSindDaten e.V. is specified by the task. Board, statutes, transparency documents, membership terms, funding, sponsorship and donations require verified material. No verified canonical association website is recorded in this repository; keep the association information unlinked until one is confirmed and added to `site.association`. Never substitute the Code for Germany network URL.
- **Code of Conduct:** the proposed text needs community adoption, named confidential contacts and an agreed reporting and enforcement process.
- **Team:** collect explicit approval and maintain profiles in `content/team/`. No previous automatically collected profiles were carried forward.
- **Events:** add confirmed one-off events to Content. Do not infer the year of an Open Data Day from an undated reference. Maintain holiday exceptions or cancellation notices before they occur.
- **Blog:** the two new introductory articles are editorial drafts for review of wording, with `draft: false` so the proposed website is reviewable. They describe no invented event or history. Confirm publication date and organisational authorship before deploying, or set `draft: true` in all translations.
- **Languages:** have Danish and English copy reviewed, including retained proper project names.
- **Project status and technologies:** statuses reflect the reference at migration time, not live health monitoring. Open City Planner points readers to its repository for current status. Recheck technology lists inherited from the repository with project maintainers.
- **History:** add a dated chronology only once milestones are documented.

Incomplete legal and conduct pages have `noindex: true` and are excluded from the sitemap. This does not replace editorial completion before publication.

- **Workshop photo:** `public/images/codefor-workshop.jpeg` restores the already published repository asset `static/Event-20230910-berlin-codefor-summit-13.jpeg` from commit `7e8b748`. Its caption identifies the Berlin summit according to the source filename. Document photographer, exact license and continued permission before production publication; the previous repository does not contain those details. Replace with an approved local meetup photo when available.
