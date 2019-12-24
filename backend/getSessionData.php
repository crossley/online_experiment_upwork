<?php
$conn = mysqli_connect("mysql.matthewjohncrossley.com", "matcro19", "bWBquLJ4JkdP", "mjc_data");
if(!$conn) {
  echo 'connection failed';
  exit('Could not connect');
}

$sql = "SELECT `session_data` from `experiment_data` WHERE `session_id` = " . $_POST["session_id"];
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
  $data = $row["session_data"];

  echo $data;
  
}

mysqli_close($conn);
?>