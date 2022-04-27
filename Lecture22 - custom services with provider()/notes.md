## Custom Services with .provider()

Not only allows you to dynamically configure your custom service like .factory() does, but it also allows you to do so just once right when the application starts, and so now everyone can use it without you needing to reconfig each time in the individual controllers: So we can now have a global service that we can configure, whereas with .factory() we could have a configurable service, but that service had to be created in each component

### Workflow

1. Define Provider Function

> function ServiceProvider() {
>   var provider = this; 
>   provider.config = {...};
>   provider.$get = function() 
>   {
>       var service = new Service(provider.config.prop);
>       return service 
>   };
>}

Notice how as with factory, we also provide a factory function to provider as well. The $get property is a function that is a factory function attached to the provider instance (it's the one we used to provide to the .factory() function), and angularJS expects our provider to have this property. This is the property that makes our provider a provider in the eyes of angular js. 

More importantly, notice how we have a config property, which we can use to configure our factory function with now!

2. Register the provider function with the module

> angular.module('app', [])
> .controller('ctrl1', Ctrl1)
> .provider('Service', ServiceProvider);

As usual, the first param is the name you use when injecting this provider into your components. 

3. Inject the provider into your components

> Ctrl1.$inject = ['$scope', 'Service']
> function Ctrl1($scope, Service) 
> {
>   Service.someMethod();
> };

4. Optional: Register the config function 

> angular.module('app', [])
> .controller('ctrl1', Ctrl1)
> .provider('Service', ServiceProvider)
> .config(Config);

AngularJS guarantees that the Config function registered through .config will run before any services, factories, or controllers are created. 

This allows us to configure our services before they are even created. 

5. Optional: Inject Provider into Config function

> Config.$inject = ['ServiceProvider']
> function Config(ServiceProvider) {
>   ServiceProvider.config.prop = 'value';
> }

The thing we inject is the string we registered our provider with + Provider; hence, in this case, we get ServiceProvider. We can then use the service provider to configure how we want our service when it gets created