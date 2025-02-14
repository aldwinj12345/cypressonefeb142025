/// <reference types="cypress" />

let frontpage


before('Calling json files for test data',()=>{

  //inititating frontpage.json
  cy.fixture('frontpage').then((data)=>{
    frontpage = data;
  })
  

})

beforeEach('Launch OnlineJobs Front Page', ()=>{
  cy.visit(frontpage.testData['testURL'])
    .wait(3000)

  //assert url - when launched sucessfully
  cy.url().should('eq', frontpage.testData['testURL'])

  //change the window size of the browser
  cy.viewport(1280, 1024)
})

describe('OnlineJobs Front Page Test Suite', () => {
  
  it('TestCase001 - URL and Title verification', () => {
    //assert url - when launched sucessfully
    cy.url().should('eq', frontpage.testData['testURL'])
    //assert head title
    cy.title().should('eq', frontpage.headTitle)
  })

  it('TestCase002 - Onlinejobs home nav logo',()=>{
    //assert logo
    cy.get(frontpage.onlinejobsLogo)
      .wait(1000)
      .should('be.visible')
      .should('have.attr', 'src').and('not.be.empty')
    // ensuring that the logo should present as expected - test the rendered size
    cy.get(frontpage.onlinejobsLogo)
      .wait(1000)
      .should(([img]) => {
        expect(img.naturalWidth).to.greaterThan(0)
        expect(img.naturalHeight).to.greaterThan(0)
      })
    }) 
  it('TestCase003 - How it works drop down menu ',()=>{
    //assert how it works
    cy.get(frontpage.howitworks.dropdown['cssSelector'])
      .wait(1000)
      .should('exist') // Verify the element exists
      .should('be.visible') // Verify the element is visible
      .should('have.attr', 'href')

    //assert the expected text of the drop down menu 'How it Works  
    cy.get(frontpage.howitworks.dropdown['cssSelector'])
      .then(($element)=>{
        const elementext = $element.text().trim()
        expect(elementext).to.equal('How it Works')

    })
      //then when click it would open popup the sub drop down menu
      //cy.get(frontpage.howitworks.dropdown['cssSelector'])
    cy.get(frontpage.howitworks.dropdown['cssSelector'])
      .click()
      .click()
      .wait(1000)
      .should('have.attr', 'aria-expanded', 'true')
    //and to reinforce i have to assert the class name has show
    cy.get('ul.navbar-nav > li:nth-child(1)')
      .wait(1000)
      .should('have.class', 'nav-item dropdown show')
    //and that a certain drop down panel shows up and it indicates in the class name
    cy.get('ul.navbar-nav > li:nth-child(1) > div')
      .wait(1000)
      .should('have.class', 'dropdown-menu show')
    //lastly on that panel it shows the sub menu links
    //verify Employer - FAQ
    cy.get('ul.navbar-nav > li:nth-child(1) > div > a:nth-child(1)')
      .wait(1000)
      .should('exist') // Verify the element exists
      .should('be.visible') // Verify the element is visible
      .then(($element)=>{
        //get href
        const href = $element.attr('href');
        //get text
        const eletext = $element.text();
        //then validate expectation
        expect(href).to.equal('/how/employer')
        expect(eletext).to.equal('Employer - FAQ')
      })
    //verify Jobseeker - FAQ
    cy.get('ul.navbar-nav > li:nth-child(1) > div > a:nth-child(2)')
      .wait(1000)
      .should('exist') // Verify the element exists
      .should('be.visible') // Verify the element is visible
      .then(($element)=>{
        //get href
        const href = $element.attr('href');
        //get text
        const eletext = $element.text();
        //then validate expectation
        expect(href).to.equal('/how/jobseeker')
        expect(eletext).to.equal('Jobseeker - FAQ')
      })
    //verify Learn To Outsource
    cy.get('ul.navbar-nav > li:nth-child(1) > div > a:nth-child(3)')
      .wait(1000)
      .should('exist') // Verify the element exists
      .should('be.visible') // Verify the element is visible
      .then(($element)=>{
        //get href
        const href = $element.attr('href');
        //get text
        const eletext = $element.text();
        //then validate expectation
        expect(href).to.equal('/blog/training')
        expect(eletext).to.equal('Learn To Outsource')
      })
  })

  it('TestCase004 - Pricing',()=>{
    //assert pricing in the nav bar
    cy.get('ul.navbar-nav > li:nth-child(2) > a')
      .wait(1000)
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'href', '/pricing')
      .should('have.text', 'Pricing')
  })

  it('TestCase005 - Real Results',()=>{
    //verify real results in the nav bar
    //assert pricing in the nav bar
    cy.get('ul.navbar-nav > li:nth-child(3) > a')
      .wait(1000)
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'href', '/real-results')
      .should('have.text', 'Real Results')
    //and when click it goes to expected page
    cy.get('ul.navbar-nav > li:nth-child(3) > a')
      .click()
      .wait(1000)
    cy.url().should('eq', 'https://www.onlinejobs.ph/real-results')
  })

  it('TestCase006 - Post a job button',()=>{
    //verify post a job button
    cy.get('ul.navbar-nav > li:nth-child(4) > a')
      .wait(1000)
      .should('be.exist')
      .and('be.visible')
      .and('have.text', 'post a job')
      .and('have.attr', 'href', '/employers/postjob')
      .and('have.css', 'text-transform', 'uppercase')
      .and('have.css', 'background-color', 'rgb(2, 69, 112)')
      .and('have.css', 'border-radius', '100px')
      
    //assert when click it goes to expected destination
    cy.get('ul.navbar-nav > li:nth-child(4) > a')
      .click()
      .wait(1000)
    cy.url().should('eq', 'https://www.onlinejobs.ph/register-employer?1')
    
  })

})