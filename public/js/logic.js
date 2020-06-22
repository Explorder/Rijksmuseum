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
                if((sixPaintings.artObjects[i].title) == stolenPaitings[j]) {
                    alert("You are trying to steal a painting you have already stolen")
                    return;
                }
            }
            if(check(i) == true) {
                var li = document.createElement("li");
                var namePainting = document.createTextNode(sixPaintings.artObjects[i].title);
                li.appendChild(namePainting)
                document.getElementById("takenList").appendChild(li);
                stolenPaitings.push(sixPaintings.artObjects[i].title);
            }
            else {
                if(stolenPaitings.length == 0) {
                    endScreen("https://cdn.discordapp.com/attachments/700659644762423327/723868249032360066/unknown.png", "They caught you but you did not have any paintings yet <br> Try Again")
                    reset();
                }
                else {
                    endScreen("https://thumbs.dreamstime.com/b/cartoon-prisoner-behind-bars-10416629.jpg", "You got caught with paintings on you <br> Try again")
                    reset();
                    return
                }
            }
        }
    }
}

function leave() {
    if(check(7) == false) {
        endScreen("https://thumbs.dreamstime.com/b/cartoon-prisoner-behind-bars-10416629.jpg", "You got caught with paintings on you trying to leave <br> Try again")
        reset();
    }
    else {
        var sPaintings = "";
        for(let j = 0; j < stolenPaitings.length; j++) {
            if(j == (stolenPaitings.length - 2)) {
                sPaintings += (stolenPaitings[j] + " and ");
            }
            else if (j == (stolenPaitings.length - 1)) {
                sPaintings += (stolenPaitings[j] + ".");
            }
            else {
                sPaintings += (stolenPaitings[j] + ", ");
            }
        }
        endScreen("https://cdn.winsightmedia.com/platform/files/public/fsd/main/articles/cartoon-thief.jpg", "You got away with these paintings: " + sPaintings + "<br> If you want to play again click anywhere on the screen.")
        reset();
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
    if(check + modifier > 90) {
        return false;
    }
    else {
        return true;
    }
}



// Code = gxOqGef4

function getPainting() {
    individualPaitings = [];
    sixPaintings = [];
    document.getElementById("hiddenModal").style.display = "none";
    resetBoxes();
    var pageNumber = Math.floor((Math.random() * 792));
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

function reset() {
    document.getElementById("takenList").innerHTML = "";
    stolenPaitings = [];
    resetBoxes();
}

function resetBoxes() {
    for(let i = 0; i < 6; i++){
        document.getElementById("box" + i).checked = false;
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
                placePainting();
            }
        }
    }
}

function endScreen(link, text) {
    document.getElementById("hiddenModal").style.display = "block";
    var modal = document.getElementById("myModalHidden");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("imageHidden");
    var modalImg = document.getElementById("modalimageHidden");
    var captionText = document.getElementById("captionHidden");
    modal.style.display = "block";
    modalImg.src = link;
    captionText.innerHTML = text;
    captionText.style.color = 'white';
}
window.onclick = function(event) {
    if (event.target == myModalHidden) {
        myModalHidden.style.display = "none";
        document.getElementById("hiddenModal").style.display = "none";
    }
}

// The code makes uses of modals to show certain hidden information it iterates through the whole list of images to enable the functionality of a modal to every image.
//Bart als je dit ziet heb ik de plaatjes van 0 tot en met 5 gezet zodat de functie hierboven zal werken, de informatie die we in de modals willen hebben kunnen we zondag
//bespreken of welke dag ons beide schikt ;)