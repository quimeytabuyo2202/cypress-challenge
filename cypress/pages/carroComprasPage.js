class CarroComprasPage {

    elements = {
        anadirItemsButtons: () => cy.xpath("//*[contains(@id, 'add-to-cart')]"),
        productosEnCarritoButton: () => cy.xpath("//*[@id='shopping_cart_container']"),
        checkoutButton: () => cy.xpath("//*[@id='checkout']"),
        firstNameInput: () => cy.xpath("//*[@id='first-name']"),
        lastNameInput: () => cy.xpath("//*[@id='last-name']"),
        postalCodeInput: () => cy.xpath("//*[@id='postal-code']"),
        continueButton: () => cy.xpath("//*[@id='continue']"),
        finishButton: () => cy.xpath("//*[@id='finish']"),
        mensajeCompraRealizada: () => cy.xpath("//*[contains(text(), 'Thank you for your order')]/following-sibling::div")
    }
    
    agregarItemsAlCarroDeCompras(cantidadItems) {
        for (let i = 0; i < cantidadItems; i++) {
            this.elements.anadirItemsButtons().eq(i).click();
        }
        return this;
    }

    accederACarrito() {
        this.elements.productosEnCarritoButton().click();
        return this;
    }

    clickEnCheckoutButton() {
        this.elements.checkoutButton().click();
        return this;
    }

    agregarInformacionDeUsuario(firstName, lastName, postalCode) {
        this.elements.firstNameInput().type(firstName);
        this.elements.lastNameInput().type(lastName);
        this.elements.postalCodeInput().type(postalCode);
        return this;
    }
    clickContinueButton() {
        this.elements.continueButton().click();
        return this;
    }

    clickFinishButton() {
        this.elements.finishButton().click();
        return this;
    }

   /*  obtenerMensajeCompraRealizada() {
        return this.elements.mensajeCompraRealizada().invoke('text');
    } */

    verificarMensajeCompraExitoso() {
        this.elements.mensajeCompraRealizada()
            .should('contain', 'Your order has been dispatched');
        return this;
    }
}

export default new CarroComprasPage;