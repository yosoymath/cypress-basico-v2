it('verifica o título da aplicação', function() {
    cy.visit('./src/privacy.html')

    cy.contains('Talking About Testing').should('be.visible')
})