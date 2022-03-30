## Using controllers inside directives 

Very often, we want our custom directives to do more than just hold html template code that we can easily reuse. Sometimes, we may want to also bundle some functionality with it. We have a couple of options, and 1 of those is to declare a controller directly on the directive. 

### Step 1: Declare Controller in Directive 

> function MyDirective() {
>   var ddo = {
>       scope: {
>           prop: '=',
>       },
>       controller: ControllerFunction, 
>       bindToContoller: true,
>       controllerAs: 'myCtrl'
>       templateUrl: 'template.html'
>   };
>   return ddo;
> }

We define several new properties for our directive. The ControllerFunction should be the function that implements that controller, as we had before. 

Now, to prevent property inheritance from screwing around with us when we change property values of our directive, we also should place our directive scope properties onto the controller instance that is placed on the scope, and this is what bindToController does: it attaches our declared isolated scope properties onto the controller instance instead of directly to $scope. 

controllerAs is what allows us to use the ControllerAs syntax, so that we can now access the properties placed onto that instance of the controller from our template html. In this case, we refer to properites using myCtrl 

__NOTE__

You can also define the controller on the module itself as you normally would, and change the directive function to look like this: 
> function MyDirective() {
>   var ddo = {
>       scope: {
>           prop: '=',
>       },
>       controller: 'ControllerFunction' as myCtrl, 
>       bindToContoller: true,
>       templateUrl: 'template.html'
>   };
>   return ddo;
> }

This way, you can also use that controller in other areas and not just in a directive.

### Step 2: Define Controller

> ControllerFunction.$inject = ['Service'];
> function ControllerFunction(Service)
> {
>   var myCtrl = this; 
>   myCtrl.method = function() 
>   {
>       var name = "Hello " + myCtrl.prop;
>   }
> }

This should be familiar, we have been doing this for numerous previous lectures. Also, note that we can use the properties we defined in our directives isolated scope (myCtrl.prop). Why is this? Because we said so when we defined our directive, remember, with the bindToController property! 

### Step 3: Use In Directive's Template 

> <div ng-if="myCtrl.method()">
> {{myCtrl.prop}}
> </div>

## Bi-Directionial vs. One-way binding

> function MyDirective() 
> {
>   var ddo = {
>       scope: {
>           prop: '='
>       },
>   }
>   return ddo;
> }

Recall that bidirectional binding will allow the property to be updated in both ways: if I update the property outside the directive, then it changes inside the directive, or vice versa; however, it is usually best practice to avoid changing binded properties from inside the directive. It is also a waste of resources to use bi-directional binding though if we have no plans to allow the inside of the directive to change that value for the outside of the directive, because for bi-directional binding, recall that AngularJS must set up extra watchers that the digest cycle will always have to check but will never use! 

So, to get around those shortcommings of 2 way binding, we can use __1 way binding__ '<': 

> function MyDirective() 
> {
>   var ddo = {
>       scope: {
>           prop: '<'
>       },
>   }
>   return ddo;
> }

Only the outside can change the property, not the inside. We do not use DOM binding here, because recall from previous lecture, DOM binding requires the value of the property to be a string, which we might not always want. HOWEVER, if the property value is an object, and we change that object from within our directive, well this will actually still cause that value to change outside the directive as well because objects are passed by reference in javascript and THUS if we change a property on that object from within our directive, the context outside of the directive will still be affected by that change because both the outside and inside of our directive will be talking about the same object in memory! SO WHILE 1 WAY BINDING CAN BE MORE PERFORMANT (LESS WATCHERS), IT CANNOT GUARANTEE THAT PROPERTY OBJECTS WILL NOT BE AFFECTED BY CHANGES MADE INSIDE THE DIRECTIVE TO IT