

//$http({
//	url:"http://route.showapi.com/255-1",
//	type:"post",
//	method:"POST",
//	params:{
//		type:10,   //10图片，29段子，31音乐 41视频
//		page:1,
//		showapi_appid:26917,
//		showapi_sign:"e788cb5b5ce44968a9e03f73431178b4",
//	}
//}).success(function(data){
//	
//})


var app = angular.module("myApp",['ionic','globalApp']);
app.controller("myCtrl",function($rootScope,$compile,$sce,$scope,$http,$ionicScrollDelegate,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$ionicLoading){
	//$ionicSideMenuDelegate.canDragContent(false);
	//遮罩层
	$rootScope.show = function() {
		$ionicLoading.show({
			template: 'Loading...',
			noBackdrop: true
		});
	};
	$rootScope.hide = function() {
		$ionicLoading.hide();
	};
	
	$scope.temp1=$scope.temp2=$scope.temp3=$scope.temp4=[];
	$scope.more2=$scope.more3=$scope.more4=false;
	
	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
    }
	
	
	
	$scope.doRefresh = function(index) {
		$scope.disable = false;
		typeChoose($('.span_atc').html());
		$http({
			url: "http://route.showapi.com/255-1",
			type: "post",
			method: "POST",
		}).success(function(data) {
			var obj = data.showapi_res_body.pagebean.contentlist;
			if(common.type == 10) {
				$scope.temp1 = obj;
			} else if(common.type == 29) {
				$scope.temp2 = obj;
				$scope.more2 = true;
			} else if(common.type == 31) {
				$scope.temp3 = obj;
				$scope.more3 = true;
			} else if(common.type == 41) {
				$scope.temp4 = obj;
				$scope.more4 = true;
				console.log(obj);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).finally(function() {
			// 停止广播ion-refresher
			$scope.$broadcast('scroll.refreshComplete');
			$ionicScrollDelegate.resize();
			
		});
	}
	
	$scope.span = common.span_title;
	
	//底部刷新
	$scope.loadMore = function() {
		if(common.page>=40){
			common.page=1;
		}else{
			common.page += 1;
		}
		$http({
			url: "http://route.showapi.com/255-1",
			type: "post",
			method: "POST",
		}).success(function(data) {
			var obj = data.showapi_res_body.pagebean.contentlist;
			if(common.type == 10) {
				$scope.temp1 = $scope.temp1.concat(obj);
			} else if(common.type == 29) {
				$scope.temp2 = $scope.temp2.concat(obj);
			} else if(common.type == 31) {
				$scope.temp3 = $scope.temp3.concat(obj);
			} else if(common.type == 41) {
				$scope.temp4 = $scope.temp4.concat(obj);
			}
			
		}).finally(function() {
			// 停止广播ion-refresher
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
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
	$scope.slideHasChanged = function(index) {
		$('.span_title span').removeClass('span_atc').eq(index).addClass('span_atc');
		//console.log(this);
		loadOne(index);
		
	}

	//点击span改变滑动
	$scope.spanClick = function(index) {
		$('.span_title span').removeClass('span_atc').eq(index).addClass('span_atc');
		$ionicSlideBoxDelegate.slide(index);
		loadOne(index);
	}

	function loadOne(index){
		if(index==0){
			if($scope.temp1[0]==undefined){
				$scope.doRefresh();
			}
		}else if(index==1){
			if($scope.temp2[0]==undefined){
				$scope.doRefresh();
				
			}
		}else if(index==2){
			if($scope.temp3[0]==undefined){
				$scope.doRefresh();
			}
		}else if(index==3){
			if($scope.temp4[0]==undefined){
				$scope.doRefresh();
				
			}
		}
	}
	
	

	//跟下面的filter一样    解决src不支持的问题,,直接在ng-src中使用这个方法即可
	$scope.trustSrc = function(url) {
		return $sce.trustAsResourceUrl(url);
	}

	$scope.openBox = function(str) {
		$('.shadowAll').show();
		
	}
	$scope.closeBox = function() {
		$('.shadowAll').hide();
		$('.shadowscroll img').attr("src", "");
		$('.shadowscroll video').attr("src", "");
		$scope.videoAtc = false;
	}
	
	$scope.musClick = function(k,index,event){
		k.video = !k.video;
		if($scope.video1){
			$scope.video1 = false;
		}else{
			$scope.video1 = true;
		}	
	}
	
	$scope.imgClick = function(k,url){
		$('.shadowAll').show(300);
		$('.shadowAll img').attr("src",url);
		$scope.videoDown = "";
	}
	
	
	$scope.videoClick = function(url){
		$scope.videoAtc = true;
		$('.shadowAll').show(300);
		$scope.videoDown = $scope.trustSrc(url);
	}
	
	$('.boxFooter a').on('click',function(){
		$('.Aatc').removeClass('Aatc');
		$(this).addClass('Aatc');
	})
	
	
	
	
	
})

window.onload = function(){
	document.onclick = function(evt){
		var _evt = evt || event;
		console.log(1);
		console.log(_evt.target);
	}
}

app.filter('trusted', ['$sce', function($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}])


app.directive("ionSlideBox",function(){
	return function(scope,element,attrs){
		$(element).height($(element).parent().height());			
	}	
})