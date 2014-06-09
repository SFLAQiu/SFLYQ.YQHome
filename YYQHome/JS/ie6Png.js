/*
IE6Png-1.1.6
2013-11-11
*/
var isIE6 = navigator.userAgent.indexOf("MSIE 6.0") > -1;
var ____IE6SPID=0;
function initIE6PnG(obj,c) {
	if(!isIE6)return;
	if(!obj||!obj.style||(obj.style.behavior=='none'&&!c))return;
    obj.style.behavior = 'none';
    obj.onpropertychange = function () {
        var e = window.event;
        if (e.type == "propertychange" && e.propertyName == "className") {
            initIE6PnG(this, 1);
        }
    };
	if(obj.tagName.toUpperCase()=="IMG"){
		var bi=obj.src,id=obj.id||("____IE6SP"+(++____IE6SPID)),cn=obj.className||"",tit=obj.title||obj.alt||"",imgStyle = "behavior:none;display:inline-block;",w=obj.width,h=obj.height,u=bi.match(/http:\/\/[^\"]+/ig);
		var ow=obj.currentStyle.width,oh=obj.currentStyle.height;
		if(!u)u=bi.match(/file:\/\/\/[^\"]+/ig);
		if(obj.parentElement&&obj.parentElement.href)imgStyle+="cursor:hand;";
		imgStyle+='width:'+w+'px;height:'+h+'px;'+imgStyle+';filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + u + '\', sizingMethod=\'scale\',enabled=\'1\');';
		obj.outerHTML='<span ow="'+ow+'" oh="'+oh+'" id="'+id+'" style="'+imgStyle+'" class="'+cn+'" title="'+tit+'"></span>';
		if(ow=="auto"||oh=="auto"){
			if(!window.____IE6IM){
				var tMP=window.____IE6IM=document.createElement('DIV');
				tMP.style.display="none";
				document.body.insertBefore(tMP,null);
			}
			var tim=document.createElement('IMG');
			tim.onload=function(){
				var sp=document.getElementById(this.IE6SPID);
				var img=new Image();
				img.src=this.src;
				if(sp.ow=="auto")sp.style.width=img.width+"px";
				if(sp.oh=="auto")sp.style.height=img.height+"px";
			};
			tim.IE6SPID=id;
			window.____IE6IM.appendChild(tim);
			tim.src=u;
		}
    } else {
        var sBImg = obj.style.backgroundImage;
        obj.style.backgroundImage = "";
		var bi = obj.currentStyle.backgroundImage;
		var u = bi.match(/http:\/\/[^\"]+/ig);
		if (!u) u = bi.match(/file:\/\/\/[^\"]+/ig);
		if (!u) bi.replace(/url\(["]?[']?([^'"\)]+)["]?[']?\)/ig, function ($0, $1) { if ($1) u = $1; });
		if (!u) u = sBImg.match(/http:\/\/[^\"]+/ig);
		if (!u) u = sBImg.match(/file:\/\/\/[^\"]+/ig);
		if (!u) sBImg.replace(/url\(["]?[']?([^'"\)]+)["]?[']?\)/ig, function ($0, $1) { if ($1) u = $1; });
		if (u && u.push) u = u[0];
		if (u)obj.style.background="none";
		obj.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + (u?u:"") + "\",enabled="+(u?"1":"0")+", sizingMethod=\'crop\')";
	}
}
function ObjHoverToClassRMClass(obj,className,addClass){
	var cr=new RegExp(" "+className+" ");
	cr.global=true;
	cr.ignoreCase=true;
	obj.className=(" "+obj.className.replace(/ +/ig," ")+" ").replace(cr," ");
	if(addClass){
		ObjHoverToClassRMClass(obj,addClass);
		obj.className+=" "+addClass;
	}
}
function ObjHoverToClass(obj,currClass,noClass){
	if(!obj.HoverToClassInit)obj.HoverToClassInit={};
    if (!obj.HoverToClassInit[currClass]) {
        obj.HoverToClassInit[currClass]=1;
        obj.attachEvent('onmouseover', function () { clearTimeout(obj.stH); ObjHoverToClassRMClass(obj, noClass, currClass); initIE6PnG(obj);});
        obj.attachEvent('onmouseout', function () { clearTimeout(obj.stH); obj.stH = setTimeout(function () { ObjHoverToClassRMClass(obj, currClass, noClass); initIE6PnG(obj); }, 10);});
    }
	initIE6PnG(obj);
}