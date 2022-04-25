# Route State with URL parameters

Sometimes we need to pass data with URLs, this is done with URL params. With ui-router, sending and retrieving these params is straightforward.

In short:
- Params are wrapped in curly braces, can have more complex matching rules other than just supplying a string (in fact, there is support for regular expression matching)

- Use $stateParams service to retrieve parameters: $stateParams.paramName

- Construct a URL with ui-sref directive: ui-sref='stateName({paramName: value});

1. Set up URL Property With Param(s)

.state('view1', {
    url: '/view1/{param1}',
    templateUrl: 'view1.html',
    controller: 'View1Ctrl as view1',
    resolve: {
        myData: ['$stateparams', function($stateParams) {
            return getDataBasedOn($stateParams.param1);
        }]
    }
});

All the params supplied in the url get placed into the $stateparams service. 

2. Inject Resolve Property into Controller
ViewCtrl.$inject = ['myData'];
function View1Ctrl(myData) {
    var view1 = this;
    view1.myData = myData;
}

<a ui-sref="view1({itemId:someVal})">Link to view with data</a>

ALSO IMPORTANT

You do not need to use a url to pass in params. Remember, using URLs is optional, so if you decide to not use a url, but need to pass in params, how do you do so?

Use the params property when declaring your state, like this:

.state('view1', {
    templateUrl: 'view1.html',
    controller: 'View1Ctrl as view1',
    resolve: {
        myData: ['$stateparams', function($stateParams) {
            return getDataBasedOn($stateParams.param1);
        }]
    },
    params:
    {
        param1 = null
    }
});