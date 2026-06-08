import os
import boto3

TABLE_NAME = os.environ.get("TABLE_NAME", "CloudSupportTickets")

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def create_ticket(ticket):
    table.put_item(Item=ticket)
    return ticket


def get_tickets():
    response = table.scan()
    return response.get("Items", [])


def update_ticket(ticket_id, status):
    response = table.update_item(
        Key={"ticketId": ticket_id},
        UpdateExpression="SET #status = :status",
        ExpressionAttributeNames={"#status": "status"},
        ExpressionAttributeValues={":status": status},
        ReturnValues="ALL_NEW"
    )
    return response.get("Attributes")


def delete_ticket(ticket_id):
    table.delete_item(Key={"ticketId": ticket_id})
    return {"message": "Ticket deleted successfully"}