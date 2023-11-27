describe('Formulario de Login', ()=>{

  it.only('Should Acess home page', () => {
   

    cy.fixture('users').then( (user) => {
      cy.log('log', user[0])
      cy.login(user[0].email, user[0].senha)
      cy.visit('/home')
      cy.url().should('include', '/home')
      cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
      cy.contains(user[0].nome).should('be.visible');
    })
    
    
  })

  it('Should acces home page', () => {
    cy.login('matheus@matheus.com', '123')
    cy.visit('/home')
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
  })

  it('Não deve permitir um email inválido', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('neilton@alura')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  })

  it('Não deve permitir um campo em branco', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  })
})