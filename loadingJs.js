/**
 * Created by Administrator on 2017/5/10.
 */
(function(window){
    var plugCode=function(box){
        var boxObject = document.getElementById(box);

        if(!boxObject)boxObject = document.body;


        var loadingBox = document.createElement("div");
        loadingBox.className = "loading";
        loadingBox.style = "width: 80px;height: 40px;margin: 0 auto;margin-top:100px;";

        for(var i = 0;i < 5;i ++){
            var count=0.2;
         var loadingSpan = document.createElement("span");
            loadingSpan.style = "display: inline-block;width: 8px;height: 100%;margin-left:1px;margin-right:1px;border-radius: 4px;background: lightgreen;-webkit-animation-delay: "+count*i+"s;";
            loadingBox.appendChild(loadingSpan);
        }

        boxObject.appendChild(loadingBox);
    };
    window.createLoading=plugCode;
})(typeof window !== "undefined" ? window : this);