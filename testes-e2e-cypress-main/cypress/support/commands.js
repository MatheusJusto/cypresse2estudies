Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add('getTextBySelector', (selector, text) => {
    return cy.get(selector).contains(text)
})
