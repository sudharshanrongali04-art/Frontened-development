const images = [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdH8I9Ts00tTXHPrwEcE-TLFJY04rw8AFt9-bfy9-QNNuU57v_sRfMmk7H&s=10", alt: "Groot", caption: "Groot" },
    { src: "https://images.wallpapersden.com/image/hxl-baby-groot-2019_67900.jpg", alt: "Groot", caption: "Groot" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5jgzMEcPgMT82bV8oTxgGsFl-IE_dnZFyXpgyLxS0RVVa8YYKMAUUv0AG&s=10", alt: "Groot", caption: "Groot" },
    { src: "https://static0.cbrimages.com/wordpress/wp-content/uploads/2017/04/groot-hoy-toys-guardians-of-the-galaxy-vol-2-featured.jpg?w=1200&h=675&fit=crop", alt: "Groot", caption: "Groot" },
    { src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0yeKt_z4TfI3Ch3M_4-dlrY5xglK51-94ZP7djQe-OfivHYd45F1HFI&s=10", alt: "Groot", caption:"Groot" }
];

const imageElement = document.getElementById("galleryImage");
const captionElement = document.getElementById("imageCaption");
const countElement = document.getElementById("slideCount");
const slideshowButton = document.getElementById("slideshowButton");
let currentIndex = 0;
let slideshowTimer = null;

function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    const image = images[currentIndex];

    imageElement.src = image.src;
    imageElement.alt = image.alt;
    captionElement.textContent = image.caption;
    countElement.textContent = `${currentIndex + 1} / ${images.length}`;
}

function stopSlideshow() {
    if (slideshowTimer !== null) {
        window.clearInterval(slideshowTimer);
        slideshowTimer = null;
    }
    slideshowButton.textContent = "Start slideshow";
    slideshowButton.setAttribute("aria-pressed", "false");
}

document.getElementById("previousButton").addEventListener("click", () => {
    showImage(currentIndex - 1);
});

document.getElementById("nextButton").addEventListener("click", () => {
    showImage(currentIndex + 1);
});

slideshowButton.addEventListener("click", () => {
    if (slideshowTimer !== null) {
        stopSlideshow();
        return;
    }

    slideshowButton.textContent = "Pause slideshow";
    slideshowButton.setAttribute("aria-pressed", "true");
    slideshowTimer = window.setInterval(() => {
        showImage(currentIndex + 1);
    }, 3000);
});

showImage(currentIndex);