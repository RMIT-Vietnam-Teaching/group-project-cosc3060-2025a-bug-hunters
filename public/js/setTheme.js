document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[name="theme"]');
    const body = document.body;
    const userId = "<%= user._id %>";

    radios.forEach(radio => {
      radio.addEventListener("change", async (e) => {
        const selectedTheme = e.target.value;

        body.classList.remove("light", "dark");
        body.classList.add(selectedTheme);

        localStorage.setItem("theme", selectedTheme);

        try {
          const res = await fetch(`/userSettings/display/update/${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ theme: selectedTheme }),
          });

          if (!res.ok) throw new Error("Failed to update theme");
        } catch (err) {
          console.error("Theme update failed:", err);
        }
      });
    });

    const saved = localStorage.getItem("theme");
    if (saved) {
      body.classList.remove("light", "dark");
      body.classList.add(saved);
      document.querySelector(`input[value="${saved}"]`).checked = true;
    }


  });