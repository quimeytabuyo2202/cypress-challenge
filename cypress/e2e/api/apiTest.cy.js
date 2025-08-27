describe('API Tests', () => {
    it('buscarEnLasRazasAlKelpie', () => {
        cy.request({
        method: 'GET',
        url: 'https://dog.ceo/api/breeds/list/all',
        headers: {
            'Cookie': '' 
        }
        
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.have.property('kelpie');
        });
    });
});