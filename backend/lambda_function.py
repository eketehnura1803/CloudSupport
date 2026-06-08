import json
from tickets_service import (
    create_new_ticket,
    list_all_tickets,
    change_ticket_status,
    remove_ticket
)


def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(body)
    }


def lambda_handler(event, context):
    http_method = event.get("httpMethod")
    path = event.get("path", "")

    if http_method == "OPTIONS":
        return response(200, {"message": "CORS OK"})

    try:
        if http_method == "POST" and path == "/tickets":
            body = json.loads(event.get("body", "{}"))
            ticket = create_new_ticket(body)
            return response(201, ticket)

        if http_method == "GET" and path == "/tickets":
            tickets = list_all_tickets()
            return response(200, tickets)

        if http_method == "PATCH" and path.startswith("/tickets/"):
            ticket_id = path.split("/")[-1]
            body = json.loads(event.get("body", "{}"))
            updated_ticket = change_ticket_status(ticket_id, body)
            return response(200, updated_ticket)

        if http_method == "DELETE" and path.startswith("/tickets/"):
            ticket_id = path.split("/")[-1]
            result = remove_ticket(ticket_id)
            return response(200, result)

        return response(404, {"message": "Route not found"})

    except Exception as error:
        return response(500, {"message": str(error)})