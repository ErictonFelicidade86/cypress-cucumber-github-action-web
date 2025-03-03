Feature: Navegação para a página de Practice Forms

  Scenario Outline: O usuário acessa a página de Forms e é redirecionado para a página Practice Forms
    Given que o usuário está na página inicial do site ToolsQA
    When ele clica na opção "Forms"
    And ele deve ser clicar na opção "Practice Forms"
    When preenche os seguintes campos "<firstname>", "<lastname>", "<email>", "<gender>"

    Examples:
      | firstname  | lastname    | email                     | gender |
      | Ericton     | Brito      | ericton.teste@qateste.com | Male   | 
      
    