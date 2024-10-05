document
  .getElementById("contactForm")
  .addEventListener("submit", function (form) {
    form.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Create a message object
    const newMessage = {
      name: name,
      email: email,
      message: message,
      date: new Date().toLocaleString(),
    };

    // Get messages from local storage
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    // Add message to the messages array
    messages.push(newMessage);

    // store new data in local storage
    localStorage.setItem("messages", JSON.stringify(messages));

    // Display success message
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";

    // Clear form fields
    document.getElementById("contactForm").reset();
  });
  window.addEventListener('load', function () {
    // Get the contact form element
    const contactForm = document.querySelector('.contact-form');
  
    // Add the fade-in class when the page has loaded
    contactForm.classList.add('fade-in');
  });
  

  