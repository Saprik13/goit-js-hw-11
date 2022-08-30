document.getElementById("autoplay").addEventListener("click", function() {
    document.querySelector(".video-setup").play();
});

document.getElementById("close-video").addEventListener("click", function () {
    document.querySelector(".video-setup").pause();
});