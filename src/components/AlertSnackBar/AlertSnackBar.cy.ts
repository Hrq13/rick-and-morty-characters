import AlertSnackBar from '@/components/AlertSnackBar/AlertSnackBar.vue'

interface Props {
  modelValue: boolean
  text: string
}

function mountAlertSnackBar(data: Props) {
  cy.mount(AlertSnackBar, {
    props: data
  }).then(({ wrapper }) => cy.wrap(wrapper).as('componentWrapper'))
}

describe('Character Information ', () => {
  it('renders open snack bar correctly', () => {
    mountAlertSnackBar({
      text: 'warning text',
      modelValue: true
    })

    cy.contains('warning text').should('be.visible')
  })

  it('renders snack bar and keep it hidden when modelValue is false', () => {
    mountAlertSnackBar({
      text: 'warning text',
      modelValue: false
    })

    cy.contains('warning text').should('not.exist')
  })

  it('triggers update:modelValue event with value false when close button is clicked', () => {
    mountAlertSnackBar({
      text: 'warning text',
      modelValue: true
    })

    cy.findByTestId('close-button')
      .should('be.visible')
      .click()

    cy.get('@componentWrapper').then(wrapper => {
      expect(wrapper.emitted()).to.deep.equal({ 'update:modelValue': [[false]] })
    })
  })
})
