const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const captureBtn = document.getElementById("captureBtn");
const flipBtn = document.getElementById("flipBtn");

let videoStream;
let usingFrontCamera = false;

// Function to start camera with selected facing mode
async function startCamera() {
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      facingMode: usingFrontCamera ? "user" : "environment"
    }
  };

  try {
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = videoStream;
  } catch (err) {
    alert("Camera access denied or not supported.");
    console.error(err);
  }
}

// Capture image on button click
captureBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/jpeg");
  photo.src = imageData;
  photo.style.display = "block";

  const base64Data = imageData.split(",")[1];
  console.log("Base64 Image Ready:", base64Data.slice(0, 50) + "...");
});

// Flip camera on button click
flipBtn.addEventListener("click", () => {
  usingFrontCamera = !usingFrontCamera;
  startCamera();
});

// Start camera on load
startCamera();
