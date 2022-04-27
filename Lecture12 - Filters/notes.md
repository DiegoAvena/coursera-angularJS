## Filters 

Allow us to change the output of an expression, can be done either in html or javascript

To apply a filter, we can use the $filter service. AngularJS provides us with some base filters: 

- uppercase
- lowercase
- currency
- number
- etc.

Example: 

> var output = $filter('uppercase')(value);

filter('uppercase') creates the filter, and (value) makes angularJS execute the filter on the piece of data 

Can also supply custom arguments to a filter: 
> var output = $filter('uppercase')(value, customArg1, customArg2);

To use directly in html, do: 

> {{"Hello" | uppercase}}

To apply custom arguments with direct use in html, do: 

> {{"Hello" | currency : arg1 : arg2}}