# SETUP

Just make sure python3 and pip are installed, and install these libraries.
> pip install Flask  
> pip install flask_login  
> pip install db  
> pip install passlib  
> pip install flask_mysqldb  
> pip install wtforms  
> pip install passlib.hash  

Make sure you have the MySQL installed correctly, otherwise you wouldn't be able
to install the flask_mysqldb package  

## SETTING UP MYSQL ON WINDOWS

Before installing the python packages from pip, follow the steps to setup MySQL.

The download for windows can be found [here](https://dev.mysql.com/downloads/installer/), make sure you download the community version and NOT the web community version.  
**NOTE**: When installing MySQL, you can create a user with username 'FOBS' and password 'fobs' connecting to *localhost* during the installation step to avoid this step later.

Then download the SQL-python connector from [here](https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysql-python).  
From the directory you are working from, run the following command:  
`pip install mysqlclient-1.3.13-cp36-cp36m-win_amd64.whl`

Once MySQL is installed, add mysql to your path. This is done by adding the bin folder from your installation to your PATH environment variable.

## SETTING UP MYSQL ON MAC
I strongly recommend using homebrew to install MySQL on Mac
Run the following command to install mysql on Mac:
> brew install mysql

## SETTING UP DATABASE
On your terminal, log in to your mysql as user root:
> mysql -u root -p 

You suppose to know your root's password.  

Now you are in your root user. Create a new user called FOBS with password fobs with the following command:  
> mysql> CREATE USER 'FOBS'@'localhost' IDENTIFIED BY 'fobs';
**NOTE:** For windows users, also run the following command:  
> mysql> ALTER USER 'FOBS'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fobs';

Give the new created user FOBS all the privileges:  
> mysql> GRANT ALL PRIVILEGES ON * . * TO 'FOBS'@'localhost';

Type \q to exit the mysql program.  

Now log in to MySQL as the user FOBS:  
> mysql -u FOBS -p

Type the user's password (fobs), and then press Enter 
 
Create the database FOBS with the following command:  
> mysql> CREATE DATABASE FOBS;

Work with the database FOBS:  
> mysql> USE FOBS;

Create the tables listed in the [schema](./deliverables/artifacts/schema.md), with these commands:
> mysql> CREATE TABLE Company (company_id INT(10) PRIMARY KEY AUTO_INCREMENT, company_name VARCHAR(100), total_revenue_goal INT);
<br>

> mysql> CREATE TABLE Users (user_id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(100) UNIQUE, password VARCHAR(100), company_id INT, role VARCHAR(100), FOREIGN KEY (company_id) REFERENCES Company(company_id));
<br>

> mysql> CREATE TABLE Departments (dept_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, budget INT, revenue_goal INT, status ENUM('ceo_notified', 'ceo_not_notified', 'accepted', 'declined'), FOREIGN KEY (user_id) REFERENCES Users(user_id));
<br>

> mysql> CREATE TABLE Requests (request_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, amount INT, date DATETIME, reason VARCHAR(100), status ENUM('ceo_notified', 'ceo_not_notified', 'accepted', 'declined'), FOREIGN KEY (user_id) REFERENCES Users(user_id));
<br>

> mysql> CREATE TABLE Expense_history (exp_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, purpose VARCHAR(30), amount INT, date DATETIME, FOREIGN KEY (user_id) REFERENCES Users(user_id));
  
Now everything related to database has been set up properly.


## RUNNING THE APPLICATION
One small change to make is to comment out the first url in [url.js](app/static/js/url.js) and instead comment in the localhost url

The application can be run from the command line:
> python app.py
