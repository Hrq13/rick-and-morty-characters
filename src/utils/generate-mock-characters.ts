import { CharacterInfo } from '@/types/CharacterInfo'

export function generateMockCharacters(count: number = 10): CharacterInfo[] {
  const generatedCards: CharacterInfo[] = []

  for(let i = 0; i < count; i++) {
    generatedCards.push({
      id: Math.floor(Math.random()).toString(),
      photo: 'https://placehold.co/300x300',
      title: 'Rocky The Dog',
      type: 'Animal',
      condition: 'Alive',
      firstSeenIn: {
        id: '3',
        name: 'The streets'
      },
      lastKnownLocation: {
        id: '1',
        name: 'Home'
      }
    })
  }

  return generatedCards
}
