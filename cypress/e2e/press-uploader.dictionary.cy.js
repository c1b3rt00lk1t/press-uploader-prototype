/** Integration tests for Dictionary */

describe('Uploader :: Dictionary', () => { 
    it('does not allow to access the dictionary after login', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('a').contains('Dictionary').should('have.attr', 'disabled');
    })
  
  
    it('allows to access the dictionary after login', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('input:first').type('test@test.dev')
      cy.get('input:last').type('1234567')
      cy.contains('Login').click()
      cy.contains('Edit from server')
      cy.contains('Dictionary').click()
      cy.get('input[placeholder*="Type a zone, sector or tag..."]')
      cy.contains('zones')
      cy.contains('sectors')
      cy.contains('tags')
    })
  
    it('allows to navigate the dictionary with the searchbox', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('input:first').type('test@test.dev')
      cy.get('input:last').type('1234567')
      cy.contains('Login').click()
      cy.contains('Edit from server')
      cy.contains('Dictionary').click()
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('alema')
      cy.contains('alemania')
    })
  
    xit('allows to create a new tag in the dictionary', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.get('input:first').type('test@test.dev')
      cy.get('input:last').type('1234567')
      cy.contains('Login').click()
      cy.contains('Edit from server')
      cy.contains('Dictionary').click()
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('test')
      cy.contains('test')
      cy.get('svg:has(+ div.dictionary-searched):last').click()
      const date = new Date()
  
      cy.get('input[placeholder*="/tags/test"]').type('zzz ' + date.toString().toLowerCase().slice(4,24))
      cy.get('svg.dictionary-edit-icons:first').click()
    })
  
  
  })
  