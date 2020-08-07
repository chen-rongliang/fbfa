# frame-by-frame animation 逐帧动画

svg版帧动画播放机，可缩放，跟img一样
填入必要参数即可实现动画控制
暂定用雪碧图，有需要可自行拓展为单张图

## 参数说明
```
name 用作class，缺省则填充随机id
url 帧动画图片地址，必填
target svg插入路径，必填
width 单帧宽度，必填
height 单帧高度，必填
count 帧数，必填
orientation 帧图方向，横为 landscape，竖为 portrait
```

## 小例子

``` html
    <div class="demo"></div>
```

``` javascript

    var demo = new FBFA({
        name: 'lvbu',
        url: 'http://talksamguk.eyougame.com/static/img/cartoon/lvbu.png',
        target: '.demo',
        width: 307,
        height: 256,
        orientation: 1,
        count: 30
    })

    // 播放
    demo.play()
    // 暂停
    demo.pause()
    // 停止
    demo.stop()
```