$('#stealBtn').click(exampleAlert); // Collect HTML element with (#) id sendMsgBtn, when click do function exampleAlert

function exampleAlert() {
	console.log("Nice");
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

$(document).ready(function() {
   getPainting();

})
function getPainting() {
    var paitingsFound = true;
    var pageNumber = Math.floor((Math.random() * 792));
    console.log(pageNumber);
    $.get("https://www.rijksmuseum.nl/api/nl/collection?key=gxOqGef4&type=schilderij&ps=6&p=" + pageNumber, function(data) {
        console.log(data);
        for(let i = 0; i < 6; i++) {
            if(data.artObjects[i].hasImage == false) {
                paitingsFound = false;
                getPainting();
                break;
            }
        }
        if(paitingsFound == true){
            placePainting(data)
        }    
    })
}
//The above fuction generates a group of 6 paitings that all have an img link.
//page withouit images 593.

function placePainting(data){
    for(let i = 0; i < 6; i++) {
        document.getElementById("image" + i).src = data.artObjects[i].webImage.url; // Changes the paiting(image)
        document.getElementById("tekst" + i).innerHTML = data.artObjects[i].title; // Changes the name
    }
}