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

		// match the entry type words to corresponding values
		switch($entryType){
			case 'call':
				$entryTypeValue = 1;
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
				break;
		}

		// INSERT INTO T_HISTORY_STREAM (historyID= $nextHistoryID)
		$sql = "INSERT INTO T_HISTORY_STREAM (historyID, historyEntry, typeOfEntry) VALUES ('$nextHistoryID','$_POST[entryField]','$entryTypeValue')";
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
		</div>
		<div id="rightColumn">
			<div id="contentwrapper">
				<section id="history">
					<div id="">History of the campaign <i id="loadingCampaignHistory" class="fa fa-spinner fa-spin"></i></div>
					<div id="historyListing"></div>
				</section>
				<section id="newEntry">
					<label for="entryField">Make a new entry</label>

					<form action="index.php" method="post"> 
						<div id="entryTypes">
							<ul>
								<li title="Anruf" data-entryType="call" name="call" style="color:#03a678" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-phone"></i></li>
								<li title="E-Mail" data-entryType="email" name="email" style="color:#4ba3cc" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-envelope-o"></i></li>
								<li title="Werbemittel" data-entryType="adMaterial" name="adMaterial" style="color:#596c73" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-upload"></i></li>
								<li title="Werbemittel" data-entryType="adMaterial" name="adMaterial" style="color:#8c5e49" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-film"></i></li>
								<!--<li title="Werbemittel" data-entryType="adMaterial"><i class="fa fa-picture-o"></i></li>-->
								<li title="Absprache" data-entryType="agreement" name="agreement" style="color:#be946a" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-exchange"></i></li>
								<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-retweet"></i></li>-->
								<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-refresh"></i></li>-->
								<li title="Validiert" data-entryType="validated" name="validated" style="color:#4ba3cc" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-thumbs-o-up"></i></li>
								<li title="Validiert" data-entryType="validated" name="validated" style="color:#03a678" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-check"></i></li>
								<li title="Kampagnenstart" data-entryType="campaignStart" name="campaignStart" style="color:#ffaa00" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-sign-out"></i></li>
								<li title="Kampagnenende" data-entryType="campaignEnd" name="campaignEnd" style="color:#ffaa00" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-sign-in"></i></li>
								<li title="Reporting" data-entryType="reporting" name="reporting" style="color:#d91a2a" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-bar-chart-o"></i></li>
							</ul>
						</div>
					   <div id="entryTypeTemplate"></div>
					</form> 
					<section style="width:200px;font-size:11pt;">
						<?php //print_r($entryInformation)?>
					</section>
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