/************************************ toggle icon navbar  ************************************/


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
}

/************************************ scroll section active ************************************/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
    
            if(top >= offset && top < offset + height) {
                navLinks.forEach.apply(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                        });
                };
            });

            /**********************************sticky navbar************************************/
             let header = document.querySelector('header');
             header.classList.toggle('sticky', window.scrollY > 100);
             
             /**********************************remove toggle icon and navbar*************************************************/
             menuIcon.classList.remove("fa-xmark");
             navbar.classList.remove("active");
};

/*********************************** scroll reveal ******************************************/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 400,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .project-box, .contact form', { origin: 'button' });
ScrollReveal().reveal('.home-content, heading', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

/************************************* typed js**********************************************/
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
})  

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,

        }, 500, 'linear'
        );
    });
    


// form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    let errorMessage = "";

    // Validate Name
    if (name.length < 3) {
        isValid = false;
        errorMessage += "Name must be at least 3 characters long.\n";
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        errorMessage += "Please enter a valid email address.\n";
    }

    // Validate Number
    const numberPattern = /^[0-9]{10}$/; // Accepts only 10-digit numbers
    if (!numberPattern.test(number)) {
        isValid = false;
        errorMessage += "Please enter a valid 10-digit phone number.\n";
    }

    // Validate Message
    if (message.length < 10) {
        isValid = false;
        errorMessage += "Message must be at least 10 characters long.\n";
    }

    if (isValid) {
        alert("Form submitted successfully!");
        // Perform actual form submission (e.g., via AJAX or default behavior)
        e.target.submit();
    } else {
        alert(errorMessage); // Show error messages
    }
});


// Connect Gmail Form

 // Initialize EmailJS
 (function () {
    emailjs.init("1Ym3vdKYj_SBrDkkb"); // Replace with your EmailJS user ID
})();

// Function to send the email
function sendEmail() {
    // Collect form data
    var from_name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var message = document.getElementById("message").value;

    // Define template parameters
    var templateParams = {
        from_name: from_name,
        email: email,
        number: number,
        message: message,
    };

    // Use EmailJS to send the email
    emailjs.send('service_qfe5n0r', 'template_q7qddpy', templateParams)
    .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);

        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for connecting. I will get back to you soon!',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true
        });

        document.getElementById("contactForm").reset();
    }, function (error) {
        console.error('FAILED...', error); // Log the full error response

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Failed to send your message. Error: ${error.text || 'Unknown error'}`,
            confirmButtonText: 'Retry',
        });
    });
}

// Attach the sendEmail function to the button
document.getElementById("sendButton").addEventListener("click", sendEmail);