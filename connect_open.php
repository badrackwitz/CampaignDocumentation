<?php 
	// Create connection
	$link=mysql_connect('localhost','campdoc_user','campdoc');

	// Check connection
	if (mysqli_connect_errno($link))
  	{
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}
  	//echo 'connected';

?>