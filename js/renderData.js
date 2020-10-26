function renderData(itemInput, idParse = "demo") {
  var outputs = "";

  if (itemInput.title !== undefined) {
    outputs += "<div>" + itemInput.title.vi + "</div>";
  }

  for (var i = 0; i < itemInput.data.length; i++) {
    //   outputs += '<div id="' + data[i].id + '">' + data[i].id + ':' + data[i].name + '</div>';
    let itemData = itemInput.data[i];
    if (itemData !== null) {
      let itemOutput = "";
      if (itemData.title !== undefined) {
        itemOutput += "<div>" + itemData.title.vi + "</div>";
      }
      {
        itemData.data !== undefined
          ? itemData.data.forEach((item, i) => {
              itemOutput += "<div>" + item.valueVI + "</div>";
            })
          : null;
      }
      {
        itemData.valueEN !== undefined && itemData.valueVI !== undefined
          ? (itemOutput += "<div>" + itemData.valueVI + "</div>")
          : null;
      }

      outputs += "<div>" + itemOutput + "</div>";
    }
  }
  document.getElementById(idParse).innerHTML = outputs;
}

function renderSpecialData(itemInput, idParse = "demo") {
  var outputs = "";

  if (itemInput.title !== undefined) {
    outputs += "<div>" + itemInput.title.vi + "</div>";
  }

  if (item.data !== undefined) {
    for (var i = 0; i < itemInput.data.vi.length; i++) {
      //   outputs += '<div id="' + data[i].id + '">' + data[i].id + ':' + data[i].name + '</div>';
      let itemData = itemInput.data.vi[i];
      if (itemData !== null) {
        let itemOutput = "";
        if (itemData.title !== undefined) {
          itemOutput += "<div>" + itemData.title.vi + "</div>";
        }
        {
          itemData.data !== undefined
            ? itemData.data.forEach((item, i) => {
                itemOutput += "<div>" + item.valueVI + "</div>";
              })
            : null;
        }
        {
          itemData.valueEN !== undefined && itemData.valueVI !== undefined
            ? (itemOutput += "<div>" + itemData.valueVI + "</div>")
            : null;
        }

        outputs += "<div>" + itemOutput + "</div>";
      }
    }
  }

  document.getElementById(idParse).innerHTML = outputs;
}

function renderImg(url) {
  var img = document.getElementById("myimgresult");
  img.src = url;
}

function closeFunction() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("subform").style.display = "block";
  document.getElementById("pictuer-id").style.display = "flex";
  document.getElementById("c-placeholder").style.display = "none";
}

function processSpecialResult(dataTransfer) {
  let drawSpotArrDataInput = [];
  let drawBlackHeadArrDataInput = [];
  let drawAcneArrDataInput = [];
  let drawPimpleArrDataInput = [];
  for (let i = 0; i < dataTransfer.specialResult.data.length; i++) {
    let itemData = dataTransfer.specialResult.data[i];
    for (let j = 0; j < itemData.data.length; j++) {
      let eachData = itemData.data[j];
      if (eachData.key === "SkinBlackHeads") {
        drawBlackHeadArrDataInput = eachData.drawArr;
      } else if (eachData.key === "SkinSpot") {
        drawSpotArrDataInput = eachData.drawArr;
      } else if (eachData.key === "SkinPimple") {
        drawPimpleArrDataInput = eachData.drawArr;
      } else if (eachData.key === "SkinAcne") {
        drawAcneArrDataInput = eachData.drawArr;
      }
    }
  }
  console.log("drawBlackHeadArrDataInput", drawBlackHeadArrDataInput);
  console.log("drawSpotArrDataInput", drawSpotArrDataInput);
  console.log("drawPimpleArrDataInput", drawPimpleArrDataInput);
  console.log("drawAcneArrDataInput", drawAcneArrDataInput);
  // draw black head
  drawData(drawBlackHeadArrDataInput, 'blackHeadContainer' )
  // drawData(drawBlackHeadArrDataInput, 'myimgContainer' )
  // drawSpotArrDataInput
  drawData(drawSpotArrDataInput, 'spotContainer' )
  // drawData(drawSpotArrDataInput, 'myimgContainer' )
  //drawPimpleArrDataInput
  drawData(drawPimpleArrDataInput, 'pimpleContainer' )
  // drawData(drawPimpleArrDataInput, 'myimgContainer' )
  // drawAcneArrDataInput
  drawData(drawAcneArrDataInput, 'acneContainer' )
  // drawData(drawAcneArrDataInput, 'myimgContainer' )
}

function drawData(arr, itemId, taux = 1, color = "red") {
  console.log('EE222', arr.length > 0)
   if (arr.length > 0) {
     console.log('EE')
     for (var i = 0  ; i < arr.length ; i++) {
       renderDivItem(itemId, arr[i], taux, color)
     }
   }
}

function renderDivItem(itemId, data, taux= 1, color="red") {
  console.log('EE1')
  var div = document.createElement("div");
  div.style.width = data.width * taux + "px";
  div.style.height = data.height * taux + "px";
  div.style.top = data.top * taux + "px";
  div.style.left = data.left * taux + "px";
  div.style.color = color;
  div.style.borderColor = color
  div.className = 'box'
  // this.renderer.addClass(div, "box");
  // this.renderer.setStyle(div, "width", data.width * this.taux + "px");
  // this.renderer.setStyle(div, "height", data.height * this.taux + "px");
  // this.renderer.setStyle(div, "top", data.top * this.taux + "px");
  // this.renderer.setStyle(div, "left", data.left * this.taux + "px");
  let el = document.getElementById(itemId)
  console.log('el', el)
  el.appendChild(div);
}
