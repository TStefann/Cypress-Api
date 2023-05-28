describe("PUT tests", () => {
  it("Update Exisiting Booking and check the update", () => {
    cy.GenerateToken().then(token => {
      cy.CreateNewBooking().then(bookId => {
        cy.request({
          method: "PUT",
          url: `https://restful-booker.herokuapp.com/booking/${bookId}`,
          body: {
            firstname: "PUTFirstName",
            lastname: "PUTSecondName",
            totalprice: 111,
            depositpaid: false,
            bookingdates: {
              checkin: "2030-05-29",
              checkout: "2030-05-29",
            },
            additionalneeds: "Another Test from PUT",
          },
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            cookie: `token=${token}`,
          },
        }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.firstname).eq("PUTFirstName");
          expect(response.body.lastname).eq("PUTSecondName");
          expect(response.body.totalprice).eq(111);
          expect(response.body.bookingdates.checkin).eq("2030-05-29");
          expect(response.body.bookingdates.checkout).eq("2030-05-29");
          expect(response.body.additionalneeds).eq("Another Test from PUT");
        });
      });
    });
  });
});
