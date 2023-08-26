import { CharacterCondition, ICharacterLocation, CharacterType } from './CharacterService'

export interface ICharacterCard {
  id: number
  url: string
  name: string
  image: string
  species: CharacterType
  status: CharacterCondition
  location: ICharacterLocation
  origin: ICharacterLocation
}
