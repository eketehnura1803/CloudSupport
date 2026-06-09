import uuid
from datetime import datetime
from dynamodb_service import create_ticket, get_tickets, update_ticket, delete_ticket


def create_new_ticket(data):
    ticket = {
        "ticketId": str(uuid.uuid4()),
        "fullName": data.get("fullName"),
        "email": data.get("email"),
        "subject": data.get("subject"),
        "category": data.get("category"),
        "priority": data.get("priority"),
        "description": data.get("description"),
        "status": "Open",
        "createdAt": datetime.utcnow().isoformat()
    }

    return create_ticket(ticket)


def list_all_tickets():
    return get_tickets()


def change_ticket_status(ticket_id, data):
    return update_ticket(ticket_id, data.get("status"))


def remove_ticket(ticket_id):
    return delete_ticket(ticket_id)