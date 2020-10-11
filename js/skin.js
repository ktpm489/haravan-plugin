function includeChooseFileListen() {
var fileToRead = document.getElementById("inputImage");
fileToRead.addEventListener("change", function(event) {
    var files = fileToRead.files;
    if (files.length) {
        console.log("Filename: " + files[0].name);
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");
        var img = document.getElementById("imageShow");
        var reader = new FileReader();
        reader.onloadend = function() {
             img.src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }

}, false);
}