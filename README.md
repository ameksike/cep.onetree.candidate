# Candidate Demo Project
It is a demo written on TypeScript and C Sharp over Microsoft .NET platform. Is very simple project with one used: Angular, ASP.NET Core, SQL Server, etc.

## Description 
It is a simple application that allows entering and viewing candidates in a human resources process. The business requirements for this project are:
* The human resources user must be able to create an account (only email and password) and be able to login.
* The main page has to display a list of the candidates entered
* You must be able to enter a new candidate including your name, surname, years of experience, date of application, position you applied for and photo.


## Develop steps

### Database Command
- Add-Migration "InitialCreate" 
- Update-Database
- Remove-Migration

### Angular Command
- ng generate module candidate
- ng generate component component/candidate/list
- ng generate component component/candidate/form
- ng generate interface component/model/candidate
- ng generate service   component/service/candidate

