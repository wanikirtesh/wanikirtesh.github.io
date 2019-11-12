var tbl;
var filteredData;
var columns=[];
$(document).ready(function(){
	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)')
						  .exec(window.location.search);
		return decodeURIComponent((results !== null) ? results[1] || 0 : false);
	}
	$.getJSON("./resources/data.json?t="+Date.now(),
	    function(data){
			filteredData = data.employess;
			var dm;
			Object.keys(filteredData[0]).forEach(key => {
				var col = {};
				col.data = key;
				col.title = key.replace("_"," ").trim()
				columns.push(col);
				dm = Object.assign({},col); //important
			})
			dm.title="S.No";
			columns.splice(0,0,dm)
			columns.push({"title":"Action","data":null})
			
			var filters = $.urlParam("fltlist").split(",");
			for(var i =0;i<filters.length-1;i++){
				console.log($.urlParam(filters[i]))
				var ref_ = $.urlParam(filters[i]).split(",")
				filteredData = filteredData.filter(x => ref_.includes(x[filters[i]].toString()))
				
			}
			tbl = $("#rpt").DataTable({
				"data":filteredData,
				"columns":columns,
				"columnDefs": [ {
					"searchable": false,
					"orderable": false,
					"targets": 0
				} ],
				"order": [[ 1, 'asc' ]]
			})
			tbl.on( 'order.dt search.dt', function () {
				tbl.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					cell.innerHTML = i+1;
				});
				tbl.column(6, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					cell.innerHTML = "<input type='checkbox'></input>";
				});
			} ).draw();
	});
})