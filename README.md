# Ishanya Foundation Management System

## Overview
The Ishanya Foundation Management System is a web-based platform designed to streamline the management of students, educators, and sessions for the NGO. It provides an admin portal for managing data and a homepage where visitors can view basic details of students and educators.

## Features
- **Admin Login & Portal:** Secure login system for administrators to manage data.
- **Student & Educator Management:**
  - View basic details on the homepage.
  - Add, edit, and view student and educator information.
- **Session Management:**
  - Admin can schedule, modify, and manage sessions.
- **Database:** All data is stored securely using MongoDB Atlas.

## Tech Stack
### Frontend
- **React.js**: Used for building the user interface.
- **Tailwind CSS / Material UI** *(optional)*: For styling and better UI components.

### Backend
- **FastAPI**: Handles API requests, authentication, and data processing.
- **MongoDB Atlas**: NoSQL database for storing NGO data.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **Python** (3.8 or later)
- **MongoDB Atlas** account and connection string

### Backend Setup (FastAPI)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ishanya-ngoms.git
   cd ishanya-ngoms/backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   Create a `.env` file in the `backend` directory and add:
   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   SECRET_KEY=<your-secret-key>
   ```
5. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`

### Frontend Setup (React.js)
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in `frontend` with:
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```
4. Run the React development server:
   ```sh
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/admin/login`            | Admin login |
| GET    | `/students`               | Get all students |
| POST   | `/students`               | Add a new student |
| GET    | `/educators`              | Get all educators |
| POST   | `/educators`              | Add a new educator |
| GET    | `/sessions`               | Get all sessions |
| POST   | `/sessions`               | Add a new session |

## Future Enhancements
- Implement role-based access for different users.
- Improve UI/UX for better user experience.
- Add analytics dashboard for NGO performance insights.

## Team Members
- **Sahebdeep Singh Kukreja**
- **Swati Chavan**
- **Anders Arnold**
- **Dev Meerchandani**
- **Dheeraj Siripurapu**
- **Mohneesh Kumar Swami**
- **Digvijay Anand**

## Mentors
- **Harman Gupta**
- **Chetan Jain**

- **[Your Name]** - Backend Development
- **[Your Name]** - Frontend Development
- **[Your Name]** - UI/UX Design

## License
This project is licensed under the MIT License.


For queries, reach out at [your-email@example.com].

