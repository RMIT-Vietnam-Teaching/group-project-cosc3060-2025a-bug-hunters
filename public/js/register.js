document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
        const getVal = (id) => document.getElementById(id)?.value.trim();
        const setError = (id, msg) =>
            (document.getElementById(id + "Error").innerText = msg);

        // Clear previous errors
        [
            "userFirstName",
            "userLastName",
            "userEmail",
            "userPassword",
            "confirmPassword",
            "userRole",
            "captcha",
        ].forEach((id) => setError(id, ""));

        const userFirstName = getVal("userFirstName");
        const userLastName = getVal("userLastName");
        const userEmail = getVal("userEmail");
        const userPassword = getVal("userPassword");
        const confirmPassword = getVal("confirmPassword");
        const userRole = document.querySelector(
            'input[name="userRole"]:checked'
        );
        const recaptchaResponse = grecaptcha.getResponse();

        let valid = true;

        // Check if the condition of the fields are met

        if (!userFirstName) {
            setError("userFirstName", "First name is required.");
            valid = false;
        }
        if (!userLastName) {
            setError("userLastName", "Last name is required.");
            valid = false;
        }
        if (!userEmail) {
            setError("userEmail", "Email is required.");
            valid = false;
        }

        // Email validation with regular expression
        if (!userEmail) {
            setError("userEmail", "Email is required.");
            valid = false;
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)
        ) {
            setError("userEmail", "Please enter a valid email address.");
            valid = false;
        }

        // Password security check
        const criteria = [
            /.{8,}/.test(userPassword),
            /[a-z]/.test(userPassword) && /[A-Z]/.test(userPassword),
            /[a-zA-Z]/.test(userPassword) && /\d/.test(userPassword),
            /[!@#?\]]/.test(userPassword),
        ];
        const criteriaMet = criteria.filter(Boolean).length;

        if (!userPassword) {
            setError("userPassword", "Password is required.");
            valid = false;
        } else if (criteriaMet < 2) {
            setError(
                "userPassword",
                "Password must meet at least 2 of: 8+ characters, upper/lowercase, letters & numbers, special character (!@#?])."
            );
            valid = false;
        }

        if (!confirmPassword) {
            setError("confirmPassword", "Please confirm your password.");
            valid = false;
        } else if (userPassword !== confirmPassword) {
            setError("confirmPassword", "Passwords do not match.");
            valid = false;
        }

        if (!userRole) {
            setError("userRole", "Please select a role.");
            valid = false;
        }

        if (!recaptchaResponse) {
            document.getElementById("captchaError").innerText =
                "Please complete the CAPTCHA.";
            valid = false;
        }

        if (!valid) e.preventDefault();
    });
