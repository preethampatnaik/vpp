/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('dashboards', {
                url: '/dashboards',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl'
            })
            .state('blankpage', {
                url: '/blankpage',
                templateUrl: 'views/blank-page.html'
            })
            .state('blank-page1', {
                url: '/blank-page1',
                templateUrl: 'views/blank-page1.html'
            })
			.state('blanksubpage2', {
                url: '/blanksubpage2',
                templateUrl: 'views/blank-sub-page2.html'
            })
			.state('output', {
                url: '/output',
                templateUrl: 'views/output.html'
            }).state('mapsGoogle', {
                url: '/mapsGoogle',
                templateUrl: 'views/mapsGoogle.html',
            }).state('typeOne', {
                url: '/typeOne',
                templateUrl: 'views/typeOne.html',
            }).state('typeTwo', {
                url: '/typeTwo',
                templateUrl: 'views/typeTwo.html',
            });


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/typeOne');
            $state.go('typeOne');
        });

    }]);
});
