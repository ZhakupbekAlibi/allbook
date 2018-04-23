angular
	.module('decode')
    .controller('ModalloginCtrl', ModalloginCtrl);
    ModalloginCtrl.$inject = ['Auth'];
   	function ModalloginCtrl(Auth) {
    	var vm = this;
   	    
   	    vm.login = function(){
   	        Auth.login({
   	            email: vm.email,
   	            password: vm.password
   	        })
   	    }
   	    
   	    
   	};