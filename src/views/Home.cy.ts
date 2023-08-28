import { getEndpoint } from '@/utils/get-endpoint/get-endpoint'
import HomeView from '@/views/Home.vue'

const charactersEndpoint = getEndpoint('CHARACTER')

function mountHomeViewWithMockData() {
  cy.intercept('GET', charactersEndpoint + '?page=1', { fixture: 'characters.json' })
  cy.mount(HomeView)
}

describe('Character Information ', () => {
  it('renders correctly', () => {
    mountHomeViewWithMockData()

    cy.findByTestId('name-field')
      .click()
      .should('be.visible')

    cy.findByTestId('status-field').should('be.visible')

    cy.findByTestId('search-button')
      .should('be.visible')
      .should('be.enabled')

    cy.findByTestId('clear-filters-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('character-card-grid').should('be.visible')

    cy.findByTestId('previous-page-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .should('be.enabled')

    cy.findByTestId('alert-snack-bar').should('not.exist')
  })

  it('renders in loading state correctly when data has not loaded', () => {
    cy.intercept('GET', charactersEndpoint + '?page=1', {})

    cy.mount(HomeView)

    cy.findByTestId('card-skeleton').should('have.length', 20)

    cy.findByTestId('previous-page-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('search-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('clear-filters-button')
      .should('be.visible')
      .should('be.disabled')
  })

  it('shows loading state while next page data is being fetched', () => {
    mountHomeViewWithMockData()

    cy.intercept('GET', charactersEndpoint + '?page=2', {}).as('nextPageRequest')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .click()

    cy.wait('@nextPageRequest')

    cy.findByTestId('card-skeleton').should('have.length', 20)

    cy.findByTestId('previous-page-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('search-button')
      .should('be.visible')
      .should('be.disabled')

    cy.findByTestId('clear-filters-button')
      .should('be.visible')
      .should('be.disabled')
  })

  it('removes loading state after next page data was loaded', () => {
    mountHomeViewWithMockData()

    cy.intercept('GET', charactersEndpoint + '?page=2', { fixture: 'characters.json' }).as('nextPageRequest')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .click()

    cy.wait('@nextPageRequest')

    cy.findByTestId('card-skeleton').should('not.exist')

    cy.findByTestId('previous-page-button')
      .should('be.visible')
      .should('be.enabled')

    cy.findByTestId('next-page-button')
      .should('be.visible')
      .should('be.enabled')
  })

  it('enables search and clear filter button after changing name field', () => {
    mountHomeViewWithMockData()

    cy.findByTestId('name-field').click()
      .type('teste')

    cy.findByTestId('search-button')
      .should('be.visible')
      .should('be.enabled')

    cy.findByTestId('clear-filters-button')
      .should('be.visible')
      .should('be.enabled')
  })

  it('makes request correctly after typing name filter', () => {
    mountHomeViewWithMockData()

    cy.intercept('GET', charactersEndpoint + '?page=1&name=henrique', { fixture: 'characters.json' }).as('getCharactersByName')

    cy.findByTestId('name-field').click().type('henrique')

    cy.findByTestId('search-button').click()

    cy.wait('@getCharactersByName')
  })

  it('clears filters and make request without filters after clicking the clear filter button', () => {
    mountHomeViewWithMockData()

    cy.intercept('GET', charactersEndpoint + '?page=1', { fixture: 'characters.json' }).as('getCharactersWithoutFilter')

    cy.findByTestId('name-field').click().type('henrique')

    cy.findByTestId('clear-filters-button').click()

    cy.wait('@getCharactersWithoutFilter')
  })
})
