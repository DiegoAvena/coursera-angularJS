(function() {
    'use strict';

    angular.module('Spinner')
    .component('loadingSpinner', {
        templateUrl: 'src/spinner/spinner.template.html',
        controller: SpinnerController
    });

    // Legacy way of doing this:
    /*SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope)
    {
        var $ctrl = this;
        var cancellers = [];

        $ctrl.$onInit = function()
        {
            console.log("Spinner controller init called");
            console.log("Rootscope:", $rootScope);
            var cancel = $rootScope.$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams, options) {
                console.log("State change started");
                $ctrl.showSpinner = true;
            });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess', 
            function(event, toState, toParams, fromState, fromParams) {
                console.log("State change success");
                $ctrl.showSpinner = false;
            });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError', 
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log("State change error");
                $ctrl.showSpinner = false;
            });
            cancellers.push(cancel);
            console.log(cancellers);
        }

        // Prevent memory leak with callback above so we unsubscribe from the event when we change views
        $ctrl.$onDestroy = function()
        {
            console.log("Spinner destroy called");
            cancellers.forEach(function (item) {
                item();
            });
        }
    }*/

    // New way uses $transitions, see: https://ui-router.github.io/guide/transitionhooks
    SpinnerController.$inject = ['$transitions']
    function SpinnerController($transitions)
    {
        var $ctrl = this;

        $ctrl.$onInit = function()
        {
            $transitions.onStart({}, function(transition) {
                $ctrl.showSpinner = true;
            });

            $transitions.onSuccess({}, function(transition) {
                $ctrl.showSpinner = false;
            });

            $transitions.onError({}, function(transition) {
                $ctrl.showSpinner = false;
            });
        }
    }
})();