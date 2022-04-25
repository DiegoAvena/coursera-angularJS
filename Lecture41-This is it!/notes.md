# Router State Transition Events Part 1

It is very useful to have events fire whenever the router changes from 1 state to another. All router events fire at the $rootscope level, so they travel down, and every element in the app gets the event. There are many events that ui router supports, so for a complete list, see the ui router documentation.

Here are a couple: 

## $stateChangeStart

fires when state transition begins

$rootScope.&on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options) {

    });

You can also use event.preventDefault() here to stop the transition from occuring based on some condition, data, etc. in your function

## $stateChangeSuccess

fires when the state transition is complete

$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

});

## $stateChangeError

fires when an error occurs during transition

$rootScope.$on('$stateChangeError', 
    function(event, toState, toParams, fromState, fromParams, error) 
    {

    });

__Note__ If any errors occur during resolve, then these are not reported in a regular fashion (cannot see them in the console), so we can use this event to log out any errors that are detected during the state transition resolve process.

Also, these events are depracated in AngularJS v 1.0+, instead, we use the $transition. See this documentation for how to work with these. They basically provide us with a cleaner, and safer way, of doing the same thing with the older events: https://ui-router.github.io/guide/ng1/migrate-to-1_0

