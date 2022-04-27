## Controllers

Recall, these are the view model in our MVVM pattern. They have several responsibilities: 

### Controller Responsibilities

1. Set up initial state of $scope
2. Add behavior to the $scope (this should not be business logic! It should be for updating values on the scope as a result of some events that have occured)

### What controllers are not for

1. Handle business logic directly, this should be factored out into its own component
2. Sharing code or state across controllers. So where do we this onto? __This is where custom services come into play__

## Custom Services

Must be registered with our app, like so: 

> angular.module('app', [])
> .controller('ctrl', Ctrl)
> .service('CustomService', CustomService);

The function we pass into .service is the function that will be used as the __function constructor__ to create the instance of that service

The name we pass into .service is the name we use to inject this service into other services, controllers etc. YOU DO NOT USE THE NAME OF THE FUNCTION passed into to construct the instance of that service

Now, AngularJS guarantees that the service instance created from the .service option is a singleton: only 1 instance of this service exists at all times, everyone will use this same instance and can access it from any where (see notes on Singleton design pattern). Anyways, since services are singletons, __then this makes them VERY useful for sharing data across controllers!__

Also, angularJS uses lazy instantiation when creating these services with the .service. This means then that if the service is never used by a controller or another service in our app, it will never actually be created: saves memory usage

## Singleton design pattern

- Restricts an object to always having a single instance. 
- Each dependent component gets a reference to the same instance 
- Multiple controllers injected with a Service will all be accessing the same service instance
    - This allows us to share data between controllers then, because they all refer to the same instance! 

## Lazy instantiation

The instance is only created if an application component declares it as a dependency! 
