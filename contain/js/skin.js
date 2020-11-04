var width = 320; // We will scale the photo width to this
var height = 0; // This will be computed based on the input stream

var streaming = false;
var video = null;
var canvas = null;
var photo = null;
var startbutton = null;
var localstream = null;
function includeChooseFileListen() {
  var fileToRead = document.getElementById("inputImage");
  fileToRead.addEventListener(
    "change",
    function (event) {
      document.getElementById("subform").style.display = "flex";
      document.getElementById("cameraForm").style.display = "none";
      var files = fileToRead.files;
      if (files.length) {
        var img = document.getElementById("imageShow");
        var reader = new FileReader();
        reader.onloadend = function () {
          img.src = reader.result;
        };
        reader.readAsDataURL(files[0]);
        resizeImage(files[0]);
        enableBtn();
      }
    },
    false
  );
}

function dislayCamera() {
  document.getElementById("subform").style.display = "none";
  document.getElementById("cameraForm").style.display = "block";
  startup();
}

function startup() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("imageShow");
  startbutton = document.getElementById("startbutton");

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then(function (stream) {
      video.srcObject = stream;
      localstream = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred: " + err);
    });

  video.addEventListener(
    "canplay",
    function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },
    false
  );

  startbutton.addEventListener(
    "click",
    function (ev) {
      takepicture();
      ev.preventDefault();
    },
    false
  );

  clearphoto();
}
function clearphoto() {
  var context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}

function takepicture() {
  var context = canvas.getContext("2d");
  photo = document.getElementById("imageShow");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
    document.getElementById("subform").style.display = "flex";
    document.getElementById("cameraForm").style.display = "none";
    document.getElementById("c-placeholder").style.display = "none";
    // draw render output image
    resizeImageCapture(data)
    enableBtn();
  } else {
    clearphoto();
    document.getElementById("subform").style.display = "flex";
    document.getElementById("cameraForm").style.display = "none";
    document.getElementById("c-placeholder").style.display = "none";
  }
  setTimeout(() => {
    videoOff();
  }, 1500);
}

function videoOff() {
  // A video"s MediaStream object is available through its srcObject attribute
  video = document.getElementById("video");
  const mediaStream = video.srcObject;
  // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
  const tracks = mediaStream.getTracks();
  // Tracks are returned as an array, so if you know you only have one, you can stop it with:
  // tracks[0].pause();

  // Or stop all like so:
  tracks.forEach((track) => track.stop());
}


function resizeImage(fileInput) {
      var file = fileInput;
      if (file) {

          var reader = new FileReader();
          // Set the image once loaded into file reader
          reader.onload = function(e) {

              var img = document.createElement("img");
              img.src = e.target.result;

              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              var MAX_WIDTH = 400;
              var MAX_HEIGHT = 400;
              var width = img.width;
              var height = img.height;
              if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }
              canvas.width = 500;
              canvas.height = 500;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, 500, 500);
              dataurl = canvas.toDataURL(file.type);
              document.getElementById("output").src = dataurl;
          }
          reader.readAsDataURL(file);

      }
}

function resizeImageCapture(data) {
  var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 500; // target width
canvas.height = 500; // target height
var image = new Image();
image.onload = function(e) {
    ctx.drawImage(image, 
        0, 0, image.width, image.height, 
        0, 0, canvas.width, canvas.height
    );
    document.getElementById("output").src = canvas.toDataURL();
};
image.src = data;
}