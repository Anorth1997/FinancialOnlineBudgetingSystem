CEO - Financial - Departnent Notification System


1. CEO sets the total revenue goal, therefore setting the total_revenue_goal field in the Company table from NULL to an integer value.
2. The financial departments can be notified of the CEO's revenue goal by checking the database to see if the company that the financial department belongs to, has a total_revenue_goal of NULL. If it is NULL, there is no notification, as the CEO has not set the total_revenue_goal yet. If it is not NULL, there is a notification prompting the financial department to distribute the revenue to the departments.
  * BACKEND: We need a route in app.py that returns the total_revenue_goal of the company.
3. In order for the financial department to distributes the total_revenue_goal. The financial department will fill out a form to distribute the revenue. The submitted form will contain the distributed revenue for each individual department.
  * BACKEND: We need a route in app.py that provides all the departments for the company.
  * BACKEND: We need to read the information from the form and update the Departments table's revenue_goal attribute from the information in the form.
4. Once the revenue has been distributed, the revenue_goal field in the departments table is now NOT NULL. This creates a notification for the Department. The Department will then propose a budget by inputing the budget in a form.
  * BACKEND: After reading the information in the form, set the budget attribute in the Departments table to the value from the form and set the status attribute to 'ceo_not_notified'.
5. The financial department can be notified of the budget requests by looking at the Departments table and getting the departments with the status: 'ceo_not_notified'. The financial head can click a button "Send to CEO" to send the budget request to the CEO.
  * BACKEND: We need a way to update the status attribute to 'ceo_notified', once the financial department clicks the button to send to CEO.
6. The CEO can get notified of the budget requests by looking at the Departments table and looking for the departments with status: 'ceo_notified'. This creates a notification for the CEO. The ceo can look at the budget requests and accept or decline each one. If the ceo accepts, update the status to accepted. If the ceo declines, update the status to declined.
  * BACKEND: We need a way to get all departments in the company with the 'ceo_notified'
  * BACKEND: We need a way to update the status to accepted or declined depending on the decision.
7. The financial department and individual departments gets notified by looking at all the departments in the Deparment table with the status 'accepted' or 'denied'.
  * BACKEND: We need a way to look for all departments in the Department table that have a status of accepted or denied.
