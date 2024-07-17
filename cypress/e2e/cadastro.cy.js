/// <reference types="cypress"/>

describe('Validação da função de cadastro', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('Deve realizar o cadastro com sucesso', () => {
    //let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    //cy.cadastroDadosPessoais('nome', 'sobremome', '23042000', email, 'teste')
    //cy.cadastroEndereco()
    cy.cadastroCompleto()
    cy.get('.text-lime-500').should('contain', 'Thank you for')
  });

  it('Deve mostrar mensagem de erro ao tentar cadastrar com email invalido', () => {
    cy.cadastroDadosPessoais('nome', 'sobremome', '23042000', 'email', 'teste')
    cy.get(':nth-child(1) > .form-container > .input-error').should('contain', 'Email inválido')
  });

  it.only('Deve mostrar mensagem de erro ao tentar cadastrar com email já cadastrado', () => {
    cy.cadastroCompleto().then(()=>{
      let email = Cypress.env('generatedEmail')
      cy.visit('/')
      cy.cadastroDadosPessoais('nome', 'sobremome', '23042000', email, 'senha')
      cy.get('.input-error').should('contain', 'Este email já está em uso')
    })
  });
})
