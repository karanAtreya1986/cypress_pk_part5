//another way to create page objects like selenium.
//locators first and then methods.
//we need to use this to access current class variables in this method.

class Login
{
    txtUserName="input[placeholder='Username']";
    txtPassword="input[placeholder='Password']";
    btnSubmit="button[type='submit']";
    lblmsg=".oxd-topbar-header-breadcrumb > .oxd-text";

    setUserName(username)
    {
        cy.get(this.txtUserName).type(username);
    }

    setPassword(password)
    {
        cy.get(this.txtPassword).type(password);
    }

    clickSubmit()
    {
        cy.get(this.btnSubmit).click();
    }
   verifyLogin()
    {
        cy.get(this.lblmsg).should('have.text','Dashboard');
    }
}

export default Login;