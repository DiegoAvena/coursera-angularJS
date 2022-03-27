## Ajax with $http service 

The goal between the http service and the server is to make communication between the 2 super simple. The http service is asynchronous, so it is based on the deferred and promise api from the previous lecture. When it is invoked, it will return a promise that we can then process.

__Usage Example__

> $http({
>   method: "GET",
>   url: "http://someurl",
>   params: { param1: "value1"}
>}).then(...);

angularJS expects us to provide a configuraton object that has the properites method, url, and params; however, the only req    uired property is the url one. If method is not supplied, http service will assume that this is a GET request. Params is where we can specifiy additional information. The result URL includes them as such: http://someurl?param1=value1

Configuration object can have additional properties, see the AngularJS documentation for more. 

The arguments you pass into the then function are the usual ones you would supply with a normal promise. You supply a success function, and a failure function: 

> $http({
>   method: "GET",
>   url: "http://someurl",
>   params: { param1: "value1"}
> }).then(
> function success(response) { 
>   // do something with response.data
> },
> function error(response) {
>   // do something with error response
> });

response is what we get back from the server. Response.data is probably the most used part of it, as it contains the response body. 

If angularJS detects that this response is JSON, it will automatically translate it into a JS object using the JSON parser. 

__AVOID THIS MISTAKE__

> var message = "";
>
> $http({
>   url: "http//someurl"
> }).then (function (response) { 
>   message = response.data;
> });
>
> $scope.message = message;

Remember, we are dealing with an async call, so the scope.message value is the empty string! Message is not actually populated with a string until the async call finishes, meaning the server has replied. 

The fix: 

> $http({
>   url: "http//someurl"
> }).then (function (response) { 
>   $scope.message = response.data;
> });

## constant 

Another angularJS function that allows us to define constants which we can then inject later into our components! 