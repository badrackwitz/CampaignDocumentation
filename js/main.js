$(document).ready(function(){

	$('#loadingCampaigns').hide();
	$('#loadingCampaignHistory').hide();
 	
 	$( ".draggable" ).draggable({ opacity: 0.7, helper: "clone" , cursor: "copy", cursorAt: { bottom: 0 }, 
 		start: function() {
        	$('#historyListing').css({'opacity':'0.5', 'outline':'thin dashed #000'});
        	$( ".draggable" ).css({'z-index':'20'});

      	},
      	stop: function() {
        	$('#historyListing').css({'opacity':'1', 'outline':'0px'});
      	}
  	});	
 	$( ".droppable" ).droppable({
      drop: function( event, ui ) {
        $( this ).addClass( "ui-state-highlight" );
          console.log(ui.draggable[0].attributes["data-entrytype"].value);
          createEntryTypeTemplate(ui.draggable[0].attributes["data-entrytype"].value);
          $('#myModal').modal('show');
      }
    });

});
