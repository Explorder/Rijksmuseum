//Global Variables
var sixPaintings;
var individualPaitings = [];
var stolenPaitings = []; 

//When webpage is opened
$(document).ready(function() {
    getPainting();
 })

// All button presses to there respetive functions
$('#nextHall').click(getPainting);
$('#stealBtn').click(steal);
$('#leaveBtn').click(leave);


function steal() {
    for(let i = 0; i < 6; i++){
        if (document.getElementById("box" + i).checked == true) {
            for(let j = 0; j < stolenPaitings.length; j++){
                if((sixPaintings.artObjects[i].title + "\n") == stolenPaitings[j]) {
                    alert("You are trying to steal a painting you have already stolen")
                    return;
                }
            }
            if(check(i) == true) {
                var li = document.createElement("li");
                var namePainting = document.createTextNode(sixPaintings.artObjects[i].title);
                li.appendChild(namePainting)
                document.getElementById("takenList").appendChild(li);
                stolenPaitings.push(sixPaintings.artObjects[i].title + "\n");
            }
            else {
                alert("You got caught\nYou have to start again");
                document.getElementById("takenList").innerHTML = "";
                stolenPaitings = [];
                return
            }
        }
    }
}

function check(i) {
    let check = Math.random()* 100
    let modifier = 0;
    if(i != 7) {
        let surface = parseFloat(individualPaitings[i].artObject.dimensions[0].value) * parseFloat(individualPaitings[i].artObject.dimensions[1].value);
        if (surface < 2500) {
            modifier = 1;
        }
        else if (surface < 4900) {
            modifier = 2;
        }
        else if (surface < 8100) {
            modifier = 4;
        }
        else if (surface < 14400) {
            modifier = 6;
        }
        else if (surface < 22500) {
            modifier = 8;
        }
        else {
            modifier = 10;
        }
    }
    modifier += stolenPaitings.length;
    console.log(check + modifier);
    if(check + modifier > 90) {
        return false;
    }
    else {
        return true;
    }
}


function leave() {
    if(check(7) == false) {
        alert("You got caught on your way out \nYou have to start over again")
        document.getElementById("takenList").innerHTML = "";
        stolenPaitings = [];
    }
    else {
        sPaintings = stolenPaitings.toString().replace(",", "");
        console.log(sPaintings)
        alert("The paintings that you got away with are: \n" + sPaintings);
        document.getElementById("takenList").innerHTML = "";
        stolenPaitings = [];
    }
}

// Code = gxOqGef4

function getPainting() {
    individualPaitings = [];
    sixPaintings = [];
    var pageNumber = Math.floor((Math.random() * 792));
    console.log(pageNumber);
    getSixPaintings("https://www.rijksmuseum.nl/api/nl/collection?key=gxOqGef4&type=schilderij&ps=6&p=" + pageNumber);
}

function placePainting(){
    for(let i = 0; i < 6; i++) {
        document.getElementById("image" + i).src = sixPaintings.artObjects[i].webImage.url; // Changes the paiting(image)
        document.getElementById("tekst" + i).innerHTML = sixPaintings.artObjects[i].title; // Changes the name
        document.getElementById("boxTekst" + i).innerHTML = sixPaintings.artObjects[i].title;
    }
}
for(let i = 0; i < 6; i++) {
    // Get the modal
    var modal = document.getElementById("myModal" + i);

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("image" + i);
    var modalImg = document.getElementById("modalimage" + i);
    var captionText = document.getElementById("caption" + i);
    img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    let dimensions = individualPaitings[i].artObject.subTitle.replace("h", "Hoogte").replace("d", "Dikte").replace("b","Breedte");
    captionText.innerHTML = "<ul> <li> Name: " +  individualPaitings[i].artObject.title + "</li>" +
                            "<li> ID:  " + individualPaitings[i].artObject.id + "</li>" +
                            "<li> Maker:  " + individualPaitings[i].artObject.principalMaker + "</li>" +
                            "<li> Medium:  " + individualPaitings[i].artObject.physicalMedium + "</li>" +
                            "<li> Presenting Date:  " + individualPaitings[i].artObject.dating.presentingDate + "</li>" +
                            "<li> Description:  " + individualPaitings[i].artObject.description + "</li>" +
                            "<li> Dimensions of the painting:  " + dimensions + "</li></ul>";
    captionText.style.color = 'white';
    }


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[i];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}

function getSixPaintings(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, true);

	xmlhttp.send();
	xmlhttp.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json_file = JSON.parse(xmlhttp.responseText);
            for(let i = 0; i < 6; i++) {
                if(json_file.artObjects[i].hasImage == false) {
                    getPainting();
                    return;
                }
            }
            sixPaintings = json_file;
            getIndividualPaintings(0);
		}
	}
}

function getIndividualPaintings(number) {
    var url = "https://www.rijksmuseum.nl/api/nl/collection/" + sixPaintings.artObjects[number].objectNumber + "?key=gxOqGef4"
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);

    xmlhttp.send();
    xmlhttp.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json_file = JSON.parse(xmlhttp.responseText);
            individualPaitings.push(json_file);
            if (number < 5) {
                number++
                getIndividualPaintings(number)
            }
            else {
                test2()
                placePainting();
            }
        }
    }
}

function Test() {
    console.log("test")
}
function test2() {
    console.log(individualPaitings)
}

// The code makes uses of modals to show certain hidden information it iterates through the whole list of images to enable the functionality of a modal to every image.
//Bart als je dit ziet heb ik de plaatjes van 0 tot en met 5 gezet zodat de functie hierboven zal werken, de informatie die we in de modals willen hebben kunnen we zondag
//bespreken of welke dag ons beide schikt ;)