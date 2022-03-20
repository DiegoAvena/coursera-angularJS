## The Digest Cycle

Take this code (very similar to what was done in lecture 9): 

> <input type="text" ng-model="name" ng-blur="upper();">
> Echo: {{name}}

How does AngularJS know when to update the name on the scope when it gets changed on the input field in 
html? 

When user clicks something or types something, these things go onto the event queue. If we use the regular methods
for detecting these events, AngularJS will not know that such events occured. This is why AngularJS defines events such 
as ng-click or ng-keyup, called directives. These work in the same manner as the regular events, but allow AngularJS to 
know when such events are triggered as well: they allow the AngularJS DigestCycle to run by eventually calling $digest

The angularJS events, when triggered, will be handled by some handler we defined in the Angular Context, called our scope. 

The $scope has a special array of __Watchers__, functions that detect changes in some property when some event has been triggered. If any of these watchers detects a change in the properties its managing, then AngularJS can react by performing some updates. \

The process of checking through this array of __Watchers__ is kicked off by $digest. There is a number of ways to set up these watchers in the Watchers array. We have actually used them already: 

> {{name}}
> ng-model="name"

In both cases, angular JS will automatically set up some watchers in order to keep the scope.name property in sync everywhere! To check for changes, a loop is used. The loop iterates through the __Watchers__ until ALL watchers detect no changes. Most of the time, this loop runs twice to detect if changes were made, and to detect if nothing was changed after detecting changes in the previous loop. This process of cycling through the Watchers is called the __Digest Cycle__. The loop itself is called the __Digest Loop__. 

Once the Digest Loop is done, meaning no new changes have been made to any of the properties, AngularJS will then update the property accordingly, refresh the page, and allow you to see the new values. 

This process of having a loop that runs at least 2 times to check for changes to properties is also called Dirty Checking. 
 
## Manually setting up watchers with $watch

You can manually set up watchers with the $watch service, which takes the name of the property as arg 1, and the function that will watch that property

Using the $watch service inside of a controller though is not recommended. This is because the cotnrollers already have mecanisms for automatically setting up watchers for us, so it just makes things needlessly redundant.

Once such way is the use of {{scopeField}}
Another way is to use ng-model="scopeFieldName", which is commonly used in input fields

You may also declare a watcher manually in a directive, a service, component, etc.