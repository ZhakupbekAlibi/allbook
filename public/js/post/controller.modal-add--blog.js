angular
	.module('decode')
    .controller('ModaladdblogCtrl', ModaladdblogCtrl);
    ModaladdblogCtrl.$inject = ['$http', 'blogs'];
   	function ModaladdblogCtrl($http, blogs) {
       var vm = this;

      vm.saveIt = function(){
           var sendData = {
               title: vm.title,
               description: vm.description,
               img: vm.img
           };
           
           
           $http.post('/api/blogs', sendData)
            .success(function(blog) {
                //$state.reload();
                blogs.push(blog);
            });
       }
       
       vm.loadImg = function(file) {
           vm.img = "data:image/png;base64," + file.base64;
       }
};