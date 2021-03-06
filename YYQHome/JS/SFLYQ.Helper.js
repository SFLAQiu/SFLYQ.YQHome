﻿/*
**** JavaScript Document
**** SFLYQ
**** 2014-3-10
*/
/// <reference path="/JS/jquery.1.9.1.min.js" />
if (typeof SFLYQ == 'undefined') {
    var SFLYQ = {};
}
(function () {
	/// <summary>所有帮助操作</summary>
    SFLYQ.Helper = {};
    //----文件帮助
    SFLYQ.Helper.fileHander = {};
    var fh = SFLYQ.Helper.fileHander;
    fh.checkFileExtension = function (allowExtensionArr, filePath) {
    	/// <summary>判断文件格式</summary>
		/// <param name="allowExtensionArr" type="array">允许图片格式字符串数组,如：['jpg','png']</param>
		/// <param name="filePath" type="string">文件路径名，包括文件名</param>
    	if (!filePath) return false;
        for (var i = 0; i < allowExtensionArr.length; i++) {
            var reStr = "^.*\." + allowExtensionArr[i] + "$";
            var re = RegExp(reStr);
            if (filePath.toLowerCase().match(re) != null) return true;
        }
        return false;
    };
    //----字符串帮助
    SFLYQ.Helper.StringHander = {};
    var sh = SFLYQ.Helper.StringHander;
    sh.clearSpace = function (str) {
        /// <summary>清理字符串空格</summary>
        /// <param name="str" type="string">字符串</param>
        return str.replace(/\s/g, "");
    };
    sh.numStrToTallyDif = function (num) {
        /// <summary>数字字符串，数位用','隔开。如得到字符串"3,444,567,123"</summary>
        /// <param name="num" type="int"></param>
        var numStr = String(num);
        if (!numStr) return numStr;
        var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
        return numStr.replace(re, "$1,");
    };
    sh.getUrlObj = function (urlStr) {
        /// <summary>通过url解析获取url对象</summary>
        /// <param name="url" type="string"></param>
        var _fields = {
            'Username': 4,
            'Password': 5,
            'Port': 7,
            'Protocol': 2,
            'Host': 6,
            'Pathname': 8,
            'URL': 0,
            'Querystring': 9,
            'Fragment': 10
        };
        var values = {};
        var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
        if (typeof urlStr != 'undefined') {
            for (var f in _fields) {
                values[f] = '';
            }
            var r = regex.exec(urlStr);
            if (!r) return; // throw "DPURLParser::parse -> Invalid URL";
            for (var f in _fields) if (typeof r[_fields[f]] != 'undefined') {
                values[f] = r[_fields[f]];
            }
        }
        return values;
    }
    sh.getParamesObjByUrl = function (url) {
        /// <summary>通过url获取参数对象</summary>
        /// <param name="url" type="string"></param>
        if (!url) return null;
        var indexNum = url.indexOf("?");
        if (indexNum <= 0) return null;
        var paramesStr = url.substring(indexNum + 1, url.length)
        var pattern = /([^&]+)=([^&]+)/g;//定义正则表达式
        var parames = {};//定义数组
        if (paramesStr.match(pattern) == "") return null;
        paramesStr.replace(pattern, function (a, b, c) {
            parames[b] = c;
        });
        return parames;//返回这个对象.
    };
    //----数组帮助类
    SFLYQ.Helper.arrayHelper = {};
    var arrh = SFLYQ.Helper.arrayHelper;
    arrh.getRandomValue = function (arrs) {
        /// <summary>根据数组获取随机值</summary>
        /// <param name="arrs" type="array">数组</param>
        if (!arrs || arrs.length <= 0) return undefined;
        var length = arrs.length;
        var rdNum =parseInt(Math.random() * length,10);
        return arrs[rdNum];
    }
    //----各种帮助模块
    SFLYQ.Helper.modulesHander = {};
    var mh = SFLYQ.Helper.modulesHander;
    mh.getSelectorStrByAttr = function (selField, selValue) {
        /// <summary>根据属性名和查询的值，返回选模糊属性择器字符串</summary>
        /// <param name="selField" type="string">查询字段名</param>
        /// <param name="selValue" type="string">查询值</param>
        if (selValue == "") return "";
        var getValue = selValue.replace(/\s+/g, "");
        if (getValue == "") return "";
        return "[" + selField + "*='" + getValue + "']";
    };
    mh.navHoverSel = function (iniOpt) {
        /// <summary>导航效果(移动和离开导航项模块效果，点击选中后做什么操作)</summary>
        /// <param name="iniOpt" type="string">配置初始化</param>
        var opt = {
            "navItemsSeltor": "",//导航项选择器
            "defaultSelIndex": "2"//初始化默认选中位置
        };
        opt = $.extend(opt, iniOpt);
        this.ini = function (hoverEffDo, leaveEffDo, selDo) {
            var navItemsJq = $(opt.navItemsSeltor);
            navItemsJq.hover(function () {
                var isSel = $(this).attr("sel");
                if (isSel && isSel == "1") return;
                if (hoverEffDo) hoverEffDo(this);
            }, function () {
                if (!leaveEffDo) { console.log("leaveEffDo undefine "); return; }
                var isSel = $(this).attr("sel");
                if (isSel && isSel == "1") return;
                //移开出模块后的效果
                leaveEffDo(this)
            }).click(function () {
                if (!hoverEffDo) { console.log("hoverEffDo undefine "); return; }
                var selNavJq = $(opt.navItemsSeltor + "[sel='1']");
                if (selNavJq) {
                    leaveEffDo(selNavJq[0]);
                    selNavJq.attr({ "sel": "2" });
                }
                $(this).attr({ "sel": "1" });
                //移动到模块的效果
                if (hoverEffDo) hoverEffDo(this);
                //选中后的操作
                if (selDo) selDo(this);
            }).eq(opt.defaultSelIndex).click();
        }
    };
    mh.keyDownDoFn = function (evt, keyCode, doFn) {
        /// <summary>键盘键位触发方法</summary>
        /// <param name="keyCode" type="int">键盘标识码</param>
        /// <param name="doFn" type="function">执行方法</param>
        evt = evt ? evt : (window.event ? window.event : null);//兼容IE和FF
        if (evt.keyCode == keyCode) {
            if (doFn) doFn();
        }
    }

})();