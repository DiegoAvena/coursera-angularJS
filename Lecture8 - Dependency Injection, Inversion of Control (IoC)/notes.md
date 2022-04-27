## Dependency Injection (DI)

Another design pattern that implements _inversion of control_ for resolving dependencies. 

## Inversion of Control (IoC)
It is sometimes called "Dont call us, we will call you" because only 1 entity is allowed to call the other, they do not call each other!

The client gets called with the dependency by some system, in our case, that system is AngularJS. The client is not responsible for instantiating the dependency, the system is, and the system calls the client once that dependency has been created!

The dependency is what is needed to proceed with some type of functionality, for example, a shopping cart requires a credit card dependency in order to be checked out. That credit card dependency is instantiated by a banking system, which then calls 
the shopping cart feeding in card dependency