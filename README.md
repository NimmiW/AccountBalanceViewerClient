99xT Assignment - Account Balance Viewer

This codebase was created to demonstrate a fully fledged fullstack application built with **Aurelia** including CRUD operations.



# How it works

Created with aurelia-cli

# Getting started

Make sure you have [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. 

Clone the project

`git clone https://github.com/NimmiW/aurelia-realworld-example-app.git`

Then run 
```
yarn install
au run --watch
```
and Navigate to `http://localhost:9000/`. 

The app will automatically reload if you change any of the source files.

Please note if you get any issue in adding node modules, please do the following steps:

Delete node_modules folder

Re-run
 ```
yarn install
au run --watch
```

or
```
npm install
au run --watch
```

### Building the project
Run `au build` to build the project. The build artifacts will be stored in the `scripts/` directory.

## Functionality overview

Account balances are updated every month in the Jondell Corp and the CFO Dr. Sundt likes to
have a close look at the overview. Since Dr. Sundt has no experience in software development,
he would like to hire you to do his dirty laundry. So your job is to create a simple web enabled
account balance overview tool. There are 5 accounts in Jondell Corp and they are
- R&D
- Canteen
- CEO’s car expenses
- Marketing
- Parking fines



**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of th balances of this month

- updatebalance page
    - The Balances of this month could be updated

- reports page
    - report could be generated given the month and the year

**Note**
I have forked from  https://github.com/jadhavajay/aurelia-realworld-example-app repo and developed this for the required specification by the Adra development test assignment.

**My Repo:**
https://github.com/NimmiW/aurelia-realworld-example-app

**Scripts are hosted at:**
http://abvwebclient.azurewebsites.net

**Script repo at**
https://github.com/NimmiW/AccountBalanceViewerClientScripts

**The Backend API for this could be found at:**
https://github.com/NimmiW/ABVWebApi

**The Backend API is hosted at:**
https://abvwebapi.azurewebsites.net/


**Complemeted Level**
About 60 percent of the workload of the assignment was completed.

**ToDos**
- Host Aurelia app in an azure app service
- Excel Sheet update part
- Unit Testing Testing

<br />
