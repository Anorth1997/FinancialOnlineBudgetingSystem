# SQL Database Schema
* Attributes that have an asterisk (*) in front of their name, are keys
* Foreign key constraints are listed in the bottom of this document

**Company table**

| *company_id | company_name | total_revenue_goal |
|:----------:|:------------:|:------------------:|
|     INT    | VARCHAR(100) |         INT        |
<br>

**Users table**

| *user_id |   username   |   password   | company_id |     role     |
|:-------:|:------------:|:------------:|:----------:|:------------:|
|   INT   | VARCHAR(100) | VARCHAR(100) |     INT    | VARCHAR(100) |
<br>

**Departments table**

| *dept_id | user_id | budget | revenue_goal | actual_expenses |
|:-------:|:-------:|:------:|:------------:|:---------------:|
|   INT   |   INT   |   INT  |      INT     |       INT       |
<br>

**Requests table**

| *request_id | user_id | amount | date |     reason    |                  status                  |
|:----------:|:-------:|:------:|:----:|:-------------:|:----------------------------------------:|
|     INT    |   INT   |   INT  |  DATETIME | VARCHAR(1000) | ENUM = {in_progress, accepted, declined} |
<br>

**Expense_history table**

| *exp_id | user_id |   purpose   | amount |
|:------:|:-------:|:-----------:|:------:|
|   INT  |   INT   | VARCHAR(20) |   INT  |
<br>

# Foreign Key Constraints

* Users[copmany_id] ⊆ Company[company_id]
* Department[user_id] ⊆ Users[user_id]
* Request[user_id] ⊆ Users[user_id]
* Expense_history ⊆ Users[user_id]
