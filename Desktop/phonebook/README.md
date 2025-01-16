Phonebook Application (TODO-LIST)


Project Overview
The Phonebook Application is a personal contact management system designed to help users manage their contacts efficiently. It allows users to add, edit, delete, and search through their contacts. The app features user authentication to secure access to personal data, and all contact information is stored locally using JSON in the browser's local storage.

This project is located in the following repository: GitHub Repo under the Desktop folder.

Features
Pages
Login Page:

Users can log in using their registered email and password.

Registration Page:

New users can create an account by providing a username and password.

Home Page:

Displays the user's contacts, where they can add, edit, delete, and search for contacts.

Phonebook Features
Search Function:

Users can search for contacts by entering a keyword.

Add Contact:

Add new contacts with a name, phone number, and priority level (High, Medium, Low).

Delete Contact:

Delete existing contacts from the phonebook.

Edit Contact:

Update contact information including name, phone number, and priority.

Priority Colors:

Contacts are visually categorized by their priority:

Red for High priority

Yellow for Medium priority

Green for Low priority

General Features
CRUD Operations:

Users can create, read, update, and delete contact information.

Local Storage (JSON):

Contact data is stored using JSON in the browser's local storage, ensuring persistence across sessions.

Responsive Design:

The application is fully responsive and works seamlessly across different devices.

User Authentication:

Only registered users can access their personal contacts, providing a secure environment for data management.

Material UI Integration:

The app uses Material UI for a modern and responsive user interface.

How to Use
Landing Page
On the landing page, you will see three options: Register, Login, and Logout.

Register
Click on the Register button to create a new account.

Enter a username and password to sign up.

Login
Once registered, log in with your credentials.

Home Page
After logging in, you will be taken to the Home Page where you can:

Add Contacts by providing a name, phone number, and selecting the priority level.

Edit Contacts by updating contact details.

Delete Contacts if they are no longer needed.

Search Contacts using the search bar to quickly find specific entries.

Technologies Used
React.js:

A JavaScript library for building dynamic user interfaces.

JSON (Local Storage):

Used to store user and contact information locally on the browser.

Material UI:

Integrated to give the app a modern look and responsive feel. Learn more about Material UI.

JavaScript & CSS:

JavaScript handles the application logic, while CSS ensures the app is styled and responsive.

Installation and Setup
Clone the repository:

git clone https://github.com/eungobs/my-projects.git
Navigate to the project folder under Desktop:

cd my-projects/Desktop
Install dependencies:

npm install
Start the JSON Server:

Open a new terminal window and navigate to the project directory:

cd my-projects/Desktop
Start the JSON server:

npx json-server --watch db.json --port 3001
The JSON server will run on http://localhost:3001.

Start the Application:

In the original terminal window, start the React application:


npm start
Open your browser and go to:


http://localhost:3000
Author
Elizabeth Eunice Ndzukule
This Phonebook Application was developed to provide a simple, secure, and effective way to manage personal contacts.

For more details, check out the project in the GitHub repository.

Key Changes:
Install Dependencies First:

Users must install dependencies (npm install) before starting the JSON server.

Start JSON Server in a Separate Terminal:

The JSON server must be started in a new terminal window after navigating to the project directory.

Start the Application:

The React application is started in the original terminal window after the JSON server is running.
