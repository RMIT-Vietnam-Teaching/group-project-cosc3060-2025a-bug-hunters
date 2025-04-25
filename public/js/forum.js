const mediaInput = document.getElementById("mediaInput");
const mediaPreview = document.getElementById("mediaPreview");

function createMediaElement(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const src = e.target.result;
        let element;

        if (file.type.startsWith("image/")) {
            element = document.createElement("img");
            element.className = "rounded";
        } else if (file.type.startsWith("video/")) {
            element = document.createElement("video");
            element.controls = true;
            element.className = "rounded";
        }

        if (element) {
            element.src = src;
            element.style.maxWidth = "180px";
            element.style.maxHeight = "180px";
            element.style.objectFit = "cover";
            element.style.border = "1px solid #ccc";
            element.style.padding = "4px";
            element.style.background = "#f8f8f8";
            mediaPreview.appendChild(element);
        }
    };

    reader.readAsDataURL(file);
}

mediaInput.addEventListener("change", () => {
    mediaPreview.innerHTML = "";
    [...mediaInput.files].forEach(createMediaElement);
});

document
    .getElementById("postForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            "content",
            document.getElementById("contentInput").value
        );

        [...mediaInput.files].forEach((file, index) => {
            formData.append("media", file);
        });

        try {
            const response = await fetch("/forum/post", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert("Post submitted successfully!");
                location.reload();
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit post.");
        }
    });

function openFeelingSelector() {
    // Replace with a modal or dropdown UI for selecting a feeling
    const feelings = [
        { emoji: "😊", label: "happy" },
        { emoji: "😢", label: "sad" },
        { emoji: "😎", label: "cool" },
        { emoji: "🥳", label: "excited" },
        { emoji: "❤️", label: "loved" },
    ];

    // For now, just prompt (replace this with modal later)
    const selected = feelings[Math.floor(Math.random() * feelings.length)];
    document.getElementById("feelingPreview").style.display = "block";
    document.getElementById("feelingIcon").textContent = selected.emoji;
    document.getElementById(
        "feelingText"
    ).textContent = `feeling ${selected.label}`;
}
