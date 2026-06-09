const API_BASE_URL = "https://txd3remqkj.execute-api.us-east-1.amazonaws.com";

const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

document.addEventListener("DOMContentLoaded", loadAdminTickets);
categoryFilter.addEventListener("change", loadAdminTickets);
statusFilter.addEventListener("change", loadAdminTickets);

async function loadAdminTickets() {
  const ticketsList = document.getElementById("adminTicketsList");

  try {
    const response = await fetch(`${API_BASE_URL}/tickets`);

    if (!response.ok) {
      throw new Error("Failed to load tickets");
    }

    const tickets = await response.json();

    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredTickets = tickets.filter(ticket => {
      const matchCategory =
        selectedCategory === "All" || ticket.category === selectedCategory;

      const matchStatus =
        selectedStatus === "All" || ticket.status === selectedStatus;

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
            <p><strong>Priority:</strong> 
              <span class="${getPriorityClass(ticket.priority)}">
                ${ticket.priority}
              </span>
            </p>
            <p><strong>Status:</strong> ${ticket.status}</p>
            <p><strong>Description:</strong> ${ticket.description}</p>
            <p class="ticket-meta">${ticket.createdAt}</p>
          </div>

          <div class="admin-actions">
            <select onchange="updateTicketStatus('${ticket.ticketId}', this.value)">
              <option value="Open" ${ticket.status === "Open" ? "selected" : ""}>Open</option>
              <option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Closed" ${ticket.status === "Closed" ? "selected" : ""}>Closed</option>
            </select>

            <button class="delete-btn" onclick="deleteTicket('${ticket.ticketId}')">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
    }).join("");

  } catch (error) {
    console.error(error);
    ticketsList.innerHTML = `
      <div class="empty">
        <div class="empty-icon">⚠️</div>
        <h3>Failed to load tickets</h3>
        <p>Please check the API connection.</p>
      </div>
    `;
  }
}

async function updateTicketStatus(ticketId, newStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: newStatus
      })
    });

    if (!response.ok) {
      throw new Error("Failed to update ticket status");
    }

    loadAdminTickets();

  } catch (error) {
    console.error(error);
    alert("Failed to update ticket status. Please try again.");
  }
}

async function deleteTicket(ticketId) {
  if (!confirm("Are you sure you want to delete this ticket?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete ticket");
    }

    loadAdminTickets();

  } catch (error) {
    console.error(error);
    alert("Failed to delete ticket. Please try again.");
  }
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