## 2 way binding

The property for which a watcher has been assigned is affected in both ways: changing it in the controller will change it in the view, and changing it in the view will change it in the scope.

Example: 

> <input type="text" ng-model="name">

## 1 way binding

The property for which a watcher has been assigned can only be changed by the controller, the view cannot change it. 

Example: 

> <div> Echo: {{ lastName }} </div>

## 1 time binding

Each time we bind something, we create a new watcher and make the list of watchers that the Digest Cycle must go through larger. This means that if we have too many watchers, then we will have significant response times: our website will perform worse. So, __Keeping the number of watchers down is important__. 

1 time binding gives us a way to do such minimization. 

> <div>Echo: {{ ::fullName }} </div>

This makes it so that a watcher is only set up when that property is initialized. The watcher gets used 1 time to display the value of the property in the view, and then, the Digest Cycle gets rid of it. The downside to this is the watcher is only created once, so now, if we update the property in the controller, that change will not be reflected in the view! However, for some things like a username, something that will probably not change for a huge chunk of time, this approach is more optimal! 