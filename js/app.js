window.onload = function(){
  imgLocation("container","box");

  var dataInt = {'data':[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};

  window.onscroll=function() {
    if (checkscrollside) {
      var cparent = document.getElementById("container");
      for (var i = 0; i < dataInt.data.length; i++) {
        var cbox = document.createElement('div');
        cbox.className = "box";
        cparent.appendChild(cbox);
        var boximg = document.createElement("div");
        boximg.className = "box_img";
        cbox.appendChild(boximg);
        var cimg = document.createElement("img");
        cimg.src = './images/'+dataInt.data[i].src;
        boximg.appendChild(cimg);
      }
      imgLocation("container","box");
    }
  };
};

function imgLocation(parent,content) {
  var cparent = document.getElementById(parent);
  var ccontent =  getChildElement(cparent,content);
  var imgWidth = ccontent[0].offsetWidth;
  var num = Math.floor(document.documentElement.clientWidth/imgWidth) ;
  cparent.style.cssText = "Width:"+imgWidth*num+"px;margin:0 auto;";

  var BoxHeightArr =[];
  for (var i = 0; i < ccontent.length; i++) {
    var contentHeight = ccontent[i].offsetHeight;
    if (i<num) {
      BoxHeightArr[i] = contentHeight;
    }else {
      var minHeight = Math.min.apply(null,BoxHeightArr);
      var minHeightIndex = getminheightLocation(BoxHeightArr,minHeight);
      ccontent[i].style.position = "absolute";
      ccontent[i].style.top = minHeight +"px";
      ccontent[i].style.left = ccontent[minHeightIndex].offsetLeft+"px";
      BoxHeightArr[minHeightIndex]+=ccontent[i].offsetHeight;
    }
  }
}

function getminheightLocation(BoxHeightArr,minHeight) {
  for (var i in BoxHeightArr) {
    if (BoxHeightArr[i] == minHeight) {
      return i;
    }
  }

}

function getChildElement(parent,content) {
  var allcontent =parent.getElementsByTagName("*");
  var contentArr = [];
  for (var i = 0; i < allcontent.length; i++) {
    if (allcontent[i].className==content) {
      contentArr.push(allcontent[i]);
    }
  }
  return contentArr;
}

function checkscrollside() {
  var cparent = document.getElementById(parent);
  var ccontent = getChildElement(cparent,content);
  var lastContentHeight = ccontent[ccontent.length-1].offsetTop+Math.floor(ccontent[ccontent.length-1].offsetHeight/2);
  var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
  var documentHeight = document.documentElement.clientHeight;
  return(lastContentHeight<scrollTop+documentHeight)?true:false;
}
