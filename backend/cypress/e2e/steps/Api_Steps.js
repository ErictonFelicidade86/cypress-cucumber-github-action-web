let userId;
let token;
let bookIds = [];
const username = `testuser${Date.now()}`;
const password = "Test@1234";

Given("I check if the user exists and delete if necessary", () => {
  cy.generateToken(username, password).then((generatedToken) => {
    token = generatedToken;

    if (token) {
      cy.getUserId(username, token).then((retrievedUserId) => {
        userId = retrievedUserId;

        if (userId) {
          cy.deleteUser(userId, token);
        }
      });
    }
  });
});


function createUser(retries = 3) {
  cy.api({
    method: "POST",
    url: "Account/v1/User",
    body: { userName: username, password: password },
    failOnStatusCode: false, 
  }).then((response) => {
    console.log(`Attempt ${4 - retries}: Status ${response.status}`);

    if ([200, 201].includes(response.status)) {
      userId = response.body.userID;
    } else if (response.status === 502 && retries > 0) {
      cy.wait(2000); // Aguarda 2 segundos antes de tentar novamente
      createUser(retries - 1);
    } else {
      throw new Error(`User creation failed with status: ${response.status}`);
    }
  });
}

Given("I create a new user", () => {
  createUser();
});

// Gera um token de acesso
When("I generate an access token", () => {
  cy.api({
    method: "POST",
    url: "Account/v1/GenerateToken",
    body: { userName: username, password: password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    token = response.body.token;
  });
});

// Verifica se o usuário está autorizado
When("I verify the user is authorized", () => {
  cy.api({
    method: "POST",
    url: "Account/v1/Authorized",
    body: { userName: username, password: password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.true;
  });
});

// Obtém a lista de livros disponíveis
Then("I fetch the list of available books", () => {
  cy.api("GET", "BookStore/v1/Books").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.not.be.empty;
    bookIds = response.body.books.slice(0, 2).map((book) => book.isbn);
  });
});

// Reserva dois livros
When("I reserve two books of my choice", () => {
  const bookReservation = {
    userId: userId,
    collectionOfIsbns: bookIds.map((isbn) => ({ isbn })),
  };

  cy.api({
    method: "POST",
    url: "BookStore/v1/Books",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: bookReservation,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

// Verifica os detalhes do usuário com os livros reservados
Then("I verify the user details with the reserved books", () => {
  cy.api({
    method: "GET",
    url: `Account/v1/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.have.length(2);
    expect(response.body.books.map((book) => book.isbn)).to.deep.equal(bookIds);
  });
});
