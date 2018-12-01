# Financial Online Budgeting System (F.O.B.S.)

## Iteration 03

* Start date: Nov 13, 2018
* End date: Nov 27, 2018

## Process

#### Changes from previous iteration

 * Linking each team member's work to their commit history, as a way of demonstrating both their work and making the document more interactive.
   * Success metric: Everyone's work wil be well documented and easily understandable.
 * Making better use of Trello, Slack and our To-DO list to improve our team dynamic by communicating more effectively.
   * Success metric: We're all still friends at the end of the project...On a serious note, if our Trello board is well populated and evely distributed amongst team members

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

#### Events

Describe meetings (and other events) you are planning to have:

 * When and where? In-person or online?
 * What's the **purpose** of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
 
* Nov 17nd, 2pm, in-person:
    * Planning meeting
    * Designed a schema for our relational database
    * Demoed signup and login using a dummy database
    * Set up local SQL database for each group member

#### Artifacts

 * A screenshot of our Trello Board.
   * Trello helps us keep track of what needs to be done and add priorities to each work 
 * Slack: private chat
   * Used for group discussions and task assignment
 * [Relational Database Schema](./artifacts/schema.md)

#### Git / GitHub workflow

Describe your Git / GitHub workflow.
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Don't forget to **explain why** you chose this workflow.

## Product

#### Goals and tasks

* Integrate communication between the users of the system
  * Revenue goal communication between all levels of users
  * Finance request approvals for large sums by financial department
* Implement the database to store user/company data
  * User data should include login information as well as employee type
  * Company data should include revenue goals, expected budget as well as actual spending
* Implement graphs to be dynamically generated based on input from database
* Launch the application on a server

#### Artifacts

* A [Relational Database Schema](./artifacts/schema.md) to to properly show the structure of all our sql tables
  * This is to keep track of any changes to our sql tables and keep team  members up-to-date
  * Make it easier to find where a specific information is stored
* A [Notification System Explanation](./artifacts/notificationSystem.md) to explain the logic flow of our web application
  * This is to properly explain our user experience to a potential user
