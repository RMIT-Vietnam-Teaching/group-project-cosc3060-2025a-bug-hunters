document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[name="theme"]');
    const body = document.body;
    const userId = body.dataset.userId;

    radios.forEach((radio) => {
        radio.addEventListener("change", async (e) => {
            const selectedTheme = e.target.value;

            body.classList.remove("light", "dark");
            body.classList.add(selectedTheme);
            localStorage.setItem("theme", selectedTheme);

            try {
                const res = await fetch(
                    `/userSettings/display/update/${userId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ theme: selectedTheme }),
                    }
                );

                if (!res.ok) throw new Error("Failed to update theme");
            } catch (err) {
                console.error("Theme update failed:", err);
            }
        });
    });
});
