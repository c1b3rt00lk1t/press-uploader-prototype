/** Integration tests for Start */

describe('Uploader :: Start', () => { 
    it('allows to start without login', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.contains('Start').click()
      cy.contains('Edit from folder')
      cy.contains('Edit from server')
    })
  
    it('does not allow to edit from server without login', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.contains('Start').click()
      cy.contains('Edit from server').click()
      cy.contains('Get Sessions').should('not.exist')
      cy.contains('Select session').should('not.exist')
    })
  
  })