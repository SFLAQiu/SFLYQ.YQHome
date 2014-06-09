/*
*javascript document
*author：SFLYQ
*/
(function(){
	SFLYQ_jQuery=undefined;
	//日志模块
	var msgBox=function(){
		var mb=this;
		this.ini=function(){
			mb.bindMsgBox();
		};
		this.bindMsgBox=function (){
			if(document.getElementById("SFLYQ_MsgBox"))return;
			var ds=	document.createElement('div');
			ds.id="SFLYQ_MsgBox";
			ds.style.cssText="z-index:9999999;width:422px;height:180px;border:1px solid #000000;background-color:#ffffff;position:fixed;_position: absolute;_top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight);left:10px;top:10px;display:none;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;";
			var boxStr=
			'<div style="background-color:#0693cd;border-bottom:1px solid #000000;position:relative;color:#ffffff;font-weight: bolder;">SFLYQ V1.0广告清理日志：<a id="SFLYQ_Close" style="position:absolute;right:5px;" href="javascript:;">X</a></div>'+
			'<textarea id="SFLYQ_MsgBox_Content" style="width:420px;height:160px;"></textarea>';
			document.getElementsByTagName('body')[0].appendChild(ds);
			document.getElementById("SFLYQ_MsgBox").innerHTML=boxStr;
			document.getElementById("SFLYQ_Close").onclick=mb.hide;

		};
		this.show=function(){
			if(document.getElementById("SFLYQ_MsgBox"))document.getElementById("SFLYQ_MsgBox").style.display="block";
		};
		this.hide=function (){
			if(document.getElementById("SFLYQ_MsgBox"))document.getElementById("SFLYQ_MsgBox").style.display="none";
		};
		this.clearValue=function (){
			if(document.getElementById("SFLYQ_MsgBox_Content"))document.getElementById("SFLYQ_MsgBox_Content").value="";
		};
		this.write=function (str){
			if(document.getElementById("SFLYQ_MsgBox_Content")) document.getElementById("SFLYQ_MsgBox_Content").value+=str+"\r\n";
		};
	}
	//启动日志模块
	var mb=new msgBox();
	//debugger;
	mb.ini();
	mb.clearValue();
	mb.show();
	//添加脚本到head中
	function doAddScript(httpJs,attrKey){
		SFLYQ_jQuery=undefined;
		var ds = document.createElement('script');
		ds.type = 'text/javascript'; ds.async = true;
		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//'+httpJs;
		ds.charset = 'UTF-8';
		ds.setAttribute("adjq",attrKey);
		(document.getElementsByTagName('head')[0]
		|| document.getElementsByTagName('body')[0]).appendChild(ds);
		mb.write("=>添加jquery.SFLYQ.1.9.1.min.js脚本！");
	}
	//判断脚本是否添加
	function doCheckHaveAdJq(attrKey){
		mb.write("=>校验javascript类库"+attrKey+"是否存在！");
		var jsArr=document.getElementsByTagName("script");
		if(!jsArr || jsArr.length<=0) return false;
		for(var i=0;i<jsArr.length;i++){
			var itemJq=jsArr[i];
			if(itemJq.getAttribute("adjq")==attrKey) return true;
		}
		return false;
	}
	//添加加载jq
	if(!doCheckHaveAdJq("jquery.SFLYQ.1.9.1.min.js")){
		doAddScript("sandbox.runjs.cn/uploads/rs/89/s6tmn5tc/jquery.SFLYQ.1.9.1..js");
	}
	//广告选择器配置
	var adSelData=[
		{
			"key":"百度广告",
			"selArr":
			[
				"[id*='BAIDU']",
				"[class*='BAiDU']",
				"[href*='cpro.baidu']",
				"[id*='cproIframe']",
				"iframe[src*='baidu']",
				"[id='bdshare']"
			]
		},
		{
			"key":"通用",
			"selArr":
			[
				"[id^='ads']",
				"[id^='ad']",
				"[class^='ads']",
				"[class^='ad']",
				"[class*='advert']",
				"ins"
			]
		},
		{
			"key":"谷歌",
			"selArr":
			[
				"[id*='google_ads']"
			]
		},
		{
			"key":"腾讯",
			"selArr":
			[
				"iframe[src*='adsfile.qq.com]"
			]
		}
	];
	//更具广告选择器配置，得到选择器字符串用',隔开'
	function getSelStradSelData(data){
		var str="";
		if(!data||data.length<=0)return str;
		for(var i=0;i<data.length;i++){
			if(!data[i].selArr)continune;
			str+=data[i].selArr.join(",")
			if(i<data.length-1)str+=",";
		}
		return str;
	}
	
	//清理广告
	function doClearAd(){	
		window.setIntervalClearAd=setInterval(function(){
			if(!SFLYQ_jQuery){
				mb.write("=>还未加载到jquery.SFLYQ.1.9.1.min.j！稍等,努力中。。。");
				return;
			}
			//广告清理操作
			var adJqs=SFLYQ_jQuery(getSelStradSelData(adSelData));
			if(!adJqs || adJqs.length<=0){
				mb.write("=>bingo 没有发现需要清理的广告！");
				stopClearAd();
				return;
			}
			var clearNum=adJqs.length;
			adJqs.remove();
			mb.write("=>bingo 清理广告数量："+clearNum+"成功！");
			stopClearAd();
			return;
		},500);
	}
	//停止清理
	function stopClearAd(){
		if(window.setIntervalClearAd)clearInterval(window.setIntervalClearAd);
	}
	//执行清理操作
	doClearAd();
}());





