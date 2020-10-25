function renderData(itemInput , idParse = 'demo') {
    var outputs = "";

    if (itemInput.title !== undefined) {
        outputs += '<div>' +  itemInput.title.vi + '</div>' 
    }

    for (var i = 0; i < itemInput.data.length; i++) {
    //   outputs += '<div id="' + data[i].id + '">' + data[i].id + ':' + data[i].name + '</div>';
        let itemData = itemInput.data[i]
        if (itemData !== null) {
            let itemOutput = ''
            if (itemData.title !== undefined) {
                itemOutput +=  '<div>' + itemData.title.vi + '</div>';
            }
            {itemData.data !== undefined
                ? itemData.data.forEach((item, i) => {
                        itemOutput +=  '<div>' + item.valueVI+ '</div>';
                  })
                : null}
              {itemData.valueEN !== undefined && itemData.valueVI !== undefined ? (
                itemOutput +=  '<div>' + itemData.valueVI + '</div>'
              ) : null}

              outputs += '<div>' + itemOutput +  '</div>'
        }
    }
    document.getElementById(idParse).innerHTML = outputs;
  }


  function renderSpecialData(itemInput , idParse = 'demo') {
    var outputs = "";

    if (itemInput.title !== undefined) {
        outputs += '<div>' +  itemInput.title.vi + '</div>' 
    }

    if (item.data !== undefined) {
        for (var i = 0; i < itemInput.data.vi.length; i++) {
            //   outputs += '<div id="' + data[i].id + '">' + data[i].id + ':' + data[i].name + '</div>';
                let itemData = itemInput.data.vi[i]
                if (itemData !== null) {
                    let itemOutput = ''
                    if (itemData.title !== undefined) {
                        itemOutput +=  '<div>' + itemData.title.vi + '</div>';
                    }
                    {itemData.data !== undefined
                        ? itemData.data.forEach((item, i) => {
                                itemOutput +=  '<div>' + item.valueVI+ '</div>';
                          })
                        : null}
                      {itemData.valueEN !== undefined && itemData.valueVI !== undefined ? (
                        itemOutput +=  '<div>' + itemData.valueVI + '</div>'
                      ) : null}
        
                      outputs += '<div>' + itemOutput +  '</div>'
                }
            }
    }
    
    document.getElementById(idParse).innerHTML = outputs;
  }