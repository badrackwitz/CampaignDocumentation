<html>
	<head>
		<title>CampaignDoc</title>
		<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="js/util.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<link rel="stylesheet" href="css/main.css" type="text/css" />
		<link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
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

					<form action="textarea.html" method="post"> 
						<div id="entryTypes">
							<ul>
								<li title="Anruf" data-entryType="call" style="color:#03a678" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-phone"></i></li>
								<li title="E-Mail" data-entryType="email" style="color:#4ba3cc" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-envelope-o"></i></li>
								<li title="Werbemittel" data-entryType="adMaterial" style="color:#596c73" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-upload"></i></li>
								<li title="Werbemittel" data-entryType="adMaterial" style="color:#8c5e49" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-film"></i></li>
								<!--<li title="Werbemittel" data-entryType="adMaterial"><i class="fa fa-picture-o"></i></li>-->
								<li title="Absprache" data-entryType="agreement"  style="color:#be946a" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-exchange"></i></li>
								<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-retweet"></i></li>-->
								<!--<li title="Absprache" data-entryType="agreement"><i class="fa fa-refresh"></i></li>-->
								<li title="Validiert" data-entryType="validated" style="color:#4ba3cc" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-thumbs-o-up"></i></li>
								<li title="Validiert" data-entryType="validated" style="color:#03a678" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-check"></i></li>
								<li title="Kampagnenstart" data-entryType="campaignStart" style="color:#ffaa00" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-sign-out"></i></li>
								<li title="Kampagnenende" data-entryType="campaignEnd" style="color:#ffaa00" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-sign-in"></i></li>
								<li title="Reporting" data-entryType="reporting" style="color:#d91a2a" onclick="createEntryTypeTemplate($(this).attr('data-entryType'))"><i class="fa fa-bar-chart-o"></i></li>

							</ul>
						</div>
					   <div id="entryTypeTemplate"></div>
					</form> 
				</section>
			</div>
		</div>
	</body>
</html>