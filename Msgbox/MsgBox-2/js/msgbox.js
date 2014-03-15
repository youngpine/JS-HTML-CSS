/**
 * Created by cgs on 14-3-14.
 * Email:cgspine@gmail.com
 */
(function(){
    window.Msgbox=function(args){
        this.title=args.title;
        this.content=args.content;
        this.num=[];
        this.doc=base.doc;
    }
    window.resize=function(){
        boxStyle(base.c("msgbox"));
    }
   //1、创造盒子
    Msgbox.prototype.createBox=function(idName){
        var that=this;
        base.listen(idName,'click',function(){
            box(that);
        })
    }

    //2、控制盒子行为
    Msgbox.prototype.behaviour=function(idName,event){
        var event,ox,oy,mx,my;
        var object;
        var downHandler=function(event){
            event = base.e(event);
            object=event.target;
            if(object.className =="title") {
                ox = parseInt(object.parentNode.offsetLeft);
                oy = parseInt(object.parentNode.offsetTop);
                mx = event.mx;
                my = event.my;
                base.listen(idName,'mousemove',moveHandler);
                base.listen(idName,'mouseup',upHandler);
            }

        }
        var moveHandler=function(event){
            event = base.e(event);
            object.parentNode.style.left = ox + event.mx-mx + "px";
            object.parentNode.style.top = oy + event.my-my + "px";
        }
        var upHandler=function(event){
            event = base.e(event);
            ox = parseInt(object.parentNode.offsetLeft);
            oy = parseInt(object.parentNode.offsetTop);
            mx = event.mx;
            my = event.my;
            object = null;  // 释放所有操作对象
            base.unlisten(idName,'mousemove',moveHandler);
        }
        base.listen(idName,'mousedown',downHandler);
    }
    //3、删除盒子
    Msgbox.prototype.delete=function(event){

        var deleteHandler=function(event){
            var event = base.e(event);
            var object=event.target;
            if(object.id =="delete") {
                base.$("body").removeChild(object.parentNode);
            }
        }
        base.listen("body",'click',deleteHandler);
    }

    //盒子内容
    function box(obj){
        var div=obj.doc.createElement("div");
        div.innerHTML='<h1 class="title">'+obj.title+'</h1>'
            +'<div id="delete">X</div>'
            +'<div class="content">'+obj.content+'</div>';
        obj.doc.body.appendChild(div);
        obj.num.push("");
        div.setAttribute("id","msgbox"+(obj.num.length-1));
        div.setAttribute("class","msgbox");
        boxStyle(div);
    }
    //盒子样式
    function boxStyle(div){
            div.style.left=(base.doc.body.clientWidth-div.offsetWidth)/2+"px";
            div.style.top=(base.doc.body.clientHeight-div.offsetHeight)/2+"px";
            base.agent(function(e){
                switch(e){
                    case 1://IE
                        div.style.background="#ccc";
                        break;
                    case 2://firefox
                        div.style.background="#000";
                        break;
                    case 3://chrome
                        div.style.background="#777";
                        break;
                    case 4://opera
                        div.style.background="#eee";
                        break;
                    case 5://safari
                        div.style.background="#333";
                        break;
                    default:
                        div.style.background="#ccc";
                        break;
                }
            })
    }


})()