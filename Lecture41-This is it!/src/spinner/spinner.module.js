(function (){
    'use strict';

    angular.module('Spinner', []);

    angular.module('Spinner')
    .config(function() {
        console.log("Spinner config fired.");
    })
    .run(function ($trace) {
        // To enable transition tracing:
        console.log("Spinner run fired.");
        //$trace.enable('TRANSITION');
    });
})();