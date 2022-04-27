## Services in Angular JS

These are any values that Angular provides to us by default. They are always preceeded by a $. This means 
that $scope is a service: scope service. 

## $filter Service

Contains function for formatting the data that gets displayed to the user

## $injector

This is the service that allows AngularJS to parse our functions and map/inject the instantiations of services like filter and scope into the arguments of that function. We can also inject this service into our functions to get more insight as to how 
it works.

Essentially, $injector will parse the arguments of our function into an array, allowing AngularJS to know where to inject the instantiations of each service. If this array has any of the services in it, then AngularJS knows what service to inject and where!

## ng-blur

We can use this to bind our model to the unfocus event, which is raised whenever we click out of an html element like 
an input box, text field, etc.