// create element
function newlabel(el){
  var newDiv = document.createElement("div");
  var newSpan = document.createElement("span");
  newDiv.id = 'wcLabel';
  newSpan.id = "wcSpan";
  el.appendChild(newDiv);
  document.getElementById("wcLabel").appendChild(newSpan);
}

// hover function
function cv_handleHover(item, dimension, evt) {
  var el = document.getElementById("wcLabel");
  if (!item) {
    el.setAttribute('hidden', true);

    return;
  }

  el.removeAttribute('hidden');
  // console.log(evt.srcElement.offsetLeft);

  el.style.left = dimension.x + evt.srcElement.offsetLeft + 'px';
  el.style.top = dimension.y + evt.srcElement.offsetTop + 'px';
  el.style.width = dimension.w + 'px';
  el.style.height = dimension.h + 'px';

  this.hoverDimension = dimension;

  document.getElementById("wcSpan").setAttribute(
    'data-l10n-args', JSON.stringify({ word: item[0], count: item[1] }));
  document.getElementById("wcSpan").innerHTML =item[0]+":" + item[1];

}

function updateCanvasMask(maskCanvas) {
    var ctx = maskCanvas.getContext('2d');
    var imageData = ctx.getImageData(
        0, 0, maskCanvas.width, maskCanvas.height);
    var newImageData = ctx.createImageData(imageData);

    var toneSum = 0;
    var toneCnt = 0;
    for (var i = 0; i < imageData.data.length; i += 4) {
        var alpha = imageData.data[i + 3];
        if (alpha > 128) {
            var tone = imageData.data[i]
                + imageData.data[i + 1]
                + imageData.data[i + 2];
            toneSum += tone;
            ++toneCnt;
        }
    }
    var threshold = toneSum / toneCnt;

    for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i]
            + imageData.data[i + 1]
            + imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        if (alpha < 128 || tone > threshold) {
            // Area not to draw
            newImageData.data[i] = 0;
            newImageData.data[i + 1] = 0;
            newImageData.data[i + 2] = 0;
            newImageData.data[i + 3] = 0;
        }
        else {
            // Area to draw
            // The color must be same with backgroundColor
            newImageData.data[i] = 255;
            newImageData.data[i + 1] = 255;
            newImageData.data[i + 2] = 255;
            newImageData.data[i + 3] = 255;
        }
    }

    ctx.putImageData(newImageData, 0, 0);
    console.log(maskCanvas.toDataURL());
}



//mask function
function maskInit(el,x){
  console.log(1)
  str = x.figBase64;
  //console.log(str)
  var newImg = new Image();
  newImg.src = str;
  newImg.style.position = 'absolute';
  newImg.style.left = 0;
  // console.log(el.clientHeight);
  newImg.width = el.clientWidth;
  newImg.height = el.clientHeight;
  // maskCanvas = init(el, x, newImg);
  vvalue = 128

  ctx = el.firstChild.getContext('2d');

                ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
                updateCanvasMask(ctx);





            WordCloud(el.firstChild, { list: listData,
                  fontFamily: x.fontFamily,
                  fontWeight: x.fontWeight,
                  color: x.color,
                  minSize: x.minSize,
                  weightFactor: x.weightFactor,
                  backgroundColor: x.backgroundColor,
                  gridSize: x.gridSize,
                  minRotation: x.minRotation,
                  maxRotation: x.maxRotation,
                  shuffle: x.shuffle,
                  shape: x.shape,
                  rotateRatio: x.rotateRatio,
                  ellipticity: x.ellipticity,
                  clearCanvas: false,
                  drawMask: true,
                  hover: x.hover || cv_handleHover,
                  abortThreshold: 3000
                  });
}

