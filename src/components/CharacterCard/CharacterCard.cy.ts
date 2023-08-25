import CharacterCard from '@/components/CharacterCard/CharacterCard.vue'

import { CharacterInfo } from '@/types/CharacterInfo'

import { getLocationUrl } from '@/utils/get-location-url/get-location-url'
import { getCharacterUrl } from '@/utils/get-character-url/get-character-url'

const characterMockInfo: CharacterInfo = {
  id: '123',
  photo: 'https://placehold.co/600x400',
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
}

describe('Character Information ', () => {
  beforeEach(() => {
    cy.mount(CharacterCard, { props: characterMockInfo })
  })

  it('renders character photo correctly', () => {
    cy.findByAttribute('src', characterMockInfo.photo).should('be.visible')
  })

  it('renders title with link redirecting to character page', () => {
    const characterPageUrl = getCharacterUrl(characterMockInfo.id)

    cy.contains(characterMockInfo.title)
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', characterPageUrl)
  })

  it('renders character condition', () => {
    cy.findByTestId('character-condition').within(() => {
      cy.contains(characterMockInfo.condition).should('be.visible')
    })
  })

  it('renders character type', () => {
    cy.findByTestId('character-type').within(() => {
      cy.contains(characterMockInfo.type).should('be.visible')
    })
  })

  it('renders last known location with link redirecting to location page', () => {
    cy.findByTestId('last-known-location').within(() => {
      cy.contains('Last known location:')

      const lastKnownLocationUrl = getLocationUrl(characterMockInfo.lastKnownLocation.id)

      cy.findByAttribute('href', lastKnownLocationUrl)
        .should('have.text', characterMockInfo.lastKnownLocation.name)
        .should('be.visible')
    })
      .should('be.visible')
  })

  it('renders first-seen-in location with link redirecting to location page', () => {
    cy.findByTestId('first-seen-in').within(() => {
      cy.contains('First seen in:')

      const lastKnownLocationUrl = getLocationUrl(characterMockInfo.firstSeenIn.id)

      cy.findByAttribute('href', lastKnownLocationUrl)
        .should('have.text', characterMockInfo.firstSeenIn.name)
        .should('be.visible')
    })
      .should('be.visible')
  })
})
