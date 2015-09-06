var fluidBox = $('#sidebar .fluidBox'), 
	totalH = $('#sidebar .sidebarTop').outerHeight() + $('#sidebar .sidebarBottom').outerHeight(),
	fluidH; 

function LabelList(){
	    $('.labelList input').each(function(){
        if($(this).attr('data-inputbind') != undefined) { return; }
        $(this).attr('data-inputbind', 'true');

        $(this).change(function(){
            UpdateSidebar($(this).closest('.labelList')); 
        }).change();                      
    });
}

function UpdateSidebar($container){
	var currentPrice = 0, ul, li, el;
	$('.sbSummary ul').remove();
	ul = document.createElement('ul'); 
	$('.sbSummary').append(ul).hide(); 


	for(var i=0; i < $container.find(':checked').length; i++){
		el = $($container.find(':checked')[i]).parent(); 
		currentPrice += parseInt(el.find('.pPrice').text());

		li = document.createElement('li');
		el.find('.pTitle').clone(true).appendTo(li);
		$('.sbSummary ul').append(li);  
	}
	
 	$('#sidebar .cPrice').text(currentPrice);
 	$('.sbSummary').stop().fadeIn('300');
 	
 	UpdateFluidBoxH();
}


function UpdateFluidBoxH(){
		var scrollH  = $('#sidebar .scroll').height();
		fluidH = $('#sidebar .sbSummary ul').outerHeight();
		(scrollH - totalH > fluidH) ? fluidBox.css('height', scrollH - totalH) : fluidBox.css('height', 'auto'); 
}

function SidebarTrigger(){
	$('#sTrigger').each(function(){
		if($(this).attr('data-triggerbind') != undefined) { return; }
        $(this).attr('data-triggerbind', 'true');

        $(this).click(function(){
        	$('#sidebar').toggleClass('active');
        	$('body').toggleClass('moved');

        	// if($('#sidebar').hasClass('active')){
        	// 	$('html,body').click(function(e){
        	// 		if(!$(e.target).closest('#sidebar').length && $(e.target).closest('#sidebar') != undefined)
        	// 		{
        	// 			$('#sidebar').removeClass('active');
        	// 			$('body').removeClass('moved');
        	// 		}
        	// 	})	
        	// }
        	     	
        	return false;
        });
	});
	$(window).resize(function(){
		if($('#sidebar').hasClass('active')){
			$('#sidebar').removeClass('active');
			$('body').removeClass('moved');	
		}
	});
}

function PageInit(){
	$('.styledForm').validator(); 
	$('#sidebar .scroll').mCustomScrollbar({
		autoHideScrollbar: true,
		axis:'y',
		mouseWheel:{ scrollAmount: 80 },
	});

	$('.submitBtn').click(function(){
		$('#sidebar .styledForm').submit();			
	});

	LabelList();
 	SidebarTrigger();
 	
 	$(window).resize(function(){
 		UpdateFluidBoxH();
 	});
}