<?php

$token = $_GET["token"];

$token_hash = hash("sha256", $token);

$mysqli = require __DIR__ . "/database.php";

$sql = "SELECT * FROM user
        WHERE reset_token_hash = ?";

$stmt = $mysqli->prepare($sql);

$stmt->bind_param("s", $token_hash);

$stmt->execute();

$result = $stmt->get_result();

$user = $result->fetch_assoc();

if ($user === null) {
    die("token not found");
}

if (strtotime($user["reset_token_expires_at"]) <= time()) {
    die("token has expired");
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $password = $_POST["password"];
    $password_confirmation = $_POST["password_confirmation"];

    // Check if password meets the rules
    if (strlen($password) < 8) {
        $error = "Password must be at least 8 characters.";
    } elseif (!preg_match("/[a-zA-Z]/", $password)) {
        $error = "Password must contain at least one letter.";
    } elseif (!preg_match("/[0-9]/", $password)) {
        $error = "Password must contain at least one number.";
    } elseif ($password !== $password_confirmation) {
        $error = "New Password and Repeat Password must match.";
    } else {
        // Password meets all the rules, proceed with the password reset
        // ...

        // Redirect or display success message
    }
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
    <style>
    .content {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            flex-direction: column;
            text-align: center;
            font-family: 'Open Sans', sans-serif;
        }

        h1 {
            margin-bottom: 20px;
        }

        form {
            max-width: 400px;
            width: 100%;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            box-sizing: border-box;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            box-sizing: border-box;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        .error {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
<div class="content">
    <h1>Reset Password</h1>

    <!-- Display error messages here -->
    <?php if(isset($error) && !empty($error)): ?>
        <p class="error"><?= $error; ?></p>
    <?php endif; ?>

    <form method="post" action="process-reset-password.php">

        <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

        <label for="password">New password</label>
        <input type="password" id="password" name="password">

        <label for="password_confirmation">Repeat password</label>
        <input type="password" id="password_confirmation" name="password_confirmation">

        <button>Send</button>
    </form>
</div>
</body>
</html>
