function getCampaignHistory(id){

	console.log(id);

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
	$('#entryTypes ul li').css({'opacity':'0.5'});
	if($(event.target).parent().attr('data-entryType') == entryType){
		$('li[data-entryType="'+entryType+'"]').css({'opacity':'1'});
	}else{
		$('li').css({'opacity':'0.5'});
	}

	switch (entryType){
		case 'call':
				var returnString = 	'<div>'
					+ 					'<span>AdOps-Teammitglied: <span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
					+ 					'<span>Gespr&auml;chspartner: <input name="callPartner" type="text" size="15" maxlength="15" value="Mr. X"/></span><br/><br/>'
					+ 					'<label for="entryField">Ergebnis:</label><br/><br/>'
					+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4">booking</textarea><br/><br/>'
					+ 					'<label for="file-upload">Datei:</label><br/><br/><br/>'
                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/><br/>'
                	+ 					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
                	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
                	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
                	+ 				'</div>'
			    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
					

				$('#entryTypeTemplate').html(returnString);
				fillTeammemberDD();
				break;

		case 'email':
			var returnString = 	'<div>'
				+ 					'<span>AdOps-Teammitglied: <span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
				+ 					'<span>Gespr&auml;chspartner: <input name="callPartner" type="text" size="15" maxlength="15"/></span><br/><br/>'
				+					'<label for="entryField">Ergebnis:</label><br/><br/>'
				+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4">booking</textarea><br/><br/>'
				+ 					'<label for="file-upload">E-Mail (inkl. Verlauf):</label><br/><br/><br/>'
            	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/><br/>'
				+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
				

			$('#entryTypeTemplate').html(returnString);
			fillTeammemberDD();
			break;

		case 'adMaterial':
			var returnString = 	'<div>'
				+ 					'<span>Von: <span id="noMarginTop"><input name="From" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
				+ 					'<label for="file-upload">Werbemittel:</label><br/><br/><br/>'
            	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/><br/>'
				+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
				

			$('#entryTypeTemplate').html(returnString);
			fillTeammemberDD();
			break;

		case 'agreement':
			var returnString = 	'<div>'
				+ 					'<span>AdOps-Teammitglied: <span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
				+ 					'<span>Gespr&auml;chspartner: <input name="callPartner" type="text" size="15" maxlength="15"/></span><br/><br/>'
            	+ 					'<label for="entryField">Ergebnis:</label><br/><br/>'
				+ 					'<textarea id="entryField" name="entryField" cols="30" rows="4"></textarea><br/><br/>'
				+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
				

			$('#entryTypeTemplate').html(returnString);
			fillTeammemberDD();
			break;

		case 'validated':
			var returnString = 	'<div>'
				+ 					'<span>AdOps-Teammitglied: <span id="listTeammember"><input name="adOpsMember" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
				+ 					'<label for="dateValidatedOn">Validiert am:</label><br/><br/><br/>'
            	+ 					'<input type="date" id="dateValidatedOn" name="startValidated" value="<?php echo date(); ?>"/><br/><br/>'
            	+					'<label for="datePlannedStart">Kampagnenstart am:</label><br/><br/><br/>'
            	+ 					'<input type="date" id="datePlannedStart" name="startDate" /><br/><br/>'
            	+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
				

			$('#entryTypeTemplate').html(returnString);
			fillTeammemberDD();
			break;

		case 'campaignStart':
			var returnString = 	'<div>'
				+ 					'<span>Automatischer Eintrag in die DB vom AdServer (?)</span><br/><br/>'
				+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>';
			$('#entryTypeTemplate').html(returnString);
			break;

		case 'campaignEnd':
			var returnString = 	'<div>'
				+ 					'<span>Automatischer Eintrag in die DB vom AdServer (?)</span><br/><br/>'
				+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>';
        	$('#entryTypeTemplate').html(returnString);
			break;

		case 'reporting':
			var returnString = 	'<div>'
				+ 					'<span>Von: <span id="listTeammember"><input name="From" type="text" size="15" maxlength="15"/></span></span><br/><br/>'
				+ 					'<span>An: <span id="noMarginTop"><input name="To" type="text" size="15" maxlength="15"/></span></span><br/>'
				+ 					'<label for="file-upload-reporting">Reporting:</label><br/><br/><br/>'
            	+ 					'<input type="file" id="file-upload" name="file-upload-reporting" /><br/><br/>'
            	+					'<input type="hidden" id="hiddenEntryType" name="entryType" value="'+entryType+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignIndex" name="campaignID" value="'+($('#campaignNamesList').find(":selected").index()+1)+'"/><br/><br/>'
            	+ 					'<input type="hidden" id="hiddenCampaignName" name="campaignName" value="'+($('#campaignNamesList').find(":selected").val())+'"/><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" name ="submitForm" value="Senden" /></div>';
        	$('#entryTypeTemplate').html(returnString);
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
