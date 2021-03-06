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
    var oneBoxCheck = false;
    for(let i = 0; i < 6; i++){
        if (document.getElementById("box" + i).checked == true) {
            oneBoxCheck = true;
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
                    endScreen("https://i.kym-cdn.com/photos/images/original/000/535/611/d8d.png", "They caught you but you did not have any paintings yet <br> Try Again")
                    reset();
                    return
                }
                else {
                    endScreen("https://thumbs.dreamstime.com/b/cartoon-prisoner-behind-bars-10416629.jpg", "You got caught with paintings on you <br> Try again")
                    reset();
                    return
                }
            }
        }
    }
    if(oneBoxCheck == false) {
        alert("You must select a painting to steal")
    }
    resetBoxes();
}

// This is the function when you press the steal button

function leave() {
    if (stolenPaitings.length == 0) {
        endScreen("https://i.kym-cdn.com/photos/images/original/000/535/611/d8d.png", "You Left the museum without taking any paintings <br> If you want to play again click anywhere on the screen")
        reset();
    }
    else {
        if(check(7) == false) {
            endScreen("https://thumbs.dreamstime.com/b/cartoon-prisoner-behind-bars-10416629.jpg", "You got caught with paintings on you trying to leave <br> Try again")
            reset();
        }
        else {
            var sPaintings = "";
            for(let j = 0; j < stolenPaitings.length; j++) {
                sPaintings += (stolenPaitings[j] + ".<br>");
            }
            endScreen("https://cdn.winsightmedia.com/platform/files/public/fsd/main/articles/cartoon-thief.jpg", "You got away with these paintings: <br> " + sPaintings + " <br> If you want to play again click anywhere on the screen.")
            reset();
        }
    }
}

// This is the function that is triggerd when you press the leave button

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
    modifier += (1.5 * stolenPaitings.length);
    if(check + modifier > 90) {
        return false;
    }
    else {
        return true;
    }
}

// This function is the check if you get caught or not

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
    var modal = document.getElementById("myModal" + i);
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
    var span = document.getElementsByClassName("close")[i];
    span.onclick = function() { 
    modal.style.display = "none";
    }
}

// The code makes uses of modals to show certain hidden information it iterates through the whole list of images to enable the functionality of a modal to every image.
// This code was taken from W3Schools from Modals


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

// This function gets 6 painting from a random page number and checks if they all have a imgage link

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

// This function gets the detailed data from the individual paintings gotten from the function getSixPaintings