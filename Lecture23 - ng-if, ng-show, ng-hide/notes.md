## ng-if, ng-show, ng-hide

Some more useful directives in angularJS

ng-if takes a condition, and if it is false, it will hide the entire html element: removes it from the dom by commenting it out. 

ng-show does exactly what ng-if does, but behind the scenes, instead of completely removing the html element, it uses special html classes that angularJS has preconfigured so that the elements in that class are hidden or shown as required (the class will have something in its css styling called display: none or display: all). 

ng-hide is the opposite of ng-show: it will hide the element, rather than show it, if the condition it is provided evaluates to true. 

__IMPORTANT__ Since ng-show and ng-hide do not remove the entire html element from the DOM, then we can still manipulate that html element while it is hidden, which is something we cannot do with ng-if.