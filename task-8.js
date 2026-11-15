function checkanswers() {
    let score = 0;

    let correctanswers = {
        q1: "A",
        q2: "B",
        q3: "C",
        q4: "A",
        q5: "B"
    };

    for (let questions in correctanswers) {

        let selected = document.querySelector(
            'input[name="' + questions + '"]:checked'
        );
        let correctOption = document.getElementById(
            questions + correctanswers[questions]
        );
        correctOption.classList.add("correct");

        if (selected) {

            if (selected.value === correctanswers[questions]) {
                score++;
            } else {
                selected.parentElement.classList.add("wrong");
            }
        }
    }

    document.getElementById("result").textContent =
        "Your Score: " + score + "/5";
}


function Tryagain() {
    let answers = document.querySelectorAll(
        'input[type="radio"]'
    );

    answers.forEach(function(input) {
        input.checked = false;
    });
    let labels = document.querySelectorAll("label");

    labels.forEach(function(label) {
        label.classList.remove("correct");
        label.classList.remove("wrong");
    });
    document.getElementById("result").textContent = "";
}
