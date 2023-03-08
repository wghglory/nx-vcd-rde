---
to: apps/api/src/requests/<%=entityType%>.http
---


GET http://localhost:3333/api/<%=entityType%>s
Authorization: Basic admin:password

###

GET http://localhost:3333/api/<%=entityType%>s/1
Authorization: Bearer admin

