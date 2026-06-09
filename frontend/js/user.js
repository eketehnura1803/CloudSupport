const API_BASE_URL = "https://txd3remqkj.execute-api.us-east-1.amazonaws.com";

const ticketForm = document.getElementById("ticketForm");
const descriptionInput = document.getElementById("description");
const charCount = document.getElementById("charCount");
const statusFilter = document.getElementById("statusFilter");

document.addEventListener("DOMContentLoaded", loadTickets);

descriptionInput.addEventListener("input", function () {
  charCount.innerText = descriptionInput.value.length;
});

statusFilter.addEventListener("change", loadTickets);

ticketForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const ticket = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    description: descriptionInput.value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticket)
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    document.getElementById("message").innerText = "Ticket submitted successfully.";
    ticketForm.reset();
    charCount.innerText = "0";

    loadTickets();
  } catch (error) {
    console.error(error);
    alert("Failed to submit ticket. Please try again.");
  }
});

async function loadTickets() {
  const ticketsList = document.getElementById("ticketsList");

  try {
    const response = await fetch(`${API_BASE_URL}/tickets`);
    const tickets = await response.json();

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

async function deleteTicket(ticketId) {
  const confirmDelete = confirm("Are you sure you want to delete this ticket?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete ticket");
    }

    loadTickets();
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