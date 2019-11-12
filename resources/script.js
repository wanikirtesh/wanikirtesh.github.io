var filtersData ={};
var selections = [];
var temp="";
var fullData;
var rnd_ = ""+Date.now();
$(document).ready(function(){
	var docHeight = $(document).height();
	$("body").append("<div id='overlay' class='text-center my-auto'><div style='position:relative;top:50%' class='spinner-grow text-primary m-5 spinner-grow-lg' role='status' ><span class='sr-only'>Loading...</span></div></div>");
	$("#overlay")
	   .height(docHeight)
	   .css({
		  'opacity' : 0.4,
		  'position': 'absolute',
		  'top': 0,
		  'left': 0,
		  'background-color': 'black',
		  'width': '100%',
		  'z-index': 5000
	});
	$.getJSON("./resources/data.json?t="+Date.now(),
		function(data){
			fullData = data.employess;
			Object.keys(fullData[0]).forEach(element => {
				if(element.indexOf("_")!=0){
					var optionText = element.replace("_"," ")
					$('#selDetails').append(new Option(optionText, element))
					filtersData[element] = new Set(data.employess.map(x => x[element]).sort());
				}
			});
			$("#overlay").css("display","none");
		});

	$('#selDetails').change(function(){
		$("#overlay").css("display","block");
		temp = $(this).val()
		setTimeout(function(){updateFilterPan(temp);
			if(selections.length>0)
			$('#btnGen').prop( "disabled", false );
		else
			$('#btnGen').prop( "disabled", true );
		},getRandomInt(1000,10000));
	})

	$('#btnGen').click(function(e){
		e.preventDefault();
		var filteredData = "?fltlist=";
		var fltString="";
		$('.cfilter select').each(function(index){
			var colname = $(this).attr("id").replace("flt","");
			filteredData +=colname + ",";
			fltString += (colname + "=" + $(this).val().join(",") + "&");
		})
		filteredData += ("&" + fltString);
		$('#btnGen').prop( "disabled", true );
		$('#btnGen').html( '<span class="spinner-grow spinner-grow-sm" style="display:none" role="status" aria-hidden="true"></span>Loading...' );
		$('#btnGen span').css("display","inline-block");
		setTimeout(function(){window.open("./report.html" + filteredData , "popupWindow", "width=800,resizable=false,height=700,scrollbars=yes");
			$('#btnGen').prop( "disabled", false );
			$('#btnGen').html( 'Generate Report' );
		},getRandomInt(1000,3000));
	})
})

function updateFilterPan(filters){
	filters.forEach(element => {
		if(!selections.includes(element)){
			selections.push(element);
			addFilter(element);
		}
		$("#overlay").css("display","none");
	});
	var t = selections.length;
	for(var i=0;i<t;i++){
		var element=selections[i];
		if(element!=undefined && !filters.includes(element)){
			removeSelection(element);
			removeFilter(element);
			i--;
		}
	}
}

function removeSelection(str){
	for(var i =0;i<selections.length;i++){
		if(selections[i] == str){
			selections.splice(i,1);
			break;
		}
	}
}

function addFilter(strFilterName){
	var strFilterName_ = strFilterName.replace(' ','_').toLowerCase()
	var optList = '<select class="form-control" multiple id="flt'+strFilterName_+'">';
	filtersData[strFilterName_].forEach(element=>{
		optList += '<option selected>'+element+'</option>';
	})
	optList += '</select>'
	$(".cfilter").append('<div class="col-md-4" id="fltr'+strFilterName_+'"><label for="flt'+strFilterName_+'">'+strFilterName.replace("_"," ")+':</label>'+optList+'</div>');

}

function removeFilter(strFilterName){
	var strFilterName_ = 'fltr'+strFilterName.replace(' ','_').toLowerCase()
	$(document.getElementById(strFilterName_)).remove();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}