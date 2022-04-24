## Using directives transcludeto wrap other elements

Sometimes we need to pass in an entire html template to our directive html template. Common use case is a dialog box: such templates must also be generic enough to allow us to change their contents with ease.

Using transclude allows us to define this content. 

__HOW TO USE TRANSCLUDE__

1. Set transclude to true

function MyDirective() {
    var ddo = {
        scope: {},
        transclude: true,
        ...
        templateURL: 'template.html'
    };

    return ddo;
}

2. Wrap Some Parent Content

<my-directive>
    <span>
        WARNING! WARNING! {{ctrl.someProp}}
    </span>
</my-directive>

The properties will get evaluated in the parent controller, not in our directive

3. ng-transclude To Place Wrapped Content

<div>
    <div ng-transclude></div>
</div>

Insert evaluated wrapped content into element marked with ng-transclude. This tells angularJS where to place the content that was wrapped in the template.