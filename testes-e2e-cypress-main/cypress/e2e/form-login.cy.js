describe('login form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should not be able to use a invalid email', () => {
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('matheus@matheus')
        cy.getByData('senha-input').type('123')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
    })

    it('should not be able left a empty input', () => {
        cy.getByData('botao-login').click()
        cy.getByData('senha-input').type('123')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
    })
})