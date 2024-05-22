# README

## Library Loan Management Project with Microservices

This project implements a microservices architecture for a library loan management system. The goal is to identify and define the necessary services for this system in an autonomous and clearly defined manner.

### Project Structure

The project is structured into several services, each being independent and communicating via REST APIs or queues. Here are the main services:

* *Book Service*
* *Loan Service*
* *Client Service*
* *Notification Service*

In addition to the backend services, a frontend application is developed with React to interact with these services.

### Services

#### Book Service
Manages the stock of books in the library. This service has a database to store the following information: code, title, description, author. It exposes a REST API with the following functionalities:

* *GET /api/v1/book/{bookId}*: Retrieve information about a given book (200 OK, 404 Not Found)
* *POST /api/v1/book*: Add a new book (200 OK)
* *PUT /api/v1/book/{bookId}*: Modify a book (200 OK, 404 Not Found)
* *DELETE /api/v1/book/{bookId}*: Delete a book (200 OK, 404 Not Found)

#### Client Service
Manages the clients of the library with a database containing: name, surname, email. It exposes a REST API with the following functionalities:

* *GET /api/v1/client/{clientId}*: Retrieve information about a given client (200 OK, 404 Not Found)
* *POST /api/v1/client*: Add a new client (200 OK)
* *PUT /api/v1/client/{clientId}*: Modify a client (200 OK, 404 Not Found)
* *DELETE /api/v1/client/{clientId}*: Delete a client (200 OK, 404 Not Found)

#### Loan Service
Manages book loans. This service requires client and book information to add a loan. It has a database to record: book, client, loan date, return date. It exposes a REST API with the following functionalities:

* *POST /api/v1/loan*: Add a new loan (200 OK)
* *POST /api/v1/loan/return*: Return a book (200 OK)
* *GET /api/v1/loan/{clientId}*: Retrieve loans of a given client (200 OK, 404 Not Found)

#### Notification Service
Sends notifications to library clients asynchronously. Uses queues for communication and the nodemailer package to send emails. It allows sending notifications for events such as book return or addition of new books.

### Frontend

The frontend application is developed with React and allows interaction with the different services via their REST APIs. It provides a user interface for managing books, loans, clients, and sending notifications.

### Containerization

The project uses Docker Compose to containerize all modules of the application. Each service is deployed in a separate container to ensure their isolation and independence.

### Installation and Execution

1. *Prerequisites*:
   - Docker
   - Docker Compose
   - Node.js and npm (for frontend development)

2. *Clone the repository*:
   bash
   git clone <REPOSITORY_URL>
   cd <REPOSITORY_NAME>
   

3. *Build and start the containers*:
   bash
   docker-compose up --build
   

4. *Access the application*:
   - Frontend: http://localhost:3000
   - Service APIs (according to docker-compose configuration)

### Contributions

Contributions are welcome. Please follow the contribution guide to submit your changes.

### License

This project is licensed under the MIT License. Please see the LICENSE file for more details.

---

For any questions or issues, please contact [aminalbakali2023@gmail.com,bouzbitazakaria5@gmail.com].

---

This README provides an overview of the project, services, installation and execution instructions, and information about contributions and the license. For more specific details, please refer to the source code documentation and comments within the code.