javascript:(function(){function n(e,n){SFLYQ_jQuery=undefined;var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=(document.location.protocol=="https:"?"https:":"http:")+"//"+e,r.charset="UTF-8",r.setAttribute("adjq",n),(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(r),t.write("=>添加jquery.SFLYQ.1.9.1.min.js脚本！")}function r(e){t.write("=>校验javascript类库"+e+"是否存在！");var n=document.getElementsByTagName("script");if(!n||n.length<=0)return!1;for(var r=0;r<n.length;r++){var i=n[r];if(i.getAttribute("adjq")==e)return!0}return!1}function s(e){var t="";if(!e||e.length<=0)return t;for(var n=0;n<e.length;n++)e[n].selArr||continune,t+=e[n].selArr.join(","),n<e.length-1&&(t+=",");return t}function o(){window.setIntervalClearAd=setInterval(function(){if(!SFLYQ_jQuery){t.write("=>还未加载到jquery.SFLYQ.1.9.1.min.j！稍等,努力中。。。");return}var e=SFLYQ_jQuery(s(i));if(!e||e.length<=0){t.write("=>bingo 没有发现需要清理的广告！"),u();return}var n=e.length;e.remove(),t.write("=>bingo 清理广告数量："+n+"成功！"),u();return},500)}function u(){window.setIntervalClearAd&&clearInterval(window.setIntervalClearAd)}SFLYQ_jQuery=undefined;var e=function(){var e=this;this.ini=function(){e.bindMsgBox()},this.bindMsgBox=function(){if(document.getElementById("SFLYQ_MsgBox"))return;var t=document.createElement("div");t.id="SFLYQ_MsgBox",t.style.cssText="z-index:9999999;width:422px;height:180px;border:1px solid #000000;background-color:#ffffff;position:fixed;_position: absolute;_top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight);left:10px;top:10px;display:none;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;";var n='<div style="background-color:#0693cd;border-bottom:1px solid #000000;position:relative;color:#ffffff;font-weight: bolder;">SFLYQ V1.0广告清理日志：<a id="SFLYQ_Close" style="position:absolute;right:5px;" href="javascript:;">X</a></div><textarea id="SFLYQ_MsgBox_Content" style="width:420px;height:160px;"></textarea>';document.getElementsByTagName("body")[0].appendChild(t),document.getElementById("SFLYQ_MsgBox").innerHTML=n,document.getElementById("SFLYQ_Close").onclick=e.hide},this.show=function(){document.getElementById("SFLYQ_MsgBox")&&(document.getElementById("SFLYQ_MsgBox").style.display="block")},this.hide=function(){document.getElementById("SFLYQ_MsgBox")&&(document.getElementById("SFLYQ_MsgBox").style.display="none")},this.clearValue=function(){document.getElementById("SFLYQ_MsgBox_Content")&&(document.getElementById("SFLYQ_MsgBox_Content").value="")},this.write=function(e){document.getElementById("SFLYQ_MsgBox_Content")&&(document.getElementById("SFLYQ_MsgBox_Content").value+=e+"\r\n")}},t=new e;t.ini(),t.clearValue(),t.show(),r("jquery.SFLYQ.1.9.1.min.js")||n("qiu.moepet.info/JS/jquery.SFLYQ.1.9.1.min.js");var i=[{key:"百度广告",selArr:["[id*='BAIDU']","[class*='BAiDU']","[href*='cpro.baidu']","[id*='cproIframe']","iframe[src*='baidu']","[id='bdshare']"]},{key:"通用",selArr:["[id^='ads']","[id^='ad']","[class^='ads']","[class^='ad']","[class*='advert']","ins"]},{key:"谷歌",selArr:["[id*='google_ads']"]},{key:"腾讯",selArr:["iframe[src*='adsfile.qq.com]"]}];o()})();
//
//