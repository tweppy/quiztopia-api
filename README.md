# quiztopia-api
Individuell examination: Quiztopia API

# Quiztopia

Welcome to Quiztopia, a web application that allows users to create and manage quizzes. This application is built using Node.js, AWS services, DynamoDB, and serverless architecture. It provides various functionalities such as account creation, user authentication, quiz creation, adding questions to quizzes, adding user scores to quizzes, quiz viewing, viewing highscores for a quiz, and detailed insights for administrators.

## Features

- **Account Management**: Users can create accounts and sign in securely.
- **Quiz Creation**: Create quizzes with custom questions and answers.
- **Question Management**: Easily add questions to your quizzes.
- **Quiz Viewing**: View quizzes and their questions.
- **Admin Dashboard**: Administrators can view all users and detailed information about quizzes, including answers.
- **Leaderboard**: Users can add a score to a quiz and view the highscores for a quiz.

## Built With

- Node.js
- AWS Lambda
- API Gateway
- DynamoDB
- Serverless Framework
- Insomnia (for testing endpoints)

## Dependencies

- **nanoid**: Used for generating unique IDs.
- **middy**: A middleware engine for AWS Lambda functions, simplifying the creation of serverless applications.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT) for user authentication.
- **bcryptjs**: Used for hashing passwords securely.

## Getting Started

To run Quiztopia locally, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Configure your AWS credentials for DynamoDB access by creating an .env file and adding your profile and lambda role.
