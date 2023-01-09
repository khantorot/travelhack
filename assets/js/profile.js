
function getVals() {
    
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);
    
    if (slide1 > slide2) { var tmp = slide2; slide2 = slide1; slide1 = tmp; }

    var displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = "от " + slide1 + " - " + " до " + slide2 + " ";
}

window.onload = function () {
    
    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) { 
        var sliders = sliderSections[x].getElementsByTagName("input");
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                
                sliders[y].oninput();
            }
        }
    }
}










let theForm = document.getElementById('theForm');

new stepsForm(theForm, {
    onSubmit: function (form) {
        classie.addClass(theForm.querySelector('.simform-inner'), 'hide');


        let messageEl = theForm.querySelector('.final-message');
        messageEl.innerHTML = 'Спасибо за ответы, ищем друзей';
        classie.addClass(messageEl, 'show');
    }
});





if (user.role == 'guest') {
    document.querySelector('.profile_info .section_title').innerHTML = 'Места которые посетили';
} else {
    document.querySelector('.profile_info .section_title').innerHTML = 'Мои избранные места';
}