/*
 * 图片滑动组件
 * 适用于移动设备仅WebKit内核浏览器
 * 支持IOS,Android,不支持win
 * version: 0.1
 * 未优化absolute
 * 未优化translate3d
 **/
(function(window, document){
	function Swipe(options){
		this.wrap = options.dom;
		this.list = options.list;

		this.init();
		this.renderDOM();
		this.bindDOM();
	}

	Swipe.prototype = {
		//初始化
		init: function(){
			//设定窗口比例
			this.radio = window.innerHeight / window.innerWidth;
			//设定一页的宽度
			this.scaleW = window.innerWidth;
			//设定初始索引值
			this.idx = 0;
		},
		//渲染页面
		renderDOM: function(){
			var data = this.list;
			var len = data.length;
			var width = this.scaleW;
			//设定li的宽和位置
			for (var i = 0; i < data.length; i++) {
				data[i].style.width = width + 'px';
				data[i].style.webkitTransform = 'translate3d(' + i * width + 'px, 0, 0)';
			}

			//this.wrap.style.width = width + 'px';
			this.wrap.style.height = window.innerHeight + 'px';
		},
		//绑定DOM事件
		bindDOM: function(){
			//
			var elem = this.wrap;
			var self = this;
			var scaleW = self.scaleW;

			function startHandle(e){
				//记录起始时间
				self.startTime = +new Date();
				//记录按下坐标
				self.startX = e.touches[0].pageX;
				//清除位移值
				self.offsetX = 0;
			}
			function moveHandle(e){
				e.preventDefault();
				//计算位移值
				self.offsetX = e.touches[0].pageX - self.startX;
				//计算上一张索引
				var i = self.idx - 1;
				//计算下一张索引
				var n = self.idx + 1;
				//获取DOM元素
				var list = self.list;
				//改变DOM位移及过渡时间属性
				for (i; i <= n; i++) {
					list[i] && (list[i].style.webkitTransition = '-webkit-transform 0s ease-out');  //防止下次滑动产生延迟
					list[i] && (list[i].style.webkitTransform = 'translate3d(' + ((i - self.idx) * scaleW + self.offsetX) + 'px, 0, 0)');
				}

			}
			function endHandle(e){
				e.preventDefault();
				//定义滑动临界值
				var limX = self.scaleW / 2;
				//定义快速滑动临界值
				var fastLimX = 10;
				//记录时间
				var endTime = +new Date();
				//当时间大于定义值
				if (endTime - self.startTime > 300) {
					//当位移大于临界值
					if (self.offsetX >= limX) {
						self.go(-1);  //上一页
					} else if (self.offsetX < 0 && self.offsetX < -limX) {
						self.go(1);   //下一页
					} else {
						self.go(0);   //本页
					}
				} else {
					//当位移大于临界值
					if (self.offsetX >= fastLimX) {
						self.go(-1);  //上一页
					} else if (self.offsetX < -fastLimX) {
						self.go(1);   //下一页
					} else {
						self.go(0);   //本页
					}
				}
			}
			//绑定触摸事件
			elem.addEventListener('touchstart', startHandle);
			elem.addEventListener('touchmove', moveHandle);
			elem.addEventListener('touchend', endHandle);
		},
		go: function(n){
			var elem = this.list;
			var index = this.idx;
			var len = elem.length;
			//当前滑动索引
			n = n + index;
			//判断极值
			if (n < 0) {
				n = 0;
			}
			if (n > len - 1) {
				n = len - 1;
			}
			//保存索引值
			this.idx = n;

			//改变过渡时间
			elem[n].style.webkitTransition = '-webkit-transform 0.2s ease-out';
			elem[n-1] && (elem[n-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
			elem[n+1] && (elem[n+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

			//改变位移
			elem[n].style.webkitTransform = 'translate3d(0, 0, 0)';
			elem[n-1] && (elem[n-1].style.webkitTransform = 'translate3d(-' + this.scaleW + 'px, 0, 0)');
			elem[n+1] && (elem[n+1].style.webkitTransform = 'translate3d(' + this.scaleW + 'px, 0, 0)');
		}
	}

	//实例化组件
	new Swipe({
		dom: document.querySelector('#canvas'),
		list: document.querySelectorAll('#canvas li')
	});
})(window, document);