
let selectedColor = "#101827";

document.querySelectorAll(".colors button").forEach(button => {
    button.addEventListener("click", () => {
        selectedColor = button.dataset.color;
        document.body.style.background = selectedColor;
    });
});

document.getElementById("customColor").addEventListener("input", event => {
    selectedColor = event.target.value;
    document.body.style.background = selectedColor;
});

document.getElementById("apply").addEventListener("click", () => {
    localStorage.setItem("Background", selectedColor);
});

const savedColor = localStorage.getItem("Background");

if (savedColor) {
    selectedColor = savedColor;
    document.body.style.background = savedColor;
}
