## Special things AngularJS reserves for us 

These are preceeded by the $, so it is best practice to avoid naming our own variables with this $ at the front

### Scope 

Allows us to define custom fields inside of a container that can be accessed by our view model that is bound
to a particular controller which has this scope var using  
{{nameUsed}}! Whatever is in {{}}, angular js will look for it on this Scope variable

See lecture 5 for example of this in action. 

### Expression

{{}}, these are expressions. They allow us to display data from our view model via the scope

## Declarative Binding 

Allows us to connect data between our view model and view, such that updates to that 
piece of data, whether it be in the view or view model, occur for everyone! 