# Personal Task Manager

<img src="assets/App-Preview.png" width="292" height="633" />

This is a personal task manager application built with React Native, Expo, and TypeScript. It allows users to add, edit, delete, and toggle the status of tasks, as well as view task details in a modal.

## Features
- Add new tasks with title and description
- Edit existing tasks
- Toggle task status (Completed or Pending)
- Delete tasks
- Search tasks by title
- View task details in a modal

## Requirements
Before you can run the app, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (optional but recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
    ```bash
    npm install -g expo-cli
    ```


## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/LaiSensei/TaskManagerApp
    cd TaskManagerApp
    ```
2. **Install dependencies**:

You can install the dependencies using Yarn or npm:

### Using Yarn:
    yarn install
    yarn start

### Using npm:
    npm install
    npm start

## Run on an Emulator or Device

After starting the server, you can open the app on an Android or iOS emulator or on your physical device:

### For Android:
    yarn android

### For iOS (If you are in a mac os or iOS environment)
    yarn iOS

Or, use the QR code displayed in the Expo CLI to run the app on your physical device using the Expo Go app.
For android phones, use your Expo Go app to scan the QR code. For iPhones, use your camera app to scan the QR code.