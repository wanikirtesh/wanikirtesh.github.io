
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

    $('.adetails').click(function (event) {
          event.preventDefault();
          var w = window.open("", "popupWindow", "width=600, height=400, scrollbars=yes");
          var $w = $(w.document.body);
          $w.html($('#modalText').html());
          $tds = $(this).parent().parent().find("td");
          var inhtm = '<table><tr><th>Attribute</th><th>Value</th></tr>';
          inhtm+='<tr><th>Name</th><td>'+$tds.get(1).textContent+'</td></tr>';
          inhtm+='<tr><th>Designation</th><td>'+$tds.get(2).textContent+'</td></tr>';
          inhtm+='<tr><th>Department</th><td>'+$tds.get(3).textContent+'</td></tr>';
          inhtm+='<tr><th>Country</th><td>'+$tds.get(4).textContent+'</td></tr>';
          inhtm+='<tr><th>Ratting</th><td>'+$($tds.get(5)).find('select option:selected' ).text();+'</td></tr>';
          inhtm+='</table>';
          $w.find(".example").html(inhtm);

      });
       $('.ainline').click(function (event) {
       event.preventDefault();
             $tds = $(this).parent().parent().find("td");
            $(this).addClass("hiddenlink");
            $(this).parent().parent().after('<tr style="height:0px;overflow:hidden"><td colspan="7"><iframe style="height:0px;width:90%" src="popup.html?Name='+$tds.get(1).textContent+'&Designation='+$tds.get(2).textContent+'&'+'Department='+$tds.get(3).textContent+'&Country='+$tds.get(4).textContent+'&Ratting='+$tds.get(5).textContent+'"/><a href="#" class="closeFrame"><img src="../common/close.png" /></a></td></tr>');
            $(this).parent().parent().next().find('iframe').animate({
                height: [ "150", "swing" ]
                }, 1000, "linear");
            var $x = $(this);
            $('.closeFrame').click(function(e,x){
                e.preventDefault();
                $x.fadeIn();
                $(this).closest('tr').remove();
            })
            $(this).hide();
       });
});




