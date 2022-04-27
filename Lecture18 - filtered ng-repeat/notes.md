## Filtered ng-repeat

In normal JS, we can apply filters to arrays to create new arrays containing only the values from the original array that past some test. We define that test via the custom filter function. 

Example: 

> function above5Filter(value)
> {
>     return value > 5; 
> }

> var filteredNumberArray = numberArray.filter(above5Filter);

Through filtered ng-repeat, we can do the same exact filtering on arrays returned by ng-repeat. To do this, we must use the AngularJS filter called filter (its redundant hehe), which operates exactly the same as the normal JS array filter. 

- If you provide a sttring to this angularJS filter, it matches all string items against the provided one