const API_BASE_URL = "API_URL_WILL_BE_ADDED_LATER";

const ticketForm = document.getElementById("ticketForm");
const descriptionInput = document.getElementById("description");
const charCount = document.getElementById("charCount");
const statusFilter = document.getElementById("statusFilter");

document.addEventListener("DOMContentLoaded", loadLocalTickets);

descriptionInput.addEventListener("input", function () {
  charCount.innerText = descriptionInput.value.length;
});

statusFilter.addEventListener("change", loadLocalTickets);

ticketForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const ticket = {
    ticketId: Date.now().toString(),
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    description: descriptionInput.value,
    status: "Open",
    createdAt: new Date().toLocaleString()
  };

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.unshift(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  document.getElementById("message").innerText = "Ticket submitted successfully.";
  ticketForm.reset();
  charCount.innerText = "0";

  loadLocalTickets();
});

function loadLocalTickets() {
  const ticketsList = document.getElementById("ticketsList");
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const selectedStatus = statusFilter.value;

  const filteredTickets =
    selectedStatus === "All"
      ? tickets
      : tickets.filter(ticket => ticket.status === selectedStatus);

  if (filteredTickets.length === 0) {
    ticketsList.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📭</div>
        <h3>That's all for now!</h3>
        <p>Your submitted tickets will appear here.</p>
      </div>
    `;
    return;
  }

  ticketsList.innerHTML = filteredTickets.map(ticket => {
    const priorityClass = getPriorityClass(ticket.priority);
    const icon = getCategoryIcon(ticket.category);

    return `
      <div class="ticket-item">
        <div class="ticket-icon">${icon}</div>

        <div class="ticket-content">
          <h3>${ticket.subject}</h3>
          <div class="ticket-meta">
            ${ticket.category} • 
            <span class="${priorityClass}">${ticket.priority} Priority</span>
          </div>
          <p class="ticket-desc">${ticket.description}</p>
          <div class="ticket-meta">${ticket.createdAt}</div>
        </div>

        <div class="ticket-actions">
          <span class="status">● ${ticket.status}</span>
          <button class="delete-btn" onclick="deleteTicket('${ticket.ticketId}')">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function deleteTicket(ticketId) {
  const confirmDelete = confirm("Are you sure you want to delete this ticket?");

  if (!confirmDelete) {
    return;
  }

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const updatedTickets = tickets.filter(ticket => ticket.ticketId !== ticketId);

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  loadLocalTickets();
}

function getPriorityClass(priority) {
  if (priority === "High") return "priority-high";
  if (priority === "Medium") return "priority-medium";
  return "priority-low";
}

function getCategoryIcon(category) {
  if (category === "Technical") return "🖥️";
  if (category === "Access") return "🔐";
  if (category === "Bug") return "🐞";
  return "📌";
}