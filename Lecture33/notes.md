# Components and Component-Based Architecture

Components are a new way of implementing directives. It is a special kind of directive that uses simplified configurations which assume defaults that are best practice. Using components makes it easier and simpler to write your app. These are the core principles of components:

1. Components only control their own view and data

Never modify data or DOM outside their own scope. This is called an isolated scope, and it is good because modifying can create side effects that lead to chaos, so having this isloate scope provides some amount of security against this

2. Components have well-defined public API - we know what their inputs and outputs are

Inputs are always passed in via 1 way binding '<' and @ binding to ensure that changes we make inside of the component to that data do not affect data that is not directly controlled by the component outside, again, providing us with another layer of security.

Never change the property of passed in object or array, because objects are passed by reference in javascript, so doing so can change it for everyone!

Outputs use & for component event callbacks

Data is passed to the callvack through the param map: {key: val}

3. Components have well defined lifecycle

Can access different methods for handling different stages of the components lifecycle

$onInit - controller initialization code
$onChanges(changeObj) - called whenever one way bindings are updated
- change object also has: changeObj.currentValue, changeObj.previousValue
$postLink - similar to the link in directive
$onDestroy - when scope is about to be destroyed

4. Application is a tree of components

Entire application should be comprised of compoonents

Each component would have a well defined input and output

2-way binding is minimized as much as possible, to avoid unwanted effects of data manipulation

__HOW TO CREATE A COMPONENT__

1. Register Component with Module

angular.module('App', [])
    .component('myComponent', {
        templateUrl: 'template.html',
        controller: CompController,
        bindings: {
            prop1: '<'
            prop2: '@'
            onAction: '&'
        }
    }
});

myComponent is the normalized form, so in html, we use my-component, which get's normalized to myComponent. Also, instead of supplying a factory function, we simply provide a config object.

2. Configure Component

angular.module('App', [])
    .component('myComponent', {
        templateUrl: 'template.html',
        controller: CompController,
        bindings: {
            prop1: '<'
            prop2: '@'
            onAction: '&'
        }
    }
});

Most components mostly always have a templateURL. Not required to provide a controller, but if you want some functionality to be attached to the component, then do so. Otherwise, angularJS will create an empty controller function and place the controller on the scope with the label $ctrl.

Notice that scope is also not defined anywhere in the component. This is because we cannot change it, it is an isolate scope. Instead, we have a property called bindings, which is where we define our properties.

3. Reference Props in Template

<div ng-click="$ctrl.onAction({myArg: 'val'})">
    {{$ctrl.prop1.prop}} and {{$ctrl.prop2}}
</div>

4. Use component in html

<my-component prop1="val-1" prop2="@parentProp" on-action="parentFunction(myArg)">
    {{$ctrl.prop1.prop}} and {{$ctrl.prop2}}
</my-component>

Used the same way you would use a custom directive