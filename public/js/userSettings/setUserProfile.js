document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("profileForm");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop normal submission
  
      const formData = new FormData(form);
      const userId = "<%= user._id %>";
  
      const res = await fetch(`/settings/profileSetting`, {
        method: "POST",
        body: formData,
      });
  
      if (res.ok) {
        window.location.href = "/settings/profileSetting"; 
      } else {
        alert("Update failed.");
      }
    });
  });