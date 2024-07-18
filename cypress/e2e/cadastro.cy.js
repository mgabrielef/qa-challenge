/// <reference types="cypress"/>
import { generate } from 'gerador-validador-cpf'

describe('Validação da função de cadastro', () => {

  beforeEach(()=>{
    cy.visit('/')
    cy.get('[data-cy="button-btn-enroll"]').click()
  })

  it('Deve realizar o cadastro com sucesso', () => {
    //let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    //cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'teste')
    //cy.cadastroEndereco()
    cy.cadastroCompleto()
    cy.get('.text-lime-500').should('contain', 'Thank you for')
  });

  it('Deve mostrar mensagem de erro ao tentar cadastrar com email inválido', () => {
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000','email', 'senha')
    cy.get(':nth-child(1) > .form-container > .input-error').should('contain', 'Email inválido')
  });

  it('Deve mostrar mensagem de erro ao tentar cadastrar com email já cadastrado', () => {
    cy.cadastroCompleto().then(()=>{
      cy.wait(3000)
      let email = Cypress.env('generatedEmail')
      cy.visit('/')
      cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
      cy.get('.input-error').should('contain', 'Este email já está em uso')
    })
  });

  it('Deve mostrar mensagem de erro ao tentar cadastrar com CPF inválido', ()=>{
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha', '12345678910')
    cy.get('.input-error').should('contain', 'CPF inválido')
  })

  it('Deve mostrar mensagem de erro ao tentar cadastrar com CPF já cadastrado', () => {
    cy.cadastroCompleto().then(()=>{
      cy.wait(3000)
      let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
      let cpf = Cypress.env('generatedCPF')
      cy.visit('/')
      cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha', cpf)
      cy.get('.input-error').should('contain', 'Este CPF já está em uso')
    })
  });

  it('Deve mostrar mensagem de erro ao tentar cadastrar com CEP inválido', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.cadastroEndereco('12345678', '23')
    cy.get('.toasts-list').should('contain', 'CEP não encontrado')
  });
  


})
