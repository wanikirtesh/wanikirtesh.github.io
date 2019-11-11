
(function(document) {
    'use strict';

    var LightTableFilter = (function(Arr) {

        var _input;

        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }

        function _filter(row) {
            var text="";
            Arr.forEach.call(row.cells,function(cell,i){
                if($('.advCheck')[i].checked){

                    if($($('.advCheck')[i]).attr("name")=="normal")
                        text+=cell.textContent.toLowerCase();
                    else if($($('.advCheck')[i]).attr("name")=="not")
                    {

                    text+=$(cell).find("option:selected").val();
                    }
                }
            });
            var val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
            init: function() {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function(input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);



    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);


$(function(){
    var headers = $(".order-table thead th");

     $(headers).each(function(i,cell) {
        var celltext = cell.textContent;
        var atrname = $(cell).attr("name");
        if(atrname!="na"){
            $(".advFilter").append('<input name="'+atrname+'" id="'+celltext+'" class="advCheck" type="checkbox" checked/><label for="'+celltext+'">'+celltext+'</label>');
        }
        else
        {
            $(".advFilter").append('<div style="display:none"><input name="not" id="'+celltext+'" class="advCheck" type="checkbox" checked/><label for="'+celltext+'">'+celltext+'</label></div>');
        }
    });

    $('.ddetails').click(function (event) {
          event.preventDefault();
          if(window.confirm("are you sure, this will delete the record")==true){
			  $(this).closest ('tr').remove();
			  alert('Record deleted Successfully');
		  }
		  else{
			  $(this).closest ('tr').css('background','#b5fcfc')
		  }
      });
	  
	  $('.addNew').click(function (event){
		  var data = window.prompt('Enter comma seperated three values');
		  if(data!=null && data.split(',').length==3){
			  var x = data.split(',');
			  if(x[0]!='1')
			  $('.tblName tr:last').after('<tr><td>'+x[0]+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td></tr>');
			  
		  }else{
			  alert("invalid input");
		  }
	  });
       
});




