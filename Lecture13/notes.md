## Custom Filters

Very often we will find that the out of the box filters angularJS gives us are not enough. To get around this, 
we are allowed to define custom filters. The workflow for doing so is this: 

1. Define Filter Factory Function 

> function CustomFilterFactory() 
> {
> return function (input)
> {
>   // Change input 
>   return changedInput
> }
> }

This is an example of a design pattern called __Factory Design Pattern__. In this pattern, we use factories. A factory 
is a part of our code that is responsible for instantiating new objects. (See lecture 21 for more info). In our case, the factory will 
produce a custom filtering function. 

AngularJS expects us to create a factory which produces our custom filter functions.

2. Register the Filter Factory with Module 

> angular.module('app', [])
> .controller('ctrl', Ctrl)
> .filter('custom', CustomFilterFactory); 

Done in the same manner as registering a controller with the module. When this is done, AngularJS will actually call 
our CustomFilterFactory function and store that inside of the 'custom' registration; hence, this is why in step 3 below, we 
can directly use the filter without having to go through the factory again, which is in contrast with the $filter service. 

3. (JS) Inject the custom filter with _name_Filter

> Ctrl.$inject = ['$scope', 'customFilter']
> function Ctrl($scope, customFilter)
> {
>   var msg = "Some Input"; 
>   customFilter(msg)
> }

In this example, we are planning to use the filter in JS, not in our html

__AN IMPORTANT NOTE__

Notice how with the regular $filter service, we first had to do $filter('uppercase'), followed by (value) to actually
apply the filter onto our data value. This is because $filter() only calls on the factory function to create the filter function, so it just returns the filter function for us to use, and we then have to actually use it with the (value) right after

BUT 

With a custom filter, we can simply just do customFilter(input) to apply the filter onto our data, we do not need to get the function from the factory first! This is because when we registered our custom filter in step 2, angularJS will call that factory function for us and simply store the product of that factory function as opposed to just storing the factory function; hence, our custom filter is ready for us to use right out of the box because AngularJS already used the factory function to 
create it. 

We must also take care though that when we do dependency injection for our custom filter, we name it correctly: angularJS will take the name we registered the custom filter as (in this case 'custom') and append the word Filter at the end, so we always want to inject __name__Filter in step 3 (in this case, we had to do customFilter). 

## Custom Filters With Additional Custom Arguments

We can add any number of custom arguments into our custom filters, do not just have to be stuck with input param. 
The process to do this is basically the same as the process to create a custom filter with just the input argument. 

1. Define Filter Factory Function With Custom Arguments 

> function CustomFilterFactory() 
> {
> return function (input, arg1)
> {
>   // Change input 
>   return changedInput
> }
> }

2. Register the Filter Factory with Module 

> angular.module('app', [])
> .controller('ctrl', Ctrl)
> .filter('custom', CustomFilterFactory); 

Its the same as before (lecture 13 notes)

3. (JS) Inject the custom filter with _name_Filter

> Ctrl.$inject = ['$scope', 'customFilter']
> function Ctrl($scope, customFilter)
> {
>   var msg = "Some Input"; 
>   customFilter(msg, "some val")
> }

Similar to what was done for a filter with only the input argument, but now this time, we 
must provide the additional params.

3. (HTML) Use Custom Fitler as Registered Name 

You can also use the custom filters directly in html. Like so: 

> {{ "Hello" | custom }}

Note that the name you use for the filter here does not have the word Filter appended to it. It is the name 
as registered with the module. Also do not need to do injection, angularJS will do that step for us.

For filters with custom arguments, simply do as you would with the $filter service: 

> {{ "Hello" | custom: arg1 : arg2 }}

## Chaining filters in HTML 

You can also chain filters by separting each with the pipe character. The result from the left 
filter becomes the input into the rigth filter, and so on and so forth. (the filters get evalualated from left 
to right)

> {{ "Hello" | custom | uppercase}}