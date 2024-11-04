# Voting Site - ReactJS & PHP

A full-stack voting application developed with **ReactJS** for the frontend and **PHP** for the backend, using **MySQL** as the database. This project allows users to register, log in, vote on polls, and view voting results in real-time. Designed for simplicity, scalability, and secure voting.

## 🚀 Features
- **User Authentication**: Secure registration and login functionality.
- **Real-Time Voting**: Cast and view votes in real-time.
- **Result Display**: Dynamic count and visualization of votes.
- **Vote Expiry & Single Vote Limit**: Set expiration for polls and limit voting to one vote per user/IP.

## 🛠️ Tech Stack
- **Frontend**: ReactJS
- **Backend**: PHP
- **Database**: MySQL

## 📂 Database Schema

### 1. `options.db`
Stores voting options for each poll.
| Field     | Type    | Description                           |
|-----------|---------|---------------------------------------|
| `ID`      | INT     | Unique identifier for each option     |
| `Option1` | VARCHAR | First option                          |
| `Option2` | VARCHAR | Second option                         |
| `Option3` | VARCHAR | Third option                          |
| `Option4` | VARCHAR | Fourth option                         |
| `Option5` | VARCHAR | Fifth option                          |

### 2. `optionsCount.db`
Tracks vote counts for each option within a poll.
| Field          | Type | Description                                 |
|----------------|------|---------------------------------------------|
| `ID`           | INT  | Unique identifier for each poll             |
| `option1Count` | INT  | Vote count for Option 1                     |
| `option2Count` | INT  | Vote count for Option 2                     |
| `option3Count` | INT  | Vote count for Option 3                     |
| `option4Count` | INT  | Vote count for Option 4                     |
| `option5Count` | INT  | Vote count for Option 5                     |
| `poll_id`      | INT  | Foreign key linking to `votes.db`           |

### 3. `settings.db`
Holds configuration for poll restrictions.
| Field          | Type    | Description                              |
|----------------|---------|------------------------------------------|
| `ID`           | INT     | Unique identifier for each setting       |
| `vote_expiry`  | DATE    | Expiration date and time of the poll     |
| `vote_once`    | BOOLEAN | Restrict each user to a single vote      |

### 4. `users.db`
Manages user information for authentication.
| Field         | Type      | Description                               |
|---------------|-----------|-------------------------------------------|
| `id`          | INT       | Unique identifier for each user           |
| `username`    | VARCHAR   | Username for login                        |
| `email`       | VARCHAR   | User email                                |
| `name`        | VARCHAR   | Full name                                 |
| `pw_salt`     | VARCHAR   | Salt for password hashing                 |
| `pw_hash`     | VARCHAR   | Hashed password                           |
| `created_at`  | TIMESTAMP | Timestamp of user account creation        |

### 5. `votes.db`
Stores individual votes and related information.
| Field            | Type      | Description                             |
|------------------|-----------|-----------------------------------------|
| `ID`             | INT       | Unique identifier for each vote         |
| `UserID`         | INT       | Foreign key linking to `users.db`       |
| `Vote_Name`      | VARCHAR   | Name of the poll                        |
| `Vote_Description` | TEXT    | Description of the poll                 |
| `Vote_Count`     | INT       | Total count of votes                    |
| `Vote_URL`       | VARCHAR   | URL for accessing the poll              |
| `OptionsID`      | INT       | Foreign key linking to `options.db`     |
| `SettingsID`     | INT       | Foreign key linking to `settings.db`    |

### 6. `votes_ip.db`
Records IP addresses for restricting multiple votes from the same IP.
| Field         | Type      | Description                               |
|---------------|-----------|-------------------------------------------|
| `id`          | INT       | Unique record identifier                  |
| `poll_id`     | INT       | Poll ID associated with the vote          |
| `ip_address`  | VARCHAR   | IP address of the user                    |
| `voted_at`    | TIMESTAMP | Timestamp of when the vote was cast       |

## ⚙️ Getting Started

### Prerequisites
- **PHP** and **MySQL** installed on the server
- **Node.js** and **npm** for running the React frontend

### Installation

1. **Clone the Repository**
   ```bash
<<<<<<< HEAD
   git clone https://github.com/mohdnazzal/votingsite-reactjs-php.git
   cd voting-site-reactjs-php

# Voting Site

### Backend Setup
1. **Create MySQL Databases**: Use the schema provided above to create the necessary databases.
2. **Configure Database Connection**: Update your PHP backend files with the correct database connection settings.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
   This will launch the application on [http://localhost:3000](http://localhost:3000).

### Environment Configuration
- Create `.env` files for both the frontend and backend to store sensitive data such as database credentials and API endpoints.

## 📋 Usage
- **Register & Login**: Users create accounts to access polls.
- **Vote**: Select a poll, choose an option, and submit your vote.
- **View Results**: See real-time vote counts for each option.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements.

=======
   git clone https://github.com/mohdnazzal/votingsite-reactjs-php.git
   cd voting-site-reactjs-php
>>>>>>> 22b82f0 (Initial commit)
