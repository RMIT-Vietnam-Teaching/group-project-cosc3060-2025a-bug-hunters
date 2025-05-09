document.getElementById("resetForm").addEventListener("submit", function (e) {
    const getVal = (id) => document.getElementById(id).value.trim();
    const setError = (id, msg) =>
        (document.getElementById(id + "-error").innerText = msg);

    ["new-password", "confirm-password"].forEach((id) => setError(id, ""));

    const newPassword = getVal("new-password");
    const confirmPassword = getVal("confirm-password");

    let valid = true;

    //Check the password if it meets the requirement
    const criteria = [
        /.{8,}/.test(newPassword),
        /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
        /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword),
        /[!@#?\]]/.test(newPassword),
    ];
    const metCriteria = criteria.filter(Boolean).length;

    if (!newPassword) {
        setError("new-password", "Please enter a new password.");
        valid = false;
    } else if (metCriteria < 2) {
        setError(
            "new-password",
            "Password must meet at least 2 of: 8+ characters, upper/lowercase, letters & numbers, special character (!@#?])."
        );
        valid = false;
    }

    if (!confirmPassword) {
        setError("confirm-password", "Please confirm your new password.");
        valid = false;
    } else if (newPassword !== confirmPassword) {
        setError("confirm-password", "Passwords do not match.");
        valid = false;
    }

    if (!valid) e.preventDefault();
});
