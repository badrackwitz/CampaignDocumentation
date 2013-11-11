<?php 
	$sql    = "SELECT advertiser, campaignName FROM campdoc.T_ADVERTISER GROUP BY advertiser";
	$result = mysql_query($sql, $link);
	
	if (!$result) {
	    echo "DB Fehler, konnte die Datenbank nicht abfragen\n";
	    echo 'MySQL Error: ' . mysql_error();
	    exit;
	}
	echo '<select id="advertiserList" name="game" style="width: 200px" onchange ="getCampaigns($(this)[0].value)">';
	while($row = mysql_fetch_assoc($result)){
        echo '<option data-advertiser="'.$row['advertiser'].'" id="">'.$row['advertiser'].'</option>';
    }
 	echo "</select>";
 	include "connect_close.php";
 	

?>