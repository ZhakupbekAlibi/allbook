angular
	.module('decode')
    .controller('BlogCtrl', BlogCtrl);
    BlogCtrl.$inject = ['$http', '$state'];
   	function BlogCtrl($http, $state) {
        var vm = this;
        
    $http.get('/api/blogs/' + $state.params.id)
        .success(function(blog){
            vm.blog = blog;
            console.log(vm.blog);
        });
    
    $http.get('/api/comments/' + $state.params.id)
        .success(function(comments){
           vm.comments = comments; 
        });
        
        
    $http.get('/api/likes/' + $state.params.id)
    .success(function(data){
        vm.likes = data.likes;
    })
    
    vm.goBack = function(){
        if($state.params.from=='profile')
            $state.go('profile');
        else if($state.params.from=='home')
            $state.go('home')
        else 
            $state.go('author', {user_id: vm.blog.user})
    }
    
    
    vm.saveComment = function(){
        $http.post('/api/comments', {
            blog: vm.blog._id,
            description: vm.description
        }).success(function(comment){
            vm.comments.push(comment);
            vm.description = '';
        });
    }
    
    vm.delete = function(comment) {
        $http.delete('/api/comments/' + comment._id + '/'
                                      + vm.blog.user._id + '/' 
                                      + comment.user._id)
            .success(function(){
                var index = vm.comments.indexOf(comment);
                vm.comments.splice(index, 1);
            })
    }
    

    vm.editcomment_id = '';
    
    vm.edit = function(comment) {
        vm.editcomment_id = comment._id;
    }
    
    vm.editComment = function(comment) {
        vm.editcomment_id = "";
        $http.put('/api/comments', comment);
    }
    
    vm.likeIt = function(){
        $http.post('/api/likes', {
            blog: vm.blog._id
        }).success(function(data){
            if(data.dislike==true) {
                vm.likes--;
            } else {
                vm.likes++;
            }
            console.log(data);
        })
    }

    console.log("Blog ctrl opened", $state.params);
};