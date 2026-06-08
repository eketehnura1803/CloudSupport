const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

document.addEventListener("DOMContentLoaded", loadAdminTickets);
categoryFilter.addEventListener("change", loadAdminTickets);
statusFilter.addEventListener("change", loadAdminTickets);

function loadAdminTickets() {
  const ticketsList = document.getElementById("adminTicketsList");
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  const selectedCategory = categoryFilter.value;
  const selectedStatus = statusFilter.value;
const sortedTickets = [...tickets].reverse();

const filteredTickets = sortedTickets.filter(ticket => {
  const matchCategory = selectedCategory === "All" || ticket.category === selectedCategory;
  const matchStatus = selectedStatus === "All" || ticket.status === selectedStatus;
  return matchCategory && matchStatus;
});

  if (filteredTickets.length === 0) {
    ticketsList.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📭</div>
        <h3>No tickets found</h3>
        <p>Try changing the category or status filter.</p>
      </div>
    `;
    return;
  }

  ticketsList.innerHTML = filteredTickets.map(ticket => {
    return `
      <div class="admin-ticket-card">
        <div class="ticket-icon">${getCategoryIcon(ticket.category)}</div>

        <div class="admin-ticket-info">
          <h3>${ticket.subject}</h3>
          <p><strong>User:</strong> ${ticket.fullName}</p>
          <p><strong>Email:</strong> ${ticket.email}</p>
          <p><strong>Category:</strong> ${ticket.category}</p>
          <p><strong>Priority:</strong> <span class="${getPriorityClass(ticket.priority)}">${ticket.priority}</span></p>
          <p><strong>Description:</strong> ${ticket.description}</p>
          <p class="ticket-meta">${ticket.createdAt}</p>
        </div>

        <div class="admin-actions">
          <select onchange="updateTicketStatus('${ticket.ticketId}', this.value)">
            <option value="Open" ${ticket.status === "Open" ? "selected" : ""}>Open</option>
            <option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Closed" ${ticket.status === "Closed" ? "selected" : ""}>Closed</option>
          </select>

          <button class="delete-btn" onclick="deleteTicket('${ticket.ticketId}')">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function updateTicketStatus(ticketId, newStatus) {
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  const updatedTickets = tickets.map(ticket => {
    if (ticket.ticketId === ticketId) {
      return { ...ticket, status: newStatus };
    }
    return ticket;
  });

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  loadAdminTickets();
}

function deleteTicket(ticketId) {
  if (!confirm("Are you sure you want to delete this ticket?")) {
    return;
  }

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const updatedTickets = tickets.filter(ticket => ticket.ticketId !== ticketId);

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  loadAdminTickets();
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