/**
 * Created by cgs on 14-3-5.
 * Email:cgspine@gmail.com
 */
var object=null;
var ox= 0,oy=0,mx= 0,my=0;

//获取id盒子
function id(id){
    return document.getElementById(id);
}

//获取class数组
function getClass(c){
    return document.getElementsByClassName(c);
}

//定义事件对象标准化函数
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

//弹出窗口对象
function PopUp(title,content){
    var that=this;
    this.title=title;
    this.content=content;
    //创造div盒子
    this.create=function(idName,className){
        var div=document.createElement("div")
        this.appendChild(div);
        div.setAttribute("id",idName);
        div.setAttribute("class",className);
    }
    //创造内容
    this.createBody=function(){
        //创建标题
        var h1=document.createElement("h1");
        h1.setAttribute("class","title");
        this.appendChild(h1);
        h1.innerHTML=that.title;
        //创建删除图标
        var delete_icon=document.createElement("div");
        delete_icon.setAttribute("id","delete");
        this.appendChild(delete_icon);
        delete_icon.innerHTML="关闭";

        //创建内容
        var div=document.createElement("div");
        div.setAttribute("class","content");
        this.appendChild(div);
        div.innerHTML=that.content;
    }

    //放上鼠标
    this.onmousemove=function(idName,event){
         event = e(event);
         object=event.target;
         if(object.className =="title") {
               ox = parseInt(object.parentNode.offsetLeft);
               oy = parseInt(object.parentNode.offsetTop);
               mx = event.mx;
               my = event.my;
               document.onmousemove = that.move;
               document.onmouseup = that.stop;
         }
    };
    //鼠标移动
    this.move=function(event) {
        event = e(event);
        object.parentNode.style.left = ox + event.mx - mx+object.parentNode.offsetWidth/2 + "px";
        object.parentNode.style.top = oy + event.my - my+object.parentNode.offsetHeight/2 + "px";
    }

    //松开鼠标
    this.stop=function(event) {
        event = e(event);
        ox = parseInt(object.parentNode.offsetLeft);
        oy = parseInt(object.parentNode.offsetTop);
        mx = event.mx;
        my = event.my;
        object = document.onmousemove = document.onmouseup = null;  // 释放所有操作对象
    }
    //删除窗口
    this.delete=function(className){
        this.removeChild(className);
    };

}
PopUp.prototype.more=true;

//方法调用
function pop(title,content,idName,className){
    var p=new PopUp(title,content);
    if(PopUp.prototype.more){
        execute(p,idName,className);
        PopUp.prototype.more=false;
    }
   id("delete").onclick=function(){
       p.delete.call(document.body,id(idName));
       PopUp.prototype.more=true;

   }
   id(idName).onmousedown=function(){
        p.onmousemove.call(id(idName),idName);
   }
}

//执行生成
function execute(fun,idName,className){
    fun.create.call(document.body,idName,className);
    fun.createBody.call(id(idName));
}


