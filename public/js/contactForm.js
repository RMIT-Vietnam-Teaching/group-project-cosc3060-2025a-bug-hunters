// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  const submitButton = contactForm
    ? contactForm.querySelector(".contact-submit-btn")
    : null;
  const submitSpinner = submitButton
    ? submitButton.querySelector(".spinner-border")
    : null;
  const submitText = submitButton
    ? submitButton.querySelector(".btn-text")
    : null;

  if (contactForm) {
    // Form validation
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");
        return;
      }

      // Collect form data
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value.trim(),
      };

      // Send the form data
      sendContactForm(formData);
    });
  }

  function sendContactForm(formData) {
    // Show loading state
    if (submitButton && submitSpinner && submitText) {
      submitButton.disabled = true;
      submitSpinner.classList.remove("d-none");
      submitText.textContent = "Sending...";
    }

    // Clear any previous status
    if (contactStatus) {
      contactStatus.textContent = "";
      contactStatus.className = "";
    }

    // For demonstration purposes, we'll just simulate the API call
    // In a real implementation, you would use fetch to send data to your server

    // Simulate API delay
    setTimeout(function () {
      // Simulate successful submission (90% success rate for testing)
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        showContactStatus(
          "Thank you! Your message has been sent successfully. We will get back to you soon.",
          "success"
        );
        contactForm.reset();
        contactForm.classList.remove("was-validated");
      } else {
        showContactStatus(
          "Sorry, there was a problem sending your message. Please try again later.",
          "error"
        );
      }

      // Reset button state
      if (submitButton && submitSpinner && submitText) {
        submitButton.disabled = false;
        submitSpinner.classList.add("d-none");
        submitText.textContent = "Send Message";
      }

      // Log the form data for demonstration
      console.log("Contact form submission:", formData);
    }, 1500); // Simulate 1.5s of processing time

    // In a real implementation, you would use fetch API like this:
    /*
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showContactStatus('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        showContactStatus(data.message || 'Something went wrong. Please try again.', 'error');
      }
    })
    .catch(error => {
      showContactStatus('Could not connect to the server. Please try again later.', 'error');
      console.error('Error:', error);
    })
    .finally(() => {
      // Reset button state
      if (submitButton && submitSpinner && submitText) {
        submitButton.disabled = false;
        submitSpinner.classList.add('d-none');
        submitText.textContent = 'Send Message';
      }
    });
    */
  }

  function showContactStatus(message, type) {
    if (!contactStatus) return;

    contactStatus.textContent = message;
    contactStatus.className = "";
    contactStatus.classList.add(type);

    // Scroll to status message
    contactStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});
