function renderData(itemInput, idParse = "demo", titleDefault = "") {
  var outputs = "";

  if (itemInput.title !== undefined) {
    outputs += "<div>" + itemInput.title.vi + "</div>";
  } else if (titleDefault !== "") {
    outputs += "<div>" + titleDefault + "</div>";
    outputs += "<div>" + "\n" + "</div>";
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
      outputs +=
        "<div>" +
        "------------------------------------------------------------------" +
        "</div>";
    }
  }
  document.getElementById(idParse).innerHTML = outputs;
}

function renderSpecialData(itemInput, idParse = "demo") {
  var outputs = "";
  // TODO fix here
  // console.log("itemInput", itemInput);
  if (itemInput.title !== undefined) {
   
    outputs += "<div>" + itemInput.title.vi + "</div>";
  }

  for (let j = 0; j < itemInput.data.length; j++) {
    let tempData = itemInput.data[j];
    for (let k = 0; k < tempData.length; k++) {
      let itemData = tempData[k];
      // console.log("item.data ", itemData.data);
      if (itemData.data !== undefined) {
        // outputs += "<div>" + '-------------' + "</div>";
        // outputs += "<div>" + '\n' + "</div>";
        // outputs += '<div>' + item.title.vi+ '</div>';
        if (itemData !== null) {
          outputs += "<div>" + '-------------' + "</div>";
          let itemOutput = "";
          if (itemData.title !== undefined) {
            itemOutput += "<div>" + itemData.title.vi + "</div>";
          }
          {
            itemData.data !== undefined
              ? itemData.data.vi.forEach((item, i) => {
                itemOutput += "<div>" + item + "</div>";
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
        // for (var i = 0; i < item.data.vi.length; i++) {
        //   let itemData = item.data.vi[i];
        //   console.log("itemData ", itemData, itemData !== null);
        //   outputs += '<div>' + itemData + '</div>'
        //   if (itemData !== null) {
        //     let itemOutput = "";
        //     if (itemData.title !== undefined) {
        //       itemOutput += "<div>" + item.title.vi + "</div>";
        //     }
        //     {
        //       itemData.data !== undefined
        //         ? itemData.data.forEach((item, i) => {
        //             itemOutput += "<div>" + item.valueVI + "</div>";
        //           })
        //         : null;
        //     }
        //     {
        //       itemData.valueEN !== undefined && itemData.valueVI !== undefined
        //         ? (itemOutput += "<div>" + itemData.valueVI + "</div>")
        //         : null;
        //     }

        //     outputs += "<div>" + itemOutput + "</div>";
        //   }
        // }
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
  document.getElementById("subform").style.display = "flex";
  document.getElementById("pictuer-id").style.display = "flex";
  document.getElementById("c-placeholder").style.display = "none";
  document.getElementById("imageShow").src = "https://i.ibb.co/P4pwftk/skin.png";
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
  // console.log("drawBlackHeadArrDataInput", drawBlackHeadArrDataInput);
  // console.log("drawSpotArrDataInput", drawSpotArrDataInput);
  // console.log("drawPimpleArrDataInput", drawPimpleArrDataInput);
  // console.log("drawAcneArrDataInput", drawAcneArrDataInput);
  // draw black head
  drawData(drawBlackHeadArrDataInput, "blackHeadContainer", "pink");
  // drawData(drawBlackHeadArrDataInput, 'myimgContainer' )
  // drawSpotArrDataInput
  drawData(drawSpotArrDataInput, "spotContainer", "orange");
  // drawData(drawSpotArrDataInput, 'myimgContainer' )
  //drawPimpleArrDataInput
  drawData(drawPimpleArrDataInput, "pimpleContainer", "red");
  // drawData(drawPimpleArrDataInput, 'myimgContainer' )
  // drawAcneArrDataInput
  drawData(drawAcneArrDataInput, "acneContainer", "green");
  // drawData(drawAcneArrDataInput, 'myimgContainer' )
}

function drawData(arr, itemId, color = "red", taux = 1) {
  // console.log("EE222", arr.length > 0);
  if (arr.length > 0) {
    // console.log("EE");
    for (var i = 0; i < arr.length; i++) {
      renderDivItem(itemId, arr[i], taux, color);
    }
  }
}

function renderDivItem(itemId, data, taux = 1, color = "red") {
  // console.log("EE1");
  var div = document.createElement("div");
  div.style.width = data.width * taux + "px";
  div.style.height = data.height * taux + "px";
  div.style.top = data.top * taux + "px";
  div.style.left = data.left * taux + "px";
  div.style.color = color;
  div.style.borderColor = color;
  div.className = "box";
  // this.renderer.addClass(div, "box");
  // this.renderer.setStyle(div, "width", data.width * this.taux + "px");
  // this.renderer.setStyle(div, "height", data.height * this.taux + "px");
  // this.renderer.setStyle(div, "top", data.top * this.taux + "px");
  // this.renderer.setStyle(div, "left", data.left * this.taux + "px");
  let el = document.getElementById(itemId);
  // console.log("el", el);
  el.appendChild(div);
}

function myFunction(toogleId, containerId) {
  // console.log(toogleId, containerId);
  var checkBox = document.getElementById(toogleId);
  // console.log("checkBox", checkBox);
  var text = document.getElementById(containerId);
  // console.log("text", text);
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function uploadImage() {
  getConfigSkinAI(processImage)
  // processImage()
}

function processImage (inputData) {
  var img = document.getElementById("imageShow");
  // console.log('inputData',inputData)
  console.log(img.src.replace('data:image/jpeg;base64,',''))
  try {
    if (img.src !== null) {
      let jdata = {
        email: "ktpm489@gmail.com",
        image_base64: img.src.replace('data:image/jpeg;base64,','') + ''
      };
      var xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        " https://shrouded-brushlands-68077.herokuapp.com/api/userskin",
        true
      );
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader(
        "apikey",
        "NWY0N2FkMjg4ZjFiYmIwYWViZDBkNDdhXzU2Nzg5MTBfSG5mMlJRcDhMbkNuWWhBQw=="
      );
      xhttp.send(JSON.stringify(jdata));
  
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.status === 200) {
            console.log(this.responseText);
            let dataJSON = JSON.parse(this.responseText);
            renderSkinData(dataJSON);
            openRenderPage()
          } else {
            errorShow()
          }
         
        } 
      };
    }
  } catch (e) {
    errorShow()
  } 

  
}

function renderSkinData(dataJSON) {
  renderData(dataJSON.data.facedata.generalResult, 'generalResult')
  renderData(dataJSON.data.facedata.specialResult, 'specialResult', 'Kết quả từng phần')
  renderData(dataJSON.data.facedata.generalConclusion, 'generalConclusion')
  renderSpecialData(
    dataJSON.data.facedata.specialConclusion,
    "specialConclusion"
  );
  renderImg(dataJSON.data.facedata.image_info.url)
  processSpecialResult(dataJSON.data.facedata)
}

function openRenderPage() {
      document.getElementById("subform").style.display = "none";
      document.getElementById("pictuer-id").style.display = "none";
      document.getElementById("c-placeholder").style.display = "block";
      document.getElementById("uploadbtn").innerHTML = "Tải lên";
}