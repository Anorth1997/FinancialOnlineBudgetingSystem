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

## RUNNING THE APPLICATION

According to Mac System, you need to do the followings to set up your database:
Installed your MySQL properly. 
On your terminal, type mysql -u root -p to get into your root user for MySQL. 
You suppose to know your root's password.
Now you are in your root user. Create a new user called FOBS with password fobs with the following command:
mysql> CREATE USER 'FOBS'@'localhost' IDENTIFIED BY 'fobs';
Give the new created user FOBS all the privileges:
mysql> GRANT ALL PRIVILEGES ON * . * TO 'FOBS'@'localhost';
Type \q to exit the mysql program.
Now log in to MySQL as the user FOBS:
mysql -u FOBS -p
Type the user's password (fobs), and then press Enter
Create the database FOBS with the following command:
mysql> CREATE DATABASE FOBS;
Work with the database FOBS:
mysql> USE FOBS;
Create the table users with the following command: 
mysql> CREATE TABLE users(id INT(10) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(30), password VARCHAR(100), company VARCHAR(100), role VARCHAR(100));
Now everything related to database has been set up properly.

The application can be run from the command line:
> python app.py