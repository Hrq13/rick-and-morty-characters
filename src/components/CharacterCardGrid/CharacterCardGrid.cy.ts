import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'

import { generateMockCharacters } from '@/utils/generate-mock-characters'

describe('Character Information ', () => {
  it('renders loading correctly', () => {
    cy.mount(CharacterCardGrid, {
      props: {
        characterCards: generateMockCharacters(),
        loading: true
      }
    })

    cy.findByTestId('character-card').should('not.exist')
  })

  it('renders correct amount of skeleton cards', () => {
    cy.mount(CharacterCardGrid, {
      props: {
        characterCards: generateMockCharacters(),
        loading: true,
        countLimit: 3
      }
    })

    cy.findByTestId('card-skeleton').should('have.length', 3).should('be.visible')
  })

  it('renders correct amount character cards', () => {
    cy.mount(CharacterCardGrid, {
      props: {
        characterCards: generateMockCharacters(20),
        loading: false,
        countLimit: 5
      }
    })

    cy.findByTestId('character-card').should('have.length', 5).should('be.visible')
  })

  it('renders all character cards if count limit prop is not passed', () => {
    cy.mount(CharacterCardGrid, {
      props: {
        characterCards: generateMockCharacters(20),
        loading: false
      }
    })

    cy.findByTestId('character-card').should('have.length', 20).should('be.visible')
  })
})
