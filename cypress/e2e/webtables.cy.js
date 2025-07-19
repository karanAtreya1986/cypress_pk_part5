
describe('Handle Tables',(()=>{

    //hook.
    //will run before every it block
    //login and go to the customers screen before every test.
    beforeEach('Login',()=>{
     
        cy.visit("https://demo.opencart.com/admin/index.php");
        cy.get("#input-username").type("demo");
        cy.get("#input-password").type("demo");
        cy.get("button[type='submit']").click();
        
        //in cypress after login sometimes we get disturbing pop ups.
        //we can do normal click on them and proceed.
        //no need of conditional statements.
        cy.get(".btn-close").click();
        //Customers--> Customers

        cy.get("#menu-customer>a").click();  // customers main menu
        cy.get("#menu-customer>ul>li:first-child").click() // customers sub/child item

    })

    it.skip('Check Number Rows & Columns',()=>{
      
        cy.get("table[class='table table-bordered table-hover']>tbody>tr").should('have.length','10');
        cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should('have.length','7');


    })

   it.skip('Check cell data from specific row & Column',()=>{
       //we want to read data from fifth row and third column.
         cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)")
         .contains("rs@yopmail.com");
    })

    it.skip('Read all the rows & Columns data in the first page',()=>{
       
       //each is great for iterating over web elements.
        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
            .each( ($row, index, $rows)=>{
//wrap the row so we can use the cypress commands.
//within method to get the columns from each row.
                cy.wrap($row).within( ()=>{
//again apply each as there are multiple tds.
                    cy.get("td").each( ($col, index, $cols)=>{
                        //get the text of every column.
                        cy.log($col.text());
                    })


                } )

            })

    })

  
    it.only('Pagination',()=>{
             
        //find total number of pages
        /*let totalPages;
        cy.get(".col-sm-6.text-end").then( (e)=>{
            //get the text which says how many pages are there.
                let mytext=e.text();  //Showing 1 to 10 of 5581 (559 Pages)
                //from above extract the number 559
                totalPages=mytext.substring(mytext.indexOf("(")+1,mytext.indexOf("Pages")-1);
                cy.log("Total number of pages in a table=======>"+totalPages);

        } )*/

        let totalPages=5;

        for(let p=1;p<=totalPages;p++)
        {
            //we need minimum two pages for clicking on page numbers.
                if(totalPages>1)
                {
                    cy.log("Active page is==="+p);

                    //click on the individual page numbers stored in p.
                    //see how to pass the variable in nth child.
                    cy.get("ul[class='pagination']>li:nth-child("+p+")").click();
                    cy.wait(3000);
                    

                    //lets capture email for all the rows.
                    cy.get("table[class='table table-bordered table-hover']>tbody>tr")
                    .each( ($row, index, $rows)=>{
                        cy.wrap($row).within( ()=>{
                                cy.get('td:nth-child(3)').then((e)=>{
                                    cy.log(e.text()); // Email
                                })

                        }   )

                    })
                    

                }
        }



        

    })   
    

}))