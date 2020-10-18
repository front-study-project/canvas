- 1.ctx.createGradient(x0, y0, x1, y2)
  - 这里的坐标系是参照全局的，而不是相对于填充元素
  - [渐变详解](https://www.canvasapi.cn/CanvasRenderingContext2D/createLinearGradient#&syntax)

- 2.canvas的渐变补充
  - canvas会拿最后一个渐变色来补充空白的位置

- 3.阴影
  - shadowColor：Css3格式颜色
  - shadowOffsetX：从图形或文本到阴影的水平像素偏移
  - shadowOffsetY：从图形或文本到阴影的垂直像素偏移
  - shadowBlur：一个和像素无关的值，用在高斯模糊方程之中

- 4.像素宽
  
  绘制一像素的线段的时候，坐标要+0.5，canvas绘制逻辑

  - 读取lineWidth
  - 尝试在坐标处两边各绘制一半的lineWidth，假设y是10,以10为中轴线，从9.5-10.5
  - 但是由于无法绘制半个像素，会自动扩充到整个像素宽度内，即9-11，变成了两个元素
  - 设置了+0.5的形式，则刚好
  - [像素宽详解](https://www.cnblogs.com/v-rockyli/p/3833845.html)