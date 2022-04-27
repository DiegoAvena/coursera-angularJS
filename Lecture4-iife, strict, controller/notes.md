## iife
Immediately invoked function expression, often used to make sure no local variables bleed into the global scale

## strict 
Use strict will allow us to more easily be safe about the code we write by generating 
error messages telling us about particular mistakes that can hurt us later, like trying to 
set x = 10 before declaring it with a var keyword (as then x would otherwise be placed in the global space, 
which we do not want, that is the whole point of using an iife!)

## controller

Defines a piece of our view model