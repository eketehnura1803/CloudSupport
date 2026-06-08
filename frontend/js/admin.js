const API_BASE_URL = "API_URL_WILL_BE_ADDED_LATER";

function loadTickets() {
  const ticketsTable = document.getElementById("ticketsTable");

  ticketsTable.innerHTML = `
    <tr>
      <td>Demo User</td>
      <td>demo@example.com</td>
      <td>Login Issue</td>
      <td>Technical</td>
      <td>High</td>
      <td>Open</td>
      <td>
        <button>Update</button>
        <button>Delete</button>
      </td>
    </tr>
  `;
}
