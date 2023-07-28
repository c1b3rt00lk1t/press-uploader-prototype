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

    xit('checks a selected tag when it is the only possible one and enter key is pressed', () => {
      // with the first three letters 'ale', there are two tags available
      // the two tags should appear in a variation of red
      // the enter keydown has no effect
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('ale')
      cy.get('.check-box').contains('alemania').should('have.css', 'color', 'rgb(220, 20, 60)')
      cy.get('.check-box').contains('palestina').should('have.css', 'color', 'rgb(220, 20, 60)')
      cy.get('body').type('{enter}')
      cy.get('.check-box').contains('alemania').should('have.css', 'color', 'rgb(220, 20, 60)')

      // with the fourth letter 'm', only one option is available
      // it should display in green
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('m')
      cy.get('.check-box').contains('alemania').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.check-box').contains('alemania').parent().should('have.css', 'background-color', 'rgba(60, 114, 60, 0.1)')
      // now the enter keydown has the effect of checking the tag
      // the tag appears blue when checked as does the checkbox
      cy.get('body').type('{enter}')
      cy.get('.check-box').contains('alemania').should('have.css', 'color', 'rgb(0, 0, 255)')
      cy.get(':has(+ .dictionary-checked)').should('have.css', 'color', 'rgb(0, 0, 255)')

    })
  
    it('checks a selected tag when it is not the only possible one but the input matches the tag and enter key is pressed', () => {
      // with the letters 'preci', there are some tags available
      // the two tags should appear in a variation of red
      // the enter keydown has no effect
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('preci')
      cy.get('.check-box').contains(/^precio$/).should('have.css', 'color', 'rgb(220, 20, 60)')
      cy.get('.check-box').contains('precios industriales').should('have.css', 'color', 'rgb(220, 20, 60)')
      cy.get('body').type('{enter}')
      cy.get('.check-box').contains('precio').should('have.css', 'color', 'rgb(220, 20, 60)')

      // with the letter 'o', there are many options available but one that matches the input
      // it should display with the same color but with the background highlighted in orange
      cy.get('input[placeholder*="Type a zone, sector or tag..."]').type('o')
      cy.get('.check-box').contains('precio').should('have.css', 'color', 'rgb(220, 20, 60)')
      cy.get('.check-box').contains(/^precio$/).parent().should('have.css', 'background-color', 'rgba(255, 183, 0, 0.1)')

      // now the enter keydown has the effect of checking the tag
      // the tag appears blue when checked as does the checkbox
      cy.get('body').type('{enter}')
      cy.get('.check-box').contains(/^precio$/).should('have.css', 'color', 'rgb(0, 0, 255)')
      // cy.get(':has(+ .dictionary-checked)').should('have.css', 'color', 'rgb(0, 0, 255)')

    })
  
  })
  
  