
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "it_project";
$nameError = $mailError = $pwdError = "";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer-master/src/Exception.php";
require "PHPMailer-master/src/PHPMailer.php";
require "PHPMailer-master/src/SMTP.php";

//生成6位随机验证码
// 开始或恢复会话
session_start();

// 生成6位随机验证码
function generateCode() {
    $arr = array_merge(range('a', 'b'), range('A', 'B'), range('0', '9'));
    shuffle($arr);
    $arr = array_flip($arr);
    $arr = array_rand($arr, 6);
    $res = '';
    foreach ($arr as $v) {
        $res .= $v;
    }
    return $res;
}

// 检查会话中是否有验证码，没有则生成一个新的
if (!isset($_SESSION['vcode'])) {
    $_SESSION['vcode'] = generateCode();
}

$vcode = $_SESSION['vcode'];

// 创建连接|Creat connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if ($_POST['action'] == 'Verification Code') {
            // 处理更新的操作
            try {
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    // 服务器配置
    $mail->CharSet = "UTF-8";               // 设定邮件编码
    $mail->SMTPDebug = 0;                   // 调试模式输出
    $mail->isSMTP();                        // 使用SMTP
    $mail->Host = 'smtp.gmail.com';           // SMTP服务器
    $mail->SMTPAuth = true;                 // 允许 SMTP 认证
    $mail->Username = 'chenkailu768@gmail.com';          // SMTP 用户名 即邮箱的用户名
    $mail->Password = 'scerjjtkffwogobw';      // SMTP 密码 部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'ssl';              // 允许 TLS 或者 ssl协议
    $mail->Port = 465;                      // 服务器端口 25 或者465 具体要看邮箱服务器支持

    $mail->setFrom('chenkailu768@gmail.com', 'Mailer');   // 发件人
    // $mail->addAddress('1160245805@qq.com', 'Joe');   // 收件人
    //$mail->addAddress('ellen@example.com');   // 可添加多个收件人
    $mail->addReplyTo('chenkailu768@gmail.com', 'info');  // 回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');            // 抄送
    //$mail->addBCC('bcc@example.com');          // 密送

    // 发送附件
    // $mail->addAttachment('../xy.zip');      // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg'); // 发送附件并且重命名
    // 
    
    //
    
    // Get the user's email address from the POST request
    $userEmail = $_POST["mail"];

    // Set the recipient email address dynamically
    $mail->addAddress($userEmail);

    // Content
    $mail->isHTML(true); // 是否以HTML文档格式发送 发送后客户端可直接显示对应HTML内容
    $mail->Subject = '这里是邮件标题' . time();
    $mail->Body = '<h1>欢迎使用******</h1><h3>您的身份验证码是：<span>'.$vcode.'</span></h3>' . date('Y-m-d H:i:s');
    $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

    $mail->send();
    echo '邮件发送成功';
} catch (Exception $e) {
    echo '邮件发送失败: ', $e->getMessage();
}
        } else if ($_POST['action'] == 'Submit') {
            // 处理删除的操作
    $name = $_POST["name"];
    $mail = $_POST["mail"];
    $userVcode = $_POST["vcode"]; // User inputted verification code

    // 邮箱验证
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $mailError = "Invalid email address";
    }
     // 验证码验证
            if ($userVcode != $vcode) {
                $mailError = "Invalid verification code";
            }

    // 首先检查邮箱地址是否已经存在|First check if the email address already exists
    $checkEmailQuery = "SELECT * FROM users WHERE email_address = '$mail'";
    $result = mysqli_query($conn, $checkEmailQuery);

    if (mysqli_num_rows($result) > 0) {
        $mailError = "This email address has already been registered！";
    } else {
        // 如果邮箱地址不存在，执行注册操作|If the email address does not exist, perform the registration operation
        $pwd = $_POST["pwd"];
        // 密码验证
    if (strlen($pwd) < 8) {
        $pwdError = "Password needs to be at least 8 characters";
    }

        // Hash密码
        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        if($mailError==""&&$pwdError==""){
            // 插入用户数据|Insert user data
        $insertQuery = "INSERT INTO users (name, email_address, password) VALUES ('$name', '$mail', '$hashedPwd')";

        if (mysqli_query($conn, $insertQuery)) {
            echo "Congratulations, registration successful！";
        } else {
            echo "Registration failed：" . mysqli_error($conn);
        }
        }

        
    }
        } else {
            // 无效的操作！
        }
    }
    ?>

<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <form method="post" action="" onsubmit="storeInput()">
        <h1>REGISTRATION</h1>
        <label for="name">NAME:</label>
        <input type="text" name="name" id="name" required>
        <br>
        <label for="mail">EMAIL:</label>
        <input type="text" name="mail" id="mail" required>
        <br>
        <input type="text" name="vcode" id="vcode" placeholder="Enter your Vcode">
        <input type="submit" name="action" value="Verification Code" />
        
        <span class="vcode" id="verificationCodeStatus"></span>
        <span class="error"><?php echo $mailError; ?></span>
        <br>
        <label for="pwd">PASSWORD:</label>
        <input type="password" name="pwd" id="pwd">
        <span class="error"><?php echo $pwdError; ?></span>
        <br>
        <input type="submit" name="action" value="Submit" />
    </form>
    <link rel="stylesheet" href="Style.css">

</body>

<!-- 在页面加载时检查是否有存储的用户输入值 -->
<script>
    window.onload = function () {
        // 获取存储的用户输入值
        var storedName = localStorage.getItem("name");
        var storedMail = localStorage.getItem("mail");
        var storedVcode = localStorage.getItem("vcode");

        // 将存储的值填充到相应的输入字段中
        if (storedName) {
            document.getElementById("name").value = storedName;
        }

        if (storedMail) {
            document.getElementById("mail").value = storedMail;
        }

        if (storedVcode) {
            document.getElementById("vcode").value = storedVcode;
        }
    };

    // 在每次用户输入时存储用户输入值
    function storeInput() {
        var nameValue = document.getElementById("name").value;
        var mailValue = document.getElementById("mail").value;
        var vcodeValue = document.getElementById("vcode").value;

        localStorage.setItem("name", nameValue);
        localStorage.setItem("mail", mailValue);
        localStorage.setItem("vcode", vcodeValue);
    }
</script>
