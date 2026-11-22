const passwordInput = document.getElementById("pass");
const confirmInput = document.getElementById("cpass");
const resetButton = document.getElementById("resetButton");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const strengthMeter = document.querySelector(".strength-meter");

const requirements = [
    {
        element: document.getElementById("length"),
        test: (password) => password.length >= 8
    },
    {
        element: document.getElementById("capital"),
        test: (password) => /[A-Z]/.test(password)
    },
    {
        element: document.getElementById("small"),
        test: (password) => /[a-z]/.test(password)
    },
    {
        element: document.getElementById("symbol"),
        test: (password) => /[^A-Za-z0-9]/.test(password)
    }
];

function setRequirement(element, valid) {
    element.classList.toggle("valid", valid);

    const icon = element.querySelector(".icon");
    if (icon) {
        icon.textContent = valid ? "✅" : "❌";
    }
}

function updateConfirmation() {
    const password = passwordInput.value;

    if (!confirmInput.value) {
        confirmInput.setCustomValidity("");
        return;
    }

    confirmInput.setCustomValidity(
        confirmInput.value === password ? "" : "Passwords do not match."
    );
}

function checkPassword() {
    const password = passwordInput.value;
    let passedRequirements = 0;

    requirements.forEach(({ element, test }) => {
        const valid = test(password);
        setRequirement(element, valid);
        if (valid) {
            passedRequirements++;
        }
    });

    const strengthLabels = ["Enter a password", "Weak", "Fair", "Good", "Strong"];
    strengthText.textContent = `Strength: ${strengthLabels[passedRequirements]}`;
    strengthFill.style.width = `${passedRequirements * 25}%`;
    strengthFill.className = `strength-fill${passedRequirements ? ` level-${passedRequirements}` : ""}`;
    strengthMeter.setAttribute("aria-valuenow", String(passedRequirements));

    updateConfirmation();
}

passwordInput.addEventListener("input", checkPassword);
confirmInput.addEventListener("input", updateConfirmation);
resetButton.addEventListener("click", () => {
    passwordInput.value = "";
    confirmInput.value = "";
    confirmInput.setCustomValidity("");
    checkPassword();
    passwordInput.focus();
});

checkPassword();