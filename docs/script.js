//options to be added
//var options = ["Not applicable","Satisfied","Improvable (low effort)","Improvable (high effort)", "Unable"];
//var colors = ['#FFFFFF', '#00FF00', '#FFFF5A' ,'#FFA500' ,'#808080'];
var options = ["Not applicable","Has the ability","Does not have the ability"];
var colors = ['#CCCCCC', '#FFFFFF', '#000000']; //gray: does not apply; white: has the ability; black: does not have the ability

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
    selectList.setAttribute( "onchange", "table();");
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
function fillRow(tbody, abilityLevel, keyName){
    // First row the element
    let row = document.createElement('tr');
    let cell_1 = document.createElement('td');

    // Add the description
    cell_1.innerHTML = "<details> <summary>"+ abilityLevel.levelName + "</summary>" + abilityLevel.levelDescription + "</details>";
    
    // Options levels
    let cell_2 = document.createElement('td');
    fillOptions(cell_2, keyName + "_" + abilityLevel.level);
    
    // Text area for the scenario
    let cell_3 = document.createElement('td');
    var ta = document.createElement("TEXTAREA");
    ta.rows = "1";
    ta.id = keyName + "_" + abilityLevel.level + "_ta";

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
        heading_2.innerHTML = "Response";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Example";
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        thead.appendChild(row_1);

        for (let j = 0; j < ability.subAbilities[i].subAbilityLevels.length; j++) {
            fillRow(tbody, ability.subAbilities[i].subAbilityLevels[j], ability.subAbilities[i].subAbilityName);
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
    heading_2.innerHTML = "Response";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Example";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    thead.appendChild(row_1);

    // Create a row for every level
    for (let i = 0; i < ability.abilityLevels.length; i++) {
        fillRow(tbody, ability.abilityLevels[i], ability.abilityName);
    }
}


async function fillTables(){
    var data = await getJSONAbilities();
    for (let i=0; i<data.length; i++) {
        fillTable(data[i]);
    }
	
	// Attach the listener to the JSON import file
	document.getElementById("jsonfileinput").addEventListener("change", function() {
		var file_to_read = document.getElementById("jsonfileinput").files[0];
		var fileread = new FileReader();
		fileread.onload = function(e) {
			var content = e.target.result;
			var abilities = JSON.parse(content); 
			for (let i = 0; i<abilities.length; i++) {
				if (abilities[i].hasSubAbilities) {
					// With sub abilities
					document.getElementById(abilities[i].subAbilityName + "_" + abilities[i].level).value = abilities[i].achieved;
                    document.getElementById(abilities[i].subAbilityName + "_" + abilities[i].level + "_ta").value = abilities[i].scenario;
				} 
				else {
					// Without sub abilities
					document.getElementById(abilities[i].abilityName + "_" + abilities[i].level).value = abilities[i].achieved;
                    document.getElementById(abilities[i].abilityName + "_" + abilities[i].level + "_ta").value = abilities[i].scenario;
				}
			}
			openAbility(event, 'Configurability');
			table();
		};
		fileread.readAsText(file_to_read);
	});
}


// ctx: the graphical context
// ability: the ability
// alpha: the angle
function drawCircles(ctx, ability, alpha){
    const length = 300
    console.log(ability.abilityName);
    var step = length/ability.abilityLevels.length;
    const radius = 10;
    var X = canvas.width / 2; 
    var Y = canvas.height / 2;   

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X+length*Math.cos(alpha),Y+length*Math.sin(alpha));
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Write the label
    ctx.font = "10px Arial";
    ctx.fillText(ability.abilityName, X+length*Math.cos(alpha) + 15 ,Y+length*Math.sin(alpha) + 15); 

    // Draw the circles
    for (let index = 0; index < ability.abilityLevels.length; ++index) {
        const element = ability.abilityLevels[index];        
        var value = document.getElementById(ability.abilityName + "_" + element.level).value;
        ctx.beginPath();
        ctx.arc(X + (index + 1)  * step *  Math.cos(alpha), Y + (index +1) * step *  Math.sin(alpha), radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = colors[value];
        ctx.fill();
        // Set the color
        ctx.strokeStyle = colors[value];
        ctx.stroke();
    }
}


// ctx: the graphical context
// ability: the ability
// alpha: the angle
function drawCirclesSubAbilities(ctx, subAbility, alpha){
    const length = 300
    console.log(subAbility.subAbilityName);
    var step = length/subAbility.subAbilityLevels.length;
    const radius = 10;
    var X = canvas.width / 2; 
    var Y = canvas.height / 2;   

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X+length*Math.cos(alpha),Y+length*Math.sin(alpha));
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Write the label
    ctx.font = "10px Arial";
    ctx.fillText(subAbility.subAbilityName, X+length*Math.cos(alpha) + 15 ,Y+length*Math.sin(alpha) + 15); 

    // Draw the circles
    for (let index = 0; index < subAbility.subAbilityLevels.length; ++index) {
        const element = subAbility.subAbilityLevels[index];        
        var value = document.getElementById(subAbility.subAbilityName + "_" + element.level).value;
        ctx.beginPath();
        ctx.arc(X + (index + 1)  * step *  Math.cos(alpha), Y + (index +1) * step *  Math.sin(alpha), radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = colors[value];
        ctx.fill();
        // Set the color
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
    var alpha = 0;
    for (let i=0; i<data.length; i++) {
        if (data[i].hasSubAbilities) {
            // The ability is divided into sub abilities
            for (let j=0; j<data[i].subAbilities.length; j++) {
                drawCirclesSubAbilities(ctx, data[i].subAbilities[j], alpha)
            }
        } else {
            // No sub abilities are available
            drawCircles(ctx, data[i], alpha)
        }
        alpha = alpha + 0.5;
    }
}


async function exportPDFStandard() {
	// Get data and iterate over them
    var data = await getJSONAbilities();
    var html = "<html><head><meta charset='UTF-8'><link rel='stylesheet' href='style.css'><style> td, th {border: 1px solid black;} </style></head><body><h1>fRAme<h1>";
    for (let i=0; i<data.length; i++) {
        if (data[i].hasSubAbilities) {
            // Ability with sub abilities 
            // Header
            html += "<h2>" + data[i].abilityName + "</h2>";
            html += "<p>" + data[i].abilityDescription + "</p><br>";

            for(let j=0; j<data[i].subAbilities.length; j++) {
                html += "<h3>" + data[i].subAbilities[j].subAbilityName + "</h3>";
                html += "<p>" + data[i].subAbilities[j].subAbilityDescription + "</p><br>";

                // Levels
                html += "<table style='border: 1px solid black; border-collapse: collapse;'> <tr><th>Level</th><th>Level name</th><th>Description</th></tr>"

                for (let index = 0; index < data[i].subAbilities[j].subAbilityLevels.length; ++index) {
                    const element = data[i].subAbilities[j].subAbilityLevels[index];        
                    html += "<tr><td>" + element.level + "</td><td>" + element.levelName + "</td><td>" + element.levelDescription + "</td></td>"
                }

                html += "</table><br>"
            }

            html += "<hr>"
        } else {
            // Ability with no sub abilities 
            // Header
            html += "<h2>" + data[i].abilityName + "</h2>";
            html += "<p>" + data[i].abilityDescription + "</p><br>";

            // Levels
            html += "<table style='border: 1px solid black; border-collapse: collapse;'> <tr><th>Level</th><th>Level name</th><th>Description</th></tr>"

            for (let index = 0; index < data[i].abilityLevels.length; ++index) {
                const element = data[i].abilityLevels[index];        
                html += "<tr><td>" + element.level + "</td><td>" + element.levelName + "</td><td>" + element.levelDescription + "</td></td>"
            }

            html += "</table><br><hr>"
        }
    }
    html += "</body><html>"

    const w = window.open('','newpage');
    w.document.write(html);
    w.document.close();
    w.print();
}


async function pdf() {
    // Print the table
    await table();

    // Get data and iterate over them
    var data = await getJSONAbilities();
    var html = "<html><head><meta charset='UTF-8'><link rel='stylesheet' href='style.css'><style> .tb {border: 1px solid black;} </style></head><body><h1>fRAme<h1>";
    for (let i=0; i<data.length; i++) {
        if (data[i].hasSubAbilities) {
            // Ability with sub abilities 
            // Header
            html += "<h2>" + data[i].abilityName + "</h2>";
            html += "<p>" + data[i].abilityDescription + "</p><br>";

            for(let j=0; j<data[i].subAbilities.length; j++) {
                html += "<h3>" + data[i].subAbilities[j].subAbilityName + "</h3>";
                html += "<p>" + data[i].subAbilities[j].subAbilityDescription + "</p><br>";

                // Levels
                html += "<table style='border: 1px solid black; border-collapse: collapse;'> <tr><th class='tb'>Level</th><th class='tb'>Response</th><th class='tb'>Example</th></tr>"

                for (let index = 0; index < data[i].subAbilities[j].subAbilityLevels.length; ++index) {
                    const element = data[i].subAbilities[j].subAbilityLevels[index];        
                    var value = document.getElementById(data[i].subAbilities[j].subAbilityName + "_" + element.level).value;
                    var scenario = document.getElementById(data[i].subAbilities[j].subAbilityName + "_" + element.level + "_ta").value;
                    html += "<tr><td class='tb'>" + element.levelName + "</td><td class='tb'>" + options[value] + "</td><td class='tb'>" + scenario + "</td></td>"
                }

                html += "</table><br>"
            }

            html += "<hr>"
        } else {
            // Ability with no sub abilities 
            // Header
            html += "<h2>" + data[i].abilityName + "</h2>";
            html += "<p>" + data[i].abilityDescription + "</p><br>";

            // Levels
            html += "<table style='border: 1px solid black; border-collapse: collapse;'> <tr><th class='tb'>Level</th><th class='tb'>Response</th><th class='tb'>Example</th></tr>"

            for (let index = 0; index < data[i].abilityLevels.length; ++index) {
                const element = data[i].abilityLevels[index];        
                var value = document.getElementById(data[i].abilityName + "_" + element.level).value;
                var scenario = document.getElementById(data[i].abilityName + "_" + element.level + "_ta").value.replace(/(\n)+/g, '<br />');
                html += "<tr><td class='tb'>" + element.levelName + "</td><td class='tb'>" + options[value] + "</td><td class='tb'>" + scenario + "</td></td>"
            }

            html += "</table><br><hr>"
        }
    }
    html += "<div id='AdvisorTable'></div></body><html>"

    const w = window.open('','newpage');
    w.document.write(html);
    w.document.close();
    await tableCompose(w.document, "AdvisorTable");
    w.print();
}

async function exportJson() {
	var abilitiesValues = [];

    // Get data and iterate over them
    var data = await getJSONAbilities();
    for (let i=0; i<data.length; i++) {
        if (data[i].hasSubAbilities) {
            // Ability with sub abilities 			
            for(let j=0; j<data[i].subAbilities.length; j++) {
                for (let index = 0; index < data[i].subAbilities[j].subAbilityLevels.length; ++index) {
					const element = data[i].subAbilities[j].subAbilityLevels[index];
					let level = {
						"abilityName": data[i].abilityName,
						"hasSubAbilities": true,
						"subAbilityName": data[i].subAbilities[j].subAbilityName,
						"level": data[i].subAbilities[j].subAbilityLevels[index].level,
						"achieved": document.getElementById(data[i].subAbilities[j].subAbilityName + "_" + element.level).value,
						"scenario": document.getElementById(data[i].subAbilities[j].subAbilityName + "_" + element.level + "_ta").value
					};
					abilitiesValues.push(level);
                }
            }
        } else {
            // Ability with no sub abilities 
            for (let index = 0; index < data[i].abilityLevels.length; ++index) {
				const element = data[i].abilityLevels[index];        
				let level = {
					"abilityName": data[i].abilityName,
					"hasSubAbilities": false,
					"subAbilityName": "",
					"level": data[i].abilityLevels[index].level,
					"achieved": document.getElementById(data[i].abilityName + "_" + element.level).value,
					"scenario": document.getElementById(data[i].abilityName + "_" + element.level + "_ta").value
				};
				abilitiesValues.push(level);
            }
        }
    }
	
	// Convert the array in JSON
	const a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([JSON.stringify(abilitiesValues, null, 2)], {
		type: "text/plain"
	}));
	a.setAttribute("download", "fRAme.json");
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

async function getJSONAbilities() {
    const response = await fetch("https://raw.githubusercontent.com/Martins83/AR/refs/heads/main/docs/abilities.json");
    const json = await response.json();
    return json.data;
}


async function table() {
    tableCompose(document, "AdvisorTable")
}

async function tableCompose(doc, divName) {
    // Start creating the table
    let table = doc.createElement('table');
    let tbody = doc.createElement('tbody');
	let thead = doc.createElement('thead');
	
    table.appendChild(thead);
	table.appendChild(tbody);
    doc.getElementById(divName).innerHTML = "";
    doc.getElementById(divName).appendChild(table);

	// Levels
	var  textTXT = "";
	textTXT = "<tr><td><b></b></td><td style='padding-left: 10px;'><b>Levels</b></td></tr><tr><td></td><td style='border-bottom: 1px solid black; border-collapse: collapse;'>";
	for (let i=0; i<=14; i++) {
		textTXT = textTXT + "<span class='levelName'>" + i + "</span>";
	}
	textTXT = textTXT + "</td></tr>";
	thead.innerHTML = textTXT;

    // Get data and iterate over them
    var data = await getJSONAbilities();
    for (let i=0; i<data.length; i++) {
        if (data[i].hasSubAbilities) {
            // Header for the ability when sub abilities are available
            let abilityRow = doc.createElement('tr');
            let heading_1 = doc.createElement('td');
            let heading_2 = doc.createElement('td');

            heading_1.innerHTML = "<b>" + data[i].abilityName + "</b>";
            heading_2.innerHTML = "";
            heading_1.style.paddingTop = "10px";
            heading_2.style.paddingTop = "10px";
            heading_1.style.borderBottom = "1px solid black";
            heading_2.style.borderBottom = "1px solid black";
            
            abilityRow.appendChild(heading_1);
            abilityRow.appendChild(heading_2);
            tbody.appendChild(abilityRow);

            // The ability is divided into sub abilities
            for (let j=0; j<data[i].subAbilities.length; j++) {
                populateLevelsSubAbilities(data[i].subAbilities[j], tbody, doc);
            }
        } else {
            // Header for the ability when no sub abilities are available
            let abilityRow = doc.createElement('tr');
            let heading_1 = doc.createElement('td');
            let heading_2 = doc.createElement('td');

            heading_1.innerHTML = "<b>" + data[i].abilityName + "</b>";
            heading_2.innerHTML = "";
            heading_1.style.paddingTop = "10px";
            heading_2.style.paddingTop = "10px";
            heading_1.style.borderBottom = "1px solid black";
            heading_2.style.borderBottom = "1px solid black";
            
            abilityRow.appendChild(heading_1);
            abilityRow.appendChild(heading_2);
            tbody.appendChild(abilityRow);

            // Populate levels
            populateLevels(data[i], tbody, doc);
        }
    }
}


function populateLevels(ability, tbody, doc) {
    let abilityRow = doc.createElement('tr');
    let text1 = doc.createElement('td');
    let text2 = doc.createElement('td');

    text1.innerHTML = "";
    text2.innerHTML = "";

    for (let index = 0; index < ability.abilityLevels.length; ++index) {
        const element = ability.abilityLevels[index];        
        var value = document.getElementById(ability.abilityName + "_" + element.level).value;
        text2.innerHTML = text2.innerHTML + "<span class='dot' style='background-color:" + colors[value] + "'></span>"
    }

    abilityRow.appendChild(text1);
    abilityRow.appendChild(text2);
    tbody.appendChild(abilityRow);
}


function populateLevelsSubAbilities(subAbility, tbody, doc) {
    let abilityRow = doc.createElement('tr');
    let text1 = doc.createElement('td');
    let text2 = doc.createElement('td');

    text1.innerHTML = subAbility.subAbilityName;
    text2.innerHTML = "";

    for (let index = 0; index < subAbility.subAbilityLevels.length; ++index) {
        const element = subAbility.subAbilityLevels[index];        
        var value = document.getElementById(subAbility.subAbilityName + "_" + element.level).value;
        text2.innerHTML = text2.innerHTML + "<span class='dot' style='background-color:" + colors[value] + "'></span>"
    }

    abilityRow.appendChild(text1);
    abilityRow.appendChild(text2);
    tbody.appendChild(abilityRow);
}
