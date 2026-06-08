const API_BASE_URL = "API_URL_WILL_BE_ADDED_LATER";

document.getElementById("ticketForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const ticket = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    description: document.getElementById("description").value
  };

  console.log("Ticket created locally:", ticket);

  document.getElementById("message").innerText =
    "Ticket submitted successfully. Backend connection will be added later.";

  document.getElementById("ticketForm").reset();
});