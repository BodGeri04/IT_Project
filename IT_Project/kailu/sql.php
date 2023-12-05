<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "it_project";

// 创建连接|Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 处理上传的文件|Handle uploaded file
    $target_dir = "images/"; // 上传目录|images directory
    $target_file = $target_dir . basename($_FILES["image"]["name"]); // 目标文件路径|Target file path
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // 检查文件是否为真实的图片|Check if file is a real image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // 检查文件是否已存在|Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // 检查文件大小|Check file size
    if ($_FILES["image"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // 允许特定的文件格式| Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // 检查 $uploadOk 是否为 0| Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // 如果一切都 ok，尝试上传文件| if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo "The file ". htmlspecialchars( basename( $_FILES["image"]["name"])). " has been uploaded.";

            // 插入用户数据|Insert user data
            $imageURL = "uploads/" . basename($_FILES["image"]["name"]);
            $insertQuery = "INSERT INTO events (imageURL) VALUES ('$imageURL')";

            if (mysqli_query($conn, $insertQuery)) {
                echo "Congratulations";
            } else {
                echo "Registration failed: " . mysqli_error($conn);
            }

        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    // 无效的操作！Invalid operation!
}
?>
