
/** Tests for Login */
describe('Uploader :: Login', () => {
  xit('opens the front page of the uploader', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')
  })

  xit('displays incorrect login if the login is clicked without input', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.contains('Incorrect login')
  })

  xit('keeps the tagger and checkout disabled if login is incorrect', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.contains('Incorrect login')
    cy.get('a').contains('Tagger').should('have.attr', 'disabled');
    cy.get('a').contains('Checkout').should('have.attr', 'disabled');
  })

  xit('allows to login and navigates to Start', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')

    cy.get('input:first').type('test@test.dev')
    cy.get('input:last').type('1234567')
    cy.contains('Login').click()
    cy.contains('Edit from folder')
    cy.contains('Edit from server')
  })

  xit('logs out correctly', () => {
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

/** Tests for Dictionary */
describe('Uploader :: Dictionary', () => { 
  xit('does not allow to access the dictionary after login', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')

    cy.get('a').contains('Dictionary').should('have.attr', 'disabled');
  })


  xit('allows to access the dictionary after login', () => {
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


/** Tests for Start */
describe('Uploader :: Start', () => { 
  xit('allows to start without login', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')

    cy.contains('Start').click()
    cy.contains('Edit from folder')
    cy.contains('Edit from server')
  })

  xit('does not allow to edit from server without login', () => {
    cy.viewport(1600, 900)
    cy.visit('http://localhost:3000/')

    cy.contains('Start').click()
    cy.contains('Edit from server').click()
    cy.contains('Get Sessions').should('not.exist')
    cy.contains('Select session').should('not.exist')
  })

})

/** Test for Folder */
describe('Uploader :: Folder', () => { 

  xit('does not load and fires an alert when selecting folder "Revisión prensa 9999-99-99"', () => {
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

  xit('does load the selected folder "Revisión prensa 0000-00-00"', () => {
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

  xit('does load, passes basic checks and gets to Tagger when "Revisión prensa 0000-00-00" is selected', () => {
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


})

/** Tests for Tagger */
describe('Uploader :: Tagger', () => { 

  it('correctly submits to a tagging process the folder "Revisión prensa 0000-00-00"', () => {
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


    // type next
    cy.get('body').type('n')
    cy.get('body').type('n')
    cy.get('body').type('n')  

  })


})

