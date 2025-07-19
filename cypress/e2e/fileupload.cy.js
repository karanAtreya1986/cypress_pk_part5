
import 'cypress-file-upload';

describe('File Uploads',(()=>{

    it('Single File Upload',()=>{
               
       cy.visit('http://the-internet.herokuapp.com/upload');

       //when file has attribute called as type=file in dom then we can use
       //attach file.
       //all files used should be inside fixture before using.

       //upload file.
       cy.get('#file-upload').attachFile('test1.pdf');
       //click upload button.
       cy.get('#file-submit').click();
       //wait for sometime
       cy.wait(5000);
       //assert
        cy.get("div[class='example'] h3").should('have.text','File Uploaded!');

    })

    it('File Upload - Rename',()=>{
               
        cy.visit('http://the-internet.herokuapp.com/upload');
        //rename file when uploading.
        //first give the original file name, then give the new name.
       cy.get('#file-upload').attachFile({filePath:'test1.pdf', fileName:'myfile.pdf'});
       cy.get('#file-submit').click();
       cy.wait(5000);
        cy.get("div[class='example'] h3").should('have.text','File Uploaded!');
    })

    it('File Upload - Drag and drop',()=>{
        cy.visit('http://the-internet.herokuapp.com/upload');
        //identify the area where to drag and drop.
        //pass subject type to drag and drop.
        cy.get('#drag-drop-upload').attachFile("test1.pdf", {subjectType:'drag-n-drop'});
        cy.wait(5000);
        //assert if file present inside the file box.
        cy.get('#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span')
            .contains("test1.pdf");

    })

    
    it('Multiple files Upload ',()=>{
       cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php');
       //just pass in multiple files in array format.
       cy.get('#filesToUpload').attachFile([ "test1.pdf", "test2.pdf"]);
        cy.wait(5000);
//assert
        cy.get(':nth-child(6) > strong').should('contain.text','Files You Selected:')
       
      })


    it.only('File upload - Shadow Dom',()=>{
       
        cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm");
        //how to work with shadow dom.
        cy.get('.smart-browse-input', {includeShadowDom:true}).attachFile("test1.pdf");
        cy.wait(5000);

        cy.get('.smart-item-name',{includeShadowDom:true}).contains('test1.pdf');

    })

   
     
  }));