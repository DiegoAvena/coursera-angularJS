# Routing

Very often you will have content on a view that has to be replaced by some other content. Users need to be able to get from 1 view to another view of your application. 

## Client-Server Communication, Web 1.0

We have the browser, and the server. 

The browser sends a GET request for a specific page of the website, and the server responds with that html file.

Even if the user only changed 1 little thing, such as entering a password, the GET request will be sent with that additional data, and the server would still send the entire page again, even though it really only needed to send the password components back. Such updates are called __Coarse Grained Updates__: Even for the smallest updates the client makes, a huge amount of data transfer is still done between client and server. This cloggeed up networks and made things pretty slow.

In this model, the routing from 1 view to another was done by the server/backend.

## Web 2.0 Client Server Communication

We have the browser, and the server. 

Essentially the same as with Web1.0, but fixed the __Coarse Grained Updates__ issue with AJAX: AJAX was now used so that only the data that was updated is sent back from the server, rather than the entire page being sent back: these more focused updates are called __Fine-grained updates__. It was now the browsers job to take these fine grained updates and apply them to its local version of the html file.

Main disadvantage: 

If user wanted to go back to the page before it was updated with this data, the back button would not work: it would simply go back to the previous page, rather than to the version of this page without the data changes.

This was happening because the server was still handling the routing from view to view, so when the user clicked the back button, the server would handle this, but the server has no idea of the new state the current page was put in as a result of only needing to send the fine grained updates back, so it just goes entirely back to the previous page.

## Single Page Application (SPA) Model (this is AngularJS and Angular)

We have the browser, and the server

The beginning of the client and server interactions is the same as before: browser sends a get request for relevant html and css files, server responds with those files. 

When user clicks on a URL, a GET# is formed, but it is not sent to the server, instead, the same view is updated with the data. Of course, we can still make requests to the server for say, some template html, it's just that it is no longer needed. 

The # at the end is what tells the browser javascript to peform the routing on its own, rather than allowing the server to do so. Traditionally, the # was used to tell the browser to scroll down to the part of the page where the element was marked with the name of the hashtag.

By allowing the browser to take care of the routing, it can now naturally keep track of which views were updated, loaded, etc. so we do not run into that back button issue we had before.

Today, we can make the URLs work in this manner (allow the browser to take care of routing) without the # if we configure the server to run in html5 mode.

Besides using URLs to get from view to view, we can also use what are called States: each state contains ALL of the data for a view that we can then instantiate by putting ourselves into that state: these states represent each route in our app. Each of these states is represented by a javascript object. 

This makes it so that the URL is not updated (which is what we should aim for), only the programmatic state of the view is updated.

## Routing options in AngularJS

1. ngRoute
- Installed as a separate JS file, not part of the core angularJS file
- Developed by Google & community: open source
- No concept of a UI State, so every route must be represented by a URL
- No concept of nested views
- The 2 limitations above make this OK for prototype projects

2. ui-router

- Installed as a separate JS file, not part of core angularJS file
- Developed by community: open source
- UI state is central: can have a route with no unique URL for that route
- URL routing is also supported though: can have a state associated with a unique URL, the UI state is updated based on that URL
- Nested views are supported
- The 3 things above make this the better choice for serious projects

__HOW TO USE UI-ROUTER__

1. Reference in HTML

<script src="lib/angular.min.js"></script>
<script src="lib/angular-ui-router.min.js"></script>

MAKE SURE: since ui-router depends on angularJS, it needs to be loaded after the core angular package has been loaded

2. Place ui-view Initial View Placeholder

<body>
    <ui-view></ui-view>
</body>

Mark in the html where our interchangable view can go. When the content of a view is loaded, it will be placed in the ui-view directive we placed here.

3. Declare ui-router as a dependency
angular.module('App', ['ui.router']);

Notice: the name of the module is ui.router, not ui-router.

4. Configure Routes in the .config method

angular.module('App')
    .config(RoutesConfig);

RoutesConfig.$inject = [$stateProvider, $urlRouterProvider];
function RoutesConfig($stateProvider, $urlRouterProvider) {

}

Allows us to configure the data that the 2 services, stateProvider and routerProvider, will be instantiated with:

$stateProvider
    .state('view1', {
        url: '/view1',
        template: '<div>...</div>'
    })
    .state('view2', {

    });

- The url property is optional, but this allows us to assign a state to a specific url.
- The template property is the contents that will be inserted into ui-view
- There is also a templateURL property we can use, which will use AJAX to retrieve this template html from the server when this state becomes activated, and then insert it into the ui-view tag

$urlRouterProvider
    .otherwise('/view1');

- this tells the browser that when it tries to retrieve a state at a given url, and that url does not exist, it should fallback onto the url provided in the otherwise method here: like an else clause, or default. So, if the user types in the wrong URL, the application will still load up this default view at this URL.