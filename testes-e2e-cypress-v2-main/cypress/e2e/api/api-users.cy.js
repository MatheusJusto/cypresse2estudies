describe('Requesting API', () => {

    context('GET /users', () => {
        it('Should return a users list', () => {
            cy.request('GET', 'http://localhost:8000/users').then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).length.to.be.greaterThan(1)
            })
        })
    })

    context('GET /users/:userId', () => {
        it('Should return only one user', () => {
            cy.request(
                {
                    method: 'GET',
                    url: 'http://localhost:8000/users/84de4b89-6e70-4d66-a62c-6d3a0bd734fd'
                }
            ).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome')
            })
        })
        it('Should return an error when user is invalid', () => {
            cy.request({
                method: 'GET',
                    url: 'http://localhost:8000/users/84de4b89-6e70-4',
                    failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body).to.eq('Not Found')
            })
        })
    })

    context('Interceptin network requests', () => {
        it('Should intercept POST users/login', () => {
            cy.intercept('POST', 'users/login').as('loginRequest')

            cy.login('matheus@matheus.com','123')
            cy.wait('@loginRequest').then((interception) => {
                interception.response = {
                    statusCode: 200,
                    body: {
                        sucess: true,
                        message: 'Login!'
                    }
                }
            })
            cy.visit('/home')
            cy.getByData('titulo-boas-vindas').should('contain.text', 'Bem vindo de volta!')
        })
    })

    context('PUT /users', () => {
        it('Should update user data', () => {
            const user = {
              nome: 'Marcos Garcia',
              senha: '123',
            };
        
            cy.request(
            {
              method: 'PUT',
              url: 'http://localhost:8000/users/84de4b89-6e70-4d66-a62c-6d3a0bd734fd',
              body: user,
              failOnStatusCode: false,
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.nome).to.eq(user.nome);
              expect(response.body.senha).to.eq(user.senha);
            });
          });
    })
})
