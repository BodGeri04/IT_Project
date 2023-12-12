<?php
// At the beginning of events.php
session_start();

// Check if the user is logged in and has the 'admin' role
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true && isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
    $isAdmin = true;
} else {
    $isAdmin = false;
}
?>
<link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Roboto:100,300,400,500,700|Philosopher:400,400i,700,700i" rel="stylesheet">


  <link rel="stylesheet" type="text/css" href="assets/font/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="assets/font/font.css" />
<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" media="screen" />
<link rel="stylesheet" type="text/css" href="assets/css/style.css" media="screen" />
<link rel="stylesheet" type="text/css" href="assets/css/responsive.css" media="screen" />
<link rel="stylesheet" type="text/css" href="assets/css/jquery.bxslider.css" media="screen" />
  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: eStartup
  * Updated: Sep 18 2023 with Bootstrap v5.3.2
  * Template URL: https://bootstrapmade.com/estartup-bootstrap-landing-page-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->


  <?php
// Connect to the MySQL database
$connect = mysqli_connect('localhost', 'root', '', 'it_project');

// If the connection did not work, display an error message
if (!$connect) {
    echo 'Error Code: ' . mysqli_connect_errno() . '<br>';
    echo 'Error Message: ' . mysqli_connect_error() . '<br>';
    exit;
}

// Check if the form is submitted for adding a new event
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assuming you have a form with fields named 'event_name', 'event_description', 'event_date', and 'picture'
    $eventName = mysqli_real_escape_string($connect, $_POST['event_name']);
    $eventDescription = mysqli_real_escape_string($connect, $_POST['event_description']);
    $eventDate = mysqli_real_escape_string($connect, $_POST['event_date']);

    // Check if an image file is selected
    if ($_FILES['picture']['size'] > 0) {
        // Read the image file
        $imageData = file_get_contents($_FILES['picture']['tmp_name']);
        // Encode the image data as base64
        $base64ImageData = base64_encode($imageData);

        // Insert the record with base64-encoded image data
        $insertQuery = "INSERT INTO events (event_name, event_description, event_date, picture) VALUES ('$eventName', '$eventDescription', '$eventDate', '$base64ImageData')";
        mysqli_query($connect, $insertQuery);

        // Redirect to the same page using GET after form submission
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }
}

// Create a query to get past events, ordered by event_date in descending order
$queryPast = "SELECT * FROM events WHERE event_date < CURDATE() ORDER BY event_date DESC";

// Execute the query for past events
$resultPast = mysqli_query($connect, $queryPast);

// Check for errors in query execution
if (!$resultPast) {
    echo 'Error Message: ' . mysqli_error($connect) . '<br>';
    exit;
}

// Initialize array for past events
$pastEvents = [];

// Fetch past events
while ($recordPast = mysqli_fetch_assoc($resultPast)) {
    $pastEvents[] = $recordPast;
}

// Create a query to get future events, ordered by event_date in ascending order
$queryFuture = "SELECT * FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC";

// Execute the query for future events
$resultFuture = mysqli_query($connect, $queryFuture);

// Check for errors in query execution
if (!$resultFuture) {
    echo 'Error Message: ' . mysqli_error($connect) . '<br>';
    exit;
}

// Initialize array for future events
$futureEvents = [];

// Fetch future events
while ($recordFuture = mysqli_fetch_assoc($resultFuture)) {
    $futureEvents[] = $recordFuture;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Events</title>
    <style>
        #header {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    transition: all 0.5s;
}

#logo {
    margin: 0;
}

.navbar {
    padding: 0;
    margin: 0;
}

.navbar ul {
    padding: 0;
    margin: 0;
}

.navbar li {
    display: inline;
    margin-right: 20px;
}

.navbar a {
    display: inline-block;
    text-decoration: none;
    color: #333;
    padding: 10px;
    transition: all 0.3s;
}

