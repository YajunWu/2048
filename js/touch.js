/**
 *监听移动端上下左右滑动事件
 */
 var slider = {
    events: {
        index: 0,//显示元素的索引
        el: null,
        swipeTime: 2000,
        startPos: null,
        endPos: null,
        direct: '',
        endFunction: null,
        _hasTouch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        handleEvent: function(e) {
            var self = this;
            e.preventDefault();
            e.stopPropagation();
            if(e.type == 'touchstart' || e.type == 'mousedown') {
                self.start(e);
            } else if(e.type == 'touchmove' || e.type == 'mousemove') {
                self.move(e);
            } else if(e.type == 'touchend' || e.type == 'mouseup') {
                self.end(e);
            }
        },
        //滑动开始
        start: function(e) {
            var touch = e;
            var touchmove = 'mousemove';
            var touchend = 'mouseup'
            if(this._hasTouch && e.targetTouches.length > 0) {
                touch = e.targetTouches[0];
                touchmove = 'touchmove';
                touchend = 'touchend';
            } else if(this._hasTouch) {
                return;
            }
            this.startPos = {
                x: touch.pageX,
                y: touch.pageY,
                time: +new Date
            };
            this.el.addEventListener(touchmove, this, false);
            this.el.addEventListener(touchend, this, false);
        },
        //滑动中
        move: function(e) {
            //当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if(this._hasTouch) {
                if(event.targetTouches.length > 1 || event.scale && event.scale !== 1)
                    return;
            }
            var touch = e;
            if(this._hasTouch && e.targetTouches.length > 0) {
                touch = e.targetTouches[0];
            } else if(this._hasTouch) {
                return;
            }
            this.endPos = {
                x: touch.pageX,
                y: touch.pageY,
                time: +new Date
            };
        },
        //滑动结束,返回滑动方向
        end: function(e) {
            //滑动的持续时间
            var duration = this.endPos.time - this.startPos.time; 
            var touchmove = 'mousemove';
            var touchend = 'mouseup'
            if(this._hasTouch) {
                touchmove = 'touchmove';
                touchend = 'touchend';
            }
            
            var moveX = this.endPos.x - this.startPos.x;
            var moveY = this.endPos.y - this.startPos.y;
            var agl = Math.atan2(moveY, moveX) * 180 / Math.PI;
            //当滑动事件超出阈值 或 滑动距离过短时
            if((duration > this.swipeTime) || (moveY < 5 && moveX < 5))
                return;
            
            if(agl < -45 && agl > -135) {
                this.direct = 'up';
            } else if(agl >= 45 && agl < 135) {
                this.direct = 'down';
            } else if(agl >= 135 || agl <= -135) {
                this.direct = 'left';
            } else if(agl >= -45 && agl <= 45) {
                this.direct = 'right';
            } 

            //后续效果
            this.endFunction(this.direct);

            //解绑事件
            this.el.removeEventListener(touchmove, this, false);
            this.el.removeEventListener(touchend, this, false);

        }
    },
    //初始化
    //fn有一个参数，可为'up'、'down'、'left'、'right'
    init: function(element, fn){
        var self;
        this.events.el = element;
        this.events.endFunction = fn;
        self = this;

        //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
        element.addEventListener('touchstart', self.events, false); 
        element.addEventListener('mousedown', self.events, false); 
    }
 }