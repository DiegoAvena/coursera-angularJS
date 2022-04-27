Sometimes we may have code that lies outside of the AngularJS context (scope) that we still want AngularJS to kick off the Digest Cycle for. This is where $digest and $apply services come in. 

You should always look for native AngularJS alternatives though prior to trying to manually kickoff the digest cycle. Things like ng-click and ng-keydown should be used instead of on-click or on-keydown!

## $digest

Allows us to manually kickoff the digest cycle, allowing angularJS to detect any changes to properties, but it is not the best way because any errors produced by the code inside of the event that is outside the AngularJS context will not be displayed! This is where $apply comes in.

## $apply

Ensures that we can not only manually kickoff $digest (this service is called at the end of the apply service) but also make sure AngularJS sees and displays any errors thrown by the event code outside of its context. 
