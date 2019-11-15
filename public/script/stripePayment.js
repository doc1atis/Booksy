console.log("stripe is connected");
const stripe = Stripe("pk_test_WtKftRIzpOlpR1A3l3BjJsxs000vXfOC0G");
// use fetch to send request when buy button is clicked.
//  get seesion id from result
// pass the id to check out

for (let button of document.getElementsByClassName("buyButtonLink")) {
  button.onclick = function(event) {
    event.preventDefault();
    const bookID = event.target.getAttribute("href");
    axios
      .post("/buy", {
        bookID
      })
      .then(function(response) {
        console.log(response.data.sessionId);

        stripe
          .redirectToCheckout({
            sessionId: response.data.sessionId
          })
          .then(function(result) {
            if (result.error) {
              return console.log(result.error.message);
            }
            console.log("olgy checkout was successful");
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
