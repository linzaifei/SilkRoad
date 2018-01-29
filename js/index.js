

function $(id){
    return typeof id === 'string' ? document.getElementById(id):id;
}

window.onload =function () {
    waterFall('main', 'box');
}

// 实现瀑布流布局
function waterFall(parent, box){
    //----- 居中显示-----
    // 1.拿到所有的盒子
    var allBox = $(parent).getElementsByClassName(box);

    // 2.取出其中任一盒子的宽度
   var boxWidth = allBox[0].offsetWidth;
   		console.log(boxWidth)
    // 3.求出当前浏览器的宽度
    var screenWidth = (document.body.clientWidth);
    // 4.求出总列数
    var cols = Math.floor((screenWidth ) / boxWidth);
//  console.log(screenWidth )
    // console.log(cols)
   
// 定义一个高度数组
    var heightArr = [];
    // 1.遍历所有的盒子,并取出第一行盒子的高度放入数组
    for(var i=0; i<allBox.length; i++){
        // 取出每一个盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        // console.log(boxHeight)
        if(i < cols){// 第一行
            heightArr.push(boxHeight);
        }else{ // 剩余的行
            // 取出上一行最矮盒子的高度
            var minBoxHeight = Math.min.apply(null, heightArr);
            // 取出上一行最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            // 对当前行中盒子进行定位
//          console.log(minBoxHeight)
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
//          console.log(minBoxHeight);
            allBox[i].style.left = boxWidth * minBoxIndex + 'px';
            // 更新高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
	 // 让父标签居中显示
    $(parent).style.cssText = 'width:' + boxWidth * cols + 'px; margin:0 auto;position: relative;height:'+heightArr.max()+'px;';
    console.log(heightArr)
}
Array.prototype.max = function () { 
	// 将数组第一个元素的值赋给max
	var max = this[0]; 
	// 使用for 循环从数组第一个值开始做遍历 
	for (var i = 1; i < this.length; i++) { 
		// 如果元素当前值大于max,就把这个当前值赋值给max 
		if (this[i] > max) { 
			max = this[i]; 
		} 
	} 
	// 返回最大的值 
	return max; 
}

function getMinBoxIndex(value, arr){
    for(var i in arr){
        if(arr[i] == value){
            return i;
        }
    }
}