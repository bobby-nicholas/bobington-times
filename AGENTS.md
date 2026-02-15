# AGENTS.md — The Bobington Times Newsroom

This workspace is your newsroom, your archive, and your printing press.

## Every Session

Before doing anything else:

1. Read `SOUL.md` — this is who you are and the rules of the world
2. Read `USER.md` — this is who you're working for
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. Read `MEMORY.md` — your working memory. It has active storylines, recent edition summaries, and pointers into the lore directory.

## Knowledge Architecture

Your knowledge of Bobington lives in two places:

- **`MEMORY.md`** — Working memory. Read every session. Contains active storylines, recent editions, and a directory of lore files. Keep this slim — it should always fit in context.
- **`lore/`** — Deep canonical reference, organized by topic. Consult the relevant file(s) when writing about a specific subject. See `lore/_index.md` for the table of contents.

**The rule:** MEMORY.md tells you *what's happening now*. The lore files tell you *everything you need to know about X*.

## The Edition Cycle

When triggered by cron to publish a new edition, follow this process:

### Phase 1: Editorial Planning
- Read `MEMORY.md` for active storylines and recent edition summaries
- Read the relevant `lore/` files for the topics you plan to cover (e.g., if writing about the Kaelmar crisis, read `lore/international.md` and `lore/people.md`)
- Decide what happens next in Bobington. Consider:
  - Advancing 2-3 ongoing storylines (follow-ups to previous articles)
  - Introducing 1-2 new storylines or events
  - Ensuring coverage across sections (news, international, sports, arts, opinion)
- Plan 4-6 articles for this edition with a brief outline of each

### Phase 2: Writing
- Write each article as a markdown file in `src/content/articles/`
- Use this frontmatter schema:
  ```yaml
  ---
  title: "Article Title"
  subtitle: "Optional subtitle"  # optional
  section: news  # one of: news, international, sports, arts, opinion
  date: 2026-02-15  # the edition date
  author: Reporter Name
  authorTitle: Their Beat  # optional, e.g. "City Hall Correspondent"
  summary: "A one-paragraph summary for the front page"
  image: /images/filename.png  # optional, path to generated image
  imageCaption: "Caption text"  # optional
  featured: false  # set ONE article to true per edition
  edition: "2026-02-15"  # the edition identifier
  ---
  ```
- Write in the voice of each bylined reporter — they are recurring characters (see `lore/reporters.md`)
- Include specific details: names, places, numbers, quotes from sources
- Cross-reference established lore before introducing anything new

### Phase 3: Photography
- Generate ONE image per edition: for the featured article only. (Bob's standing instruction — revert to per-article images when notified.)
- Save images to `public/images/` with descriptive filenames
- Image prompts should evoke the old-timey newspaper aesthetic: think early press photography, slightly desaturated, editorial composition
- Update the article frontmatter with the image path and caption

### Phase 4: Publishing
- Run `npm run build` to build the static site
- If the build succeeds, commit all changes (articles, images, lore updates, memory) with a message like: "Edition: DD Month YYYY"
- Push to origin (this triggers Netlify deployment)
- If the build fails, diagnose and fix the issue before retrying

### Phase 5: Memory & Lore Update
This is critical for world consistency. After publishing:

**Update `lore/` files:**
- Add new characters to `lore/people.md`
- Add new places to `lore/geography.md`
- Update `lore/history.md` with new events
- Update any other relevant lore files with facts established in this edition
- If a lore file is getting very long, consider whether entries can be condensed (but never delete established facts)

**Update `MEMORY.md`:**
- Update the "Active Storylines" section: add new threads, note progress on existing ones, retire resolved storylines
- Add the new edition to "Recent Editions" with a bullet-point summary
- Keep only the last 5-7 editions in the recent list (older ones are preserved in `lore/history.md` and `memory/` daily logs)

**Write daily log:**
- Write `memory/YYYY-MM-DD.md` with a brief summary of what was published and any editorial notes

## File Structure

```
MEMORY.md               — Working memory (active storylines, recent editions)
lore/                   — Deep canonical reference
  _index.md             — Table of contents for lore files
  geography.md          — Places, districts, nations
  people.md             — All named characters
  reporters.md          — Bobington Times staff and voices
  politics.md           — Government, council, factions
  institutions.md       — Organisations and businesses
  sports.md             — Teams, leagues, results
  arts-culture.md       — Artists, exhibitions, venues
  international.md      — Foreign affairs, diplomacy
  economy.md            — Currency, markets, trade
  history.md            — Timeline of all events
memory/                 — Daily editorial logs
src/content/articles/   — All published articles (markdown)
public/images/          — Generated article images
src/                    — Site source code
```

## Lore Consistency Rules

- Before introducing a new character, place, or institution, check the relevant `lore/` file
- If a name or detail was established in a previous article, use it exactly as written
- Characters age, institutions change, seasons turn — the world should feel alive
- If you notice an inconsistency in the archive, write a correction or retraction as an article (newspapers do this!)
- When in doubt, read the source article in `src/content/articles/`

## Technical Notes

- The site is built with Astro (static site generator)
- Articles are markdown files in `src/content/articles/` with the schema above
- Build command: `npm run build`
- Output directory: `dist/`
- The site auto-deploys via Netlify when pushed to the main branch on GitHub
