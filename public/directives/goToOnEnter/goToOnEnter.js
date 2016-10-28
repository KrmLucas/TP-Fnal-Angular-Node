(function(){
    'use strict'
    angular.module('myKeyPressDirective',[])
    .directive('goToOnEnter', function(){
        return function(scope, element, attrs) {
      		element.bind("keydown keypress", function(event) {
      			if (event.which === 13) {
      				$(attrs.goToOnEnter).focus();
      			}
      		});
      	};
    })
})();
