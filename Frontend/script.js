const API = "http://localhost:5000/api/leads";


function loadLeads() {

fetch(API)
.then(res => res.json())
.then(data => {

let html = "";

data.forEach(lead => {

html += `
<tr>

<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.source}</td>

<td>
<select onchange="updateLead(${lead.id}, this.value)">
<option value="new" ${lead.status=="new"?"selected":""}>new</option>
<option value="contacted" ${lead.status=="contacted"?"selected":""}>contacted</option>
<option value="converted" ${lead.status=="converted"?"selected":""}>converted</option>
</select>
</td>

<td>${lead.notes}</td>

<td>
<button onclick="updateLead(${lead.id}, prompt('Enter new status:', '${lead.status}'))">
Update
</button>
</td>

<td>
<button onclick="deleteLead(${lead.id})">
Delete
</button>
</td>

</tr>
`;

});

document.getElementById("leadTable").innerHTML = html;

});

}



function addLead() {

const lead = {

name: name.value,
email: email.value,
source: source.value,
status: status.value,
notes: notes.value

};

fetch(API, {

method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(lead)

}).then(loadLeads);

}



function deleteLead(id) {

fetch(API + "/" + id, {
method: "DELETE"
}).then(loadLeads);

}



function updateLead(id, status) {

if(!status) return;

fetch(API + "/" + id, {

method: "PUT",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
status: status,
notes: ""
})

}).then(loadLeads);

}



function searchLead() {

const value = search.value.toLowerCase();

const rows = document.querySelectorAll("#leadTable tr");

rows.forEach(row => {

row.style.display =
row.innerText.toLowerCase().includes(value) ? "" : "none";

});

}


loadLeads();