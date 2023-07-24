describe('Uploader', () => {
  it('opens the front page of the uploader', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')
  })

  it('contains a Login button in the frontpage', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')
    cy.contains('Login')
  })

})