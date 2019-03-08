const WINDOW_WIDTH = 1024;
const WINDOW_HEIGTH = 768;
const RADIUS = 8;
const MARGIN_TOP = 60;
const MARGIN_LEFT = 30;
const ENDTIME = new Date(2019, 2, 6, 18, 30, 00)
var currentSeconds = 0
//x y 坐标 g 加速度，vx 水平舒服 vy 垂直速度
var ball = { x: 512, y: 100, r: 20, g: 2, vx: -4, vy: 0, color: "#005588" }
window.onload = function () {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGTH;
    currentSeconds = getCurrentSeconds()
    setInterval(() => {
        render(context)
        update()
    }, 50)

}
function update() {
    var nextTotalSeconds = getCurrentSeconds()
    if (nextTotalSeconds != currentSeconds) {
        currentSeconds = nextTotalSeconds
    }
}
function getCurrentSeconds() {
    var curTime = new Date()
    var ret = ENDTIME.getTime() - curTime.getTime()
    return ret > 0 ? Math.round(ret / 1000) : 0
}
function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGTH)
    var hours = parseInt(currentSeconds / 3600)
    var minutes = parseInt((currentSeconds - hours * 3600) / 60)
    var seconds = currentSeconds % 60

    //十位数和个位数要进行拆分来渲染 15为两倍半径
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)

}
function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)"
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath()
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}
