## link function

This is a place where we can declare custom watchers. Actually better to declare them here, rather 
than inside our controllers.

Dom manipulation is usually done inside of the link function, which, as seen below, is declared on the DDO (which if you recall, is how we create custom directives)

The link function does not support injection BUT, to use injected components, just have to inject them into the directive 

__How to Declare__

1. Declare Link Function

function MyDirective() {
    var ddo = {
        scope: {...},
        link: LinkFunction,
        ...
        templateUrl: 'template.html'
    }

    return ddo;
}

Recall, MyDirective is the directive factory function. link has access to the same scope as
this directive, so we can inject a custom service into the link function simply by including it 
in our ddo.

2. Define the Link Function

function LinkFunction(scope, element, attrs, controller)
{

}

- scope is the $scope in the directive's controller
- element is the top level element of the directive. If jquery is included before angular.js, then this is jquery itself, if not, then this element is JQLite, which is a subset of jQuery: this will wrap our directive so we can now use it's methods: https://docs.angularjs.org/api/ng/function/angular.element
- attrs contains reference to attributes declared on the directive
- controller is a reference to the controller the directive belongs too