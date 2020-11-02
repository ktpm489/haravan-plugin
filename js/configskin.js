function getConfigSkinAI (functionProcess) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = process;
    // xhr.open("GET", "https://cdn.jsdelivr.net/gh/ktpm489/admin-demo/config3.js", true);
    xhr.open("GET", "https://raw.githubusercontent.com/ktpm489/admin-demo/master/config3.js", true);
    xhr.send();
    function process() {
        if (xhr.readyState == 4) {
            result = JSON.parse(xhr.responseText)
            if (result) {
                functionProcess && functionProcess(result)
            } else {
                errorShow()
            }
            
        } 
    }
}


function errorShow (text= 'Vui lòng thử lại') {
    alert(text);
}