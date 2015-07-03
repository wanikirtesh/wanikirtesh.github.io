var runData =[];
				runData = getRunDataForMe();
			$('document').ready(function() {
				var tabCounter=3;
				var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
				var tabs = $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
				$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
				
				tabs.delegate( "span.ui-icon-close", "click", function() {
				  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
				  $( "#" + panelId ).remove();
				  tabs.tabs( "refresh" );
				});
				
				$( '#graphTabs' ).tabs(); 
				
				
				
				
				
				$('.summarytable').html('<tr><th>Sr</th><th>Executed on</th><th>Passed</th><th>Failed</th><th>Skipped</th></tr>');
				for(var i=1;i<=runData.length;i++)
				{
					$('.summarytable').append('<tr name="'+runData[i-1].date+'"><td>'+i+'</td><td>'+runData[i-1].displayname+'</td><td>'+runData[i-1].Passed+'</td><td>'+runData[i-1].Failed+'</td><td>'+runData[i-1].Skipped+'</td></tr>');
				}
				
				$( "#datepicker" ).datepicker();
 			});
			
			var chart = AmCharts.makeChart('myLineChart', {	
  		'type': 'serial',	
  		'theme': 'light',	
  		'marginRight': 20,	
  		'autoMarginOffset': 20,	
  		'marginTop': 7,	
  		'dataProvider': runData,	
  		'valueAxes': [{	
  			'axisAlpha': 0.2,	
  			'dashLength': 1,	
  			'position': 'left'	
  		}],	
  		'graphs': [{	
  			'id': 'g1',	
  			'balloonText': '[[category]]<br/><b><span style="font-size:14px;">Passed: [[value]]</span></b>',	
  			'bullet': 'round',	
  			'bulletBorderAlpha': 1,	
  			'bulletColor': '#FFFFFF',	
  			'hideBulletsCount': 50,	
  			'title': 'red line',	
  			'valueField': 'Passed',	
  			'useLineColorForBulletBorder': true,	
  			'lineColor': '#0F9D28',	
  			'lineThickness': 2	
  		},	
  				  {	
  			'id': 'g2',	
  			'balloonText': '[[category]]<br/><b><span style="font-size:14px;">Failed: [[value]]</span></b>',	
  			'bullet': 'round',	
  			'bulletBorderAlpha': 1,	
  			'bulletColor': '#FFFFFF',	
  			'hideBulletsCount': 50,	
  			'title': 'blue line',	
  			'valueField': 'Failed',	
  			'useLineColorForBulletBorder': true,	
				'lineColor':'#DF0C12',	
  			'lineThickness': 3	
  		},	
  		{	
  			'id': 'g3',	
  			'balloonText': '[[category]]<br/><b><span style="font-size:14px;">Skipped: [[value]]</span></b>',	
  			'bullet': 'round',	
  			'bulletBorderAlpha': 1,	
  			'bulletColor': '#FFFFFF',	
  			'hideBulletsCount': 50,	
  			'title': 'blue line',	
  			'valueField': 'Skipped',	
  			'useLineColorForBulletBorder': true,	
				'lineColor':'#F3F24D',	
  			'lineThickness': 2	
  		}],	
  			
  		'chartCursor': {	
  		},	
  		'categoryField': 'displayname',	
  		'categoryAxis': {	
  			'parseDates': false,	
  			'axisColor': '#DADADA',	
  			'dashLength': 1,	
  			'minorGridEnabled': true	
  		}	
  	}); 
 		chart.lineColorField = 'color';  
      var chart2 = AmCharts.makeChart('myBarChart', { 
      	'type': 'serial', 
      	'categoryField': 'displayname', 
      	'rotate': false, 
      	'startDuration': 1, 
      	'categoryAxis': { 
      		'gridPosition': 'start', 
      		'position': 'bottom' 
      	}, 
      	'trendLines': [], 
      	'graphs': [ 
      		{ 
      			'balloonText': 'Passed:[[value]]', 
      			'fillAlphas': 0.8, 
      			'id': 'AmGraph-1', 
      			'lineAlpha': 0.2, 
      			'title': 'Passed', 
      			'type': 'column', 
      			'valueField': 'Passed',	
  			'lineColor': '#0F9D28' 
      		}, 
      		{ 
      			'balloonText': 'Failed:[[value]]', 
      			'fillAlphas': 0.8, 
      			'id': 'AmGraph-2', 
      			'lineAlpha': 0.2, 
      			'title': 'Failed', 
      			'type': 'column',	
				'lineColor':'#DF0C12', 
      			'valueField': 'Failed' 
      		}, 
                         { 
      			'balloonText': 'Skipped:[[value]]', 
      			'fillAlphas': 0.8, 
      			'id': 'AmGraph-3', 
      			'lineAlpha': 0.2, 
      			'title': 'Skipped', 
      			'type': 'column',	
				'lineColor':'#F3F24D', 
      			'valueField': 'Skipped' 
      		} 
      	], 
      	'guides': [], 
      	'valueAxes': [ 
      		{ 
      			'id': 'ValueAxis-1', 
      			'position': 'left', 
      			'axisAlpha': 0 
      		} 
      	], 
      	'allLabels': [], 
      	'balloon': {}, 
      	'titles': [], 
      	'dataProvider': runData 
      }); 
			
$(function() {
$( "#draggable" ).draggable();
$( "#droppable" ).droppable({
drop: function( event, ui ) {
$( this )
.addClass( "ui-state-highlight" )
.find( "p" )
.html( "Dropped!" );
}
});
});

$(document).ready(function () {
    $("ul.top li").hover(function () { //When trigger is hovered...
        $(this).children("ul.sub").slideDown('fast').show();
    }, function () {
        $(this).children("ul.sub").slideUp('slow');
    });
});	


$(function() {
    var dialog, form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( password, "password", 5, 16 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      if ( valid ) {
        $( "#users tbody" ).append( "<tr>" +
          "<td>" + name.val() + "</td>" +
          "<td>" + email.val() + "</td>" +
          "<td>" + password.val() + "</td>" +
        "</tr>" );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Create an account": addUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
  });	

$(function() {
    $( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
	$( "#mlmenu" ).menu();
  }); 
$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  }); 

  $(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
    $( "#tags" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
  });  
  $(function() {
    var circle = $( "#circle" );
 
    $( "#radius" ).selectmenu({
      change: function( event, data ) {
        circle.css({
          width: data.item.value,
          height: data.item.value
        });
      }
     });
 
    $( "#color" ).selectmenu({
       change: function( event, data ) {
         circle.css( "background", data.item.value );
       }
     });
  });
