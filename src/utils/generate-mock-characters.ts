import { ICharacterCard } from '@/types/CharacterCard'

export function generateMockCharacters(count: number = 10): ICharacterCard[] {
  const generatedCards: ICharacterCard[] = []

  for(let i = 0; i < count; i++) {
    generatedCards.push({
      url: 'https://placehold.co/300x300',
      id: Math.floor(Math.random()),
      image: 'https://placehold.co/300x300',
      name: 'Rocky The Dog',
      species: 'Animal',
      status: 'Alive',
      origin: {
        url: '3',
        name: 'The streets'
      },
      location: {
        url: '1',
        name: 'Home'
      }
    })
  }

  return generatedCards
}
