/// <reference types="Cypress"/>

import form from '../pages/Forms_Pages'

const pageDemoQA = new form

Given(/^que o usuário está na página inicial do site ToolsQA$/, () => {
	pageDemoQA.go()
});

When(/^ele clica na opção "([^"]*)"$/, () => {
	pageDemoQA.fillForms()
});

When(/^ele deve ser clicar na opção "([^"]*)"$/, () => {
	pageDemoQA.practiceForms()
});


When(/^preenche os seguintes campos "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)"$/, (firstname, lastname, email) => {
	pageDemoQA.dataUserForms(firstname, lastname, email)
	pageDemoQA.dataUserFormsOther()
});


