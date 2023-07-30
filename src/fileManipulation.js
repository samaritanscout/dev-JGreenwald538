import data from "./dummyData.json" assert { type: "json" };
import dayjs from 'https://cdn.skypack.dev/dayjs';
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_advancedFormat);

document.getElementById("header").innerHTML = data[1].organization; 
let locType = "Location Availibility: " + data[1].locType[0].charAt(0).toUpperCase() + data[1].locType[0].slice(1);
for(let i = 1; i < data[1].locType.length; i++) {
    locType += ", " + data[1].locType[i].charAt(0).toUpperCase() + data[1].locType[i].slice(1);
}
document.getElementById("locType").innerHTML = locType;

let skills = "Skills: " + data[1].skills[0].charAt(0).toUpperCase() + data[1].skills[0].slice(1);
for(let i = 1; i < data[1].skills.length; i++) {
    skills += ", " + data[1].skills[i].charAt(0).toUpperCase() + data[1].skills[i].slice(1);
}
document.getElementById("skills").innerHTML = skills;

document.getElementById("eventName").innerHTML = "Event Name: " + data[1].eventName;

document.getElementById("age").innerHTML = "Age Requirement: " + data[1].age;

document.getElementById("date/time").innerHTML = "Date: " + dayjs(data[1].timeStart).format("dddd, MMMM Do YYYY h:mmA").toString() + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;- " + dayjs(data[1].timeFinish).format("dddd, MMMM Do YYYY h:mmA").toString();
//Make line into variables
let causes = "Causes: " + data[1].causes[0].charAt(0).toUpperCase() + data[1].causes[0].slice(1);
for(let i = 1; i < data[1].causes.length; i++) {
    causes += ", " + data[1].causes[i].charAt(0).toUpperCase() + data[1].causes[i].slice(1);
}
document.getElementById("causes").innerHTML = causes;

document.getElementById("link").href = data[1].link;