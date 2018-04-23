angular
	.module('decode')
    .controller('HomeCtrl', HomeCtrl);
    HomeCtrl.$inject = ['$http', '$modal'];
   	function HomeCtrl($http, $modal) {
       var vm = this;
        $http.get('/blogs')
        .success(function(data){
            //console.log(data);
            vm.blogs = data;
             console.log(vm.blogs);  
        });
};