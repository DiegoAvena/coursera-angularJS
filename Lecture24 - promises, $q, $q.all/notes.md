## Prior to promises, we had callbacks (still do)

> asyncFunction(function() {
> // do when asyncFunction is done
> });

__Main problem__: no easy way to pass th results of the async function back to its caller, especially if the real recipient of the result is a few layers away. 

> asyncFunction(function() {
>   asyncFunction(function() { 
>      asyncFunction(function() {
>          // do when asyncFunction is done
>      });
>   });
> });

- Sometimes you may need to chain multiple async functions, but this makes the code very hard to read. And with error handling, it gets worse!

- Also, what if we wanted all of these to execute in //, such that if 1 of them fails, they all fail and we execute some error handling, and if all them succeed, we proceed? Not easy to do with callback approach 

This is where promises come into play, so that these issues are addressed. 

## Promise

Part of AngularJS and the new __ES6 API__. 

A promise is an object which can be passed around or returned that holds references to the outcome of async behavior. In angularJS, we create such promises with the $q service. 

__Example__

> function asyncFunction() {
>   var deferred = $q.defer(); 
>   if (...) { deferred.resolve(result); }
>   else { deferred.reject(error); }
>   return deferred.promise;
> }

- $q.defer creates an object that represents the async environment with all the hooks into it, including the promise object. 
- .resolve marks successful completion, wraps the result data for the promise so we can use it later on 
- .reject marks unsuccesful completion, wraps the error daya for the promise so we can use it later on
- .promise is the container of all the data obtained from the execution of the async functions, returned to the caller so that the caller can now act on data from its async functions. Returning the promise is essentially creating a hook back to the start of this entire process

But where is the asynchronous part? deferred.resolve() and deferred.reject() can be done asynchronously.

To use the promise, we do this: 

> var promise = asyncFunction(); 
> promise.then(function (result) { 
>   // Do something with result
> },
> function (error) {
>   // Do something with error
> });

Can also chain the .then function, because it itself returns a promise as well: 

> var promise = asyncFunction(); 
> promise.then(function (result) { 
>   // Do something with result
> },
> function (error) {
>   // Do something with error
> }).then(...);

Chaining our promises will allow us to write more readable code and will make a more clean distinction between the use of promises and callbacks. This is because it prevents us from having nested then statements, and it also prevents us from having to write a rejection function for each case. We can now use the .catch(errorResponse), which will contain any error that one of the previous promises created, allowing us to centralize our error handling as well.

## $q

Is the angularJS implementation of the promise API. The new implementation of JS, ES6, has its own promise implementation

## $q.all 

This service allows us to resolve multiple promises in parallel so no promises need to be waited on in order for us to start running

> $q.all([promise1, promise2])
> .then(function(result) {
>   // do something with result 
> })
> .catch(function(error) {
>   // Handle error
> });

this service also allows us to have a centralized place for all the errors and all the result resolving (as with the chaining of promises mentioned above)