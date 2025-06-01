document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".php-email-form");
    const loadingElement = document.querySelector(".loading");
    const errorMessageElement = document.querySelector(".error-message");
    const sentMessageElement = document.querySelector(".sent-message");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      loadingElement.style.display = "block";
      errorMessageElement.style.display = "none";
      sentMessageElement.style.display = "none";
  
      const formData = new FormData(contactForm);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
  
      fetch('https://formspree.io/f/YOUR_FORM_ID', { // Replace with your Formspree endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object),
      })
      .then(response => {
        loadingElement.style.display = "none";
        if (response.ok) {
          sentMessageElement.style.display = "block";
          contactForm.reset();
        } else {
          errorMessageElement.textContent = 'Failed to send message. Please try again later.';
          errorMessageElement.style.display = "block";
        }
      })
      .catch(error => {
        loadingElement.style.display = "none";
        errorMessageElement.textContent = 'An error occurred while sending the message.';
        errorMessageElement.style.display = "block";
        console.error('Error:', error);
      });
    });
  });
  