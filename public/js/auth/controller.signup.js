angular
	.module('decode')
    .controller('ModalsignupCtrl', ModalsignupCtrl);
    ModalsignupCtrl.$inject = ['Auth'];
   	function ModalsignupCtrl(Auth) {
    	var vm = this;
   	    
   	    vm.signup = function(){
   	        Auth.signup({
   	            email: vm.email,
   	            name: vm.name, 
                lastname: vm.lastname, 
   	            password: vm.password
   	        })
   	    }
   	    
   	    
   	};