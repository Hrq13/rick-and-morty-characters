export type CharacterCondition = 'Alive' | 'Dead' | 'Unknown'
export type CharacterType = 'Human' | 'Animal' | 'Robot'

export interface CharacterLocation {
  id: string
  name: string
}

export interface CharacterInfo {
  id: string
  title: string
  photo: string
  type: CharacterType
  condition: CharacterCondition
  lastKnownLocation: CharacterLocation
  firstSeenIn: CharacterLocation
}