.navbar a:hover {
    color: #007bff;
}
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            padding-top: 150px; /* Adjust the value based on your navbar height */
          }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .event-section {
        margin-top: 20px;
        overflow: auto;
        display: flex; /* Use flexbox to display events in a row */
        justify-content: space-between; /* Add space between events */
    }

    .event {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ddd;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        display: inline-block;
        width: calc(50% - 20px); /* Adjust as needed for spacing between events */
        box-sizing: border-box;
        vertical-align: top; /* Align the events at the top of the row */
    }


        .event img {
            max-width: 100%;
            height: auto;
            margin-top: 10px;
        }

        .navigation-buttons {
            margin-bottom: 20px;
        }

        .navigation-buttons button {
            padding: 10px;
            margin: 0 5px;
            font-size: 16px;
        }
        #createEventButton {
        float: right;
        padding: 10px;
        font-size: 16px;
    }

        /* Styles for the modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 50px;
            border: 1px solid #888;
            width: 80%;
            text-align: center; /* Center text */
            line-height: 1.5;   /* Add spacing between lines */
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">

      <div id="logo">
        <h1><a href="index.php">Christmas</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" title="" /></a>-->
      </div>

      <?php
// Check if the user is logged in


$isLoggedIn = isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true;
?>

<!-- Display navigation bar -->
<nav id="navbar" class="navbar">
    <ul>
    <li><a class="nav-link scrollto active" href="index.php">HOME</a></li>
              <li><a class="nav-link scrollto" href="events.php">EVENTS</a></li>
                <li><a class="nav-link scrollto" href="bestdeals.php">BEST DEALS</a></li>
                <li><a class="nav-link scrollto" href="testimonial.php">TESTIMONIAL</a></li>
                <li><a class="nav-link scrollto" href="contact.php">CONTACT US</a></li>
                <li><div class="donate_bt"><a href="#">Donate Now</a></div></li>
              <?php if ($isLoggedIn): ?>
                  <li><a class="nav-link scrollto" href="logout.php">LOG OFF</a></li>
              <?php else: ?>
                  <li><a class="nav-link scrollto" href="login.php">LOGIN</a></li>
              <?php endif; ?>
    </ul>
    <i class="bi bi-list mobile-nav-toggle"></i>
</nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
<!-- Your HTML content here -->

<div class="container">

    <div class="navigation-buttons">
        <button onclick="showPastEvents()">Show Past Events</button>
        <button onclick="showFutureEvents()">Show Future Events</button>
        <button id="createEventButton" style="float: right; <?php echo $isAdmin ? '' : 'display: none;'; ?>">Create a new event</button>
    </div>

    <!-- Modal for creating a new event -->
<div id="createEventModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <form method="post" enctype="multipart/form-data">
            <label for="event_name">Event Name:</label>
            <input type="text" name="event_name" required><br>

            <label for="picture">Event Picture:</label>
            <input type="file" name="picture"><br>

            <label for="event_description">Event Description (max 300 characters):</label>
            <textarea name="event_description" maxlength="300" required></textarea><br>

            <label for="event_date">Event Date:</label>
            <input type="date" name="event_date" required><br>

            <label for="market_height">Market Height (meters):</label>
            <input type="number" name="market_height" step="0.01" required><br>

            <label for="market_width">Market Width (meters):</label>
            <input type="number" name="market_width" step="0.01" required><br>

            <label for="small_height">Small Height (meters):</label>
            <input type="number" name="small_height" step="0.01" required><br>

            <label for="small_width">Small Width (meters):</label>
            <input type="number" name="small_width" step="0.01" required><br>

            <label for="medium_height">Medium Height (meters):</label>
            <input type="number" name="medium_height" step="0.01" required><br>

            <label for="medium_width">Medium Width (meters):</label>
            <input type="number" name="medium_width" step="0.01" required><br>

            <label for="large_height">Large Height (meters):</label>
            <input type="number" name="large_height" step="0.01" required><br>

            <label for="large_width">Large Width (meters):</label>
            <input type="number" name="large_width" step="0.01" required><br>
            <button type="submit">Add Event</button>
        </form>
        </div>
    </div>

        <h2>Past Events</h2>
        <div class="event-section" id="past-events">
         <?php displayEvents($pastEvents); ?>
        </div>

    
        <h2>Future Events</h2>
        <div class="event-section" id="future-events">
         <?php displayEvents($futureEvents); ?>
        </div>

    </div>

