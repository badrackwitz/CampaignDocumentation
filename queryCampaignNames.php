<?php 
	$chosenAdvertiser = "";
	
	if(isset($_POST['advertiser'])){
		$chosenAdvertiser = $_POST['advertiser']; 
	} else{

		$chosenAdvertiser = "";
	}

	$link = mysql_connect('localhost','campdoc_user','campdoc');
	mysql_select_db('campdoc', $link);

	// Check connection
	if (mysqli_connect_errno($link))
  	{
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

	$sql    = "SELECT advertiser, campaignName FROM campdoc.T_ADVERTISER ";
	//$sql   .= "Where advertiser = 'Halloween'";
	$sql   .= "Where advertiser ='".$chosenAdvertiser."'";
	$result = mysql_query($sql, $link);
	//echo  mysql_result($result,0);

	if (!$result) {
	    echo "DB Fehler, konnte die Datenbank nicht abfragen\n";
	    echo 'MySQL Error: ' . mysql_error();
	    exit;
	}
	echo '<select id="campaignNamesList" name="game" style="width: 200px" onchange ="getCampaignHistory(this.selectedIndex + 1)"><!--<option disabled="disabled">Campaigns</option>-->';
	while($row = mysql_fetch_assoc($result)){
		//$documentationID = $row['documentationID'];
        //echo '<option id="'.$documentationID.'">'.$row['campaignName'].'</option>';
        echo '<option>'.$row['campaignName'].'</option>';
    }
 	echo "</select>";
 	include "connect_close.php";

?>	