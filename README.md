# coursera-angularJS
Repo containing all coursera angular js tutorials.

# Some quick notes

## Starting Browser sync

> browser-sync start --server --directory --files "**/*"
 
- --server (this is server mode, which means server up all files in the given directory) 

- --directory (directory mode, if there is nothing in directory, it will still display a webpage with the directory structure it sees) 

- --files "**/*" (tells browser sync to track which files have been changed, so it automatically updates for any new changes we make to those files, the **/ means any directory, and * means any file in that directory)

## Closing Browser sync 

> ctrl C

## Why use angular js? 

- Provides a way of dealing with the natural increase in complexity of our codebase
    - By allowing us to have high cohesion and low coupling!
- Makes it easier to deal with code
    - Allows for good code organization
    - Makes it so that updating part of it shouldnt affect other parts
    - Makes code reusable 
    - Makes code testable (code is written in small chunks that are easier to test)

## High cohesion and Low coupling

- High cohesion

> When smaller pieces of functionality are strongly related to each other within some code boundary, this boundary can 
> be a class, function, etc

> It deals with how well does that 1 thing stick to doing just 1 thing 

1 piece of high cohesion functionality, may use other pieces of high cohesion functionality

Example (low cohesion, there are things sort of contradicting each other, leads to more complexity): 
MyDailySchedule
wakeUp()
brushTeeth()
shower()
work()
lunch()
work()
dinner()
hustle()
settleDown()
sleep()

- Loose Coupling

> Least possible dependency of 1 component on another

Makes development much less complex, because you do not have to worry about affects 1 small change will 
have across the project

An indication that you have loose coupling: 

> If you change 1 thing, you do not have to change the other

An example of tight coupling: 

> A change in our html id tag ends up breaking our JS code, because the id's must also 
> be updated here: this is tight coupling, a change in our presentation code affects our 
> functionality code, makes it all the more complex! We want to avoid this

## Design Patterns

These are cookie-cutter approaches to common software dev issues, MVVM is 1 such pattern for structuring UIs with 
functionality

In general, design patterns aim to achieve high cohesion and low coupling

## Model View View Model (MVVM) design pattern

Also sometimes called Model View Whatever, because it does not restrict you to just 
using the MVVM pattern, can mesh it with other design patterns as well!

### Model

- Represents and holds raw data
- __AKA Data/Business Logic__, it is also the JS of our app like with view model
- Some of this data may be displayed in the view
- Can also contain a logic to retrieve data from source (http request, etc)
> CONTAINS NO LOGIC ASSOCIATED WITH DISPLAYING THE MODEL

### View

- The user interface 
- __This is the HTML and CSS__
> ONLY DISPLAYS THE DATA IT IS GIVEN
> IT NEVER CHANGES THE DATA
> DECLARATIVELY (NO JS CODE NEEDED TO TRIGGER THE EVENT) BROUDCASTS EVENTS, BUT NEVER HANDLES THEM

### ViewModel 
- The representaton of the state of the view,
- "The model that is the data that represents the view", it is the subset model that deals with the view representation
- Holds the data that is displayed in the view
- AKA: __Presentation logic__, it is the JS code we write for managing the way a view displays our model
- Responds to view events: called __Presentation Logic__ 
- Calls other functionality for business logic processing
> NEVER ASKS THE VIEW TO DISPLAY ANYTHING: DOES NOT DIRECTLY MANIPULATE THE DOM, 
> DOES NOT DO GET BY ELEMENT ID CALLS, 
> ALL OF THIS ALLOWS FOR LOOSE COUPLING

### Declarative Binder

- Declaratively (again, no JS code required) binds the model of the view model to the view
    - The framework, angularJS, allows this to be declarative, its the one that handles the code needed to do this
- The glue between the view model and the view

> IT IS THE KEY ENABLER OF THE WHOLE MVVM PATTERN
> WITHOUT IT, YOU WOULD HAVE TO WRITE ALL THESE BINDINGS 
> BY HAND, AND THE PATTERN NO LONGER EXISTS

### General flow of things

1. The view model reaches out to the model for some data
2. The model returns that data to the view model
3. The view model binds this data to certain components inside the view, via angularJS: happens declaratively, no js code needed to manipulate the view, the framework handles this for us! 