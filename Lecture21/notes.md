## Custom Services With .factory()

AKA "service factory function" not to be confused with .service, though both are technically factory functions. 

Just as with .service, you must register services with the .factory() function in this way: 

> angular.module('app', [])
> .controller('ctrl', Ctrl)
> .factory('CustomService', CustomService);

The second param is our factory function, it is the thing that is expected to produce a service. CONTRAST this with .service, where this second param must actually be the service constructor, not a service factory function! 

The first param is the same as with .service, it is the name we use to inject this service into other services, controllers, etc.

In terms of the service factory function itself, it looks something like this: 

> function CustomService() {
>   var factory = function() {
>       return new SomeService();
>   };
>   return factory;
> }

Notice how we are the ones who call new: this gives us more controll over how the service is configured when it is instantiated. Another way to go about this is this way (factory is an object literal with a method called getSomeService that returns the service instance)

> function CustomService() {
>   var factory = {
>       getSomeService: function() {
>           return new SomeService();
>       }
>   };
>   return factory;
> }

Depending on which approach you use, you will end up using the actual service in different ways: 

If using the Object literal approach, you use the service like this: 

> var someService = CustomService.getSomeService();
> someService.method();

If using the function approach, using the service looks like this: 

> var someService = CustomService();
> someService.method();

## Factory Design Pattern

Recall from lecture 13, this is a design pattern that makes use of something called a factory, which is a centralized part of our code that is responsible for creating new objects or functions

- It can produce any type of object, not just a singleton
- It can be used to produce dynamically customizable services

In angularJS, .factory() and .service() are 2 such factories.

## .factory() vs. .service() Confusion

- .factory() is NOT just another way of creating the same service you can create with .service() but it CAN be
- .service() is also a factory, but a much more limited one compared to .factory()
    - It is a factory that always produces the same type of service, a singleton, without an easy way to config its behavior
    - Usually used as a shortcut for something that does not require configuration later on