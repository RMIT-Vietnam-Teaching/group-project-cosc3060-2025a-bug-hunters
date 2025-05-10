document.getElementById("loginForm").addEventListener("submit", function (e) {
    const getVal = (id) => document.getElementById(id)?.value.trim();
    const setError = (id, msg) =>
        (document.getElementById(id + "Error").innerText = msg);

    ["userEmail", "userPassword"].forEach((id) => setError(id, ""));

    const userEmail = getVal("userEmail");
    const userPassword = getVal("userPassword");
    const recaptchaResponse = grecaptcha.getResponse();

    let valid = true;

    // Email validation
    if (!userEmail) {
        setError("userEmail", "Email is required.");
        valid = false;
    } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)
    ) {
        setError("userEmail", "Please enter a valid email address.");
        valid = false;
    }

    // Password validation
    if (!userPassword) {
        setError("userPassword", "Password is required.");
        valid = false;
    }

    // reCAPTCHA validation
    if (!recaptchaResponse) {
        document.getElementById("captchaError").innerText =
            "Please complete the CAPTCHA.";
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});
