<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "it_project";

// 创建连接|Creat connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

// 基本的邮箱验证
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address!";
        mysqli_close($conn);
        exit();
    }


    // 首先检查邮箱地址是否已经存在|First check if the email address already exists
    $checkEmailQuery = "SELECT * FROM user WHERE email= '$email'";
    $result = mysqli_query($conn, $checkEmailQuery);

    if (mysqli_num_rows($result) > 0) {
        echo "This email address has already been registered！";
    } else {
        // 如果邮箱地址不存在，执行注册操作|If the email address does not exist, perform the registration operation
        $password = $_POST["password"];
        // 密码至少8位数验证
    if (strlen($password) < 8) {
        echo "<div class='error-message'>The password needs to be at least 8 digits!</div>";
        mysqli_close($conn);
        exit();
    }

        // Hash密码
        $hashedPwd = md5($password);

        // 插入用户数据|Insert user data
        $insertQuery = "INSERT INTO user (email, password) VALUES ('$email', '$hashedPwd')";

        if (mysqli_query($conn, $insertQuery)) {
            echo "Congratulations, registration successful！";
        } else {
            echo "Registration failed：" . mysqli_error($conn);
        }
    }
}

mysqli_close($conn);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>REGISTRATION</title>
    <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Roboto:100,300,400,500,700|Philosopher:400,400i,700,700i" rel="stylesheet">

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
  <style>
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
    text-align: center;
    color: #333;
    /* 添加圣诞颜色 */
    font-size: 2em;
    text-shadow: 2px 2px 4px #fff;
}

form {
    max-width: 300px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}
input[id="vcode"] {
    width: 45%
}
input[value="Verification Code"]{
    width: 50%
}

.error {
    color: red;
    font-size: 12px;
}
.vcode{
    color: red;
}

input[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    /* 添加圣诞效果 */
    transition: background-color 0.3s ease-in-out;
}

input[type="submit"]:hover {
    background-color: #ff6347; /* 使用圣诞红色 */
}
</style>
</head>
<body>
    <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">

      <div id="logo">
        <h1><a href="index.html">Christmas</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" title="" /></a>-->
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
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
    <div class="mainpart">
        <h1>REGISTRATION</h1>
        <form action="register.php" method="post">
            <label for="email">Email Address:</label>
            <input type="text" name="email" id="email" required>
            <label for="password">Password:</label>
            <input type="text" name="password" id="password" required>
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>