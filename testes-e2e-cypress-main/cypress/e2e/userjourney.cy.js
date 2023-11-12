describe('user journeys', () => {
   it('should allows the user access the aplication, make a transaction and logout', () => {
    cy.visit('/')

    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('matheus@matheus.com')
    cy.getByData('senha-input').type('123')
    cy.getByData('botao-enviar').click()

    cy.location('pathname').should('eq', '/home')

    cy.getByData('select-opcoes').select('Transferência')
    cy.getByData('form-input').type('100')
    cy.getByData('realiza-transacao').click()

    cy.getByData('lista-transacoes').find('li').last().contains('- R$ 100')

    cy.getByData('botao-sair').click()
    cy.location('pathname').should('eq', '/')
   })
})