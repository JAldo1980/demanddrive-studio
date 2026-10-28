/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.md' {
  const post: {
    title: string
    description: string
    date: string
    tags?: string[]
    draft?: boolean
    html: string
    readingMinutes: number
  }
  export default post
}
