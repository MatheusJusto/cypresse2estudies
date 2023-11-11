describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should renders h1 with correct text', () => {
    cy.getByData('titulo-principal').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
  })
  it('should render vantagens text', () => {
    cy.getTextBySelector('h2', 'Vantagens do nosso banco:')
  })
})