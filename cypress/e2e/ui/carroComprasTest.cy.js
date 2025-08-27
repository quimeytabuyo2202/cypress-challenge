import loginPage from "../../pages/loginPage";
import carroComprasPage from "../../pages/carroComprasPage";

describe("Carro compras test", () => {
    beforeEach(() => {
        cy.fixture('compraTestData').as('testData');
    });

    it("Agregar objetos y hacer compra exitosa", function() {
        this.testData.compras.forEach((compraData) => {
            
            loginPage.visitSauceDemo(Cypress.config("baseUrl"));
            loginPage.login(Cypress.config("username"), Cypress.config("password"));
            carroComprasPage.agregarItemsAlCarroDeCompras(compraData.cantidadItems);
            carroComprasPage.accederACarrito();

            carroComprasPage.clickEnCheckoutButton();
            carroComprasPage.agregarInformacionDeUsuario(
                compraData.firstName
                , compraData.lastName
                , compraData.postalCode);
                
            carroComprasPage.clickContinueButton();
            carroComprasPage.clickFinishButton();
            carroComprasPage.verificarMensajeCompraExitoso();
        })
    });
});