<script>
    function showPastEvents() {
        document.getElementById('past-events').style.display = 'block';
        document.getElementById('future-events').style.display = 'none';
    }

    function showFutureEvents() {
        document.getElementById('past-events').style.display = 'none';
        document.getElementById('future-events').style.display = 'block';
    }

    function openModal() {
        document.getElementById('createEventModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('createEventModal').style.display = 'none';
    }

    document.getElementById('createEventButton').addEventListener('click', openModal);
</script>

</body>
</html>

<?php
function displayEvents($events)
{
    foreach ($events as $record) {
        echo '<div class="event">';
        echo '<h3>' . $record['event_name'] . '</h3>';
        echo '<p>Date: ' . $record['event_date'] . '</p>';
        if ($record['picture']) {
          $imageData = base64_decode($record['picture']);
          $imageSrc = 'data:image/jpeg;base64,' . base64_encode($imageData);
          echo '<img src="' . $imageSrc . '">';
      }
        echo '<p>' . $record['event_description'] . '</p>';
          // "Read more about" button linking to a details page
        echo '<a href="event_details.php?event_id=' . $record['id'] . '">Read more about</a>';

        echo '</div>';
    }
}
?>

<!-- Your remaining HTML content here -->
<footer class="footer">
    <div class="container">
      <div class="row">

        <div class="col-md-12 col-lg-4">
          <div class="footer-logo">

            <a class="navbar-brand" href="#">Christmas</a>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>

          </div>
        </div>

        <div class="col-sm-6 col-md-3 col-lg-2">
          <div class="list-menu">

            <h4>About Us</h4>

            <ul class="list-unstyled">
              <li><a href="#">About us</a></li>
              <li><a href="#">Features item</a></li>
              <li><a href="#">Live streaming</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>
        </div>

        <div class="col-sm-6 col-md-3 col-lg-2">
          <div class="list-menu">

            <h4>About Us</h4>

            <ul class="list-unstyled">
              <li><a href="#">About us</a></li>
              <li><a href="#">Features item</a></li>
              <li><a href="#">Live streaming</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>
        </div>

        <div class="col-sm-6 col-md-3 col-lg-2">
          <div class="list-menu">

            <h4>Support</h4>

            <ul class="list-unstyled">
              <li><a href="#">faq</a></li>
              <li><a href="#">Editor help</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>
        </div>

        <div class="col-sm-6 col-md-3 col-lg-2">
          <div class="list-menu">

            <h4>About Us</h4>

            <ul class="list-unstyled">
              <li><a href="#">About us</a></li>
              <li><a href="#">Features item</a></li>
              <li><a href="#">Live streaming</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>
        </div>

      </div>
    </div>

    <div class="copyrights">
      <div class="container">
        <p>&copy; Copyrights eStartup. All rights reserved.</p>
        <div class="credits">
          <!--
          All the links in the footer should remain intact.
          You can delete the links only if you purchased the pro version.
          Licensing information: https://bootstrapmade.com/license/
          Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=eStartup
        -->
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </div>

  </footer><!-- End  Footer -->
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
<script type="text/javascript" src="assets/js/jquery-min.js"></script> 
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script> 
<script type="text/javascript" src="assets/js/jquery.bxslider.js"></script> 
<script type="text/javascript" src="assets/js/selectnav.min.js"></script> 
<script type="text/javascript">
selectnav('nav', {
    label: '-Navigation-',
    nested: true,
    indent: '-'
});
selectnav('f_menu', {
    label: '-Navigation-',
    nested: true,
    indent: '-'
});
$('.bxslider').bxSlider({
    mode: 'fade',
    captions: true
});
</script>
</body>
</html>