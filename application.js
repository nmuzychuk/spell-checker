var change = function (event) {
    check(event.target.value);
};

var check = function (target) {
    var words = target.split(/\s+/);
    for (var i = 0; i < words.length; i++) {
        var sanitizedWord = words[i].toLocaleLowerCase().replace(/[^a-z]/gi, '');
        if (sanitizedWord === "") {
            continue;
        }
        if (dict[sanitizedWord] !== 1) {
            words[i] = '<span class="not-found">' + words[i] + '</span>';
        }
    }
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = words.join(" ");
};

var textElement = document.getElementById("text");
textElement.addEventListener('change', change);
textElement.addEventListener('keyup', change);

var dict;
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open('GET', 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json', true);
req.onload = function () {
    dict = JSON.parse(req.responseText);
    check(document.getElementById("text").value);
};
req.send();
