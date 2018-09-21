window.onload = function () {
  if (!document.querySelector('#min-projects')) return;

  // 这种方法的缺陷是，每张图片的index是会变化的
  var imgDiv = document.querySelector('#min-billboard-img');
  var lxTimer;
  var lxTimeout;
  var inProgress = false;

  function start() {
      clearTimeout(lxTimer);
      lxTimer = setInterval(function () {
      var img = imgDiv.children[0];
      img.style.setProperty('margin-right', '-1100px');
      var cloneImg = img.cloneNode(true);
      cloneImg.style.setProperty('margin-right', '0');
      lxTimeout = setTimeout(function () {
        imgDiv.removeChild(img);
        imgDiv.appendChild(cloneImg);
      }, 2000)
    }, 3000)
  }

  start();

  // 绑定mourse事件
  var littleChildren = document.querySelector('.little-btn').querySelectorAll('div');

  littleChildren.forEach(function (e) {
    e.addEventListener('mouseover', function () {

      if (!inProgress) {
        inProgress = true;
      } else {
        return false
      }

      console.log('开始执行线程');

      littleChildren.forEach(e => {
        // 删除background active 类;
        e.classList.remove('b-active');
      })

      e.className += ' b-active';
      var index = 1;
      var child = e;

      // previousSibling 会将换行符号当做一个节点，这就不舒服了， 所以换成 previousElementSibling, ie8
      while((child = child.previousElementSibling) != null) {
        index ++ ;
      }

      clearTimeout(lxTimeout);
      clearTimeout(lxTimer);

      var targeImg;
      imgDiv.querySelectorAll('img').forEach(e => {
        var imgIndex = e.getAttribute('data-index');
        if (index == parseInt(imgIndex)) {
           targeImg = e;
        }
      })

      var targeImgIndex = 1;

      while((targeImg = targeImg.previousElementSibling) != null) {
        targeImgIndex ++ ;
      }

      var firstImg = imgDiv.children[0];

      // var currentMargin  = parseInt(firstImg.style.getProperty('margin-right')) || 0;
      var currentMargin = 0;

      var marginRight = -1100 * (targeImgIndex - 1) - currentMargin;

      console.log('what the final targeImgIndex is ?', targeImgIndex)

      console.log('what the final margin is ?', marginRight);

      firstImg.style.setProperty('margin-right', (marginRight + 'px'));


      var needCloneImgNum =  marginRight / 1100;

      if (needCloneImgNum < 0) needCloneImgNum *= -1;

      setTimeout(function () {
        for (var i = 0; i < needCloneImgNum; i++) {
          // console.log(imgDiv.children[0]);
          var cloneImg = imgDiv.children[0].cloneNode(true);
          cloneImg.style.setProperty('margin-right', '0');
          imgDiv.removeChild(imgDiv.children[0]);
          imgDiv.appendChild(cloneImg);
        }
        inProgress = false;
      }, 1000)
    })

    e.addEventListener('mouseout', function () {
      start();
    })
  })
}
