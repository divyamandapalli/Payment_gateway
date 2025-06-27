function sendMail(){
    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate the form data
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Send the email using EmailJS
    emailjs.send("service_j9begcc", "template_sa3rwl7", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
    }, function(error) {
        console.error('FAILED...', error);
        alert('Failed to send email. Please try again later.');
    });   
}