/** Integration tests for Tagger */

beforeEach( () => {
  cy.viewport(1600, 900)
  cy.visit('http://localhost:3000/')

  cy.contains('Start').click()
  cy.get('button').contains('Edit from folder').click()
  
  // a manual action is needed to load the folder
  // load folder Revisión prensa 0000-00-00
  // click resume after the folder is loaded
  cy.pause()

  cy.contains('PDF').contains('non-PDF')
  cy.get('button').contains('Basic checks').click()
  cy.get('button').contains('Prepare tagger').click()


  // Checks that we arrived correctly to the Tagger
  cy.contains('Orden de exposición 0000-00-00')
  cy.get('input[placeholder*="Type a zone, sector or tag..."]')
  cy.contains('zones')
  cy.contains('sectors')
  cy.contains('tags')
  cy.get('button').contains('Reset')
  cy.get('button').contains('Prev.')
  cy.get('button').contains('Next')
  cy.get('button').contains('Save')
  cy.get('button').contains('Merge')
  cy.get('button').contains('Done')
})


describe('Uploader :: Tagger', () => { 

    xit('marks as .previous a new when n is typed in the keyboard', () => {
      // type next
      cy.get('body').type('n')
      cy.get('.previous').should('have.length',1)
      cy.get('body').type('n')
      cy.get('body').type('n')
      cy.get('body').type('n')
      cy.get('body').type('n')  
      cy.get('.previous').should('have.length',5)
    })

    xit('marks as .previous a new when button Next is clicked', () => {
      // type next
      cy.get('button').contains(/Next/i).click()
      cy.get('.previous').should('have.length',1)
      cy.get('button').contains(/Next/i).click()
      cy.get('button').contains(/Next/i).click()
      cy.get('button').contains(/Next/i).click()
      cy.get('button').contains(/Next/i).click()
      cy.get('.previous').should('have.length',5)
    })

  
  
  })
  
  