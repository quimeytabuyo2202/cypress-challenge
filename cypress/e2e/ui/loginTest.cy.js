import loginPage from "../../pages/loginPage";


describe("Login Test", () => {
  it("Login exitoso", () => {
    loginPage.visitSauceDemo(Cypress.config("baseUrl"));
    
    loginPage.login(Cypress.config("username"), Cypress.config("password"));
    
    cy.url().should("include", "/inventory");
    });

    it("Login fallido", () => {
        loginPage.visitSauceDemo(Cypress.config("baseUrl"));

        loginPage.login(Cypress.config("username"), "malaseña");

        cy.url().should("include", "/inventory");
    });
});