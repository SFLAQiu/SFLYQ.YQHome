/// <reference path="/JS/jquery.1.9.1.min.js" />
/// <reference path="/JS/SFLYQ.Helper.js" />
// 多说公共JS代码
var duoshuoQuery = {short_name: "sflyq"};
var sflHp = SFLYQ.Helper;
(function () {
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
        $("#pos_Message").html("<div>温馨提示：留言板不支持IE6，推荐使用谷歌浏览器访问！</div>");
        return;
    }
    //绑定数据
    $("#dsBox").attr({ "data-thread-key": location.pathname, "data-url": location.href, "data-title": $("title") ? $("title").val() : "" });
    //绑定数据
    var ds = document.createElement('script');
    ds.type = 'text/javascript'; ds.async = true;
    ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0]|| document.getElementsByTagName('body')[0]).appendChild(ds);
    //隐藏留言板块设置
    setTimeout(function () {
        $(".ds-powered-by a").hide().css({ "dispaly": "none", "height": "0px", "width": "0px;" });
        $("#ds-sync-checkbox").click().prop("checked", false);
    }, 2000);
    //隐藏留言板块设置
})();
//导航模块
(function () {
    var nh = new SFLYQ.Helper.modulesHander.navHoverSel(
        {
            "navItemsSeltor": "#leftNavBox li .navItem",
            "defaultSelIndex": "0"
        }
    );
    nh.ini(function (thisDom) {
        $(thisDom).stop(false, true).animate({ "width": "160px" }, 100);
        $(thisDom).find(".navTitle").css({ "color": "#b0e6fa" });
    }, function (thisDom) {
        $(thisDom).stop(false, true).animate({ "width": ["120px", "easeOutBounce"] }, 600);
        $(thisDom).find(".navTitle").css({ "color": "#ffffff" });
    }, function (thisDom) {
        var selJq = $(thisDom);
        var pos = selJq.attr("pos");
        var bgColor = selJq.css("background-color");
        if (!pos) return;
        var selPosJq = $(pos);
        var sel = selPosJq.attr("sel");
        if (sel && sel == "1") return;
        $(".mainArea .contentItem").attr({ "sel": "2" }).hide();
        selPosJq.fadeIn("200").attr({ "sel": "1" });
        if (bgColor) $("body").css({ "background-color": bgColor });
    });
})();
(function () {
    var casuallyMove = function (setOpt) {
        var opt = {
            "maxHeight": 100,
            "minHeight":0,
            "speed": 100
        };
        opt = $.extend(opt, setOpt);
        this.doMove = function (moveSel,moveOverDo) {
            var moveSelJq = $(moveSel);
            var moveWidth = parseInt(moveSelJq.width(), 10);
            moveSelJq.css({ "position": "absolute", "left": "-" + moveWidth + "px" });
            if (window.casuallyMove) return;
            window.casuallyMove = setInterval(function () {
                var moveMaxWidth = parseInt($(window).width()) + moveWidth;
                var nowMoveLeft = parseInt(moveSelJq.css("left"), 10);
                var rdHeight = Math.random() * opt.maxHeight + opt.minHeight;
                var rdMoveWidth = nowMoveLeft + opt.speed + Math.random() * opt.speed;
                moveSelJq.stop(true, false).animate({
                    "top": [rdHeight + "px", "easeOutQuad"],
                    "left": [rdMoveWidth + "px", "easeOutQuad"]
                }, 1500, function () {
                    var nowLeft = parseInt(moveSelJq.css("left"), 10);
                    if (nowLeft >= moveMaxWidth) {
                        if (window.casuallyMove) clearInterval(window.casuallyMove);
                        window.casuallyMove = null;
                        moveSelJq.remove();
                        if (moveOverDo) moveOverDo();
                    }
                });
            }, 2000);
        }
    };
    //应用
    var cm = new casuallyMove({
        "maxHeight": 100,
        "minHeight": 0,
        "speed": 100
    });
    function doBindHander(moveSel) {
        var moveJq=$(moveSel);
        if (!moveJq) return;
        moveJq.hover(function () {
            $(this).find(".cloundSay").stop().fadeIn(500).html(sflHp.arrayHelper.getRandomValue(sayData));
        }, function () {
            $(this).find(".cloundSay").stop().fadeOut(50).html("....");
        }).click(function () {
            var itemJq = $(this);
            if (itemJq.attr("sel") == "1") return;
            itemJq.attr({ "sel": "1" }).find(".cloundSay").fadeIn(50).html("别点我,我要变身了！");
            if (window.bianShengSetTimeout) clearTimeout(window.bianShengSetTimeout);
            window.bianShengSetTimeout = setTimeout(function () {
                itemJq.find("img").attr({ "src": "../../Content/YQ/Style/Images/cr.png" })
            }, 1000);
        });
        cm.doMove(moveSel, function () {
            if (window.doMoveAgainTimeout) clearTimeout(window.doMoveAgainTimeout);
            window.doMoveAgainTimeout = setTimeout(doBindMove, 5000)
        });
    }
  
    //云数据集合
    var cloundDatas = [
        { "id": "cloud_1", "say": "嘿嘿！" },
        { "id": "cloud_2", "say": "Hi！" },
        { "id": "cloud_3", "say": "Hi！" },
        { "id": "cloud_4", "say": "Hi！" },
        { "id": "cloud_5", "say": "Hi！" }
    ];
    var sayData = ["Hi！！！", "待呷候！","路过！","别围观~",,"你好~","What?","I'm Super!","看飞机~","哟！","卡哇伊！","-，-","= =!","等等..","谁在追我！","时间在追我！","跑跑Pao~","别围观！","我是无辜的！","我不想出来的。","飘过~","我好帅~","拜~","别点我！","我在伪装！"];
    function doBindMove() {
        var htmlStyle =
            '<div id="{id}" class="pngPic" style="position:relative;width:80px;height:40px;z-index:100;" >' +
                '<img class="png"   src="../../Content/YQ/Style/Images/{id}.png" />' +
                '<span class="cloundSay">{say}</span>' +
            '</div>';
        var bindData = sflHp.arrayHelper.getRandomValue(cloundDatas);
        if (!bindData) return;
        htmlStyle = htmlStyle.replace(/\{id\}/g, bindData.id).replace(/\{say\}/g, bindData.say);;
        $("body").append(htmlStyle);
        doBindHander("#" + bindData.id);
    }
    doBindMove();
})();