/// <reference types="cypress"/>

describe('Validação da função de cadastro', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('Deve realizar o cadastro com sucesso', () => {
    cy.cadastroDadosPessoais('nome', 'sobremome', '23042000', 'testando9@gmail.com', 'teste')
    cy.cadastroEndereco()
    cy.get('.text-lime-500').should('contain', 'Thank you for')
  });

  it.only('', () => {
    
  });

})
