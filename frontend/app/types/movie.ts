export type Movie = {
  _id: string
  title: string
  slug: { current: string }
  overview?: any[]
  releaseDate?: string
  posterFullUrl?: string | null
  posterUrl?: string | null
  popularity?: number
  castMembers?: {
    _key: string
    characterName: string
    person: { name: string }
  }[]
  crewMembers?: {
    _key: string
    department: string
    job: string
    person: { name: string }
  }[]
}
