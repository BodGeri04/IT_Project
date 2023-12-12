<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta content="" name="description">
   <meta content="" name="keywords">

   <link href="assets/img/favicon.png" rel="icon">
   <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

   <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Roboto:100,300,400,500,700|Philosopher:400,400i,700,700i" rel="stylesheet">

   <link href="assets/vendor/aos/aos.css" rel="stylesheet">
   <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
   <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
   <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
   <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

   <link href="assets/css/style.css" rel="stylesheet">

   <style>
      body {
         font-family: 'Open Sans', sans-serif;
      }

      header {
         background-color: #fff;
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
         padding: 15px 0;
      }

      #logo h1 a {
         font-size: 24px;
         font-weight: 700;
         color: #333;
      }

      .mainpart {
         display: flex;
         align-items: center;
         justify-content: center;
         height: 100vh;
         margin: 0;
         background-color: #f4f4f4;
         flex-direction: column;
         text-align: center;
      }

      h1 {
         margin-bottom: 20px;
         font-size: 36px;
         color: #333;
      }

      form {
         max-width: 400px;
         width: 100%;
         box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
         padding: 30px;
         background-color: #fff;
         box-sizing: border-box;
         border-radius: 8px;
      }

      label {
         font-size: 16px;
         display: block;
         margin-bottom: 8px;
         color: #555;
      }

      input {
         width: 100%;
         padding: 10px;
         margin-bottom: 15px;
         box-sizing: border-box;
         border: 1px solid #ccc;
         border-radius: 4px;
         font-size: 16px;
      }

      button {
         background-color: #28a745;
         color: #fff;
         padding: 12px;
         border: none;
         border-radius: 4px;
         font-size: 18px;
         cursor: pointer;
      }

      button:hover {
         background-color: #218838;
      }

      .copyright_section {
         background-color: #333;
         color: #fff;
         padding: 15px 0;
         text-align: center;
      }

      .copyright_text {
         margin: 0;
         font-size: 14px;
      }
   </style>
</head>
<body>
   <header id="header" class="header fixed-top d-flex align-items-center">
      <div class="container d-flex align-items-center justify-content-between">
         <div id="logo">
            <h1><a href="index.html">Christmas</a></h1>
         </div>
         <nav id="navbar" class="navbar">
            <ul>
               <li><a class="nav-link scrollto active" href="index.html">HOME</a></li>
               <li><a class="nav-link scrollto" href="events.php">EVENTS</a></li>
               <li><a class="nav-link scrollto" href="bestdeals.html">BEST DEALS</a></li>
               <li><a class="nav-link scrollto" href="testimonial.html">TESTIMONIAL</a></li>
               <li><a class="nav-link scrollto" href="contact.html">CONTACT US</a></li>
               <li><a class="nav-link scrollto" href="login.php">LOGIN</a></li>
               <li><div class="donate_bt"><a href="#">Donate Now</a></div></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
         </nav>
      </div>
   </header>

   <div class="mainpart">
      <h1>Forgot Password</h1>
      <form id="forgotPasswordForm" method="post" action="forgot-password/send-password-reset.php">
         <label for="email">Email</label>
         <input type="email" name="email" id="email" required>
         <button type="submit">Send</button>
      </form>
   </div>

   <div class="copyright_section">
      <div class="container">
         <p class="copyright_text">Copyright 2019 All Right Reserved By <a href="https://html.design">Free  html Templates</a></p>
      </div>
   </div>

   <script src="js/jquery.min.js"></script>
   <script src="js/popper.min.js"></script>
   <script src="js/bootstrap.bundle.min.js"></script>
   <script src="js/jquery-3.0.0.min.js"></script>
   <script src="js/plugin.js"></script>
   <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
   <script src="js/custom.js"></script>
   <script src="js/owl.carousel.js"></script>
   <script>
      if ($(window).width() > 990) { 
         $('.owl-carousel').owlCarousel({
            stagePadding: 350,
            loop:true,
            margin:35,
            nav:true,
            responsive:{
               0:{
                  items:1
               },
               600:{
                  items:1
               },
               1000:{
                  items:1
               }
            }
         })
      } else { 
         $('.owl-carousel').owlCarousel({
            stagePadding: 70,
            loop:true,
            margin:10,
            nav:true,
            responsive:{
               0:{
                  items:1
               },
               600:{
                  items:1
               },
               1000:{
                  items:1
               }
            }
         })
      }

      document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Your existing AJAX code for form submission
        var formData = new FormData(this);
        fetch('send-password-reset.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display popup message
            displayPopupMessage('Message sent, please check your inbox.');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function displayPopupMessage(message) {
        var successPopup = document.getElementById('successPopup');
        successPopup.innerHTML = message;
        successPopup.style.display = 'block';

        // Hide the popup after a few seconds (adjust the timeout as needed)
        setTimeout(function () {
            successPopup.style.display = 'none';
        }, 3000); // 3000 milliseconds = 3 seconds
    }
});

   </script>
</body>
</html>
