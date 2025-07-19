describe('MyTestSuite', ()=> {

    it('DataDrivenTest', ()=> {
       
        //giving extension of fixture is optional.
        cy.fixture("orangehrm2").then((data)=>{

            //launch application only one time.
          cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

          //iterate loop because there are multiple data present.
          //if valid data then login and logout.
          //else validate the invalid messages.
           data.forEach((userdata)=>{
            cy.get("input[placeholder='Username']").type(userdata.username);
            cy.get("input[placeholder='Password']").type(userdata.password);
            cy.get("button[type='submit']").click();

            if(userdata.username=='Admin' && userdata.password=="admin123")
            {
              cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
              .should('have.text',userdata.expected);  // PIM validation

              cy.get('.oxd-userdropdown-tab > .oxd-icon').click();  // logout
              cy.get(':nth-child(4) > .oxd-userdropdown-link').click() //logout


            }
            else{
              cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text")
                .should("have.text",userdata.expected)
            }
            
          })

        })


      })
  
  })
  