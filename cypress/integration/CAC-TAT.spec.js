/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

   it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios and send form', function(){
        cy.get('#firstName').type('Khrone')
        cy.get('#lastName').type('Guard')
        cy.get('#email').type('cypressthesignal@gmail.com')
        cy.get('#open-text-area').type('Teste, Teste, Teste, Teste, Teste, Teste,Teste, Teste, Teste, Teste, Teste, Teste, Teste,', {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Khrone')
        cy.get('#lastName').type('Guard')
        cy.get('#email').type('cypressthesignagmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') // Verifica se a mensagem de erro é exibida quando é digitado um e-mail errado
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('Teste')
            .should('have.value', '') // Verifica se o valor da string está vazia 
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Khrone')
        cy.get('#lastName').type('Guard')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type('Teste')

        cy.get('#phone-checkbox').check() // Condição para que o telefone seja obrigatório 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Khrone')
            .should('have.value', 'Khrone')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Guard')
            .should('have.value', 'Guard')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('teste@gmail.com')
            .should('have.value', 'teste@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('88888888')
            .should('have.value', '88888888')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click() // Cy.contains verifica seletores CSS seguido do seus nomes
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){ //
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type ="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type ="radio"]')
            .should('have.length', '3') //Verifica o tamanho 
            .each(function($radio){ // Percorre os 3 atendimentos
                cy.wrap($radio).check() // Check 
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
            
    })   

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(input =>{
            expect(input[0].files[0].name).to.equal('example.json') 
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input =>{
            expect(input[0].files[0].name).to.equal('example.json') 
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json', { enconding: null }).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile({
            contents: '@exampleFile',
            fileName: 'example.json'
        })
        .should(input =>{
            expect(input[0].files[0].name).to.equal('example.json') 
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Talking About Testing').should('be.visible')
    })
})