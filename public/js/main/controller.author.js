angular
	.module('decode')
    .controller('AuthorCtrl', AuthorCtrl);
    AuthorCtrl.$inject = ['$http', '$state'];
   	function AuthorCtrl($http, $state) {
        var vm = this;
        
        $http.get('/blogs/' + $state.params.user_id)
            .success(function(data){
                vm.blogs = data.blogs; 
                vm.user = data.user;
            });
};