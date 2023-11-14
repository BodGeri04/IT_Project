<!DOCTYPE html>
<html lang="en">
   <head>
      <!-- basic -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- mobile metas -->
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1">
      <!-- site metas -->
      <title>Contact</title>
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta name="author" content="">
      <!-- bootstrap css -->
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
      <!-- style css -->
      <link rel="stylesheet" type="text/css" href="css/style.css">
      <!-- Responsive-->
      <link rel="stylesheet" href="css/responsive.css">
      <!-- fevicon -->
      <link rel="icon" href="images/fevicon.png" type="image/gif" />
      <!-- Scrollbar Custom CSS -->
      <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
      <!-- Tweaks for older IEs-->
      <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
      <!-- owl stylesheets -->
      <link href="https://fonts.googleapis.com/css?family=Great+Vibes|Poppins:400,700&display=swap&subset=latin-ext" rel="stylesheet">
      <link rel="stylesheet" href="css/owl.carousel.min.css">
      <link rel="stylesoeet" href="css/owl.theme.default.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen">
   </head>
   <body>
      <!-- header section start -->
      <div class="header_section header_bg">
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="logo" href="index.html"><img src="images/logo.png"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                     <a class="nav-link" href="index.html">Home</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="wish.html">Wish</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="gifts.html">Best Deals</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="testimonial.html">Testimonial</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="contact.html">Contact Us</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="login.html">Login</a>
                  </li>
               </ul>
            </div>
            <div class="main">
               <form class="form-inline my-2 my-lg-0">
                  <div class="call_text">
                     <ul>
                        <li><a href="#"><img src="images/call-icon.png"><span class="padding_left_10">+71 67896543</span></a></li>
                        <li><a href="#"><img src="images/mail-icon.png"><span class="padding_left_10">demo@gmail.com</span></a></li>
                        <li><a href="#"><img src="images/search-icon.png"></a></li>
                     </ul>
                  </div>
               </form>
            </div>
         </nav>
      </div>
      <!-- header section start -->
      <!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
    <meta charset="UTF-8">
</head>
<body>

    <h1>Forgot Password</h1>

    <form method="post" action="forgot-password/send-password-reset.php">

        <label for="email">email</label>
        <input type="email" name="email" id="email">

        <button>Send</button>

    </form>

</body>
</html>
         <!-- copyright section start -->
         <div class="copyright_section">
            <div class="container">
               <p class="copyright_text">Copyright 2019 All Right Reserved By <a href="https://html.design">Free  html Templates</a></p>
            </div>
         </div>
         <!-- copyright section end -->
      </div>
      <!-- footer section end -->
      <!-- Javascript files-->
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-3.0.0.min.js"></script>
      <script src="js/plugin.js"></script>
      <!-- sidebar -->
      <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="js/custom.js"></script>
      <!-- javascript --> 
      <script src="js/owl.carousel.js"></script>
      <script>
         if ( $(window).width() > 990) { 
         
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
         
          }
         
         
         
          else { 
         
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
         
      </script>
      <script type="text/javascript">
         $(window).scroll(function(){
         var sticky = $('#navbar'),
         scroll = $(window).scrollTop();
         
         if (scroll >= 600) sticky.addClass('fix-nav');
         else sticky.removeClass('fix-nav');
         });
      </script>
   </body>
</html>