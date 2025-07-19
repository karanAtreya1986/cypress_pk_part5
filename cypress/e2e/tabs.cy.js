
describe('Handle tabs',(()=>{


    it.skip('Appracoh1',()=>{

        cy.visit('https://the-internet.herokuapp.com/windows');  // parent tab

        //use invoke method.
        //pass in removeattr and the attribute name.
        cy.get('.example >a').invoke('removeAttr','target').click();  // clicking on link

        //then assertions.
        cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

        cy.wait(5000);

        //operations

        //go back to the parent tab.
        cy.go('back');  // back to parent tab

    })

    //limitation in approach 2.
    //the base url or domain should be same as the parent tab else wont work.
    //so child tabs and parents need to have same domain.
it('Approach2',()=>{

        cy.visit('https://the-internet.herokuapp.com/windows');  // parent tab

        //get the href attribute of the link which opens new tab.
        //jquery function.
        cy.get('.example >a').then((e)=>{
//prop to capture any property of any element.
                let url=e.prop('href');
//once we get the url, use visit and pass the url.
                cy.visit(url);
        }) 
       
        cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

        cy.wait(5000);

        //operations
        cy.go('back');  // back to parent tab

    })

}))