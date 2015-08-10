		var myRnd;
		var que;
		var ans;
		function validateAnswer(){
			if($("#ans").val()==ans){
				
				if(typeof getUrlVars()["ans"] === 'undefined'){
					$("#nxa").html("<h1>Congratulations!!!</h1>");
				}else{
				$("#nxa").html(getQuest()[parseInt(getUrlVars()["ans"])].answer);
				}
			}
			else{
				$("#nxa").html("<span style='color:red'>!!!Answer is not correct!!!</span>");
			}
		}
		
    	$(function() {
			myRnd =  parseInt(getRandomArbitrary(0,10));
			que = getQuest()[myRnd].question;
			ans = getQuest()[myRnd].answer;
			var count = parseInt(getUrlVars()["va"]);
			if(isNaN(count)){
			   count = parseInt(getRandomArbitrary(2,10));
			   
			}else{
				//$("#kount").html("<h3>There will more "+(count-1)+"</h3>");
			}
			 
			if(count<=1){
			//alert(getUrlVars()["ans"]);
				$("#kount").html("<h1>Answre is: " + getQuest()[parseInt(getUrlVars()["ans"])].answer + "</h1>");
				$("#form-example").html("");
			 }else{
				$('#mq').html('<h1>' + que + '</h1>')
			 }
    		
			$('a').click(function (event) {
				event.preventDefault();
				window.open("index.html?va="+(--count)+"&ans="+myRnd, "popupWindow"+(--count), "width=600, height=400, scrollbars=yes");
			});
    	})


function getQuest(){
	var text = '['+
	'{"question":"Which scientist discovered the radioactive element radium?","answer":"Marie Curie"},' +
	'{"question":"What James Watt invented?","answer":"Rotary steam engine"},' +
	'{"question":"The Paithan (Jayakwadi) Hydro-electric project, completed with the help of Japan, is on the river","answer":"Godavari"},' +
	'{"question":"The oldest mountains in India are","answer":"Aravalis"},' +
	'{"question":"Which of the following important rivers of India does not originate from the Western Ghats?","answer":"Mahanadi"},' +
	'{"question":"How many Lok Sabha seats belong to Rajasthan?","answer":"25"},' +
	'{"question":"In a normal human body, the total number of red blood cells is","answer":"30 trillion"},' +
	'{"question":"In which season do we need more fat?","answer":"Winter"},' +
	'{"question":"The number of already named bones in the human skeleton is","answer":"206"},' +
	'{"question":"What Galileo invented?","answer":"Thermometer"}' +
	']';
	debugger;
	var object = JSON.parse(text);
	return object;
}