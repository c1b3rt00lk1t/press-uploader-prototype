/** Integration tests for Folder */
describe('Uploader :: Folder', () => { 

    it('does not load and fires an alert when selecting folder "Revisión prensa 9999-99-99"', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.contains('Start').click()
      cy.get('button').contains('Edit from folder').click()
      
      // a manual action is needed to load the folder
      // load folder Revisión prensa 9999-99-99
      // click resume after the folder is loaded
      cy.pause()
  
      cy.on('window:alert',(t)=>{
        //assertions
        expect(t).to.contains('This does not look like an appropriate folder...');
      })
  
   })
  
    it('does load the selected folder "Revisión prensa 0000-00-00"', () => {
      cy.viewport(1600, 900)
      cy.visit('http://localhost:3000/')
  
      cy.contains('Start').click()
      cy.get('button').contains('Edit from folder').click()
      
      // a manual action is needed to load the folder
      // load folder Revisión prensa 0000-00-00
      // click resume after the folder is loaded
      cy.pause()
  
      cy.contains('PDF').contains('non-PDF')
    })
  
    it('does load, passes basic checks and gets to Tagger when "Revisión prensa 0000-00-00" is selected', () => {
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
  
  
  })