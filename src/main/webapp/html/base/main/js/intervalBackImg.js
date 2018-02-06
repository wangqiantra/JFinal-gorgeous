IntervalBackImg();

function IntervalBackImg() {
    window.setInterval(RandomBackImg, 10000);
}

function RandomBackImg() {
    var imgArr = ["banner0.jpg", "banner1.jpg" ,"banner2.jpg", "banner3.jpg"];
    var index = RandomNum(0, imgArr.length);
    document.getElementById("banner").style.backgroundImage="url(../imgs/"+imgArr[index]+")";
}

function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range); //舍去
    return num;
}