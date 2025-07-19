//cypress also auto handles all alerts by closing them.
//we need not do anything.
//but if we still want to do then follow below.

describe('Alerts', () => {

    //1) Javascript Alert: It will have some text and an ‘OK’ button
    it('Js alert',()=>{

        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')

        //no need of separate script.
        //this will click on button.
        //alert generated and auto closed by cypress.
        cy.get("button[onclick='jsAlert()']").click();

        //to validate on alert and you want to do something.
        //trigger the event for js.
        //for normal alert use window alert.
        //alert window stored in t.
        cy.on('window:alert',(t)=>{
                expect(t).to.contains('I am a JS Alert');

        })

        //alert window automatically closed by cypress

        //validate text after clicking on the alert which is seen in window.
        cy.get("#result").should('have.text','You successfully clicked an alert')


    })

    //2) Javascript Confirm Alert: It will have some text with ‘OK’ 
    // and ‘Cancel’ buttons

    //cypres handles by using ok button.
    it('Js confirm alert - OK',()=>{

        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        
        cy.get("button[onclick='jsConfirm()']").click();

        //for confirmation, we use window:confirm.

        cy.on('window:confirm',(t)=>{
            expect(t).to.contains('I am a JS Confirm');

        })
        //cypress automatically closed alert window by using ok button-default

        cy.get('#result').should('have.text','You clicked: Ok')

    })

    it('Js confirm alert - Cancel',()=>{

        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        
        cy.get("button[onclick='jsConfirm()']").click();

        cy.on('window:confirm',(t)=>{
            expect(t).to.contains('I am a JS Confirm');

        })
        
        //use window:confirm and pass in false to click using cancel.
        cy.on('window:confirm',()=> false); // cypress closes alert window using cancel button

        cy.get('#result').should('have.text','You clicked: Cancel')

    })


    //3) Javascript Prompt Alert: It will have some text with a text box for user input along 
    // with ‘OK’ and ‘Cancel’ buttons.

    //cypress by default clicks ok button.
    it('Js prompt alert',()=>{

        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')

        //trigger event.
        //use stub for prompt windows.
        //pass in window and the type of alert.
        //returns for passing the text inside box.

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('welcome');
         })

         //click on the alert button.
         cy.get("button[onclick='jsPrompt()']").click();

        //cypress will automatically close prompted alert- it will use OK button - by default
        //cy.on('window:prompt',()=> false); 

        cy.get('#result').should('have.text', 'You entered: welcome')
       
    })

    //3) Javascript Prompt Alert: It will have some text with a text box for user input along 
    // with ‘OK’ and ‘Cancel’ buttons.
    //this time lets click on cancel button.
    //cypress by default clicks ok button.
    it('Js prompt alert',()=>{

        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')

        //trigger event.
        //use stub for prompt windows.
        //pass in window and the type of alert.
        //returns for passing the text inside box.

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('welcome');
         })

         //click on the alert button.
         cy.get("button[onclick='jsPrompt()']").click();

        //cypress will automatically close prompted alert- it will use OK button - by default

        //click on the cancel in prompt.
        //same as earlier js confirm.
        cy.on('window:prompt',()=> false); 

        cy.get('#result').should('have.text', 'You entered: welcome')
       
    })

     //4) Authenticated Alert
     it.only('Authenticated  alert',()=>{

        //appraoch1
        /*cy.visit("https://the-internet.herokuapp.com/basic_auth",{ auth: 
                                                                    {
                                                                      username: "admin",
                                                                      password: "admin"
                                                                    }    
                                                                } );
       cy.get("div[class='example'] p").should('have.contain',"Congratulations");

       */
      
       //second way is pass in url directly.
       cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth")
       cy.get("div[class='example'] p").should('have.contain',"Congratulations");

       
    })
  })