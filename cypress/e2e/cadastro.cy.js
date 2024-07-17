/// <reference types="cypress"/>

describe('Validação da função de cadastro', () => {

  beforeEach(()=>{
    cy.visit('/')
  })

  it('Deve realizar o cadastro com sucesso', () => {
    cy.cadastrar('nome', 'sobremome', '23042000', 'testando3@gmail.com', 'teste')
  });
})
