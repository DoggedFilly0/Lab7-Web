$(document).ready(function() {

    // Start your code from here
    
    let animals = ["dog", "cat", "rabbit","frog","chicken","bird","turtle"];
    
    
    
    
    function populateButtons(arrayToUse,classToAdd,placeHolder){
        $(placeHolder).empty();
    
        for(let i= 0; i< arrayToUse.length; i++){
            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type",arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(placeHolder).append(a);
        }
    }
    
    $("#animal-buttons").on("click",".animal-button", function(){
    $("#animals").empty();
        let search = $(this).attr("data-type");
        let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        $.ajax({url:queryUrl})
        .then(function(response) {
    
        let results = response.data;
    
        for (let i = 0; i <results.length; i++) {
    
    
            let animalDiv = $("<div class=\"animal-item\">");
            let rating = results[i].rating;
            let p = $("<p>").text("Rating: "+ rating);
    
            let animated = results[i].images.fixed_height.url;
            let still = results[i].images.fixed_height_still.url;
    
            let animalImage = $("<img>");
            animalImage.attr("src",still);
            animalImage.attr("data-still",still);
            animalImage.attr("data-animate",animated);
            animalImage.attr("data-isAnimated","false");
            animalImage.addClass("animal-image");
    
            animalDiv.append(p);
            animalDiv.append(animalImage);
    
            $("#animals").append(animalDiv);
    
        }
    
    
        });
    });
    
    // Registro del evento para la imagen
    
    /*
    if (state == "false") {
    
    $(this).attr("src", $(this).attr("data-animate"))
    %(this).attr("data-isAnimated","true");
    
    }
    else {
        $(this).attr("src", $(this).attr("data-still"))
        %(this).attr("data-isAnimated","false");
    
    }*/
    
    $("#add-animal").on("click" ,(e)=> {
        e.preventDefault();
        let newAnimal = $("#animal-input").val();
        animals.push(newAnimal);
        populateButtons(animals,"animal-button","#animal-buttons");
    })
    
    
    populateButtons(animals,"animal-button","#animal-buttons");
        
});
    