//options to be added
var options = ["Not valid","Satisfied","Improvable (low effort)","Improvable (high effort)", "Does not apply"];
var colors = ['#FFFFFF', '#00FF00', '#FFFF5A' ,'#FFA500' ,'#808080'];


function openAbility(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
} 


// element: single capability level
function fillOptions(cell, element){
    // Create and append select list
    var selectList = document.createElement("select");
    selectList.id = element;
    selectList.onchange = "draw()";
    cell.appendChild(selectList);
    
    // Create and append the options
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = options[i];
        selectList.appendChild(option);
    }
}


// el: the element to be added
function fillRow(tbody, abilityLevel){
    // First row the element
    let row = document.createElement('tr');
    let cell_1 = document.createElement('td');

    // Add the description
    cell_1.innerHTML = "<details> <summary>"+ abilityLevel.levelName + "</summary>" + abilityLevel.levelDescription + "</details>";
    
    // Options levels
    let cell_2 = document.createElement('td');
    fillOptions(cell_2, abilityLevel + "_" + abilityLevel.levelName);
    
    // Text area for the scenario
    let cell_3 = document.createElement('td');
    var ta = document.createElement("TEXTAREA");
    ta.rows = "1";

    // Append all the elements
    cell_3.appendChild(ta);
    row.appendChild(cell_1);
    row.appendChild(cell_2);
    row.appendChild(cell_3);
    tbody.appendChild(row);
}


function fillTable(ability) {    
    if (!ability.hasSubAbilities) {
        fillNormalAbility(ability);
    } else {
        fillSubAbility(ability);
    }
}


function fillSubAbility(ability) {
    let tDescription = document.createElement('p');

    // Initial description for the ability
    tDescription.innerHTML = ability.abilityDescription;
    document.getElementById(ability.abilityName).appendChild(tDescription);

    // For each sub-ability
    for (let i = 0; i < ability.subAbilities.length; i++) {
        let subAbilityName = document.createElement('p');
        subAbilityName.innerHTML = "<b>" + ability.subAbilities[i].subAbilityName + "</b>: " + ability.subAbilities[i].subAbilityDescription;
        document.getElementById(ability.abilityName).appendChild(subAbilityName);

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        // Compose the table for the sub-ability
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Level";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Achieved?";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Scenario";
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        thead.appendChild(row_1);

        for (let j = 0; j < ability.subAbilities[i].subAbilityLevels.length; j++) {
            fillRow(tbody, ability.subAbilities[i].subAbilityLevels[j]);
        }

        // Adding the entire table to the body tag
        document.getElementById(ability.abilityName).appendChild(table);
    }
}

function fillNormalAbility(ability) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tDescription = document.createElement('p');
    table.appendChild(thead);
    table.appendChild(tbody);

    // Initial description for the ability
    tDescription.innerHTML = ability.abilityDescription;
    document.getElementById(ability.abilityName).appendChild(tDescription);

    // Adding the entire table to the body tag
    document.getElementById(ability.abilityName).appendChild(table);

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Level";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Achieved?";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Scenario";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    thead.appendChild(row_1);

    // Create a row for every level
    for (let i = 0; i < ability.abilityLevels.length; i++) {
        fillRow(tbody, ability.abilityLevels[i]);
    }
}


async function fillTables(){
    var data = await getJSONAbilities();
    for (let i=0; i<data.length; i++) {
        fillTable(data[i]);
    }
}


// ctx: the graphical context
// label: the lebel (string)
// levels of the capability
// angle
function drawCircles(ctx, label, levels, alpha){
    const length = 300
    var step = length/levels.length;
    const radius = 10;
    var X = canvas.width / 2; // cosa è canvas??
    var Y = canvas.height / 2;   
    // draw the line
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X+length*Math.cos(alpha),Y+length*Math.sin(alpha));
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 5;
    ctx.stroke();
    // write the label
    ctx.font = "10px Arial";
    ctx.fillText(label, X+length*Math.cos(alpha) + 15 ,Y+length*Math.sin(alpha) + 15); 
    // draw the circles
    for (let index = 0; index < levels.length; ++index) {
        const element = levels[index];
        var value = document.getElementById(element).value;
        console.log("value of " + element + " val = " + value);        
        ctx.beginPath();
        ctx.arc(X + (index + 1)  * step *  Math.cos(alpha), Y + (index +1) * step *  Math.sin(alpha), radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = colors[value];
        ctx.fill();
        // set the color
        ctx.strokeStyle = colors[value];
        ctx.stroke();
    }
}


async function draw() {
    // Get the canvas context
    const canvas = document.getElementById("canvas");
    if (canvas == null) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // Start drawing data
    var data = await getJSONAbilities();
    for (let i=0; i<data.length; i++) {
        
    }

    drawCircles(ctx,"Configurability", Configurability, 0 );
    drawCircles(ctx,"Dependability", Dependability, 0.5 );
    drawCircles(ctx,"Adaptability", Adaptability, 1.5 );
    drawCircles(ctx,"Autonomy", Adaptability, -1.5 );
}


function pdf() {
    var abilities = []
    const elements =  document.getElementsByClassName('tabcontent');
    for(var i=0; i<elements.length; i++) abilities.push("<h2>" + elements[i].id + "</h2>" + elements[i].innerHTML + "<hr>");
    //console.log(abilities);
    var html = abilities.join()
    const w = window.open('','newpage')
    w.document.write(html)
    //w.document.write(document.getElementById("canvas").)
    w.document.close()
    w.print();
}


async function getJSONAbilities() {
    const response = await fetch("https://raw.githubusercontent.com/fmselab/ADVISOR/main/docs/evaluator/abilities.json");
    const json = await response.json();
    return json.data;
}