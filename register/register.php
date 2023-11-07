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
    $name = $_POST["name"];
    $mail = $_POST["mail"];

    // 首先检查邮箱地址是否已经存在|First check if the email address already exists
    $checkEmailQuery = "SELECT * FROM users WHERE email_address = '$mail'";
    $result = mysqli_query($conn, $checkEmailQuery);

    if (mysqli_num_rows($result) > 0) {
        echo "This email address has already been registered！";
    } else {
        // 如果邮箱地址不存在，执行注册操作|If the email address does not exist, perform the registration operation
        $pwd = $_POST["pwd"];

        // Hash密码
        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        // 插入用户数据|Insert user data
        $insertQuery = "INSERT INTO users (name, email_address, password) VALUES ('$name', '$mail', '$hashedPwd')";

        if (mysqli_query($conn, $insertQuery)) {
            echo "Congratulations, registration successful！";
        } else {
            echo "Registration failed：" . mysqli_error($conn);
        }
    }
}

mysqli_close($conn);
?>
