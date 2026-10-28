/**
 * Insights posts: one Markdown file per post in ./insights/, named after its
 * URL slug. See README → "Write an Insights post".
 */

type PostModule = { default: Omit<Post, 'slug'> }

export type Post = {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-10-28. */
  date: string
  tags?: string[]
  /** Drafts appear in development only. */
  draft?: boolean
  html: string
  readingMinutes: number
}

const modules = import.meta.glob<PostModule>('./insights/*.md', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => ({ ...mod.default, slug: path.replace(/^.*\/(.*)\.md$/, '$1') }))
  .filter((p) => import.meta.env.DEV || !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string | undefined) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
