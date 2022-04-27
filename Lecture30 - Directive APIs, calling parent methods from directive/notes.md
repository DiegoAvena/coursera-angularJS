## Directive APIs 

Sometimes we need our directive to call a method from its parent, passing it data that only our directive would know about. 

__EXAMPLE__

Take the shopping list directive we have been working with in the previous lecture. Suppose we modify that directive such that it also contains a way to remove items from the shopping list. This can be challenging though, because our directive does not own the actual list of items, this is owned by the parent controller. All our directive is responsible for is to display that data, NOT modify it! So, how can we add a remove option to our directive while keeping the actual modifying of the shopping list inside of the parent controller? We somehow need to set up a link from the directive to a method in the parent controller such that the parent controller executes that method to modify the list whenever the directive detects the remove button has been clicked...

We must be careful though, we need the parent controller to execute that data manipulation in its context, not in the directive's context: the parent controller should refer to its scope and NOT the directives isolated scope when doing this operation. 

We can accomplish this with a reference binding, represented by the & symbol. So now, we can pass callbacks into the directive and be sure to execute those callbacks within the scope of the parent controller, insuring we are changing the values we intend to change.

### Step 1: Define Method in Controller

> function Controller() {
>   this.method = function (arg1) {
>       this.prop = "Hi " + arg1; 
>   }; 
> }

- this refers to the parent controller instance on the $scope 
- arg1 is what needs to come from child directive 

### Step 2: Declare Method Reference in Directive 

> function MyDirective() 
> {
>   var ddo = {
>       scope: {
>           myMethod: '&method'
>       },
>       templateURL: 'template.html' 
>   }
>   return ddo; 
> }; 

- myMethod is a property used to reference the parent method in this directive 
    - the value is what we need to use in the parent's html template 

### Step 3: Declare In Parent's Template 

> <div ng-controller="Controller as ctrl"> 
>   <my-directive method="ctrl.method(myArg)">
>   </my-directive>
> </div>

- the myArg is simply a key we will use to pass in a value from the directive later on. The reference binding symbol will tell angular to map that myArg key to a value in our directive

### Step 4: Map Method and args in directives template

> <button ng-click="dirCtrl.myMethod({myArg: 'v1'});"> Remove Item </button>

- {myArg: 'v1'} is the map of the parent template declared arg name (myArg) to a value from our directive