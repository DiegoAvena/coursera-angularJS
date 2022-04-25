# Route State With resolve

With this, we can retrieve the data we need first, and then present our view. Prior, we were displaying the view, and then calling an async method to retrieve the data inside of the $onInit. This can make our app feel more polished, and also prevent potential errors too...

In short:

- Resolve property can be used to inject values directly into the controller responsible for the state.
- If resolve property is a promise, the router will wait for it to resolve before transitioning to the state, and if this promise is rejected, the router will not transition to the new state at all
- The name of the key in the resolve's property object is what is to be injected into the corresponding controller's function
- Resolve can have properties that contain anything: objects, strings, etc.

__HOW TO USE__

1. Set up resolve property

.state('view1', {
    url: '/view1',
    templateUrl: 'view1.html',
    controller: 'View1Ctrl as view1',
    resolve: {
        myData: ['Service', function (Service) {
            return Service.getData();
        }]
    }
});

Resolve is a configuration object, we place data in here that we want to initialize before the view is displayed. Service.getData() returns a promise, and myData ends up getting injected into View1Ctrl as myData.

If resolve gets set to a promise, as in this case, then the router will not take us to the new state until the promise is resolved. If the promise is rejected, the router will not advance to the new state at all.

2. Inject resolve property into controller

View1Ctrl.$inject = ['myData'];
function View1Ctrl(myData) {
    var view1 = this;
    view1.myData = myData;
}

__NOTE__
Resolve properties do not have to be promises, can be anything
