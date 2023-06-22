<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to = 'amuston99@gmail.com'; // Replace with your email address
  $subject = $_POST['subject'];
  $message = $_POST['text'];
  $headers = 'From: your_email@example.com' . "\r\n" .
             'Reply-To: your_email@example.com' . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
  } else {
    echo 'Failed to send email.';
  }
}
?>
