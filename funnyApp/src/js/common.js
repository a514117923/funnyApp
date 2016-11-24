var common = common || {};
common.type = 10;
common.page = 1;
common.appid = 26917;
common.sign = "e788cb5b5ce44968a9e03f73431178b4";
common.span_title = ["图片","段子","音乐","视频"];

function typeChoose(str){
	if(str=="图片"){
		common.type = 10;
	}else if(str=="段子"){
		common.type = 29;
	}else if(str=="音乐"){
		common.type = 31;
	}else if(str=="视频"){
		common.type = 41;
	}else{
		common.type = 10;
	}
	
}
