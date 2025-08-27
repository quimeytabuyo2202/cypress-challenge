beforeEach(() => {
    cy.viewport(1280, 720);
    cy.log('🧪 Test iniciado');
    Cypress.env("startTime", new Date());
});

afterEach(function() {
    const startTime = Cypress.env("startTime");
    const endTime = new Date();
    const duration = endTime - startTime;
    console.log(`✅ Test completado en ${duration}ms`);
});

import './commands'
require('cypress-xpath');