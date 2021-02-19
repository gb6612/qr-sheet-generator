function leadZeroes(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}

function isOdd(num) { return num % 2;}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//***************************************
// create QR code sheet with the following format
// aaaabbbbbcccccccc
// where
// aaaa(lotNumber)   : hex number on 16 bits (4 hex digits)
// bbbbb(dateNumber) : hex number on 20 bits (5 hex digits)
// cccccccc(myID) : hex number on 32 bits (8 hex digits) - increments for every QR generated; can also be random
//***************************************
function create_qr_array() {

	var table = document.getElementById('avery7160');
	var tbodyRef = document.getElementById('avery7160').getElementsByTagName('tbody')[0];					

	var lotNumber  = parseInt(document.getElementById("lotNumber").value) ;
	var dateNumber = parseInt(document.getElementById("dateNumber").value) ;
	var nbRows     = parseInt(document.getElementById("nbRows").value) ;
	var nbCols     = parseInt(document.getElementById("nbCols").value) ;
	var myID       = parseInt(document.getElementById("IDnumber").value) ;
	myID -= 1;
	
// cells creation
	for (var j = 0; j < nbRows; j++) {
		// table row creation
		var row = table.insertRow(j);
	
		for (var i = 0; i < nbCols; i++) {					
			var cell = row.insertCell(i);
			var hexString = (lotNumber).toString(16); 
			var tmp = leadZeroes(hexString, 4);
			
			hexString = (dateNumber).toString(16);
			tmp += leadZeroes(hexString, 5);
			
			if (document.getElementById('randID').checked) {
				myID = getRandomInt(999999999);
			} else {
				myID += 1;
			}
			
			hexString = myID.toString(16);
			tmp += leadZeroes(hexString, 8);
			
			cell.innerHTML = create_qrcode(tmp, 1, "L");
			cell.innerHTML += "<br>"+tmp; // DEBUG		
			
			row.appendChild(cell);
		}
	
		//row added to end of table body
		tbodyRef.appendChild(row);
	}
}


//***************************************
// QR Code functions
//***************************************

var create_qrcode = function(text, typeNumber, errorCorrectLevel, table) {

	var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
	qr.addData(text);
	qr.make();

//	return qr.createTableTag();
	return qr.createImgTag(6); // cell size
};

