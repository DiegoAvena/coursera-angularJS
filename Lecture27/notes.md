## Directives: restrict property

Like the template and templateURL ddo properties we can define in our custom directive factory functions, the restrict property is another ddo property we can define and use. 

This property tells angularJS where to detect your custom html directive. Should it try to detect it as an attribute, or look for an element with the name of your custom attribute? 

If you do not specify this property, angularJS will default its value to be AE: Attribute and Element. This means that angular will look for your directive as being either an attribute or an element. 

__How To Use__

> function MyDirective() {
>   var ddo = {
>       restrict: 'AE',
>   };
>   return ddo; 
> }

Other restrict options: 

- 'A'
    - Restricts directive to being detected only as an attribute. 
    - Best practice to use this if directive is extending behavior, such as ng-repeat, etc 
- 'E'
    - Restricts directive to being detected only as an element. 
    - Best practice to use this if directive is defining a component with an associated template, such as <list-item> (from the lecture before)

__NOTE__ If you restrict your custom directive to 1 option, and later on mismatch it in the actual html code, angularJS will not complain, it will simply ignore it. 