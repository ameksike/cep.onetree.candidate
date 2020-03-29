# Candidate Demo Project
It is a demo written on TypeScript and C Sharp over Microsoft Visual Studio 2019 Community Edition. Is very simple project with one used: Angular, ASP.NET Core, SQL Server, etc.

![Screenshot](readme/demo.png)
![GitHub Logo](/readme/logo.png)


## Description 
It is a simple application that allows entering and viewing candidates in a human resources process. The business requirements for this project are:
* The human resources user must be able to create an account (only email and password) and be able to login.
* The main page has to display a list of the candidates entered
* You must be able to enter a new candidate including your name, surname, years of experience, date of application, position you applied for and photo.


## Install steps
- git clone https://github.com/ameksike/cep.onetree.candidate.git



## Develop steps
### Develop .Net Core Command
- 

### Develop Database Command
- Add-Migration "InitialCreate" 
- Update-Database
- Remove-Migration

### Develop Angular Command
- ng generate component about
- ng generate module candidate
- ng generate component candidate/component/list
- ng generate component candidate/component/form
- ng generate component candidate/component/details
- ng generate interface candidate/model/candidate
- ng generate service   candidate/service/uploadimg
- ng generate component candidate/component/avatar



