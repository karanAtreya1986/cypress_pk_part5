// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//no need to import cypress in every file.
// for Cyress
/// <reference types="cypress" />       

//for using xpath write this.
/// <reference types="cypress-xpath" />

//create custom command for clicking on iframe.
Cypress.Commands.add('getIframe', (iframe)=>{
    return cy.get(iframe)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap);
})

//for iframes
import 'cypress-iframe';
// or
require('cypress-iframe');

//for drag and drop events.
require('@4tw/cypress-drag-drop')

//for file uploads.
import 'cypress-file-upload';


// custom command for clicking on link using label
//name of the command, and what we want from command like label or text etc.
Cypress.Commands.add('clickLink',(label)=>{
    cy.get('a').contains(label).click();

})

//Over write contains() 
//contains name of the existing method.
//contains requires five parameters, pass them as is.
//get the params from docs.
//cypres gives error for overwrite.
//it says use overwritequery.
Cypress.Commands.overwriteQuery('contains',(originalFn, subject, filter, text, options = {})=>{
    // determine if a filter argument was passed
    if (typeof text === 'object') {
        options = text
        text = filter
        filter = undefined
    }

    //we removed case sensitive here.
    //by default matchcase is true.
    options.matchCase = false
//returns original function with the parameters.
    return originalFn(subject, filter, text, options)
})

//Custom comamnd for login

Cypress.Commands.add("loginapp",(email,password)=>{
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get("button[class='button-1 login-button']").click();
    
})