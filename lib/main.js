"use strict";

// TO-DO LIST
// - Change the logic to load only the class into the classData array, not the entire JSON Object

var CLASS_LIST = ["artificer", "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];

var CLASS_SELECT_DROPDOWN = document.getElementById("classSelect");
var CLASS_FLUFF_TEXTAREA = document.getElementById("classDescription");

function displayClassDescription() {
    // start with an empty string for the description. We'll add the description strings to this before displaying
    var classDescriptionText = "";
    // isolating artificer due to index usage, but also the description is only one string
    if (CLASS_SELECT_DROPDOWN.value == 0) {
        classDescriptionText += classData[0].class[2].fluff[0].entries[0];
        // replace text about next section since that is for book format. We have no next section. Also line breaks the string for readibility
        classDescriptionText = classDescriptionText.replace("You can find everything you need to play one of these inventors in the next few sections. ", "&#013 &#013");
        // barbarian also needs isolated because it uses 5 strings for its description. Add line breaks for readibility
    } else if (CLASS_SELECT_DROPDOWN.value == 1) {
        for (var i = 0; i < 5; i++) {
            classDescriptionText += classData[1].class[0].fluff[0].entries[i];
            classDescriptionText += "&#013 &#013";
        }
        // remaining classes all use 4 strings for their descriptions. Also adding in line breaks here for readibility
    } else {
        for (var _i = 0; _i < 4; _i++) {
            classDescriptionText += classData[CLASS_SELECT_DROPDOWN.value].class[0].fluff[0].entries[_i];
            classDescriptionText += "&#013 &#013";
        }
    }

    // display string
    CLASS_FLUFF_TEXTAREA.innerHTML = classDescriptionText;
}

for (var i = 0; i < classData.length; i++) {
    if (i == 0) {
        // artificer is structured a bit differently, so we need to isolate it and target a different index to get the correct info
        CLASS_SELECT_DROPDOWN.append(new Option(classData[i].class[2].name, i));
    } else {
        // the remaining classes are all dependendent on the same index
        CLASS_SELECT_DROPDOWN.append(new Option(classData[i].class[0].name, i));
    }
}

displayClassDescription();