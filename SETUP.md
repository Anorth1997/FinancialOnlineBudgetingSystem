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

Then, run the following commands in mysql:
> GRANT ALL PRIVILEGES ON * . * TO 'FOBS'@'localhost';
> ALTER USER 'FOBS'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fobs';
> CREATE TABLE users (id INT(10) PRIMARY KEY auto_increment, username varchar(30), password varchar(100), company varchar(100), role varchar(100));

## RUNNING THE APPLICATION

The application can be run from the command line:
> python app.py
