# swipeImg
手机端swipe组件

> 版本0.1：
	支持图片滑动功能，大量absolute，translate3d属性未优化
> 版本0.2：
	支持图片滑动功能，优化大量absolute，translate3d引起的内存消耗问题
> 版本0.3：
	支持图片滑动功能，优化大量absolute，translate3d引起的内存消耗问题，支持图片异步加载功能

使用说明：

    new Swipe({
        dom: document.querySelector('#canvas'),
        list: document.querySelectorAll('#canvas li'),
        lazy: 'data-src'
    });
实例化方法保存在js文件的全局对象里

参数：
* 接收一个对象3个属性
* dom:  图片列表的外包DOM元素（必填）
* list: 图片列表DOM元素集合（必填）
* lazy: 图片异步加载的自定义属性名称（选填）