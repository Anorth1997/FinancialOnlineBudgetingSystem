Financial Online Budgeting System (F.O.B.S.)

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration 03 - Review & Retrospect

 * When: Nov 30th 2018
 * Where: BA2175, in person

## Process - Reflection

(Optional) Short introduction

#### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.
 * We have decided to set up a Trello board which contains the tasks that are in progress or to be done. It also shows the finished tasks so that we could extend from them. This decision was helpful in a way that we could finish all the important steps first before implementing any additional features, and allowed for a more organized workflow.
 * We organized an interactive collaboration on messenger that allowed us to finish each other's incomplete work so that we all get a better understanding of the project as well as less time spent doing late night work alone, which is less productive and more harmful to our bodies.
 * 

 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Explain why (i.e. give a supporting argument) you consider a decision to be successful.
 * Feel free to refer/link to process artifact(s).

#### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.
 * We decided to divide up front and back end by splitting up the team, and have each group do its own work. However, we did not account for the fact that the two ends are dependent of each other. This led to a lot of work ending by creating an html object but leaving it without any functions or links. It especially made front end less productive as we did not know what to expect as our inputs and outputs to our databases.
 * Our decision of using python was generally unsuccessful. Much of the work we allocated for python programs could have been done through html or javascript, and it was confusing to implement some functions where we did not know whether the input or output was redirected to python or html. Python should have solely been used for storing SQL tables and making queries.
 * We at first decided to have short daily standup meetings. However, after a couple of days, the schedule started to fall apart as not everyone decided to keep attending the meetings, but instead would just appear on messenger. As it turned out, much of what we needed to discuss on a short cycle were ommited.
 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Feel free to refer/link to process artifact(s).


#### Planned changes

List any process-related changes you are planning to make (if there are any)
 * We could have daily online sessions where we discuss what has changed since the last meeting, as we were a bit scared to work on something new as we did not know whether it would overlap with someone else's current work. If we are kept updated every 24 hours, this would not matter as much and we would feel more secure about what we could do next.

 * Ordered from most to least important.
 * Explain why you are making a change.


## Product - Review

#### Goals and/or tasks that were met/completed:

[Artifact](app/app.py)
 * Integrate communication between the users of the system
   -Revenue goal communication between all levels of users
   -Finance request approvals for large sums by financial department
 [Artifact](/deliverable/artifact/schema.md)
 * Implement the database to store user/company data
   -User data should include login information as well as employee type
   -Company data should include revenue goals, expected budget as well as actual spending
 [Artifact](/app/static/js/graph.js)
 * Implement graphs to be dynamically generated based on input from database
   -Launch the application on a server
 * From most to least important.
 * Refer/link to artifact(s) that show that a goal/task was met/completed.
 * If a goal/task was not part of the original iteration plan, please mention it.

#### Goals and/or tasks that were planned but not met/completed:
 All our goals listed in our planning markdown file were met.
 * From most to least important.
 * For each goal/task, explain why it was not met/completed.      
   e.g. Did you change your mind, or did you just not get to it yet?

## Meeting Highlights

Going into the next iteration, our main insights are:
 * We would refactor our python files that contained our classes so that instead of storing the data in themselves, they could just retrieve the information from our databases. This way, the tasks will be more divided amongst all parts of the projects. The tables will store the data, queries will be generated using python and the result will be displayed using html and javascript.
 * We would separate our project into a model, view, controller structure to better manage the process. After all, the data flow never changes, so we can facilitate and simplify the communication between them.
 * We would have shorter sprints where we set immediate goals along with a very short deadline. This way, we will all be more focused on what there is to do next, and the contribution will happend more evenly throughout the iteration instead of most of the work being done during the last few days.
 * 2 - 4 items
 * Short (no more than one short paragraph per item)
 * High-level concepts that should guide your work for the next iteration.
 * These concepts should help you decide on where to focus your efforts.
 * Can be related to product and/or process.
