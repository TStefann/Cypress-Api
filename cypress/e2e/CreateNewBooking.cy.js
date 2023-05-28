describe("POST tests", () => {
  it("Create a new booking and check with GET by ID each KEY:Value", () => {
    let bookId;
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
      bookId = response.body.bookingid;

      //Get Booking details using bookingId
      cy.request({
        method: "GET",
        url: `https://restful-booker.herokuapp.com/booking/${bookId} `,
        headers: {
          accept: "application/json",
        },
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).eq("Test1");
        expect(response.body.lastname).eq("Test2");
        expect(response.body.totalprice).eq(999);
        expect(response.body.bookingdates.checkin).eq("2023-05-29");
        expect(response.body.bookingdates.checkout).eq("2023-05-29");
        expect(response.body.additionalneeds).eq("Test");
      });
    });
  });
});
