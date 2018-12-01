# Financial Online Budgeting System (F.O.B.S.)

## Iteration 03

* Start date: Nov 13, 2018
* End date: Nov 27, 2018

## Process

#### Changes from previous iteration
 
 * Linking each team member's work to their commit history, as a way of demonstrating both their work and making the document more interactive.
   * Success metric: Everyone's work wil be well documented and easily understandable.
 * Making better use of Trello, Slack and our To-DO list to improve our team dynamic by communicating more effectively.
   * Success metric: We're all still friends at the end of the project...On a serious note, if our Trello board is well populated and evenly distributed amongst team members
 * Document important ideas from meetings into a file, and push it to GitHub for everyone to see
   * Success metric The artifacts folder contains new files containing information and ideas


#### Roles & responsibilities

* Ziyao Chen: Scrum Lord, back-end developer 
    * implemented log out functionality
    * implemented back-end for ceo page buttons
    * implemented back-end for employee page buttons
* Amney El Azarif: Product Manager, back-end developer, cloud solution architect
    * migrated web application to the cloud
    * polished homepage and user-page layout (css/html)
    * enriched web application flow
* Jason Zheng: front-end developer & back-end developer
    * implemented front-end for employee page buttons
    * implemented back-end for ceo page buttons
* Ian Wang: front-end developer & back-end developer
    * implemented user sessions
    * implemented back-end for graph rendering
    * created the team logo
* Boning Wang: back-end developer
    * implemented back-end for employee page buttons
    * implemented back-end for ceo page buttons
* David Kwon: front-end developer & back-end developer
    * linked back-end graph rendering to front-end display
    * implemented front-end for user-pages buttons (ceo/financial/employee)
    * implemented front-end homepage
* Calvin Lu: front-end developer & back-end developer
    * implemented front-end for financial page buttons
    * implemented back-end for financial page buttons
    
#### Events
 
* Nov 17nd, 2pm, Bahen, in-person:
    * Purpose: Planning meeting
    * Discussed iteration goals and review meeting date
    * Designed a schema for our relational database
    * Wrote down the schema in a markdown files
    * Demoed signup and login using a dummy database
    * Set up local SQL database for each group member
    * Created instructions to create the database tables

* Nov 20th, 12pm, Sandford Fleming Tutorial Room, in-person:
    * Purpose: Discussion and work meeting
    * Update each other on our progress, concerns, goals
    * Similar to standup meetings
    
* Nov 25, 2pm, Bahen, in-person:
    * Purpose: Work meeting
    * Communicate with group members to confirm what features are necessary
    * Share implementation ideas
    * Discuss and edit the database design
    
* Nov 27th, 12pm, Sandford Fleming Tutorial Room, in-person:
    * Purpose: Discussion and work meeting
    * Update each other on our progress, concerns, goals
    * Similar to standup meetings

* Nov 29 12pm, Bahen, in-person:
    * Purpose: Work meeting
    * Finishing touches on the application
    * Brainstorm ideas and create the video demo
    
#### Artifacts
 * A screenshot of our Trello Board.
   * Helps us keep track of what needs to be done and add priorities to each work
   * We can assign tasks to individual group members. Group members are notified over email when tasks are being assigned, or if new tasks are added.
 * Facebook Messenger / Slack
   * Group discussions about bugs, implementations, goals
   * Planning new meetings if required
   * Task assignments
   * Post screenshots of new features to get group feedback
   * Product Manager post notification messages before meetings
   

#### Git / GitHub workflow

All work that is curently being implemented is done in our "dev" branch which is our development branch. Our "master" branch is left untouched and we only open pull-requests from "dev" to "master" to merge when we have a working stable release of our web application.
Typically, when two team members are working on the same file, they warn each other and create a new branch to work on their changes and then create a pull-request from their branch to the "dev" branch, else if their files are not conflicting then they work directly on "dev".
Pull-requests are revieweved by a maximum of 3 team members (in-addition to the reviewee) and are assigned by GitHub's recommendation. The reason as to why we set a maximum of 3 members is to avoid having to wait for too many people to be available.
In addition, team members always have meaningful commit messages for other members to understand what they did and also keep thet team up-dated on what they worked (by using Slack or Facebook Messenger).

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
