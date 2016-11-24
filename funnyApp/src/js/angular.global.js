var globalApp = angular.module("globalApp",[]);
globalApp.config(["$httpProvider",function($httpProvider){
	$httpProvider.interceptors.push(function($rootScope,$q){
		return {
			"request": function(config){
				if(common.type==10){
					console.log(11);
					$('.span_title span:first').addClass('span_atc');
				}
				
				if(config.url.indexOf("showapi")>-1){
					var _p = config.params ||{};
					_p.type = common.type;
					_p.page = common.page;
					_p.showapi_appid= common.appid;
					_p.showapi_sign = common.sign;
					config.params = _p;
				}
				$rootScope.show();
				return config || $q.when(config);
			},
			"requestError":function(rejection){
				return rejection;
			},
			"response":function(response){
				$rootScope.hide();
				return response || $q.when(response);
			},
			"responseError":function(response){
				$rootScope.hide();
				return $q.reject(response);
			}
		}
	})
}])