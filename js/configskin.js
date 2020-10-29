function getConfigSkinAI (functionProcess) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = process;
    xhr.open("GET", "https://cdn.jsdelivr.net/gh/ktpm489/admin-demo/config3.js", true);
    xhr.send();
    function process() {
        if (xhr.readyState == 4) {
            console.log(JSON.parse(xhr.responseText));
            result = JSON.parse(xhr.responseText)
            functionProcess && functionProcess(result)
        }
    }
}
