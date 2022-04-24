# AngularJS event system

We may need ways for child elements to communicate some data with their parents. We have several ways to achieve this:

- $scope.$parent

Access the parent scope to communicate with the parent, but we will need to have functionality in component 1 to make sure it is aware of the communication from its child: creates a dependency!

- &method

References a method in the parent that we can call in the child and pass data into it from the child, allowing the child to communicate some data with the parent.

On the flip side, sometimes we want the parent to communicate with the child. Again, serveral ways to achieve this:

- Simply Send data into that child component

Just send the data into the child component, but now we must make sure the child component has mechanisms for receiving that data: creates a dependency

Sometimes, we may also want a component to communicate with it's grandparent element! This is an even more confusing case. Several solutions, though some of them are not very elegant:

- $scope.$parent.$parent

This creates a nasty dependency though: thr success of this depends on us having a parent to begin with, and on that parent having a parent!

- User service to share data?

Sure, but we still need to set up a watch in component_1 to react to change, again, we have a dependency

On flip side, what if parent wants to send data to a grand child? Several solutions again, but some are messy:

- Send data into component 2 and have component 2 send it to component 1

Now component 2 must have a mechanism for obtaining data that it will not even need!

- Use shared service

Sure, but still need to set up a watch in component_3 to react to the change

The situation can become even more messy if we wish to communicate with multiple components, or when multiple components want to communicate with 1 central component

There is an elegant way to solve these communication issues though, it is a design pattern that angularJS implements via it's event system. The design pattern is called: 

## Publish-Subscribe design pattern
Publishers send messages to subscribers on a common channel. 

__Publishers__
- Mark messages with a classification
- Don't know subscribers of if there are any

__Subscribers__
- Sign up to listen for messages with a particular classification
- Do not know publishers or if there are any

In angular, the common channel is scope, messages are events that can hold data. 

### 2 types of publishers in angularJS

__$scope.$emit__

This publisher goes up the scope chain. So if a component 3 fired an event, that event would travel all the way to the root element of the application

__$scope.$broadcast__

This publisher foes down the scope chain. So if the root element needs to communicate with component 3, this event goes all the way to the last leaf in the scope change

What happens though if the component we want to handle an event for does not lie on a straight path from where the event is fired? We can broadcast the event from the root scope, which will now go down the scope chain

AngularJS gives us the $rootScope service to be able to broadcast from the highest point possible in the scope chain, do so with this: 

> $rootScope.$broadcast

By broadcasting though, every single component will receive the notification for this event.

__HOW TO USE ALL OF THIS__

1. Broadcast or emit an event

$scope.$emit(
    'namespace:eventName',
    {prop: value}
);

Recall, this will send an event up the scope chain

$scope.$broadcast(
    'namespace:eventName',
    {prop: value}
);

Recall, this will send an event down the scope chain

2. Listen for and handle the event

$scope.$on('namespace:eventName', handler)
function handler(event, data)
{
    if (data.prop === 'val1)
    {

    }
}

or

$rootScope.$on('namespace:eventName', handler)
function handler(event, data)
{
    if (data.prop === 'val1)
    {

    }
}

- Make sure namespace:eventName matches what you placed when creating the event!
- data is the data object our event wrapped up when we defined it, this is what allows us to pass data from and to
- With $scope, we do not need to worry about unsubscribing our callbacks, because the scope will get destroyed anyway when we change views, BUT with $rootScope, we do need to worry about this because root scope does not get destroyed until our app gets closed!
