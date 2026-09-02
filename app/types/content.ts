export type ProjectStatus = 'active' | 'development' | 'seeking-contributors' | 'completed'

export interface Project {
  slug: string
  title: string
  categoryKey: string
  status: ProjectStatus
  descriptionKey: string
  technologies: string[]
  websiteUrl?: string
  repositoryUrl?: string
  image?: string
  contributionAreas: string[]
  featured?: boolean
}

export interface Contributor {
  login: string
  name?: string
  avatarUrl: string
  profileUrl: string
  contributions: number
  repositories: string[]
  areas?: string[]
  featured?: boolean
}

export interface TechnologyPath {
  slug: string
  icon: string
  technologies: string[]
}
