/**
 * Created by zhaofei on 2016/2/24.
 */
(function($) {
    var index = 0,timer;
    $.fn.combScrolling = function(options){
        var newObject = $(this);
        $.fn.combScrolling.defaults = {
            imgData: [],         //图片内容
            width:800,           //图片展示区域的宽度
            height:500,          //图片展示区域的高度
            speed: 1500,         //初始滚动速度
            time: 1500,          //初始滚动时间
            next:true,          //是否加入左右按钮，默认为加入
            style: "banner-style"//初始样式
        };
        var opts = $.extend({}, $.fn.combScrolling.defaults, options);
        createScrolling(newObject, opts);
        return opts;
    };
    /*组件id列表*/
    var setIdSheet = function(id){
        var idSheet = {
            "bannerCon": id,
            "bannerImg": id + "Img",
            "bannerBtn": id + "Btn",
            "bannerUl": id + "BtnUl",
            "bgDiv": id+"BgCon",
            "forward":id+"ForwardBtn",
            "recede":id+"RecedeBtn"
        };
        return idSheet;
    };
    /*创建内容*/
    var createScrolling = function(newObject, opts){
        var mainId = newObject.get(0).id;
        if(mainId == null) return;
        var imgArray = opts.imgData;
        var m = imgArray.length;
        if(m == null ) return;
        var newId = setIdSheet(mainId);
        newObject.addClass(opts.style);
        var setImgCon = $("<div id = "+newId.bannerImg+" class='banner-img'></div>");
        var setBtnCon = $("<div id = "+newId.bannerBtn+" class='banner-btn'></div>");
        var btnUl = $("<ul id = "+newId.bannerUl+" class='banner-ul'></ul>");
        var bgUl = $("<ul id = "+newId.bgDiv+" class='bg-ul'></ul>");
        if(opts.next){
            var nextLBtn = $("<div id = "+newId.recede+" class='left-btn'></div>");
            var nextRBtn = $("<div id = "+newId.forward+" class='right-btn'></div>");
            setBtnCon.append(nextLBtn);
            setBtnCon.append(nextRBtn);
        }
        $("#"+mainId).append(setImgCon);
        $("#"+mainId).append(setBtnCon);
        setImgCon.append(bgUl);
        setBtnCon.append(btnUl);
        bgUl.css({"width":m*(opts.width),"height":opts.height});
        for(var i = 0; i < m; i++){
            var bgCon = $("<li style='background:url("+imgArray[i]+") no-repeat center;'></li>");
            var btnLi = $("<li id ="+newId.bannerUl+i+"></li>");
            bgUl.append(bgCon);
            btnUl.append(btnLi);
            bgCon.css("width",opts.width);
            bgCon.css("height",opts.height);
        }
        //初始化
        controlAnimate(newId, opts);
        $("#"+newId.bgDiv).stop(true,false).animate({left:opts.width*index},opts.speed);
        $(".banner-ul>li").removeClass("li-change").eq(index).addClass("li-change");
    };
    /*控制滚动效果*/
    var controlAnimate = function(newId, opts){
        var imgArray = opts.imgData;
        var n = imgArray.length;
        var showImg = function(index){
            var position = -index*opts.width;
            $("#"+newId.bgDiv).stop(true,false).animate({left:position},opts.speed);
            $(".banner-ul>li").removeClass("li-change").eq(index).addClass("li-change");
        };
        $(".left-btn,.right-btn").hide();
        $(".banner-ul>li").mouseenter(function() {
            index = $(this).index();
            showImg(index);
        });
        timer = setInterval(function(){
            showImg(index);
            index++;
            if(index == n){index = 0;}
        },opts.time);
        $("#"+newId.bannerCon).hover(function(){
            clearInterval(timer);
            $(".left-btn,.right-btn").show();
        },function(){
            $(".left-btn,.right-btn").hide();
            timer = setInterval(function(){
                showImg(index);
                index++;
                if(index == n){index = 0;}
            },opts.time);
        });

        $("#"+newId.recede).click(function(){
            index -= 1;
            if(index == -1) {index = n - 1;}
            showImg(index)
        })
        $("#"+newId.forward).click(function(){
            index += 1;
            if(index == n) {index = 0;}
            showImg(index)
        })
    };
})(jQuery);
