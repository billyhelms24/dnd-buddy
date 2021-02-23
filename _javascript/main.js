document.addEventListener("DOMContentLoaded", () => {});

let request = new XMLHttpRequest();

// a static list of all official DnD classes
const CLASS_LIST = [
    "artificer",
    "barbarian",
    "bard",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard",
];
// an empty list to load class objects into from data JSON files
let classData = [];

// a loop to load class objects from each class JSON
for (let i = 0; i < CLASS_LIST.length; i++) {
    request.open("GET", `././data/classes/class-${CLASS_LIST[i]}.json`, false);
    request.send(null);
    classData.push(JSON.parse(request.responseText));
}

// assign constants for class select dropdown and paragraph
const class_select_dropdown = document.getElementById("classSelect");
const class_desctription_paragraph = document.getElementById(
    "classDescription"
);

// a loop that appends an option, displaying class name, to the dropdown for each class
for (let i = 0; i < classData.length; i++) {
    if (i == 0) {
        // artificer is structured a bit differently, so we need to isolate it and target a different index to get the correct info
        class_select_dropdown.append(new Option(classData[i].class[2].name, i));
    } else {
        // the remaining classes are all dependendent on the same index
        class_select_dropdown.append(new Option(classData[i].class[0].name, i));
    }
}

// a function to grap and display the class description info from the JSON based on the class selected in the dropdown
function displayClassDescription() {
    // start with an empty string for the description. We'll add the description strings to this before displaying
    let classDescriptionText = "";
    // isolating artificer due to index usage, but also the description is only one string
    if (class_select_dropdown.value == 0) {
        classDescriptionText += classData[0].class[2].fluff[0].entries[0];
        // replace text about next section since that is for book format. We have no next section. Also line breaks the string for readibility
        classDescriptionText = classDescriptionText.replace(
            "You can find everything you need to play one of these inventors in the next few sections. ",
            "&#013 &#013"
        );
        // barbarian also needs isolated because it uses 5 strings for its description. Add line breaks for readibility
    } else if (class_select_dropdown.value == 1) {
        for (let i = 0; i < 5; i++) {
            classDescriptionText += classData[1].class[0].fluff[0].entries[i];
            classDescriptionText += "&#013 &#013";
        }
        // remaining classes all use 4 strings for their descriptions. Also adding in line breaks here for readibility
    } else {
        for (let i = 0; i < 4; i++) {
            classDescriptionText +=
                classData[class_select_dropdown.value].class[0].fluff[0]
                    .entries[i];
            classDescriptionText += "&#013 &#013";
        }
    }

    // display string
    class_desctription_paragraph.innerHTML = classDescriptionText;
}
