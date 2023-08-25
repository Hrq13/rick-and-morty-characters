import DefaultLayout from '@/layouts/default/Default.vue'

describe('Default Layout ', {  }, () => {
  it('renders correctly', () => {
    cy.mount(DefaultLayout)
  })

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

  it('renders the content section correctly', () => {
    cy.mount(DefaultLayout, {
      slots: {
        default: `
          <div test-id="rendered-content">
            conteúdo renderizado
          </div>
        `
      }
    })

    cy.contains('The Rick and Morty Characters').should('be.visible')

    cy.findByTestId('rendered-content')
      .should('be.visible')
      .then(element => {
        expect(element.text()).to.contain('conteúdo renderizado')
      })
  })

  it('renders the footer section correctly', () => {
    cy.mount(DefaultLayout)

    cy.findByTestId('footer')
      .should('be.visible')
      .then(element => {
        expect(element.text()).to.contain('Made with ☕ and ♥ by Henrique')
      })
  })
})
