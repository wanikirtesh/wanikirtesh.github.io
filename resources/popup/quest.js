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