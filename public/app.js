angular.module('decode', [
		'ui.router',
		'ngCookies',
		'ngResource',
		'mgcrea.ngStrap',
		'naif.base64'
		])
    .config(routeConfig);
	console.log("1");
    routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

	function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    	$locationProvider.html5Mode(true);

	    $urlRouterProvider.otherwise('/');

		$stateProvider

		.state('profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
		    controller: 'ProfileCtrl',
			controllerAs: 'vm'
		})
		.state('blog', {
			url: '/:from/blog/:id',
			templateUrl: 'views/blog.html',
		    controller: 'BlogCtrl',
			controllerAs: 'vm'
		})
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
		    controller: 'HomeCtrl',
			controllerAs: 'vm'
		})
		.state('author', {
			url: '/author/:user_id',
			templateUrl: 'views/author.html',
		    controller: 'AuthorCtrl',
			controllerAs: 'vm'
		})
		
    };