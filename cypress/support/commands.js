import { generate } from 'gerador-validador-cpf'

Cypress.Commands.add('cadastroDadosPessoais', (nome, sobremome, dataNascimento, email, senha)=>{
    cy.get('[data-cy="button-btn-enroll"]').click()
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(nome)
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(sobremome)
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type(dataNascimento)
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(generate())
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(senha)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(senha)
    cy.get('.lg\\:w-7\\/12 > .form-container > div.relative > .justify-between').click()
    cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(3)').click()
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').click()
    cy.get('[data-cy="button-signup_submit_button_1"]').click()
})

Cypress.Commands.add('cadastroEndereco', ()=>{
    cy.get('[data-cy="input-signup-address-cep"]').type('13064759')
    cy.get('[data-cy="input-signup-address-number"]').type('23')
    cy.wait(1000)
    cy.get('[data-cy="button-signup_submit_button_3"]').click()
})