## Directive 

Marker on a DOM element that tells AngularJS html compilaer to attach a specified behavior to that DOM element. The compilart can transform/change the DOM elements and its children with this marker. A marker can be attribute, element name, comment, or CSS class; however, usually best practice to use elements and attributes.

Things like ng-repeat, ng-app: these are directives in AngularJS

## Creating your own custom directives

You can create your own custom directives. 

__Through these, we can copy and paste html code into our html documents live, which allows us to make the html code more modular. It also allows us to give better, more descriptive names for our html tags.__

1. Register Directive

> angular.module('app', [])
> .controller('MyCtrl', MyCtrl)
> .directive('myTag', MyTag); 

The first param is the normalized name that will appear in html. 

Second param is the factory function, returns a DDO: __Directive Definition Object__. This is basically a configuration object, much like the config object in the provider service from before, that specifies how that directive will operate. This factory function will execute only once, NOT everytime the tag is found in our html. 

2. Define Factory Function

> MyTag.$inject = []
> function MyTag() = {
>   var ddo = {
>       template: 'Hello World'
>   }; 
>   return ddo;
> }

The ddo should contain various properties that are specified in the AngularJS documentation. The template is just an example, not required. 

3. Use in HTML

> <my-tag></my-tag>

Notice that the name is not myTag, but my-tag. We do this because AngularJS will normalize the names of our tags: it will take my-tag, remove the dash, and applies camel case, resulting in myTag. If we did not use the dash, angularJS will not pick up on our custom directive. 

__template vs templateUrl__
template expects us to copy the html code directly into it, while templateUrl allows us to supply a url to a template file where the html code is to be copied and pasted from into the actual index.html document. 