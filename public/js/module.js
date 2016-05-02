'use strict';

var app = angular.module('productsApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('details', {
        url: '/details/:id',
        templateUrl: '/html/details.html',
        controller: 'detailsCtrl'
    }).state('statistics', {
        url: '/statistics',
        templateUrl: '/html/statistics.html',
        controller: 'statsCtrl'
    });

    $urlRouterProvider.otherwise('/');
});