<?php 
	
	$entryInformation = [];

	if(isset($_POST['submitForm'])){
		$teamMember 	= $_POST['teamMember'];
	 	$callPartner 	= $_POST['callPartner'];
	 	$entryField 	= $_POST['entryField'];
	 	$entryType 		= $_POST['entryType'];
	 	$campaignID		= $_POST['campaignID'];
	 	$campaignName 	= $_POST['campaignName'];

	 	array_push($entryInformation, $teamMember);
		array_push($entryInformation, $callPartner);
		array_push($entryInformation, $entryField);
		array_push($entryInformation, $entryType);
		array_push($entryInformation, $campaignID);
		array_push($entryInformation, $campaignName);

		//print_r($entryInformation);

		// we have got all needed information to insert into the DB
		/* INSERT */

		$link = mysql_connect('localhost','campdoc_user','campdoc');
		mysql_select_db('campdoc', $link);

		// Check connection
		if (mysqli_connect_errno($link))
	  	{
	  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  	}

	  	$q = "select MAX(historyID) from T_DOCUMENTATION_HIStORY";
		$result = mysql_query($q);
		$data = mysql_fetch_array($result);

		//echo 'max historyID: '.$data[0];
		$nextHistoryID = $data[0]+1;

		//echo 'next historyID: '.$nextHistoryID;

		$entryTypeValue = 0;
		$historyEntry = '';

		$teamMemberSplit = preg_split('/(?=[A-Z])/',$teamMember);
		print_r($teamMemberSplit);

		// match the entry type words to corresponding values
		switch($entryType){
			case 'call':
				$entryTypeValue = 1;

				// possible structure for a call history entry
				$historyEntry = '<p>'.ucwords($entryType).'</p><br/><div>'.ucwords($teamMemberSplit[0]).' '.$teamMemberSplit[1].' with '.$callPartner.'<br/><br/>'.$entryField.'</div>'; 

				break;
			case 'email':
				$entryTypeValue = 2;
				break;
			case 'campaignStart':
				$entryTypeValue = 5;
				break;
			case 'campaignEnd':
				$entryTypeValue = 4;
				break;
			case 'reporting':
				$entryTypeValue = 3;
				break;
			default:
				$entryTypeValue = 0;
				$historyEntry = '<p>'.$entryType.'</p><br/><div>'.$entryField.'</div>';
				break;
		}



		// INSERT INTO T_HISTORY_STREAM (historyID= $nextHistoryID)
		$sql = "INSERT INTO T_HISTORY_STREAM (historyID, historyEntry, typeOfEntry) VALUES ('$nextHistoryID','$historyEntry','$entryTypeValue')";
		$result = mysql_query($sql);
		if (!$result) {
		    echo "DB Fehler, konnte die Datenbank nicht abfragen\n";
		    echo 'MySQL Error: ' . mysql_error();
		    exit;
		}

		// INSERT INTO T_DOCUMENTATION_HISTORY (historyID= $nextHistoryID)
		$sql = "INSERT INTO T_DOCUMENTATION_HISTORY (campaignID, historyID) VALUES ('$_POST[campaignID]','$nextHistoryID')";
		$result = mysql_query($sql);
		if (!$result) {
		    echo "DB Fehler, konnte die Datenbank nicht abfragen\n";
		    echo 'MySQL Error: ' . mysql_error();
		    exit;
		}

		header('Location:index.php');
		die();





 	}

	

?>

<html>
	<head>
		<title>CampaignDoc</title>
		<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="js/util.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<link rel="stylesheet" href="css/main.css" type="text/css" />
		<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />

		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta http-equiv="X-UA-Compatible" content="IE=9">

		<?php include "connect_open.php"; ?>
	</head>
	<body>
		<?php //phpinfo() ?>
		<div id="leftColumn">
			<section id="advertiser">
				<div id="">
					Choose an advertiser 
				</div>
					<?php include "queryAdvertiser.php"; ?>
					<script type="text/javascript">
						getCampaigns($('#advertiserList').find(":selected").val());
					</script>
				
			</section>	
			<section id="campaignNames">
				<div id="">
					Choose a campaign <i id="loadingCampaigns" class="fa fa-spinner fa-spin"></i>
				</div>
				<div id="campaignNameList">
					<?php include "queryCampaignNames.php"; ?>
					<script type="text/javascript">
						getCampaignHistory($('#campaignNamesList').find(":selected").index()+2);
					</script>
				</div>
			</section>	
			<section id="entryTypes">
				Make a new entry
					<ul>
						<li style="color:#03a678" ><i class="fa fa-phone"></i></li>
						<li style="color:#4ba3cc" ><i class="fa fa-envelope-o"></i></li>
						<li style="color:#596c73" ><i class="fa fa-upload"></i></li>
						<li style="color:#8c5e49" ><i class="fa fa-film"></i></li>
						<li style="color:#be946a" ><i class="fa fa-exchange"></i></li>
						<li style="color:#4ba3cc" ><i class="fa fa-thumbs-o-up"></i></li>
						<li style="color:#03a678" ><i class="fa fa-check"></i></li>
						<li style="color:#ffaa00" ><i class="fa fa-sign-out"></i></li>
						<li style="color:#ffaa00" ><i class="fa fa-sign-in"></i></li>
						<li style="color:#d91a2a" ><i class="fa fa-bar-chart-o"></i></li>
					</ul>
			</section>
		</div>
		<div id="rightColumn">
			<div id="contentwrapper">
				<section id="history">
					<div id="">History of the campaign <i id="loadingCampaignHistory" class="fa fa-spinner fa-spin"></i></div>
					<div id="historyListing"></div>
				</section>
				
				<section id="legend">
					<div id="">Legend</div>
					<ul style="line-height:25pt;margin-top:22px;font-size:11pt;">
						<li><i class="fa fa-phone" style="color:#03a678"></i> Call</li>
						<li><i class="fa fa-envelope-o" style="color:#4ba3cc"></i> Mail</li>
						<li><i class="fa fa-upload" style="color:#596c73"></i> Ad Material Upload</li>
						<li><i class="fa fa-film" style="color:#8c5e49"></i> Ad Material Upload</li>
						<!--<li title="Werbemittel" data-entryType="adMaterial"><i class="fa fa-picture-o"></i></li>-->
						<li><i class="fa fa-exchange" style="color:#be946a"></i> Agreement</li>
						<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-retweet"></i></li>-->
						<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-refresh"></i></li>-->
						<li><i class="fa fa-thumbs-o-up" style="color:#4ba3cc"></i> Validated</li>
						<li><i class="fa fa-check" style="color:#03a678"></i> Validated</li>
						<li><i class="fa fa-sign-out" style="color:#ffaa00"></i> Campaign Start</li>
						<li><i class="fa fa-sign-in" style="color:#ffaa00"></i> Campaign End</li>
						<li><i class="fa fa-bar-chart-o" style="color:#d91a2a"></i> Reporting</li>
					</ul>
				</section>
				
			</div>
		</div>
	</body>
</html>