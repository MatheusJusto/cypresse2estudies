describe('mobile', () => {
    context('iphone-se2 resolution', () => {

        beforeEach(() => {
            cy.viewport(375, 667)
          })

        it('should renders a hamburguer menu', () => {
            cy.visit('/')
    
            cy.getByData('botao-login').click()
            cy.getByData('email-input').type('matheus@matheus.com')
            cy.getByData('senha-input').type('123')
            cy.getByData('botao-enviar').click()
    
            cy.location('pathname').should('eq', '/home')
    
            cy.getByData('menu-burguer').click()
            cy.getByData('menu-lateral').find('a').eq(3).click()
    
            cy.location('pathname').should('eq', '/home/investimentos')
        })
    })
    })

//run with
// npx cypress open --config viewportWidth=375,viewportHeight=667