/**
 * Created by cgs on 14-2-23.
 * Email:cgspine@gmail.com
 */
function $id(id){
    return document.getElementById(id);
}
function Slider(direction,count,width,height,maxSpeed,id){
    this.direction=direction;//true--leftright;false-updown
    this.count=count;
    this.width=width;
    this.height=height;
    this.index=1;
    this.length=this.direction?this.width:this.height;
    this.maxSpeed=maxSpeed;
    this.x=Math.sqrt(this.maxSpeed)*(-1);
    this.speed=0;
    this.speedChange=function(){
        this.speed=this.x*this.x*(-1)+maxSpeed;
    }
    this.id=$id(id);
    this.position=0;
    this.runLeftOrUp=function(){
        this.position=this.position-this.speed;
    }
    this.runRightOrDown=function(){
        this.position=this.position+this.length/1000;
    }
}

function ChangePosition(slider){
    if(slider.direction){
        slider.id.style.marginLeft=slider.position+"px";
    }
    else{
        slider.id.style.marginTop=slider.position+"px";
    }
}
var slider = new Slider(true,4,803,600,100,"slider");
//var img=$id("ulSlider").childNodes;
//var button=$id("ulButton").childNodes;

//单页运动
function execute(){
    if(slider.index==slider.count){
        Gobackl();
    }
    else{
        slider.x+=0.1;
        slider.speedChange();
        slider.runLeftOrUp();
        ChangePosition(slider);
    }
    var call=setTimeout("execute()",10);
    if(slider.position<=slider.index*slider.length*(-1)){
        clearTimeout(call);
        slider.position=slider.index*slider.length*(-1);
        ChangePosition(slider);
        slider.index+=1;
        slider.x=Math.sqrt(slider.maxSpeed)*(-1);
    }
}
function Gobackl(){
    slider.runRightOrDown();
    ChangePosition(slider);
    var go=setTimeout("Gobackl()",10);
    if(slider.position>=-2){
        clearTimeout(go);
        slider.position=0;
        ChangePosition(slider);
        slider.index=0;
    }
}

//多张切换

function  ChangeOver(){
        execute();

    setTimeout("ChangeOver()",3000);
}


//button效果
/*
function buttonAction(){

    for(var i=0;i<img.length;i++){
        (function(){
            var j=i;
            button[i].onmouseover=function(){
                    img[j].setAttribute("class","hover");
            }
            button[i].onmouseout=function(){
                img[j].setAttribute("class","");
            }
        })();

    }
}
*/
ChangeOver();
//buttonAction();