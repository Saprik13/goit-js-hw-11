window.readMore = function () {
    const points = document.getElementById("points");
    const more = document.getElementById("next");
    const btnText = document.getElementById("moreBtn");

    if (points.style.display === "none") {
        points.style.display = "inline";
        more.style.display = "none";
    } else {
        points.style.display = "none";
        more.style.display = "inline";
    }
}