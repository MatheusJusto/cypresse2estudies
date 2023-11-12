describe('register form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.getByData('botao-cadastro').click()
    })

    it('should register user', () => {
        
        cy.getTextBySelector('.ModalCadastroUsuario_modal__descricao__kErQE', 'Preencha os campos abaixo para criar sua conta corrente!')

        cy.getByData('nome-input').type('Matheus')
        cy.getByData('email-input').type('matheus7@ig.com.br')
        cy.getByData('senha-input').type('123')
        cy.getByData('checkbox-input').check()

        
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
    })

    it.only('should not be able send a duplicate user', () => {
        cy.getTextBySelector('.ModalCadastroUsuario_modal__descricao__kErQE', 'Preencha os campos abaixo para criar sua conta corrente!')

        cy.getByData('nome-input').type('Matheus')
        cy.getByData('email-input').type('matheus7@ig.com.br')
        cy.getByData('senha-input').type('123')
        cy.getByData('checkbox-input').check()

        
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-erro').should('exist').and('have.text', 'E-mail já cadastrado!')
    })
})