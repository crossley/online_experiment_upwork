<?php
$conn = mysqli_connect("mysql.matthewjohncrossley.com", "matcro19", "bWBquLJ4JkdP", "mjc_data");
if(!$conn) {
  echo 'connection failed';
  exit('Could not connect');
}

$sql = "SELECT `uniqueCode` from `experiment_params` WHERE `id` = " . $_POST["id"];
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
  $data = $row["uniqueCode"];

  echo $data;
  
}

mysqli_close($conn);
?>