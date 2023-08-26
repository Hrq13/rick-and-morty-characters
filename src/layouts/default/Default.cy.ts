import DefaultLayout from '@/layouts/default/Default.vue'

describe('Default Layout', () => {
  it('renders the header section correctly', () => {
    cy.mount(DefaultLayout)

    cy.contains('The Rick and Morty Characters').should('be.visible')

    cy.findByTestId('rick-image')
      .should('be.visible')
      .then(element => {
        expect(element.attr('src')).to.contain('rick.png')
      })

    cy.findByTestId('morty-image')
      .should('be.visible')
      .then(element => {
        expect(element.attr('src')).to.contain('morty.png')
      })
  })

  it('renders the footer section correctly', () => {
    cy.mount(DefaultLayout)

    cy.findByTestId('footer')
      .should('be.visible')
      .then(element => {
        expect(element.text().trim()).to.contain('Made with ☕ and ♥ by  Henrique')
      })
  })

  it('opens linkedin profile of author on new tab if the name is clicked', () => {
    cy.mount(DefaultLayout)

    cy.findByTestId('footer')
      .within(() => {
        cy.contains('Henrique')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'href', 'https://br.linkedin.com/in/henrique-miranda-dev')
      })
      .should('be.visible')
  })
})
