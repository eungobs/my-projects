Phonebook Application
Project Overview
The Phonebook Application is designed to manage personal contacts, allowing users to add, edit, and delete contacts. The app includes three main pages: Login, Registration, and Home, where users can perform various tasks to manage their phonebook. The application supports CRUD operations, search functionality, and user authentication to ensure secure access to contact data.

Features
Pages
Login Page:
Users can log in using their registered credentials (email and password).

Registration Page:
New users can register by providing their username and password.

Home Page:
Displays the user's contacts, allowing for adding, editing, searching, and deleting entries.

Phonebook Features
Search Function:
Users can search for contacts by name or keyword.

Add Function:
Users can add new contacts with a name, phone number, and assign a priority level (High, Medium, Low).

Delete Function:
Users can delete existing contacts from the phonebook.

Update Function:
Users can edit the name, phone number, or priority of existing contacts.

Priority Colors:
Contacts are visually categorized by priority:

Red for High priority
Yellow for Medium priority
Green for Low priority
General Features
CRUD Operations:
Users can perform Create, Read, Update, and Delete operations on their contacts.

Local Storage (JSON):
Data is stored using JSON in the browser's local storage, ensuring that users' contacts and details are saved across sessions.

Responsive Design:
The app is fully responsive, offering a seamless experience across various devices, including mobile, tablet, and desktop.

Input Validation:
Proper validation is implemented to prevent errors in the registration, login, and phonebook management forms.

User Authentication:
Only registered users can log in and access their phonebook, ensuring security for personal contact data.

Material UI Integration:
The app integrates Material UI components to provide a polished, modern interface.

How to Use
Landing Page:
Upon opening the app, you will see three buttons:

Register
Login
Logout
Registration:

Click the Register button to create a new account.
Enter a username and password to register.
Login:

After registering, log in with the same credentials you used during registration.
Home Page (Phonebook Page):

Once logged in, you will be directed to the Home Page (Phonebook Page).
Here, you can:
Add contacts with a name, phone number, and priority.
Edit contacts to update their details.
Delete contacts when no longer needed.
Search contacts to quickly find a specific entry by name or keyword.
Technologies Used
React.js:
Used for building the user interface and managing state.

JSON (Local Storage):
All user data and phonebook entries are stored in the browser's local storage as JSON, providing persistent storage across sessions.

Material UI:
Provides a modern and visually appealing design. Visit Material UI for more information.

JavaScript & CSS:
JavaScript handles the application logic, while CSS ensures styling and responsive design.

Installation and Setup
Clone the repository:


git clone https://github.com/eungobs/phonebook-app.git
Navigate to the project directory:


cd phonebook-app
Install dependencies:

bash
Copy code
npm install
Start the application:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000.

Author
Elizabeth Eunice Ndzukule
This app was developed to efficiently manage personal contacts, featuring CRUD operations, local storage, and user authentication with Material UI for a professional, responsive design.

Additional Information
The Phonebook Application ensures that users can securely manage their contacts with ease. Data is stored locally in JSON format, making it accessible anytime without needing a backend server.

Stay organized and manage your contacts efficiently with the Phonebook Application!
