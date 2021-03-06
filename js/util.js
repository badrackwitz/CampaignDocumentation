function getCampaignHistory(id){

	//console.log(id);

	// TODO: include passing a paramter to the php-file to get rid of hiding those not needed sections | also: should be faster in general
	/*var result = $.get('queryCampaignHistory.php',function(data){ 
		//console.log(data);
		$('#historyListing').html(data);
		$('#historyListing').find('section').css({'display':'none'});
		$('#historyListing').find('section[id="'+id+'"]').css({'display':'block'});
	});*/

	var result = $.ajax({
            url: 'queryCampaignHistory.php', //This is the current doc
            type: "POST",
            data: ({id: id}), // pass the advertiser to get campaigns from this advertiser
            beforeSend: function(){
            	//console.log('getting the campaigns');
            	$('#loadingCampaignHistory').show();
            	$('#historyListing section').css({'opacity':'0.5','filter':'alpha(opacity=50)'});
            },
            success: function(data){
				//console.log(data);
				if(data == ''){
					data = '<section style="background-color:transparent;padding-left:0px;border:0px;box-shadow:0px 0px 0px;">Bisher keine Eintr&auml;ge<br/> in dieser Kampagne.</section>';
				}
				$('#historyListing').html(data);
				$('#loadingCampaignHistory').hide();
				$('#myModal').hide();
			}
	});
}

function getCampaigns(advertiser){

	//console.log(advertiser);

	// TODO: include passing a paramter to the php-file to get rid of hiding those not needed sections | also: should be faster in general
	var result = $.ajax({
            url: 'queryCampaignNames.php', //This is the current doc
            type: "POST",
            data: ({advertiser: advertiser}), // pass the advertiser to get campaigns from this advertiser
            beforeSend: function(){
            	//console.log('getting the campaigns');
            	$('#loadingCampaigns').show();
            },
            success: function(data){
				//console.log(data);
				$('#campaignNameList').html(data);
				$('#loadingCampaigns').hide();
			}
	});
}

function createEntryTypeTemplate(entryType){
	console.log(entryType);
	//console.log(event.target.parentNode);
	//console.log($('li').attr('data-entryType'));
	// highlight selected entryType
	//$('#entryTypes ul li').css({'opacity':'0.5'});
	if($(event.target).parent().attr('data-entryType') == entryType){
		$('li[data-entryType="'+entryType+'"]').css({'opacity':'1'});
	}else{
		//$('li').css({'opacity':'0.5'});
	}

	switch (entryType){
		case 'call':
				var returnString =
										'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert call</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">AdOps-Teammitglied:</label><span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span><br/>'
							+ 					'<label for="callPartner"> Gespr&auml;chspartner:</label><span id="callPartner"><input name="callPartner" type="text" size="15" maxlength="15" value="Mr. X"/></span><br/>'
							+ 					'<label for="entryField">Ergebnis:</label>'
							+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4">booking</textarea><br/>'
							+ 					'<label for="file-upload">Anhang:</label>'
		                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/>'
		                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';

					
				$('#myModal').html(returnString);
				fillTeammemberDD();
				break;

		case 'email':
			var returnString = 					'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert e-Mail</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">AdOps-Teammitglied:</label><span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span><br/>'
							+ 					'<label for="callPartner"> Gespr&auml;chspartner:</label><span id="callPartner"><input name="callPartner" type="text" size="15" maxlength="15" value="Mr. X"/></span><br/>'
							+ 					'<label for="entryField">Ergebnis:</label>'
							+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4">booking</textarea><br/>'
							+ 					'<label for="file-upload">Anhang:</label>'
		                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/>'
		                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';


			$('#myModal').html(returnString);
			fillTeammemberDD();
			break;

		case 'adMaterial':
			var returnString = 					'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert ad material</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">Von:</label><input name="adOpsMember" type="text" size="15" maxlength="15"/><br/>'
							+ 					'<label for="file-upload">Werbemittel:</label>'
		                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/>'
		                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';

			$('#myModal').html(returnString);
			fillTeammemberDD();
			break;

		case 'agreement':
			var returnString = 					'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert agreement</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">AdOps-Teammitglied:</label><span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span><br/>'
							+ 					'<label for="callPartner"> Gespr&auml;chspartner:</label><span id="callPartner"><input name="callPartner" type="text" size="15" maxlength="15" value="Mr. X"/></span><br/>'
							+ 					'<label for="entryField">Ergebnis:</label>'
							+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4">booking</textarea><br/>'
		                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';

			$('#myModal').html(returnString);
			fillTeammemberDD();
			break;

		case 'validated':
			var returnString = 					'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert validation</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">AdOps-Teammitglied:</label><span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span><br/>'
				+ 					'<label for="dateValidatedOn">Validiert am:</label>'
            	+ 					'<input type="date" id="dateValidatedOn" name="startValidated" value="<?php echo date(); ?>"/><br/>'
            	+					'<label for="datePlannedStart">Kampagnenstart am:</label>'
            	+ 					'<input type="date" id="datePlannedStart" name="startDate" />'
            	+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';

			$('#myModal').html(returnString);
			fillTeammemberDD();
			break;

		case 'campaignStart':
			var returnString = 			'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert campaign start</h3>'
						+ 				'</div>'
						+				'<div class="modal-body">'	
						+					'<p>auto generated (<small>or maybe not?</small>)</p>'
						+ 				'</div>'
	                	+ 				'<div class="modal-footer">'
						+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
						+				'</div>';

			$('#myModal').html(returnString);
			break;

		case 'campaignEnd':
			var returnString = 			'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert campaign end</h3>'
						+ 				'</div>'
						+				'<div class="modal-body">'	
						+					'<p>auto generated (<small>or maybe not?</small>)</p>'
						+ 				'</div>'
	                	+ 				'<div class="modal-footer">'
						+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
						+				'</div>';

        	$('#myModal').html(returnString);
			break;

		case 'reporting':
			var returnString = 					'<div class="modal-header">'
						+					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
						+ 					'<h3 id="myModalLabel">Insert reporting</h3>'
						+ 				'</div>'
					+					'<div class="modal-body">'	
						+					'<form id="callForm" action="index.php" method="post">'
							+ 					'<label for="listTeammember">Von:</label><span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span><br/>'
							+ 					'<label for="callPartner"> An:</label><span id="callPartner"><input name="callPartner" type="text" size="15" maxlength="15" value="Mr. X"/></span><br/>'
							+ 					'<label for="file-upload">Anhang:</label>'
		                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/>'
		                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/>'
		                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/>'
	                		+ 				'</div>'
	                		+ 				'<div class="modal-footer">'
							+					'<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
							+					'<button type="submit" form="callForm" name ="submitForm" class="btn btn-primary">Insert into history</button>'
							+				'</div>'
						+ 					'</form>';

        	$('#myModal').html(returnString);
        	fillTeammemberDD();
			break;

		default:
			$('#entryTypeTemplate').html('');

	}
}

function fillTeammemberDD() {
	var ddContent = '<select id="teamMember" name="teamMember">'
					+ 	'<option value="leonidKushner">Leonid Kushner</option>'
					+ 	'<option value="oleMehles">Ole Mehles</option>'
					+ 	'<option value="juliaNiendorf">Julia Niendorf</option>'
					+ 	'<option value="desireeSattler">D&eacute;sir&eacute;e Sattler</option>'
					+'</select>';
	$('#listTeammember').html(ddContent);
	//console.log('replacement of input field successful');
}
