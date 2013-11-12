<?php 
	if(isset($_POST['id'])){
			$chosenID = $_POST['id']; 
		} else{

			$chosenID = "";
		}

	$link = mysql_connect('localhost','campdoc_user','campdoc');
	mysql_select_db('campdoc', $link);

	// Check connection
	if (mysqli_connect_errno($link))
  	{
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

	$queryString = "SELECT tHS.typeOfEntry, tHS.historyEntry, tDH.historyID, tET.color, tET.icon ";
	$queryString .= "FROM T_CAMPAIGN tC ";
	$queryString .= "LEFT OUTER JOIN T_DOCUMENTATION_HISTORY tDH ON tC.documentationID = tDH.campaignID ";
	$queryString .= "LEFT OUTER JOIN T_HISTORY_STREAM tHS ON tDH.historyID = tHS.historyID ";
	$queryString .= "LEFT OUTER JOIN T_ENTRYTYPES tET ON tHS.typeOfEntry = tET.ID ";
	$queryString .= "Where tDH.campaignID ='".$chosenID."'";
	
	$sql    = $queryString; 

	$result = mysql_query($sql, $link);

	if (!$result) {
	    echo "DB Fehler, konnte die Datenbank nicht abfragen\n\r";
	    echo 'MySQL Error: ' . mysql_error();
	    exit;
	}

	$returnString = "";
	while($row = mysql_fetch_assoc($result)){
        $returnString .= '<section class="historyEntry" data-type="'.$row['typeOfEntry'].'" id="'.$row['historyID'].'">'.$row['historyEntry'].'<div id="entryType"><i class="bigIcon fa fa-'.$row['icon'].'" style="color:'.$row['color'].' !important;"></i></div></section>';
    }
    
    echo $returnString;
    
	include "connect_close.php";
?>