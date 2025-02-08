# Next.js CRUD Application with MongoDB

This project is a CRUD (Create, Read, Update, Delete) task management application built using TypeScript and the Next.js framework. It connects to a custom MongoDB database and provides APIs for managing tasks. The UI allows users to interact seamlessly with the backend.

## Features
- **Task Creation:** Create new tasks with the following details:
  - Task name
  - Task description
  - Task status (Completed/Incomplete)
  - Due date
- **Read Tasks:** Display all tasks in a list with status and update options.
- **Update Tasks:** Change the task status (with UI changes, such as strikethrough text for completed tasks).
- **Delete Tasks:** Remove specified tasks from the list.

## Technologies Used
- **Frontend:** Next.js (TypeScript)
- **Backend:** API routes in Next.js
- **Database:** MongoDB

## Getting Started

### Prerequisites
Ensure that you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env.local` file in the project root and add the following environment variables:
```env
MONGODB_URI=your-mongodb-connection-string
```
**Note:** Ensure that your `.env.local` file is not pushed to version control by including it in your `.gitignore` file to protect sensitive information.

### Run the Development Server
Start the development server with:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## API Endpoints

- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks`: Retrieve all tasks.
- **PUT** `/api/tasks/:id`: Update a task's status.
- **DELETE** `/api/tasks/:id`: Delete a task.

## Usage Instructions
1. **Create Task:** Fill in task details and click "Create" to add a new task.
2. **View Tasks:** View all tasks in a list format.
3. **Update Task:** Click the status toggle to mark tasks as completed or incomplete.
4. **Delete Task:** Click the delete button to remove a task.

## Deployment
To deploy the application on a platform like Vercel:
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy!

## Learn More
To learn more about the tools and technologies used in this project:
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

## License
This project is licensed under the MIT License.
