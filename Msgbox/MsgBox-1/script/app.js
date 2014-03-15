/**
 * @Author: jjf001
 * @Date: 13-11-10
 * @Version: 0.0.1
 * @Description: HopeStudio CMS(Conference Manage System) Manage App Script
 * @Modify:cgs001
 */


(function ($) {

    /**
     * left menu
     */
    $.fn.menu = function () {
        var that = $(this);
        that.delegate("a", "click", function () {
            var $item = $(this);
            var toggle = $item.attr("data-toggle");

            $item.bind('selectstart', function () { return false; });

            if ($item.attr("class") == "active") {
                that.trigger("change.menu.toggle", toggle);
            } else {
                that.trigger("change.menu.toggle", toggle);
            }
        });

        that.bind("change.menu.toggle", function (e, toggle) {
            $(this).find(">a[data-toggle='" + toggle + "']")
                .find(">i.right")
                .toggleClass("icon-chevron-down")
                .toggleClass("active");

            var $ul = $(this).find("ul[data-toggle='" + toggle + "']");
            $ul.slideToggle("fast");

        });

        //trigger first item
        //that.trigger("change.menu.toggle", that.find(">a:first").attr("data-toggle"));

        return that;
    };

    //点击下滑
    $.fn.drop = function (button, menu) {
        var a = $(button);
        var b = $(menu);
        a.click(
            function() {
                if (b.is(":visible")) {
                    b.slideUp(500);
                } else {
                    b.slideDown(500);
                }
            });
    };

    /**
     * time control
     * @param start:yyyy-MM-dd;time:天数
     * @returns 之后的天数
     */
    $.fn.formatNow=function()
    {
        var time = new Date();
        return time.getFullYear + "-" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate();
    }
    $.fn.timeAdd = function(start, day) {
        var time = new Date();
        if (start == null) {
            start =time.getFullYear()+"-"+time.getMonth()+"-"+time.getDate();

        }
        var record = start.split("-");
        var year = parseInt(record[0]);
        var month = parseInt(record[1]-1);
        var date = parseInt(record[2]);
        time.setFullYear(year);
        time.setMonth(month);
        var a = day || 0;
        time.setDate(date + parseInt(a));
        return time.getFullYear() + "-" + (parseInt(time.getMonth())+1) + "-" + time.getDate();
    };

    /**
     * time control
     * @param start--开始时间；end--结束时间
     * @returns 二者时间差的天数
     */
    $.fn.getDaysDiff = function (start, end) {
        var startTime = new Date();
        var s = start.split("-");
        startTime.setFullYear(parseInt(s[0]));
        startTime.setMonth(parseInt(s[1])-1);
        startTime.setDate(parseInt(s[2]));
        var endTime = new Date();
        var e = end.split("-");
        endTime.setFullYear(parseInt(e[0]));
        endTime.setMonth(parseInt(e[1])-1);
        endTime.setDate(parseInt(e[2]));
        var dates = Math.abs((startTime.getTime() - endTime.getTime())) / (1000 * 60 * 60 * 24);
        return dates;
    };

    /**
     * tab control
     * @param control identify of tab content
     * @returns {*|HTMLElement}
     */
    $.fn.tabs = function (control) {

        var that = $(this);
        control = $(control);

        that.delegate("li", "click", function () {
            var tabName = $(this).attr("data-tab");
            that.trigger("change.tabs", tabName);
        });

        that.bind("change.tabs", function (e, tabName) {
            that.find("li").removeClass("active");
            that.find(">[data-tab='" + tabName + "']").addClass("active");

            control.find(">[data-tab]").removeClass("active");
            control.find(">[data-tab='" + tabName + "']").addClass("active");
        });

        that.trigger("change.tabs", that.find("li:first").attr("data-tab"));

        return that;
    };

    /**
     *  toggle check
     * @param items selector of items
     */
    $.fn.toggleCheck = function (items) {
        var that = $(this);
        items = $(items);

        that.bind("click", function (e) {
            that.trigger("change.checkbox.toggle");
        });

        that.bind("change.checkbox.toggle", function (e) {
            items.attr("checked", !!that.attr("checked"));
        });

        return that;
    };


    /**
     * drop down menu
     */
    $.fn.dropMenu = function () {
        var that = $(this);
        var toggle_data = that.attr("data-toggle");

        that.bind('selectstart', function () { return false; });

        that.bind("click", function () {
            that.trigger("change.dropMenu.toggle", toggle_data);
        });

        that.bind("change.dropMenu.toggle", function (e, toggle_data) {
            that.parent().toggleClass("open");
        });

        return that;
    };

    /**
     * post form
     */
    $.fn.postForm = function (url) {
        var that = $(this);

        that.validate({
            submitHandler: function () {
                new $.ajax({ url: url, type: 'post', data: pars, complete: function (data) {
                    that.trigger("change.form.response", data);
                }
                });
            }
        });
        return that;
    };

})(jQuery);