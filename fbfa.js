/*! frame-by-frame animation by MO ISC https://github.com/chen-rongliang/fbfa#readme*/

(function (root, factory) {
    if(typeof(module) === 'object') {
        // webpack
        module.exports = factory()
    } else if(typeof(define) === 'function') {
        if (define.amd) {
            // AMD
            define(factory)
        } else {
            // CMD
            define(function(require, exports, module) {
                module.exports = factory()
            })
        }
    } else if (typeof(exports) === 'object') {
        // Node, CommonJS之类的
        module.exports = factory()
    } else {
        // 浏览器全局变量(root 即 window)
        root.FBFA = factory()
    }
}(this, function () {
    'use strict'

    class FBFA {
        constructor (options) {
            // 动画状态
            this.playStatus = 'stop'
            // 动画配置
            this.options = options
    
            this.init()
        }
        init () {
            
            let { name, url, target, width, height, orientation, count } = this.options
            
            // 参数缺失
            if(!url || !target || !width || !height || !count) {
                throw('lost param')
            }
            
            // 目标检测
            target = this.find(target)
            if(!target) {
                throw('type error')
            } else {
                this.options.target = target
            }
    
            // 设置缺省字段
            if(!name) this.options.name = this.randomID()
            if(orientation === undefined) this.options.orientation = 1
    
            // dom生产
            this.createEl()
    
            // 开始播放
            this.play()
        }
        createEl () {

            // svg结构生成
    
            let { name, url, target, width, height, orientation, count } = this.options
    
            // 整理尺寸，按播放方向区分处理
            let total_width, total_height, keyframes
            if(orientation) {
                total_width = width * count
                total_height = height
                keyframes = `-${total_width}px 0`
            } else {
                total_width = width
                total_height = height * count
                keyframes = `0 -${total_height}px`
            }
    
            // 整理svg结构
            let html = `
            <svg viewBox="0, 0, ${width}, ${height}" class="fbfa fbfa-${name}">
                <foreignObject class="wrap">
                    <style>
                        .fbfa-${name} .wrap {
                            width: ${width}px;
                            height: ${height}px;
                        }
                        .fbfa-${name} .img {
                            width: ${total_width}px;
                            height: ${total_height}px;
                            background: url(${url}) 0 0 / ${total_width}px ${total_height}px no-repeat;
                        }
                        .fbfa-${name}.play .img {
                            animation: fbfa-${name} 1.2s steps(${count}) infinite;
                            -webkit-animation: fbfa-${name} 1.2s steps(${count}) infinite;
                        }
                        .fbfa-${name}.pause .img {
                            animation-play-state:paused;
                            -webkit-animation-play-state:paused;
                        }
                        @keyframes fbfa-${name} {
                            100% {
                                background-position: ${keyframes};
                            }
                        }
                    </style>
                    <div class="img"></div>
                </foreignObject>
            </svg>`
    
            // 插入svg
            target.insertAdjacentHTML('beforeend', html)
            // target指向改为svg
            this.options.target = target.querySelector(`.fbfa-${name}`)
        }
        play () {
            // 播放动画
            if(this.playStatus == 'play') return
            this.addClass('play')
            this.removeClass('pause')
            this.playStatus = 'play'
        }
        pause () {
            // 暂停动画
            if(this.playStatus != 'play') return
    
            this.addClass('pause')
            this.playStatus = 'pause'
        }
        stop () {
            // 停止动画
            if(!this.hasClass('play')) return
    
            this.removeClass('play')
            this.removeClass('pause')
            this.playStatus = 'stop'
        }
        find (target) {
            // 分类查找元素
            let elem = null

            if(target instanceof HTMLElement) {
                elem = target
            }

            if(typeof(target) == 'string') {
                elem = document.querySelector(target)
            }

            return elem
        }
        hasClass (name) {
            // 判断存在class
            return this.options.target.classList.contains(name)
        }
        addClass (name) {
            // 添加class
            this.options.target.classList.add(name)
        }
        removeClass (name) {
            // 删除class
            this.options.target.classList.remove(name)
        }
        randomID ()  {
            // 随机id
            return Math.random().toString(16).substring(2)
        }
    }

    return FBFA
}))