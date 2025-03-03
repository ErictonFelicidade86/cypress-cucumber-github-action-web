/// <reference types="Cypress"/>

import formsElements from '../elements/Customers_Forms'

const forms = new formsElements
const url = Cypress.config("baseUrl")

class FormsPage {
    go() {
        cy.visit(url)
    }

    fillForms() {
        cy.contains(forms.iconForms()).should('be.visible').click()
    }

    practiceForms() {
        cy.contains(forms.selectPracticeForms()).should("be.visible").click()
    }

    dataUserForms(farstname, lastname, email) {
        cy.get(forms.firstName()).type(farstname)
        cy.get(forms.lastName()).type(lastname)
        cy.get(forms.email()).should('be.visible').type(email)
    }

    dataUserFormsOther() {
        cy.get(forms.gender()).click( { force: true} )
    }

} export default FormsPage