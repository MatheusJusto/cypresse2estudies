describe('user register', () => {
    const user = {
        name: "Matheus",
        email: "matheusmatheus@matheus.com",
        password: "321"
    }

    it('should allow register a new user', () => {
        cy.visit('/')

        cy.getByData('botao-login').click();
        cy.getByData('name-input').type(user.name);
        cy.getByData('email-input').type(user.email);
        cy.getByData('senha-input').type(user.password);
        cy.getByData('checkbox--input').check();
        cy.getByData('botao-enviar').click();

        cy.getByData('menssagem-sucesso').should('exist').contains('Usuário cadastrado com sucesso!')
    })
})