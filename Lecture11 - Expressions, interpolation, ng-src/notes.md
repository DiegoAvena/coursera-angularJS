## Expressions 
Something that evaluates to some value 

{{ exp }}

It is what allows the view to display data from the scope: it is executed in the context of 
the scope and has access only to the properties in $scope

Does not throw errorts if it results in a type error or reference error, it simply displays a blank. Also, 
control flow statements are not allowed

Can also accept a filter to format the data in a specific way

## Interpolation

Process of evaluating a string literal containing one or more placeholders, which get replaced
with values: it is what allows for string substitution

In angularJS, these placeholders are usually expressions, where the result is automatically updated whenever the placeholder value changes

## ng-src

Works like src tag in regular html, but, this tag instead tells the browser not to try and load an image 
until angularJS is ready to go, preventing us from getting 404 errors if we try loading images based on 
interpolation by AngularJS