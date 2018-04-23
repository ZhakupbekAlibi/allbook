angular
	.module('decode')
    .controller('ProfileCtrl', ProfileCtrl);
    ProfileCtrl.$inject = ['$http', '$modal', '$rootScope'];
   	function ProfileCtrl($http, $modal, $rootScope) {
       var vm = this;
       console.log($rootScope.currentUser);
       vm.blogs = [];
       $http.get('/api/blogs')
        .success(function(data){
            //console.log(data);
            vm.blogs = data;
             console.log(vm.blogs);  
        });
      
    
       
    vm.delete = function(blog) {
        $http.delete('/api/blogs/' + blog._id)
        .success(function(data){
            var index = vm.blogs.indexOf(blog);
            vm.blogs.splice(index, 1);  
            
           console.log("Deleted successfully"); 
        });
    }
    
    vm.editBlog = function(blog){
        var editModal = $modal({
            show: false,
            container: 'body',
            templateUrl: 'views/modal-edit--blog.html',
            controller: 'ModaleditblogCtrl',
            controllerAs: 'vm',
            resolve: {
                blog: function(){
                    return blog;
                }
            }
        });
        
        editModal.$promise.then(function() {
            editModal.show();
        }); 
    }
    
    vm.addPost = function(){
        var addModal = $modal({
            show: false,
            container: 'body',
            templateUrl: 'views/modal-add--blog.html',
            controller: 'ModaladdblogCtrl',
            controllerAs: 'vm',
            resolve: {
                blogs: function(){
                    return vm.blogs;
                }
            }
        });
        
        addModal.$promise.then(function() {
            addModal.show();
        });
    }
       
       
       console.log("Profile ctrl opened");
};