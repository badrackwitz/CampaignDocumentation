function getCampaignHistory(id){

	console.log(id);

	// TODO: include passing a paramter to the php-file to get rid of hiding those not needed sections | also: should be faster in general
	var result = $.get('queryCampaignHistory.php',function(data){ 
		console.log(data);
		$('#historyListing').html(data);
		$('#historyListing').find('section').css({'display':'none'});
		$('#historyListing').find('section[id="'+id+'"]').css({'display':'block'});
	});
}

function getCampaigns(advertiser){

	console.log(advertiser);

	// TODO: include passing a paramter to the php-file to get rid of hiding those not needed sections | also: should be faster in general
	var result = $.ajax({
            url: 'queryCampaignNames.php', //This is the current doc
            type: "POST",
            data: ({advertiser: advertiser}),
            success: function(data){
				console.log(data);
				$('#campaignNameList').html(data);
			}
	});
}

function createEntryTypeTemplate(entryType){
	console.log(entryType);
	switch (entryType){
		case 'call':
				var returnString = 	'<div>'
					+ 					'<span>AdOps-Teammitglied: <input name="AdOps-Teammitglied" type="text" size="15" maxlength="15"/></span><br/><br/>'
					+ 					'<span>Gespr&auml;chspartner: <input name="Gesprächspartner" type="text" size="15" maxlength="15"/></span><br/><br/>'
					+ 					'<label for="entryField">Ergebnis:</label><br/><br/>'
					+ 					'<textarea id="entryField" cols="30" rows="4"></textarea><br/><br/>'
					+ 					'<label for="file-upload">Datei:</label><br/><br/><br/>'
                	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/><br/>'
                	+ 				'</div>'
			    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" value="Senden" /></div>';
					

				$('#entryTypeTemplate').html(returnString);
				break;

		case 'email':
			var returnString = 	'<div>'
				+ 					'<span>AdOps-Teammitglied: <input name="AdOps-Teammitglied" type="text" size="15" maxlength="15"/></span><br/><br/>'
				+ 					'<span>Gespr&auml;chspartner: <input name="Gesprächspartner" type="text" size="15" maxlength="15"/></span><br/><br/>'
				+ 					'<label for="file-upload">E-Mail (inkl. Verlauf):</label><br/><br/><br/>'
            	+ 					'<input type="file" id="file-upload" name="file-upload" /><br/><br/>'
            	+ 				'</div>'
		    	+				'<div style="width:100%;border:0px;"><input id="submitEntry" type="submit" value="Senden" /></div>';
				

			$('#entryTypeTemplate').html(returnString);
			break;
			
		default:
			$('#entryTypeTemplate').html('');

	}
}
