document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".btn-remove-course");
  
    removeButtons.forEach(button => {
      button.addEventListener("click", async () => {
        const courseId = button.dataset.id;
  
        if (!confirm("Are you sure you want to delete this course?")) return;
  
        try {
          const res = await fetch(`/institution/courses/${courseId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          });
  
          if (res.ok) {
            const item = button.closest(".list-group-item");
            item.remove();
          } else {
            const data = await res.json();
            alert(`Failed: ${data.message}`);
          }
        } catch (err) {
          console.error("Delete error:", err);
          alert("An error occurred while deleting.");
        }
      });
    });
  });