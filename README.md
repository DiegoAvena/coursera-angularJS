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