// go()

describe('mysuite', ()=> 
{
  it('NavigationTest', ()=> 
    {
      cy.visit("https://demo.opencart.com/");
      cy.title().should('eq',"Your Store"); // Home page

      //click on camera option.
      cy.get("li:nth-child(7) a:nth-child(1)").click();
      cy.get("div[id='content'] h2").should('have.text',"Cameras"); // cameras

      cy.go('back'); // go back to home
      cy.title().should('eq',"Your Store");

      cy.go('forward'); // cameras
      cy.get("div[id='content'] h2").should('have.text',"Cameras");

      //another way to go back with numbers.
      cy.go(-1);  // home
      cy.title().should('eq',"Your Store");

      //another way to go forward with numbers.
      cy.go(1);  // cameras
      cy.get("div[id='content'] h2").should('have.text',"Cameras");

      //refresh the current page.
      cy.reload();

    })
        
  })