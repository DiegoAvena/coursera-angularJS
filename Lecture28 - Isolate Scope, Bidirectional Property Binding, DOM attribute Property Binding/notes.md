## Isolate Scope 

The scope of our parent controller will end up being the scope of our directive. This can cause some tight coupling issues to occur though. In the previous list app, we are unable to use our listItem directive to remove items from the list if we tried naming the list controllers as list 1 and list 2, because then we need to go into our listItem.html and change that to be list1 or list2. 

It is better to break away from this inherited scope and instead create an isolated scope just for our directive. This is where isolate scope comes into play. 

How to do this? 

> function MyDirective() {
>   var ddo = {
>       scope: { }
>   };
>   return ddo;
> }

The scope: {} signals that the parent scope is not inherited, but now, HOW DO WE GET THE DATA THAT WE NEED INTO OUR DIRECTIVE? We explicitly bind specific attributes to this scope: we use __scope bindings__. There are several binding methods we can use here: 

### Bidirectional Property Binding 

In JS:

> function MyDirective() {
>   var ddo = {
>       scope: {
>           myProp: '=attributeName'
>       }
>   };
>   return ddo;
> }

- myProp is the property that you are mapping something outside of the directive scope into, while the value is some HTML template attribute name

- the = before the attribute name signals this is __BidirectionalBinding__: if you change the parent value then the value of that property in the directive scope also changes, and vice versa (its 2 way binding if you recall from a previous lecture)

- If we just do __myProp: '='__, angularJS assumes that the attribute is named the same as the directives property name, in this case, it will assume the attribute is named "my-prop"

- If we do __myProp: '=?'__, this means that the attribute is optional. 

In html we do: 

> <my-directive my-prop="outerProp"></my-directive>

Again, we must use a dash, because angularJS will normalize the names of our tags: my-directive will become myDirective, and my-prop will become myProp

### DOM Attribute Property Binding 

In JS:

> function MyDirective() {
>   var ddo = {
>       scope: {
>           myProp: '@myAttribute'
>       }
>   };
>   return ddo;
> }

Binds myProp value to the value of DOM attribute named my-attribute. This setup behaves as __1 way binding__: If the outer value of the property changes, then so does the value of the property in our directive, but if the value of our property changes inside the directive, the value of the outer property will not change. It also always results in a directive property being a string. 

In html we do: 

> <my-directive my-attribute="{{outerProp}}"></my-directive>

Again, AngularJS will take the my-attribute name and normalize it to myAttribute. Also, there is nothing stopping us from doing regular interpolation inside of our attributes: 

> <my-directive my-attribute="Hi {{outerProp + '!'}}"></my-directive>
