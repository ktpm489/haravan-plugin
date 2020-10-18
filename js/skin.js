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
fileToRead.addEventListener("change", function(event) {
    document.getElementById("subform").style.display = "block";
    document.getElementById("cameraForm").style.display = "none";
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

function dislayCamera() {
    // runCamera()
    document.getElementById("subform").style.display = "none";
    document.getElementById("cameraForm").style.display = "block";
    startup()
}
   
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      // photo = document.getElementById('photo');
      photo = document.getElementById('imageShow');
      startbutton = document.getElementById('startbutton');

      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
        .then(function (stream) {
          video.srcObject = stream;
          localstream = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });

      video.addEventListener('canplay', function (ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

      startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
      }, false);

      clearphoto();
    }
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

    function takepicture() {
      var context = canvas.getContext('2d');
      photo = document.getElementById('imageShow');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        console.log('data',data)
        photo.setAttribute('src', data);
        document.getElementById("subform").style.display = "block";
        document.getElementById("cameraForm").style.display = "none";
       
      } else {
        clearphoto();
        document.getElementById("subform").style.display = "block";
        document.getElementById("cameraForm").style.display = "none";
      }
      setTimeout(()=> {
        videoOff();
      },1500)
    }

    function videoOff() {
      console.log('EEE')
      // A video's MediaStream object is available through its srcObject attribute
      video = document.getElementById('video');
      const mediaStream = video.srcObject;

      // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
      const tracks = mediaStream.getTracks();

      // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
      // tracks[0].pause();

      // Or stop all like so:
      tracks.forEach(track => track.stop())
    }

    

    // window.addEventListener('load', startup, false);