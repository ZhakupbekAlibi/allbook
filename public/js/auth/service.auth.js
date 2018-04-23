angular
    .module('decode')
    .factory('Auth', Auth);

    Auth.$inject = ['$http', '$location', '$rootScope', '$cookies', '$state'];
        
    function Auth($http, $location, $rootScope, $cookies, $state) {
           
           
            $http.get('/api/user')
                .success(function(user){
                    $rootScope.currentUser = user;
                })
            
            
            //$cookies.remove('user');

            return {
                login: function(user) {
                    console.log("login");
                    return $http.post('/api/login', user)
                        .success(function(data) {
                            console.log(data);
                            $location.path('/profile');
                            $rootScope.currentUser = data;
                        })
                        .error(function(err) {
                            console.log(err);
                        });
                },
                signup: function(user) {
                    console.log("signup", user);
                    return $http.post('/api/signup', user)
                        .success(function(data) {
                            $location.path('/profile');
                            $rootScope.currentUser = data;
                           
                        })
                        .error(function() {
                           
                        });
                },
                logout: function() {
                    return $http.post('/api/logout').success(function() {
                        $rootScope.currentUser = null;
                        $cookies.remove('user');
                        $location.path('/');
                    });
                }
            };
        };