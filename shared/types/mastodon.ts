export interface MastodonPost {
  id: string
  url: string
  createdAt: string
  contentText: string
  spoilerText: string
  sensitive: boolean
  language?: string
}
