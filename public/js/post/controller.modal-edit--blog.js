angular
	.module('decode')
    .controller('ModaleditblogCtrl', ModaleditblogCtrl);
    ModaleditblogCtrl.$inject = ['$http', 'blog'];
   	function ModaleditblogCtrl($http, blog) {
       var vm = this;
       
       vm.blog = blog;
      console.log(blog);
      
      vm.edit = function(){
          $http.put('/api/blogs', vm.blog)
            .success(function(){
                
            });
      }
      
      vm.loadImg = function(file){
        vm.blog.img = "data:image/png;base64," + file.base64;
      }
      
};