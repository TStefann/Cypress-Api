Cypress.Commands.add("CreateNewBooking", () => {
  cy.request({
    method: "POST",
    url: "https://restful-booker.herokuapp.com/booking/",
    body: {
      firstname: "Test1",
      lastname: "Test2",
      totalprice: 999,
      depositpaid: true,
      bookingdates: {
        checkin: "2023-05-29",
        checkout: "2023-05-29",
      },
      additionalneeds: "Test",
    },
    headers: {
      "content-type": "application/json",
    },
  }).then(response => {
    expect(response.status).to.eq(200);
    const bookId = response.body.bookingid;
    return bookId;
  });
});

Cypress.Commands.add("GenerateToken", () => {
  cy.request({
    method: "POST",
    url: "https://restful-booker.herokuapp.com/auth",
    body: {
      username: "admin",
      password: "password123",
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => {
    expect(response.status).to.eq(200);
    const token = response.body.token;
    return token;
  });
});
