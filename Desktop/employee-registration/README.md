![Untitled (9)](https://github.com/user-attachments/assets/263d67f2-edf4-4bce-9ded-83693d178d25)

# Employee Registration App

## What is This App About?
The **Employee Registration App** is a tool created for the **Teekga ELECTRICAL Company** to help manage information about employees in a very effective way. Think of it as a digital filing cabinet where you can keep track of your employees' information securely.

Demo
You can see a live demo of the application at: https://frst-employeereg.vercel.app

### How Does It Work?
The app allows an admin (the person in charge) to log in securely and perform different tasks related to employee records. These tasks are often called CRUD operations, which stands for:

- **Create**: Add new employees.
- **Read**: View employee information.
- **Update**: Change or correct employee details.
- **Delete**: Remove employee records when necessary.

The app also helps the admin see the different statuses of employees, like who is actively working, who is no longer with the company, and those who have moved to different branches of the company.

## Key Features
- **Admin Access Only**: Only authorized administrators can log in to the app. They can perform all actions, such as adding new employees, updating existing records, or removing employees. 
  - **Login Details**: 
    - **Username**: eungobs@gmail.com
    - **Password**: 000000
    - To delete an employee, use the name "Elizabeth Ndzukule" to log in to the Delete page.

- **Employee Status**: The app allows administrators to see the current status of employees, like who is active, who has left, and who has transferred to another branch.

- **Responsive Design**: The app works well on all devices, meaning you can use it on a computer, tablet, or smartphone without issues.

- **Built-in Security**: The app is designed with security in mind to ensure that sensitive employee information is protected.

## Technologies Used
- **React.js**: This is a tool that helps us create user-friendly interfaces.
- **JavaScript**: This is the main language that handles how the app works and responds to user actions.
- **CSS**: This is used to make the app look good and work well on different devices.
- **JSON**: This format is used to store and manage the employee data.

## How to Install and Set Up the App
To set up the app on your own computer, follow these steps:

1. Open your command prompt or terminal.
2. Install the project using the following command:

   npx create-react-app employee-registration

3. Go into the project folder:

   cd employee-registration

4. Start the app:
 
   npm start
5. Open your browser and go to **http://localhost:3000**.

## How to Clone the Repository

To run the Employee Registration App locally on your machine, you'll need to clone the repository. Here’s how to do that:

### Step-by-Step Instructions

1. **Install Git**: Make sure you have Git installed on your computer. If you don't have it, you can download it from [git-scm.com](https://git-scm.com/) and follow the installation instructions for your operating system.

2. **Open Command Prompt (Windows) or Terminal (macOS/Linux)**: Once Git is installed, open your command prompt or terminal.

3. **Navigate to the Desired Directory**: Use the `cd` command to navigate to the folder where you want to clone the project. For example:
   cd path/to/your/directory

4. **Clone the Repository**: Use the following command to clone the repository:

   git clone https://github.com/eungobs/frst-employeereg.git

5. **Navigate into the Project Folder**: After cloning, navigate into the project directory:

   cd frst-employeereg

6. **Install Dependencies**: Run the following command to install all necessary dependencies needed to run the app:
   npm install

7. **Start the Application**: Once the dependencies are installed, you can start the application using:
 
   npm start


8. **Open in Browser**: The app will open in your default web browser. If it doesn’t, you can manually open your browser and go to **http://localhost:3000**.

## How to Use the App

### Landing Page
When you first open the app, you will see a landing page. Click the **Admin** button to register as a new admin. After registering, log in to access the employee management system.

### Active Employees Page
Once logged in, you will see the **Active Employees** page. Here you can view all current employees. This page includes action buttons and individual employee cards for managing their records.

#### Layout and Features
- **Top-Left Action Buttons**:
  - **Add**: Click here to add a new employee.
  - **Edit**: This lets you change details about an existing employee. (You'll find this button on each employee's card.)
  - **Delete**: Click this to remove an employee's record.
  - **Personnel**: This button helps you view employees who have resigned, transferred, or changed roles.
  - **Logout**: Use this to securely log out of the system.

- **Employee Cards**: 
  Each card shows information about one employee. 
  - **Edit Button**: Click this to change information for that specific employee.
  - To delete an employee, click the **Delete** button and confirm your decision.

### About the Author
This project was created by **Elizabeth Eunice Ndzukule** in just 5 days, showcasing how quickly we can develop and deploy such apps. The app was built using **Visual Studio Code**, and the initial designs were created with **Figma**. You can find screenshots of the app in the public folder.

## Additional Information
This employee registration system places a strong focus on security and is designed to work well on any device. It allows admins at **Teekga ELECTRICAL Company** to manage employee information efficiently and safely.
