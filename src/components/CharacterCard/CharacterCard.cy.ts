import CharacterCard from '@/components/CharacterCard/CharacterCard.vue'

import { ICharacterCard } from '@/types/CharacterCard'

const characterMockCard: ICharacterCard = {
  url: 'https://placehold.co/test',
  id: 123,
  image: 'https://placehold.co/600x400',
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
}

describe('Character Information ', () => {
  beforeEach(() => {
    cy.mount(CharacterCard, { props: characterMockCard })
  })

  it('renders character photo correctly', () => {
    cy.findByAttribute('src', characterMockCard.image).should('be.visible')
  })

  it('renders name with link redirecting to character page', () => {
    cy.contains(characterMockCard.name)
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', characterMockCard.url)
  })

  it('renders character status', () => {
    cy.findByTestId('character-status').within(() => {
      cy.contains(characterMockCard.status).should('be.visible')
    })
  })

  it('renders character species', () => {
    cy.findByTestId('character-species').within(() => {
      cy.contains(characterMockCard.species).should('be.visible')
    })
  })

  it('renders location with link redirecting to location page', () => {
    cy.findByTestId('location').within(() => {
      cy.contains('Last known location:')

      cy.findByAttribute('href', characterMockCard.location.url)
        .should('have.text', characterMockCard.location.name)
        .should('be.visible')
    })
      .should('be.visible')
  })

  it('renders origin location with link redirecting to location page', () => {
    cy.findByTestId('origin').within(() => {
      cy.contains('First seen in:')

      cy.findByAttribute('href', characterMockCard.origin.url)
        .should('have.text', characterMockCard.origin.name)
        .should('be.visible')
    })
      .should('be.visible')
  })
})
