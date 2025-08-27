class LoginPage {
    elements = {
        usernameInput: () => cy.xpath("//*[@*='username']"),
        passwordInput: () => cy.xpath("//*[@*='password']"),
        loginButton: () => cy.xpath("//*[@*='login-button']")
    }

    visitSauceDemo(url) {
        cy.visit(url); // ✅ Cypress directo
        return this;
    }

    login(username, password) {
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
        return this;
    }
}

export default new LoginPage();