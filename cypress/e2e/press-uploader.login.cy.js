/** Integration tests for Login */

describe('Uploader :: Login', () => {
    it('opens the front page of the uploader', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
    })
  
    it('displays incorrect login if the login is clicked without input', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
      cy.contains('Login').click()
      cy.contains('Incorrect login')
    })
  
    it('keeps the tagger and checkout disabled if login is incorrect', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
      cy.contains('Login').click()
      cy.contains('Incorrect login')
      cy.get('a').contains('Tagger').should('have.attr', 'disabled');
      cy.get('a').contains('Checkout').should('have.attr', 'disabled');
    })
  
    it('allows to login and navigates to Start', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('input:first').type('test@test.dev')
      cy.get('input:last').type('1234567')
      cy.contains('Login').click()
      cy.contains('Edit from folder')
      cy.contains('Edit from server')
    })
  
    it('logs out correctly', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('input:first').type('test@test.dev')
      cy.get('input:last').type('1234567')
      cy.contains('Login').click()
      cy.contains('Edit from folder')
      cy.contains('Log in').click()
      cy.contains('Logout').click()
      cy.contains('Logged out')
  
    })
  })
  
