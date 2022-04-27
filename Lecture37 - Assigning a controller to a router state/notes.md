# Route state with Controller

We can also define a controller that will be responsible for the template html element we pass in via the templeteUrl property of our states.

Given the following state:

.state('home', {
    url: '/',
    templateUrl: 'home.html'
})

home.html: 

<div ng-controller='HomeCtrl as home'>
    <div>content...</div>
    <div>content...</div>
</div>

This is not efficient, the outer div tag is only present so that we can declare a controller! Ui router allows us to pull out this declaration and instead place it directly onto the state declaration:

.state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'HomeCtrl as home'
})

We assume that HomeCtrl is being created via the angulur.controller method. But if we do not want to assume that, then we would actually pass in the controller function in controller property, and then use the controllerAs property to use controller as syntax, like this:

.state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: HomeCtrl
    controllerAs: 'home'
})

Now, our home.html can simply be: 
<div>content...</div>
<div>content...</div>

We can now even use this template html with different controllers because we pulled the controller declaration out of it! Makes our code more modular now.