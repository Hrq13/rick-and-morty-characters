export type CharacterCondition = 'Alive' | 'Dead' | 'Unknown'
export type CharacterType = 'Human' | 'Animal' | 'Robot'

export interface IResultInfo {
  count: number
  pages: number
  next?: string
  prev?: string
}

export interface ICharacterLocation {
  url: string
  name: string
}

export interface ICharacterRaw {
  id: number
  url: string
  name: string
  image: string
  species: CharacterType
  status: CharacterCondition
  location: ICharacterLocation
  origin: ICharacterLocation
  episode: string[]
  created: string
}

export interface ICharacterRawResponse {
  info: IResultInfo
  results: ICharacterRaw[]
}
