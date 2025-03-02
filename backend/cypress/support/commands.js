Cypress.Commands.add("generateToken", (username, password) => {
  return cy.api({
    method: "POST",
    url: "Account/v1/GenerateToken",
    body: { userName: username, password: password },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      return response.body.token;
    }
    return null;
  });
});

Cypress.Commands.add("getUserId", (username, token) => {
  return cy.api({
    method: "GET",
    url: `Account/v1/User/${username}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      return response.body.userID;
    }
    return null;
  });
});

Cypress.Commands.add("deleteUser", (userId, token) => {
  return cy.api({
    method: "DELETE",
    url: `Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 204]);
  });
});
