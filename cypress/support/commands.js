import { generate } from 'gerador-validador-cpf'

Cypress.Commands.add('cadastroDadosPessoais', (nome, sobrenome, dataNascimento, email, senha, cpf)=>{
    cpf = cpf || generate();
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(nome)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(sobrenome)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(dataNascimento)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(cpf)
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(senha)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(senha)
    cy.get('.lg\\:w-7\\/12 > .form-container > div.relative > .justify-between').click()
    cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(3)').click()
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click()
    cy.get('[data-cy="button-signup_submit_button_1"]').click()
})

Cypress.Commands.add('cadastroEndereco', (cep, numero)=>{
    cy.get('[data-cy="input-signup-address-cep"]').type(cep)
    cy.get('[data-cy="input-signup-address-number"]').type(numero)
    cy.wait(1000)
    cy.get('[data-cy="button-signup_submit_button_3"]').click()
})

Cypress.Commands.add('cadastroCompleto', ()=>{
    let email = `email${Math.floor(Math.random() * 100000000)}@mail.com`
    Cypress.env('generatedEmail', email)
    let cpf = generate()
    Cypress.env('generatedCPF', cpf)
    cy.cadastroDadosPessoais('nome', 'sobrenome', '23042000', email, 'senha', cpf)
    cy.cadastroEndereco('13064759', '23')
})
