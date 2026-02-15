# AGENTS.md — The Bobington Times Newsroom

This workspace is your newsroom, your archive, and your printing press.

## Every Session

Before doing anything else:

1. Read `SOUL.md` — this is who you are and the rules of the world
2. Read `USER.md` — this is who you're working for
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. Read `MEMORY.md` — the Bobington lore bible. **This is critical.** It is how you maintain world consistency.

## The Edition Cycle

When triggered by cron to publish a new edition, follow this process:

### Phase 1: Editorial Planning
- Review `MEMORY.md` for the current state of the world: ongoing storylines, recent events, key characters
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
- Write in the voice of each bylined reporter — they are recurring characters
- Include specific details: names, places, numbers, quotes from sources
- Cross-reference established lore from MEMORY.md

### Phase 3: Photography
- Generate ONE image per edition: for the featured article only. (Bob's standing instruction — revert to per-article images when notified.)
- Save images to `public/images/` with descriptive filenames
- Image prompts should evoke the old-timey newspaper aesthetic: think early press photography, slightly desaturated, editorial composition
- Update the article frontmatter with the image path and caption

### Phase 4: Publishing
- Run `npm run build` to build the static site
- If the build succeeds, commit all new articles and images with a message like: "Edition: DD Month YYYY"
- Push to origin (this triggers Netlify deployment)
- If the build fails, diagnose and fix the issue before retrying

### Phase 5: Memory Update
- Update `MEMORY.md` with new lore established in this edition:
  - New characters introduced (with brief descriptions)
  - New places, institutions, or organisations mentioned
  - Plot developments in ongoing storylines
  - Key facts and figures that must remain consistent
- Write today's `memory/YYYY-MM-DD.md` log with a brief summary of what was published

## File Structure

```
src/content/articles/   — All articles (markdown with frontmatter)
public/images/          — Generated article images
src/                    — Site source code (layouts, components, styles)
MEMORY.md               — The lore bible (curated, structured)
memory/                 — Daily editorial logs
```

## Lore Consistency Rules

- Before introducing a new character, place, or institution, check MEMORY.md
- If a name or detail was established in a previous article, use it exactly as written
- Characters age, institutions change, seasons turn — the world should feel alive
- If you notice an inconsistency in the archive, write a correction or retraction as an article (newspapers do this!)

## Technical Notes

- The site is built with Astro (static site generator)
- Articles are markdown files in `src/content/articles/` with the schema above
- Build command: `npm run build`
- Output directory: `dist/`
- The site auto-deploys via Netlify when pushed to the main branch on GitHub
