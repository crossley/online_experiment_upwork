<?php
$conn = mysqli_connect("mysql.matthewjohncrossley.com", "matcro19", "bWBquLJ4JkdP", "mjc_data");
if(!$conn) {
  echo 'connection failed';
  exit('Could not connect');
}

session_start();
$sessionId = session_id();
$sessionData = $_POST["session_data"];
$sql = "INSERT INTO experiment_data (session_id, session_data) VALUES('{$sessionId}', '{$sessionData}') ON DUPLICATE KEY UPDATE session_data='{$sessionData}';";
$result = mysqli_query($conn, $sql);

echo mysqli_error($conn);
mysqli_close($conn);
?>