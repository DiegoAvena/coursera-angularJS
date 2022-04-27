## Controller as Syntax
> ng-controller='Controller1 as ctrl1'
>   ng-controller='Controller2 as ctrl2'

Provides us with a convenient way of creating an object that we can attach our properties to so that property masking does not get in the way: it prevents updates to an object from affecting object properties in other controllers, as mentioned below when trying to mask a non primitive type property. 

HOW? 

1. It lets us specify a label in our html template, in this case, ctrl1 and ctrl2. 

2. The name of this label is then attached to the corresponding scope service of the controllers as a property: $scope.ctrl1 for controller 1, and $scope.ctrl2 for controller 2 in this case. 

3. Those properties then point to objects that are instances of the controllers themselves, which are created by using the controller functions as a constructor function: in other words, the controller instance gets attached as a property on the scope, which also simplifies things for us as well!

- We do not have to inject $scope into our controller functions anymore when trying to refer to properties, can simply use this keyword, because the controller function will now be used as a constructor function to put an instance of our controller on the scope!

> angular.module('...')
> .controller('Controller1', Controller1)
>
> function Controller1() {
>   this.myProp = "some value";
> }

- Our html code also gets simpler by allowing us to see which properties belong to which controller

> <div>
> {{ctrl2.myProp}}
> {{ctrl1.myProp}}
> </div>

Behind the scenes, the controller as syntax does something like this: 
> ...
> $scope1.ctrl1 = new Controller1();
> $scope2 = Object.create($scope1);
> $scope2.ctrl2 = new Controller2();
> ...

So, through controller as syntax, we are able to easily create instances of our controllers on the scope, which in turn allows us to easily update values in each controller without worrying about those changes having unwanted affects in other controllers, because through the controller instances on the scope, such data is no longer shared (it is no longer masked)! Without controller as syntax, child controllers would still inherit the scope of the parent controller, and thereby risk masking non primitive type data members that causes unwanted affects in the parent controller! So this makes things less error prone!

This also makes debugging easier because now we know which properties belong to which controller!

## Scope Inheritance

It is not good practice to have 1 angularJS controller handle everything on your page. Easier to code smaller pieces of functionality for different parts of your page (easier to debug this as well). This means that we will have to create nested controllers, where a main controller contains smaller controllers. Through scope inheritance, the scope of the outer controller gets inherited by the scope of the inner controllers, but AngularJS goes further to make this even better: 

AngularJS performs protoypal inheritance on scope inheritance, so all properties of the outer scope can be accessed from the inner scopes of the inner controllers. Of course, these inner controllers can also overwrite the outer scope properties if they choose to mask them.

Example: 

> Controller1
>   Controller2
>   Controller3

> $scope1.prop = "ctrl1"
> $scope2.prop? -> evaluates to "ctrl1" in accordance with the prototype chain
> $scope3.prop? -> evaluates to "ctrl1" in accordance with the prototype chain

What would happen if we masked prop in scope 2 (the scope of controller 2)? 
> $scope2.prop = "ctrl2"
scope3.prop will still evaluate to ctrl1, it is not affected, but this is only because prop is a primitive type. 

IF we are dealing with a property that is not a primitive type, things get a bit different. A change by an inner scope to the property will change that property in the parent controller. This is because we first go up the prototype chain to reach the object, which only exists on the parent, and as a result, we end up changing the value in the object owned by the parent!

> $scope1.obj.prop = "ctrl-1"
> $scope2.obj.prop? -> evaluates to ctrl-1
> $scope3.obj.prop? -> evaluates to ctrl-1

> $scope2.obj.prop = "ctrl-2" 
This makes us go up the prototype chain to obj on the parent, and so we change the prop of the obj on the parent to ctrl-2 so that then: 
> $scope3.obj.prop? -> evaluates to ctrl-2

This is something that we seek to fix through controller as syntax

## Prototypal Inheritance

Recall, inheritance is when an object or a class is based on another object or a class (parent), using the same implementation and or the same values. 

It's a technique for code reuse and logical entity structure. 

Prototype inheritance is a type of inheritance done in JS. It is not based on classes, it is based on object instances, where the original object instance becomes the prototype for future objects: 

Example: 

We create a parent object that has a type member, and method(). We create a child of that parent object, and when we do something like child.type?, JS will not find the type member in child, so it will go up the __Prototype Chain__ to reach the parent object that has the type member, and so JS will resolve the type value to the value that Parent has. 

What is this prototype chain? 

It is the chain that connects the parent to all of its children, grandchildren, great grandchildren, etc. It is their link. JS uses this prototype chain whenever a value that is being asked for cannot be found in the child, allowing JS to go up the tree rooted at the parent until it does find that value. 

BUT 

If that value is found in the child, then JS evaluates the value as it is in that child: this allows us to overwrite things from the parent object! To overwrite properties from the parent, we must mask them in the child: spell them exactly the same way as in the parent

## Function Constructors

allow us to treat a function as the constructor for a class: it returns an object with the functionality defined in the function if we use that function as a constructor. To use such a function as a constructor, gotta use the new keyword. If we choose to not use such a function as a constructor, we can simply use it as a regular function. When we do use it as a regular function, then the this keyword used to define members in the function will point to the external scope of the function: the browser scope, which is nothing more than a  window.

SO

to avoid using function constructors as regular functions, a tip is to name them starting with a capital letter, so that you know how the function is meant to be used.