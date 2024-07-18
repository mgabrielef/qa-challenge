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
  })

  it('Deve mostrar mensagem de erro ao tentar cadastrar com email inválido', () => {
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000','email', 'senha')
    cy.get(':nth-child(1) > .form-container > .input-error').should('contain', 'Email inválido')
  })

  it('Deve mostrar mensagem de erro ao tentar cadastrar com email já cadastrado', () => {
    cy.cadastroCompleto().then(()=>{
      cy.wait(3000)
      let email = Cypress.env('generatedEmail')
      cy.visit('/')
      cy.get('[data-cy="button-btn-enroll"]').click()
      cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
      cy.get('.input-error').should('contain', 'Este email já está em uso')
    })
  })

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
      cy.get('[data-cy="button-btn-enroll"]').click()
      cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha', cpf)
      cy.get('.input-error').should('contain', 'Este CPF já está em uso')
    })
  })

  it('Deve mostrar mensagem de erro ao tentar cadastrar com CEP inválido', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.cadastroEndereco('12345678', '23')
    cy.get('.toasts-list').should('contain', 'CEP não encontrado')
  })

  it('Deve validar se o campo Nome é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Sobrenome é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-lastName"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Data de nascimento é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo CPF é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-cpf"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Email é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-email"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Confirme seu email é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Senha é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-password"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo Confirme sua senha é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').should('have.attr', 'required')
  })

  it('Deve validar se o campo de Termos de Uso é obrigatório', () => {
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').should('have.attr', 'required')
  })

  it.only('Deve validar se o campo CEP é obrigatório', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.get('[data-cy="input-signup-address-cep"]').should('have.attr', 'required')
  })

  it.only('Deve validar se o campo Número residencial é obrigatório', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.get('[data-cy="input-signup-address-number"]').should('have.attr', 'required')
  })

  it.only('Deve validar se o campo Bairro é obrigatório', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.get('[data-cy="input-signup-address-neighborhood"]').should('have.attr', 'required')
  })

  it.only('Deve validar se o campo Endereço é obrigatório', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha')
    cy.get('[data-cy="input-signup-address-street"]').should('have.attr', 'required')
  })

})
