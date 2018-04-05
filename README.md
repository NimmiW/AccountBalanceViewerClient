99xT Assignment - Account Balance Viewer

This codebase was created to demonstrate a fully fledged fullstack application built with **Aurelia** including CRUD operations.



# How it works

Created with aurelia-cli

# Getting started

Make sure you have [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. 

Clone the project

`git clone https://github.com/NimmiW/AccountBalanceViewerClient.git`

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

Account balances are updated every month in the Jondell Corp and the CFO Dr. Sundt likes to have a close look at the overview. Since Dr. Sundt has no experience in software development, he would like to hire you to do his dirty laundry. So your job is to create a simple web enabled
account balance overview tool. There are 5 accounts in Jondell Corp and they are;
- R&D
- Canteen
- CEO’s car expenses
- Marketing
- Parking fines

There are two 2 types of users also.
- ADMIN
- USER

The roles of the two users are as follows.

For ADMIN,
- upload balances (updatebalance page)
- Delete and re-enter balances (updatebalance page)
- re-enter balances using .csv files (a sample file is available at https://github.com/NimmiW/AccountBalanceViewerClient/blob/master/data_sample.csv )
- view the report page (report)
- Register new user

For USER,
- view the current month balances of each account (Home page)


## The general page breakdown looks like this:

- Home page (URL: /#/ )
    - List of the balances of current monthcould be viewed.

- updatebalance page
    - The Balances of any month could be updated.

- report page
    - Report could be generated given the month and the year.



## My Web Client Repo:
https://github.com/NimmiW/aurelia-realworld-example-app

## Web Client are hosted at:
http://abvwebclient.azurewebsites.net

It was made to Continuous integration. Once you commit and push, it automatically deployed to the app-service. An SQL server was used to keep data. 

**ADMIN user credentials**
- email :admin@gmail.com 
- password: Admin@123

**general USER user credentials**
- email :user@gmail.com 
- password: User@123

**Password Policy**
<br/>
Should contain,
- atleast non-alphanumeric character
- atleast one digit
- atleast one UpperCase charactor

Should be minimum size of 6 charactors

**Azure Paas I used:**
- app service (with github CI support)
- resource group
- app service plan

## The Backend API for this could be found at:
https://github.com/NimmiW/AccountBalanceViewer

## The Backend API is hosted at:
https://abvwebapi.azurewebsites.net/

## Complemeted Level
About 85 percent of the workload of the assignment was completed.

**ToDos**
- Unit Testing Testing (both web client and backend)

**References**
- https://github.com/jadhavajay/aurelia-realworld-example-app
- https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model
- https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations#entity-framework-core-nuget-packages-for-migrations]
- https://codepen.io/matt-west/pen/KjEHg
http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api

<br />
