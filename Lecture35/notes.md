# Modules

Biggest advantage: they allow us to modularize our application. We can split up our application into smaller parts, and combine them later. Allows us to in turn work on different parts independently, HUGE for collaboration.

__HOW TO USE__

1. Declare/Create module

angular.module('module1', []);

You may also specify other modules as dependencies, this is what the [] is for:

angular.module('module1', ['module2', 'module3']);

2. Declare module artifacts

angular.module('module1')
    .controller('MyController', MyController);

Notice that second argument is missing, this means that the call will expect that we have already defined the module, and will simply attempt to retrieve the module to attach an artifact. If we have not yet created the module, we will get an error.

3. ng-app='MainModule'

<!DOCTYPE html>
<html ng-app='module3'>
</html>

## Splitting Javascript into several files

<script src="src/mod1/module1.js"></script>
<script src="src/mod1/controller.js"></script>

<script src="src/mod2/module2.js"></script>
<script src="src/mod2/component.js"></script>

Much easier to place each artifact into their own files. Sometimes, this rule is broken though when code is small enough and placing the everything in the same file makes things more clear.

Order of module declaration does not matter, but artifact declaration must always occur after the module declaration!

__Configuration and Run Blocks__

.config runs before any other method on the module, where the function can inject only providers and constants:

angular.module('module1')
.config(function () {

});

.run is executed right after the config method. You can only inject constants and instances (like services) into this method:

angular.module('module1')
.run(function() {

});

In case of module dependencies, all the config methods of the dependencies will execute first. So in this case:

angular.module('module3', ['module1', 'module2']);

the config method of module 1 and module 2 execute first, followed by the config method of module 3. Same pattern for the run methods.