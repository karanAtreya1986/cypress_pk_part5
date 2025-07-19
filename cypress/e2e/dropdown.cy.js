/// <reference types="Cypress" />   

describe('handle dropdowns',()=>{

//select drop down
    it.skip('Dropdown with select', ()=>{

        cy.visit("https://www.zoho.com/commerce/free-demo.html")

        cy.get('#zcf_address_country')
        .select('Italy')
        .should('have.value','Italy')
    })

//drop down without select class.
//normal drop downs can be asserted with have.value because its fixed.
//other drop downs cannot be done, as we enter.
//use have.text.
    it.skip('Dropdown without select', ()=>{

        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")

        cy.get('#select2-billing_country-container').click()

       cy.get('.select2-search__field').type('Italy').type('{enter}')

       cy.get('#select2-billing_country-container')
       .should('have.text','Italy')

    })

    //search for element and then if it contains the text we need
    //click on it.
    it.skip('Auto suggest dropdown', ()=>{

        cy.visit("https://www.wikipedia.org/")

        cy.get('#searchInput').type('Delhi')

        cy.get('.suggestion-title').contains('Delhi University').click()

    })


    //go to google and search
    //values are dynamics
    //capture all options
    //can use contains, only thing if values change test can fail
    //use loop and check if value is equal to what we want
    //click on the required value
    it('Dynamic dropdown', ()=>{

        cy.visit("https://www.google.com/")

        //capture all options and check total options.
        cy.get("input[name='q']").type('cypress automation')

        cy.wait(3000)

        cy.get('div.wM6W7d>span').should('have.length',11)
        
        //each keyword is jquery function.
        //first capture all elements in list array.
        //then we use index to iterate one by one.
        //we get every element using el by traversing this array.
//the below lines of code is known as jquery function.
//not mandatory just alternate way for dynamic elements,
//else normal contains also works.
        cy.get('div.wM6W7d>span').each( ($el, index, $list)=>{
                if($el.text()=='cypress automation tutorial')
                {
                    //since 
                    cy.wrap($el).click()
                }
            } )

            //check if the value is the same in search box what we selected.
            cy.get("input[name='q']").should('have.value','cypress automation tutorial')

    })

})