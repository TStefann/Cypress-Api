describe("DELETE tests", () => {
  it("Delete existing bookingId", () => {
    cy.GenerateToken().then(token => {
      cy.CreateNewBooking().then(bookId => {
        cy.request({
          method: "DELETE",
          url: `https://restful-booker.herokuapp.com/booking/${bookId}`,
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            cookie: `token=${token}`,
          },
        }).then(response => {
          expect(response.status).to.eq(201);
        });
        cy.request({
          method: "GET",
          url: `https://restful-booker.herokuapp.com/booking/${bookId}`,
          failOnStatusCode: false,
          headers: {
            "content-type": "application/json",
          },
        }).then(response => {
          expect(response.status).to.eq(404);
        });
      });
    });
  });
});
