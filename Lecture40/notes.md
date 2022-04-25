# Route State With Nested Views

Sometimes it does not make sense for a state to exist as it's own state. Sometimes, we may want that state to be a child state of another state, this is done via nested views.

The benefit of using a child state, is also that the child state inherits some of it's parent's resolve properties

In short:

- Nested states allow us to logically represent nested views
- The parent state template has a ui-view in its template for the child state's template to insert its HTML
- Child state name is usually decalred with syntax 'parent.child'
- The optionally declared url of the child gets concatenated to declared url of the parent
- The parent's resolve property is inherited by the child and is injectable directly into the child's controller: allows us to avoid multiple server calls just to fetch the same data, more efficient

__How to declare a child state__

.state(view1.child, {
    url: 'detail/{param1}',
    templateUrl: 'viewDetail.html'
});

If the parent url was /view1, then the child url will be /view1/detail/{param}

__Inherited Resolve Properties__

.state('view1', {
    resolve: {
        myData: 'someVal';
    }
});

child state:

.state('view1.child', {
    controller: 'ChildCtrl as child'
});

Since the child inherits the parent states resolve properties, we can simply inject the myData into the child states controller function:

ChildCtrl.$inject = ['myData']
function ChildCtrl (myData) {

}

This can save us some extra server code, because we can just use the data that was already retrieved now!