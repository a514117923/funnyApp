var app = angular.module("myApp",['ionic','globalApp']);
	app.controller("myContCtrl",function($rootScope,$scope,$http,$ionicScrollDelegate,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$ionicLoading){
		//遮罩层
		$rootScope.show = function() {
			$ionicLoading.show({
				template: 'Loading...',
				noBackdrop:true
			});
		};
		$rootScope.hide = function() {
			$ionicLoading.hide();
		};
		
		
		
		$scope.doRefresh = function(){
			typeChoose($('.span_atc').html());
			$http({
				url:"http://route.showapi.com/255-1",
				type:"post",
				method:"POST",
			}).success(function(data){
				var obj = data.showapi_res_body.pagebean.contentlist;
				if(common.type==10){
					$scope.temp1 = obj;
				}else if(common.type==29){
					$scope.temp2 = obj;
				}else if(common.type==31){
					$scope.temp3 = obj;
				}else if(common.type==41){
					$scope.temp4 = obj;
				}
				
			}).finally(function(){
			    // 停止广播ion-refresher
			    $scope.$broadcast('scroll.refreshComplete');
			    $scope.$broadcast('scroll.infiniteScrollComplete');
			    $ionicScrollDelegate.resize();
			    
			});
		}
		$scope.doRefresh();
		$scope.span = common.span_title;
		
		//底部刷新
		$scope.loadMore = function(){
			common.page+=1;
			$scope.doRefresh();
		}
		$scope.$on('stateChangeSuccess', function() {
    		$scope.loadMore();
		});
		
		
		
		//左右侧滑
		$scope.toggleLeft = function() {
		    $ionicSideMenuDelegate.toggleLeft();
		};
		$scope.toggleRigth = function() {
		    $ionicSideMenuDelegate.toggleRight();
		};
		
		//左右滑
		$scope.nextSlide = function() {
		    $ionicSlideBoxDelegate.next();
		}
		//$ionicSideMenuDelegate.canDragContent(false);
		
		//滑动改变span
		$scope.slideHasChanged= function(index){
			$('.span_title span').removeClass('span_atc').eq(index).addClass('span_atc');
			//console.log(this);
			
//			if(inex ==1){
//				mid1 = 
//			} ese
		}
		
		//点击span改变滑动
		$scope.spanClick = function(index){
			$('.span_title span').removeClass('span_atc').eq(index).addClass('span_atc');
			$ionicSlideBoxDelegate.slide(index);
		}
		
		//跟下面的filter一样    解决src不支持的问题,,直接在ng-src中使用这个方法即可
		$scope.urlTrusted = function(url){
			return  $sce.trustAsResourceUrl(url);
		}
		
		$scope.openBox = function(str){
			$('.shadowAll').show();
			$('.shadowscroll iframe').attr("src",str);
			
		}
		$scope.closeBox = function(){
			$('.shadowAll').hide();
			$('.shadowscroll iframe').attr("src","");
		}
		
		
		
		
		
	})
	
	app.filter('trusted', ['$sce', function ($sce) {
	    return function (url) {
	        return $sce.trustAsResourceUrl(url);
	    };
	}])
	
	
    //扩充指令    重写指令
//	app.directive("ionSlideBox",function(){
//		return function(scope,element,attrs){
//			$(element).height($(element).parent().parent().height());			
//		}
//		
//	})

