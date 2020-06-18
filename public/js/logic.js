//Global Variables
var Gallerij;
var indiPaitings = [];
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
                if(Gallerij.artObjects[i].title == stolenPaitings[j]) {
                    alert("You are trying to steal a painting you have already stolen")
                    return;
                }
            }
            if(check() == true) {
                var li = document.createElement("li");
                var namePainting = document.createTextNode(Gallerij.artObjects[i].title);
                li.appendChild(namePainting)
                document.getElementById("takenList").appendChild(li);
                stolenPaitings.push(Gallerij.artObjects[i].title + "\n");
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

function check() {
    var check = Math.random()* 100
    console.log(check)
    var  modifier;
    if(check > 80) {
        return false;
    }
    else {
        return true;
    }
}


function leave() {
    if(check() == false) {
        alert("You got caught on your way out \nYou have to start over again")
        document.getElementById("takenList").innerHTML = "";
        stolenPaitings = [];
    }
    else {
        sPaintings = stolenPaitings.toString().replace(",", "");
        alert("The paintings that you got away with are: \n" + sPaintings);
        document.getElementById("takenList").innerHTML = "";
        stolenPaitings = [];
    }
    // for(let i = 0; i < 6; i++) {
    //     //console.log(Gallerij)
    //     $.get("https://www.rijksmuseum.nl/api/nl/collection/" + Gallerij.artObjects[i].objectNumber + "?key=gxOqGef4", function(schilderij) {
    //         console.log("Hoogte: " + schilderij.artObject.dimensions[0].value)
    //         console.log("Breedte: " + schilderij.artObject.dimensions[1].value)
    //     })
    // }
    // //alert(" You have left the museum")
}

function filterFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
// The above function is from w3c gxOqGef4



function getPainting() {
    var paitingsFound = true;
    var pageNumber = Math.floor((Math.random() * 792));
    console.log(pageNumber);
    $.get("https://www.rijksmuseum.nl/api/nl/collection?key=gxOqGef4&type=schilderij&ps=6&p=" + pageNumber , function(data) {
    //$.get("https://www.rijksmuseum.nl/api/nl/collection?key=gxOqGef4&type=schilderij&ps=6&p=358", function(data) {
        console.log(data);
        for(let i = 0; i < 6; i++) {
            if(data.artObjects[i].hasImage == false) {
                getPainting();
                return;
            }
        }
            Gallerij = data;
            // indiPaitings = [];
            // for(let i = 0; i < 6; i++) {
            //     $.get("https://www.rijksmuseum.nl/api/nl/collection/" + Gallerij.artObjects[i].objectNumber + "?key=gxOqGef4", function(schilderij) {
            //         console.log(schilderij)
            //         indiPaitings.push(schilderij);
            //     })
            // }
            // console.log("Hoogte: " + indiPaitings[3].artObject.dimensions[0].value)
            // console.log("Breedte: " + indiPaitings[3].artObject.dimensions[1].value) 
            placePainting()   
    })

}
//The above fuction generates a group of 6 paitings that all have an img link.
// //page withouit images 593.
// console.log("Hoogte: " + indiPaitings[i].artObject.dimensions[0].value)
// console.log("Breedte: " + indiPaitings[i].artObject.dimensions[1].value)

function placePainting(){
    for(let i = 0; i < 6; i++) {
        document.getElementById("image" + i).src = Gallerij.artObjects[i].webImage.url; // Changes the paiting(image)
        document.getElementById("tekst" + i).innerHTML = Gallerij.artObjects[i].title; // Changes the name
        document.getElementById("boxTekst" + i).innerHTML = Gallerij.artObjects[i].title;
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
    captionText.innerHTML = this.alt ;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[i];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}

// The code makes uses of modals to show certain hidden information it iterates through the whole list of images to enable the functionality of a modal to every image.
//Bart als je dit ziet heb ik de plaatjes van 0 tot en met 5 gezet zodat de functie hierboven zal werken, de informatie die we in de modals willen hebben kunnen we zondag
//bespreken of welke dag ons beide schikt ;)