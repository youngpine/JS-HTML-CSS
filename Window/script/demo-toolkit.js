/**
 * Created with IntelliJ IDEA.
 * User: jfengjiang
 * Date: 13-9-6
 * Time: 下午11:12
 * Description: 众里寻她千百度，蓦然回首，那人却在写实验报告。
 */

(function($){

    $.demo = {
        "version": "0.0.1"
    };

    /**
     * 初始化
     */
    $.demo.init = function(){
        $.demo.toggle_wide("hope_wide_page");
    };

    /**
     * 宽窄版切换
     * @param classname
     */
    $.demo.toggle_wide = function(classname){
      $(window).keydown(function(event){
          var $body = $("body");
          switch (event.keyCode){
              case 37:
                  $body.removeClass(classname);
                  break;
              case 39:
                  $body.addClass(classname);
                  break;
          }
      });
    };

    /**
     * hover toggle class
     * @param selector
     * @param classname
     */
    $.demo.hover = function(selector, classname){
        $(selector).mouseover(function(){
          $(this).addClass(classname);
        }).mouseout(function(){
          $(this).removeClass(classname);
        });
    };

    /**
     * repeat item
     * @param selector
     * @param num
     */
    $.demo.repeatItem = function(selector, num){
        var $child = $(selector);
        var $parent = $child.parent();

        for(var i = 0; i<num;i++) {
            $child.clone().appendTo($parent);
        }
    };

})(jQuery);

$.demo.init();