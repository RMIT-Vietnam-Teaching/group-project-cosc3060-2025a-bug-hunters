document.addEventListener("DOMContentLoaded", () => {
    const tutorRemoveBtn = document.querySelector(".btn-remove");
    if (tutorRemoveBtn) {
      tutorRemoveBtn.addEventListener("click", async () => {
        const tutorId = tutorRemoveBtn.dataset.id;
        if (!confirm("Are you sure you want to delete this tutor?")) return;

        try {
          const res = await fetch(`/institution/deleteInstitutionTutor/${tutorId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
          });

          if (res.ok) {
            window.location.href = "/institution/manageTutors";
          } else {
            const data = await res.json();
            alert(`Failed: ${data.message}`);
          }
        } catch (err) {
          console.error("Tutor delete error:", err);
          alert("An error occurred while deleting the tutor.");
        }
      });
    }

    // Remove course
    document.querySelectorAll(".btn-remove-course").forEach(button => {
      button.addEventListener("click", async () => {
        const courseId = button.dataset.id;
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
          const res = await fetch(`/institution/deleteInstitutionCourses/${courseId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });

          if (res.ok) {
            location.reload();
          } else {
            const data = await res.json();
            alert(`Failed: ${data.message}`);
          }
        } catch (err) {
          console.error("Delete error:", err);
          alert("An error occurred while deleting the course.");
        }
      });
    });
  });

const feedbackModal = document.getElementById('feedbackModal');
feedbackModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const courseName = button.getAttribute('data-course');
  document.getElementById('courseTitle').textContent = `For: ${courseName}`;
});