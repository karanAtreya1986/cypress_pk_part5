import 'cypress-iframe'


describe("handling frames",()=>{


    it('appraoch1',()=>{

        cy.visit("http://the-internet.herokuapp.com/iframe");

        //first lets go inside iframe.
        const iframe=cy.get("#mce_0_ifr")
        //this will go inside document part. as frame code inside it.
            .its('0.contentDocument.body')
            //assertions.
            .should('be.visible')
            //wrap and return the frame.
            .then(cy.wrap);

            //clear and type welcome.
            // iframe.clear().type("Welcome")

            //enter welcome and select it using keyboard.
            iframe.clear().type("Welcome {cmd+a}");

            //click on the bold link.
            //bold is not inside frame.
            //so we can use cy.
            cy.get("[aria-label='Bold']").click();

    })

    it('appraoch2 - by using custom command',()=>{

        cy.visit("http://the-internet.herokuapp.com/iframe");

        //use our custom command and clear and type.
        cy.getIframe('#mce_0_ifr').clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click();

    })

    //install  - npm install -D cypress-iframe
    it('appraoch3 - by using cypress-iframe plugin',()=>{

        cy.visit("http://the-internet.herokuapp.com/iframe");

        //get the frame.
        //pass in the frame locator.
        cy.frameLoaded('#mce_0_ifr');   // Load the frame

        //perform the operation.
        cy.iframe('#mce_0_ifr').clear().type("Welcome {cmd+a}");

        cy.get("[aria-label='Bold']").click();
      

    })



})