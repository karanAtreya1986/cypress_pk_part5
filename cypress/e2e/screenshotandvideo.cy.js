
describe('mysuite', ()=> 
{
  it('Capture screenshots & Videos', ()=> 
    {
      cy.visit("https://demo.opencart.com/");

      //stores automatically under screenshot folder.
      //homepage is the name of the screenshot we want to save.
      //captures screenshot of entire page which is visible.
      /*cy.screenshot("homepage");
      cy.wait(5000);
      //capture screenshot of only logo element.
      //get the element and then capture screenshot and give name.
      cy.get("img[title='Your Store']").screenshot("logo");*/

      //cypress Automatically capture screenshot & video on failure 
      // - only when ou execute through CLI
      //this automatic capture happens only when we run via cmd or ci tool.
      //video also auto captured.
      
      //go to cameras and expect wrong text for test to fail.
      cy.get("li:nth-child(7) a:nth-child(1)").click(); //cameras
      cy.get("div[id='content'] h2").should('have.text',"Tablets");

    })

  })
