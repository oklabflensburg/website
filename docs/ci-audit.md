# GitHub Actions audit — 2026-09-10

## Observed cause

Before changing settings, `GET /repos/oklabflensburg/website/actions/permissions` returned:

```json
{"enabled":false,"sha_pinning_required":false}
```

Both registered workflows were individually `active`: Website CI (`348449477`, `.github/workflows/ci.yml`) and CodeQL (`93230591`, `.github/workflows/codeql.yml`). The Actions run list was empty. Repository-wide Actions disablement prevented these active workflows from running; adding another workflow would not fix that setting.

PR #14 targeted `main` at head `ad882c281412d29170354fe6968315a689b71772`. The head had one successful GitGuardian check and zero commit statuses, but no GitHub Actions checks. Thus “no checks at all” was not literally true; the missing checks were the repository's CI and CodeQL jobs. These observations do not establish who disabled Actions or why.

## Audit findings

- There are exactly two workflows, Website CI and CodeQL. Neither is individually disabled.
- Website CI already performs frozen install, lint, typecheck, unit tests, production build, Chromium/system dependency installation and Playwright. Artifacts upload even on failure. No duplicate workflow or validation job is needed.
- Existing `pull_request` triggers covered all target branches, including `main`; `push` already targeted `main`. Missing PR triggers were not the cause. The triggers are now explicitly limited to PRs against `main`; default `opened`, `synchronize` and `reopened` events remain supported. CodeQL's weekly schedule remains.
- The repository is public, not archived, and the current credential has repository administration access. Repository rulesets (including inherited rulesets) returned `[]`; the `main` branch protection endpoint returned `404: Branch not protected`. Neither was identified as a blocker. This audit does not introduce merge requirements or change branch protection.
- Default workflow token permissions are `read`; CI uses `contents: read`, and the CodeQL job explicitly requests `security-events: write`. Existing permissions were retained.
- Organization-wide Actions policy could not be read with the existing credential (`403`, requires organization administration permission). No extra credential scope or organization setting was requested or changed. Successful repository activation and actual job creation confirm that workflows can run under the effective policy.
- `package.json` and both lockfile documents pin pnpm `12.3.4`. The workflow uses that package-manager declaration, Node 22 and a frozen install. Workspace release-age exceptions and build-script approvals were retained. Stale pnpm documentation is handled separately in PR #15.
- Playwright uses the production build on port 3100, desktop/mobile Chromium, two CI workers and no server reuse in CI. The workflow builds before launching browser tests.

## Restoration

Only the repository's `enabled` property was changed with the Actions permissions API. Read-back confirmed:

```json
{"enabled":true,"allowed_actions":"all","sha_pinning_required":false}
```

No workflow token, branch-protection or organization policy was broadened. See GitHub's [Actions permissions API](https://docs.github.com/en/rest/actions/permissions#set-github-actions-permissions-for-a-repository).

Enabling Actions does not create a historical run for an already-open PR. PR #14 was briefly closed and reopened to emit the existing `pull_request: reopened` event; its head commit was unchanged. The same was done for the other open PR, #15. No empty commit, force-push, synthetic status check or extra workflow was used. GitHub documents the default PR events in [workflow triggers](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request).

Actual runs created for PR #14 at the audited head:

- [Website CI](https://github.com/oklabflensburg/website/actions/runs/34498834961), job `verify`.
- [CodeQL](https://github.com/oklabflensburg/website/actions/runs/34498834969), job `analyze`.

Both linked runs completed successfully at the audited PR #14 head. Website CI passed the frozen install, lint, typecheck, 33 unit tests, build and 37 Playwright tests (3 intentional device-specific skips). The PR exposes successful `verify`, `analyze` and CodeQL analysis checks in addition to GitGuardian. The linked runs, rather than the presence of YAML or local test output, are the evidence for remote check execution. Recheck conclusions whenever the PR head changes.

The other open PR, #15, also completed [Website CI](https://github.com/oklabflensburg/website/actions/runs/34498982355) and [CodeQL](https://github.com/oklabflensburg/website/actions/runs/34498982333) successfully at head `2cd53d2d4803ed74bdd8536fb63d68e3aeab676e`.

## Verification and maintenance

```sh
gh api repos/oklabflensburg/website/actions/permissions
gh api repos/oklabflensburg/website/actions/workflows
gh pr view 14 --json headRefOid,statusCheckRollup
gh run list --branch feat/issues-10-11-localized-routing-seo
gh pr checks 14
```

For a new commit, verify that a `pull_request` run refers to that exact new head. Existing successful checks on an older commit do not validate its replacement. If a run exists, inspect its logs or rerun it; if Actions was disabled and no run exists, restore the repository setting and trigger a supported PR event. Keep the current workflows as the sole CI definitions.
