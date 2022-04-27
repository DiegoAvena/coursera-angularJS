## Minification AKA uglify

Process of removing all unnecessary characters from source code without changing its functionality.

Its the process that makes our code unreadable, but makes it 100% functional as before. 

It removes things like comments, empty space, new lines, curly braces used for readability, etc.

Why? 

Reduces the amount of data transfered from the server

BUT

Minification can also ruin our dependency injection and therefore break our application. This is because it also shortens 
function names, getting rid of the service names which leaves AngularJS lost. To protect our code from minification, 
we can pass in string literals, which do not get minified, that represent the names of the params our function have, in this case, they would be the names of the services we want to use