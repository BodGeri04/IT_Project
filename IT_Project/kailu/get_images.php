<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "it_project";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败：" . $conn->connect_error);
}

// 从数据库中获取imageURL数据
$sql = "SELECT imageURL FROM events";
$result = $conn->query($sql);

$images = [];

if ($result->num_rows > 0) {
    // 将imageURL数据存储到数组中
    while ($row = $result->fetch_assoc()) {
        $images[] = $row["imageURL"];
    }
}

// 将数组转换为JSON格式并输出
echo json_encode($images);

// 关闭连接
$conn->close();
?>
