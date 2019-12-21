<?php
$conn = mysqli_connect("mysql.matthewjohncrossley.com", "matcro19", "bWBquLJ4JkdP", "mjc_data");
if(!$conn) {
  echo 'connection failed';
  exit('Could not connect');
}


$sql = "INSERT INTO `experiment_data`(`session_id`, `session_data`) VALUES ('" .  $_POST["session_id"] . "','" . $_POST["session_data"] . "')"; 
$result = mysqli_query($conn, $sql);

mysqli_close($conn);
?>