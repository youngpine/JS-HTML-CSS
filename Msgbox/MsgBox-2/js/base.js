/**
 * Created by cgs on 14-3-14.
 * Email:cgspine@gmail.com
 */
(function(doc){

    window.base={
        doc:doc,
        $:id,
        c:getClass,
        e:e,
        listen:listener,
        unlisten:unlistener,
        agent:userAgent
    }
    //获取id盒子对象
    function id(id){
        return base.doc.getElementById(id);
    }
    //获取class盒子数组对象
    function getClass(cName){
        return base.doc.getElementsByClassName(cName);
    }
    //事件处理
    function e(event) {
        if(!event) {    // 兼容IE浏览器
            event = window.event;
            event.target = event.srcElement;
            event.layerX = event.offsetX;
            event.layerY = event.offsetY;
        }
        event.mx = event.pageX || event.clientX + document.body.scrollLeft; // 计算鼠标指针X轴距离
        event.my = event.pageY || event.clientY + document.body.scrollTop;  // 计算鼠标指针Y轴距离
        return event;   // 返回标准化的事件对象
    }
    //添加事件监听
    function listener(sid,stype,callback){
       id(sid).addEventListener(stype,callback);
    }
    //取消事件监听
    function unlistener(sid,stype,callback){
        id(sid).removeEventListener(stype,callback);
    }
    //判断浏览器类型
    function userAgent(callback){
        //获取userAgent
        var Sys = {};
        var n=0;
        var ua = navigator.userAgent.toLowerCase();
        if (window.ActiveXObject){
            Sys.ie = ua.match(/msie ([\d.]+)/)[1];
            n=1;
        }
        else if (document.getBoxObjectFor){
            Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
            n=2;
        }
        else if (window.MessageEvent && !base.doc.getBoxObjectFor){
            Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
            n=3;
        }
        else if (window.opera){
            Sys.opera = ua.match(/opera.([\d.]+)/)[1];
            n=4;
        }
        else if (window.openDatabase){
            Sys.safari = ua.match(/version\/([\d.]+)/)[1];
            n=5;
        }
        callback(n);
    }

})(document)