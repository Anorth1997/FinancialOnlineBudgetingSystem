Financial Online Budgeting System (F.O.B.S.)

Note: The demo video link is located in [demo2.md](../demo2.md)

## Iteration 03 - Review & Retrospect

 * When: Nov 30th 2018
 * Where: BA2175, in-person

## Process - Reflection

#### Decisions that turned out well

 * Using a Trello board to set up the tasks that are in-progress or to be done has been very helpful in our project management. It also displayed the completed tasks so that we could extend from them. This decision was helpful in a way that we could finish all the important steps first before implementing any additional features, and allowed for a more organized workflow.
 * We organized an interactive collaboration on slack/messenger that allowed us to finish each other's incomplete work so that we all get a better understanding of the project as well as less time spent doing late night work alone, which is less productive and more harmful to our bodies.
 
#### Decisions that did not turn out as well as we hoped

Our decisions turned out well this iteration, mostly because we spent a meeting discussing how to further better our process workflow as well as use the TA's remarks from our previous deliverable to make changes.

#### Planned changes

We've noticed that our current process workflow has greatly boosted our efficiency compared to our previous iteration so we do not have much to change. Maybe an additional iteration might inform us of specific changes but for now our current process worked out well. 

## Product - Review

#### Goals and/or tasks that were met/completed:

 * Integrate communication between the users of the system
   - [Flask application](app/app.py)
 * Implement the database to store user/company data
   - [Database schema](/deliverable/artifact/schema.md)
 * Implement graphs to be dynamically generated based on input from database
   - [Graph code](/app/static/js/graph.js)
 * Launch the application on a server
   - Link: http://fobs-env.jtau2gwpib.ca-central-1.elasticbeanstalk.com/

#### Goals and/or tasks that were planned but not met/completed:
 
 All our goals set for this iteration were completed.

## Meeting Highlights

Going into the next iteration, our main insights are:
 * We would use a MVC design pattern to better manage the project. After all, the data flow never changes, so we can facilitate and simplify the communication between them.
 * We would look further into specific wesbite design tools such as automatic cache clearing, etc to enrich user experience.
 * We would ideally have shorter sprints where we set immediate goals along with a very short deadline. This way, we will all be more focused on what there is to do next, and the contribution will happen more evenly throughout the iteration instead of most of the work being done during the last few days.
