angular
	.module('decode')
    .controller('HeaderCtrl', HeaderCtrl);
    HeaderCtrl.$inject = ['Auth', '$rootScope', '$modal'];
   	function HeaderCtrl(Auth, $rootScope, $modal) {
    	var vm = this;
        
        vm.user = $rootScope.currentUser;
        
        vm.openSignup = function(){
            var signupModal = $modal({
                show: false,
                container: 'body',
                templateUrl: 'views/modal-signup.html',
                controller: 'ModalsignupCtrl',
                controllerAs: 'vm'
            });
            
            signupModal.$promise.then(function() {
                signupModal.show();
            });
        }
        
        vm.openLogin = function(){
            var loginModal = $modal({
                show: false,
                container: 'body',
                templateUrl: 'views/modal-login.html',
                controller: 'ModalloginCtrl',
                controllerAs: 'vm'
            });
            
            loginModal.$promise.then(function() {
                loginModal.show();
            });
        }
        
        vm.logout = function(){
            Auth.logout();
        }
        
        $rootScope.$watch('currentUser', function(){
             vm.user = $rootScope.currentUser;
        })
   	    
   	};