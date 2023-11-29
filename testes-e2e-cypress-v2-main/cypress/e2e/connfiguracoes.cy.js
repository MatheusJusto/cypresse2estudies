import { faker } from "@faker-js/faker"

describe('Updating user data', () => {
    const newUser = {
        nome: faker.name.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password()
    }
    
    it('Should allows users to update their data', () => {
        cy.fixture('users').as('users')
        cy.get('@users').then(user => {
            cy.login(user[0].email, user[0].senha)

            cy.visit('/home')
            cy.url().should('include','/home')

            cy.contains(user[0].nome).should('be.visible')
        
            cy.getByData('app-home').find('a').eq(1).click()
            cy.url().should('include', '/minha-conta')
            cy.getByData('botao-salvar-alteracoes').should('be.disabled')
            
            cy.get('[name="nome"]').type(newUser.nome)
            cy.get('[name="senha"]').type(newUser.senha)

            cy.getByData('botao-salvar-alteracoes').should('not.be.disabled')
            cy.getByData('botao-salvar-alteracoes').click()

            cy.on('window:alert', (textoDoAlert) => {
                expect(textoDoAlert).to.equal('Alterações salvas com sucesso!')
            })

            cy.url().should('include', '/home')

            cy.window().then((win) => {
                expect(win.localStorage.getItem('nomeUsuario')).to.eq(newUser.nome)
                
                const userId = win.localStorage.getItem('userId')

                cy.request('GET', `http://localhost:8000/${userId}`).then(
                    (res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body.nome).to.be.eq(newUser.nome)
                        expect(res.body.nome).to.be.eq(newUser.senha)
                    }
                )
            })
            })

    })
})