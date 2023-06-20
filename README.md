# React 18 Bootstrap 5

## Intro

This repo is holding an example of a react application.

testing with node version 18.12.0

### Technologies used in this repo...
- React 18
- Bootstrap 5.2 (react-boostrap 2.3)
- Typescript
- Formik forms
- SignalR
- Local Storage IndexedDB
- Cypress 12.9

### Features...
- General Page Elements
    - Optional Breadcrumbs
    - Optional Back Button
    - Title
    - Optional Intro Text
    - Optional Header displaying page instance specific name/ value pairs
    - Routing, with lazy loading
    - GDPR alert
    - Handle Authorization loss
- Form Data Entry
    - loading animation on initialization 
    - form submit processing button animation
    - Control Data Types
        - TextBox
        - TextArea
        - Lookup Dropdown
        - Numeric
        - Date
        - Date Time
        - Password
        - Money
        - File Upload
- Report Display
    - Filtering Control
    - Table Display
        - Page Size Dropdown
        - Paging Control
        - Count Display
        - Column Display Types
            - Text
            - Money
            - Numeric
            - Date
            - Date Time
            - Action Button
            - Navigation Button
        - Multi Select Action Button
        - report query running animation
- Authentication api key set on Login and Register
- Api Proxy functions, with Request and Response Objects
- Analytics Collection
    - Online and Offline UI event collection
    - transmitted to SignalR Analytics Hub when online
- Unit Testing
- Cypress E2E Testing


# Getting Started
Before you can contribute, you'll need to set up a local copy of the repository:

* Fork the repository by clicking on the "Fork" button in the top right corner of the repository page.
* Clone the forked repository to your local machine: git clone https://github.com/YOUR_USERNAME/Farm-React.git
* Navigate to the repository directory: cd Farm-React
* Now you're ready to make changes to the code!

# Making Changes
* Create a new branch for your changes: git checkout -b my-new-branch
* Make your changes to the code.
* Commit your changes: git commit -am "Added some new feature"
* Push your changes to your fork: git push origin my-new-branch

# Creating a Pull Request
* Go to your forked repository on GitHub and click the "New pull request" button.
* Select the branch you just pushed your changes to.
* Give your pull request a meaningful title and description.
* Submit the pull request and wait for a project maintainer to review your changes.


 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You can run the all component testcase.
### `npm test` OR
### `npm run test`

Run specific component testcase.
### `npm test TacLogin.test.tsx` OR
### `npm run test TacLogin.test.tsx`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
