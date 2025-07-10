const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const captureBtn = document.getElementById("captureBtn");

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Camera access denied or not supported.");
    console.error(err);
  });

// Capture image on button click
captureBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/jpeg");
  photo.src = imageData;
  photo.style.display = "block";

  // Optional: extract base64 for API
  const base64Data = imageData.split(",")[1];
  console.log("Base64 Image Ready:", base64Data.slice(0, 50) + "...");
});