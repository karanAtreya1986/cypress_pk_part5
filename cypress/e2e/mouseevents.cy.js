import 'cypress-iframe'
require ('@4tw/cypress-drag-drop')

describe("Mouse Operations", () => {
 
    it('MouseHover', () => {
     
        cy.visit("https://demo.opencart.com/");

        cy.get("body > main:nth-child(3) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)")
        .should('not.be.visible');

        //use trigger for mouse actions and then pass action name
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click();

        cy.get("body > main:nth-child(3) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)")
        .should('be.visible');


    });  

    
    it('Right click', () => {
       cy.visit("http://swisnl.github.io/jQuery-contextMenu/demo.html");

       //right click and check if copy option is seen

       //Appraoch1
       /*cy.get('.context-menu-one.btn.btn-neutral').trigger('contextmenu');
       cy.get('.context-menu-icon-copy > span').should('be.visible');
        */

       //Appraoch2
        cy.get('.context-menu-one.btn.btn-neutral').rightclick();
        cy.get('.context-menu-icon-copy > span').should('be.visible');

    }); 

    
    it('Double click', () => {
      
        cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3");
        cy.frameLoaded('#iframeResult');  //Load the frame

        //locate the element and double click.
        //then capture the text is same as what we want.
        //Appraoch1 - triger()
        //cy.iframe('#iframeResult').find("button[ondblclick='myFunction()']").trigger('dblclick');
        //cy.iframe('#iframeResult').find('#field2').should('have.value','Hello World!');

        //Appraoch2 - dblclick()
        cy.iframe('#iframeResult').find("button[ondblclick='myFunction()']").dblclick();
        cy.iframe('#iframeResult').find('#field2').should('have.value','Hello World!');
    }); 


    //install plugin and add in dependencies or in individual spec file.
   it('Drag and Drop using plugin', () => {
     cy.visit("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html")

     //source element locator.
     cy.get('#box6').should('be.visible')

     //target element locator.
     cy.get('#box106').should('be.visible')

     cy.wait(3000);
     //drag box6 into box 106 using drag method
     //use force method if element not getting identified or hidden.
     cy.get('#box6').drag('#box106',{force:true});
   });  


   it.only('Scrolling Page', () => {
       
    cy.visit('https://www.countries-ofthe-world.com/flags-of-the-world.html')

    //India flag
    //scroll till india and click.
    //we can scroll slowly using duration.
    //validate after scroll.
    cy.get(':nth-child(1) > tbody > :nth-child(86) > :nth-child(1) > img').scrollIntoView({duration:2000});
    cy.get(':nth-child(1) > tbody > :nth-child(86) > :nth-child(1) > img').should('be.visible')

    //algeria flag.
    cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1) > img').scrollIntoView({durution:2000});
    cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1) > img').should('be.visible');

    //scroll till we go to the footer elements.
    cy.get('#footer').scrollIntoView();

    });  



});