//options to be added
var options = ["Not valid","Satisfied","Improvable (low effort)","Improvable (high effort)", "Does not apply"];
var colors = ['#FFFFFF', '#00FF00', '#FFFF5A' ,'#FFA500' ,'#808080'];

var Configurability = ["Static Configuration", "Start-up Configuration", "Run-time Configuration","Run-time Self Configuration","Autonomous Configuration"];
var Adaptability = ["No Adaptation","Recognition of the need for adaptation", "Adaptation of individual components/parameters/tasks", "Process chain adaptation / Multiple parameters adaptation", "Communicated component/parameter adaptation"];
var Dependability = ["No dependability", "Mean failure dependability", "Fails Safe", "Failure Recovery", "Graceful Degradation", "Task dependability", "Mission dependability", "Predictive dependability"];
var Autonomy = ["No autonomy", "Basic action", "Basic decisional autonomy", "Continuous basic decisional autonomy", "Simple autonomy without environment model", "Simple autonomy with environment model", "Task autonomy", "Constrained task autonomy", "Multiple task autonomy", "Dynamic autonomy", "Mission oriented autonomy", "Distributed autonomy"];
var Interaction = [
    ["No interaction", "Direct control", "Direct physical interaction", "Task selection", "Traded autonomy", "Task sequence control", "Supervised autonomy", "Task sequence control", "Mission Goal setting"],
    ["No feedback", "Visual feedback", "Vision data feedback", "Haptic feedback", "Tele-presence"],
    ["No interaction", "Communication of own status", "Communication of task status", "Communication of environment information", "Team communication", "Team coordination", "Capability Communication"]
];

const descriptions = new Map();
descriptions.set("Adaptability - No Adaptation", "The system does not alter its operating behavior in response to experience gained over time."); 


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


// element: single capabilityt level
function fillOptions(cell, element){
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = element;
    selectList.onchange = "draw()";
    cell.appendChild(selectList);
    //Create and append the options
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = options[i];
        selectList.appendChild(option);
    }
}
// el: the element to be added
function fillRow(el, tbody, abilityName){
    let row = document.createElement('tr');
    // first row the element
    let cell_1 = document.createElement('td');
    // add the description
    cell_1.innerHTML = "<details> <summary>"+ el + "</summary>" + descriptions.get(abilityName + " - " + el) + "</details>";
    // options levels
    let cell_2 = document.createElement('td');
    fillOptions(cell_2, el);
    // text area for the scenario
    let cell_3 = document.createElement('td');
    var ta = document.createElement("TEXTAREA");
    ta.rows = "1";
    cell_3.appendChild(ta);
    row.appendChild(cell_1);
    row.appendChild(cell_2);
    row.appendChild(cell_3);
    tbody.appendChild(row);
}
// capability: la stringa
// livels: l'array con tutti i livelli
function fillTable(capability, levels) {
    //var h2 = document.createElement ("h2");
    //h2.innerHTML = capability;
    //document.getElementById(capability).appendChild(h2);
    // <h2>capability:</h2>
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    // Adding the entire table to the body tag
    document.getElementById(capability).appendChild(table);
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
    // create a row for every level
    levels.forEach(element => fillRow(element,tbody, capability));
}

function fillTables(){
    fillTable("Configurability", Configurability);
    fillTable("Dependability", Dependability);
    fillTable("Adaptability", Adaptability);
    fillTable("Autonomy", Autonomy);
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

function draw() {
    const canvas = document.getElementById("canvas");

    if (canvas == null) {
        return;
    }
    // var x1 = document.getElementById("ConfigurabilitySelect").value;
    const ctx = canvas.getContext('2d');
    drawCircles(ctx,"Configurability", Configurability, 0 );
    drawCircles(ctx,"Dependability", Dependability, 0.5 );
    drawCircles(ctx,"Adaptability", Adaptability, 1.5 );
    drawCircles(ctx,"Autonomy", Adaptability, -1.5 );
    // clear canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // set line stroke and line width
}
//draw();
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