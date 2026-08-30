# Deployment

How the Quantum Observatory is built and published, and how to rename the
repository without breaking it.

Supersedes the original setup guide, which described a GitHub *user site* served
at `stuartokin.github.io` with a custom domain at `horizonqltd.com`. Neither
applies: the site is a project site under its own repository name, and the
custom domain is not in use.

---

## How it publishes

GitHub Actions builds on every push to `main`, and after any agent or review
workflow finishes successfully. There is nothing to run by hand.

The build runs every gate before it produces anything — order, exports, state,
content validation, news, questions, provenance, the Q-Day derivation, the
TypeScript check, then Vite, then the performance budget. **A failing gate
blocks the deploy**, which is the point: the site cannot publish content that
does not validate.

Settings → **Pages** → Source must read **GitHub Actions**. Nothing else.

---

## The base path, and why it is relative

`vite.config.ts` sets `base: './'`.

This matters more than it looks. A GitHub **user site** — a repository named
exactly `<username>.github.io` — is served at the domain root. A **project
site** is served from a subdirectory: `https://<username>.github.io/<repo>/`.
An absolute base is right for exactly one of those and wrong for the other.

A relative base is correct for both. The built HTML asks for
`./assets/index-xxx.js`, and content fetching goes through
`import.meta.env.BASE_URL`, which becomes `./` and resolves against the page's
own directory. The hash router is unaffected — a fragment takes no part in
relative resolution.

**So renaming the repository needs no coordinated deploy**, moving to a custom
domain later needs no config change, and the same build artefact works wherever
it is served. Verified at both a root and a subpath before this was written.

Do not replace it with a hard-coded path. Doing so re-couples the build to the
repository's name and reintroduces an outage on every move.

---

## Renaming the repository

The repository is currently `stuartokin.github.io` — a user site. Renaming makes
it a project site.

### Before you start

Two things follow from the rename, and only one of them is handled for you.

- **Assets keep working.** The relative base above means the site is correct at
  the new URL from the first deploy. This used to be the risky part and is not.
- **`https://stuartokin.github.io/` stops serving anything.** A user site exists
  only while a repository with that exact name does. Nothing redirects it —
  GitHub forwards old repository URLs for the web interface and for `git`, but
  **not** for Pages.

### Steps

1. **Rename.** Repository → **Settings** → **General** → the **Repository name**
   field at the top → enter `quantum-observatory` → **Rename**.

2. **Check Pages.** Settings → **Pages**. Source should still read
   **GitHub Actions**; the URL shown will now include the subpath.

3. **Redeploy.** Actions → **Deploy** → **Run workflow**. The workflow needs no
   edit. If it does not appear, push any commit — a rename does not trigger a
   build on its own.

4. **Check it, hard-refreshed**, at
   `https://stuartokin.github.io/quantum-observatory/`:
   - the Frontier view loads and the galaxy draws
   - the Q-Day dock opens each of the seven sections
   - a deep link works — paste `#/q-day/plan` on the end and reload
   - nothing 404s in the browser's network panel

5. **Recreate the root**, if you want one. Create a new **public** repository
   named exactly `stuartokin.github.io` and put an `index.html` in it; a landing
   page linking to your projects is written for this. Settings → Pages →
   Source: **Deploy from a branch** → `main` / root.

6. **Point the old links at the new URL.** Anything published elsewhere that
   references `stuartokin.github.io` as this site will need updating; the
   landing page in step 5 covers the common case.

### If you have a local clone

```bash
git remote set-url origin https://github.com/stuartokin/quantum-observatory.git
```

Not needed for the browser upload workflow, but a stale remote is a confusing
thing to trip over later.

### What moves with the repository

Issues, pull requests, stars, watchers, Actions history, workflow secrets and
the `ANTHROPIC_API_KEY` all move with a rename. Nothing needs re-adding.

The old name becomes claimable by somebody else once released, which is a
general GitHub caveat rather than a likely problem here — recreating
`stuartokin.github.io` in step 5 takes that particular name back immediately.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # every gate, then the production build
npm run test:agent
```

Not required to change content. The markdown files are editable in GitHub's web
editor and Actions does the rest.

## Running an agent by hand

```bash
npm run agent -- scout
npm run steward
```

Needs `ANTHROPIC_API_KEY` in the environment. In Actions it comes from
repository secrets; the workflows are under Actions → **Agents**.
