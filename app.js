// Handle tab switching
/*function showTab(tabId) {
  document.querySelectorAll('.tabPanel').forEach(panel => panel.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

function toggleInfoBox(id) {
  const tab = document.getElementById(id);
  tab.style.display = (tab.style.display === 'none') ? 'block' : 'none';
}
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.accordion-content').forEach(content => {
      if (content !== this.nextElementSibling) {
        content.style.display = 'none';
      }
    });
    const content = this.nextElementSibling;
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  });
});

// Update Preparedness content
document.getElementById('disasterPrep').addEventListener('change', function () {
  const val = this.value;
  const out = document.getElementById('prepContent');
  out.innerHTML = '';
  if (val === 'Training') {
    out.innerHTML = '<p>Preparedness training includes fire safety, first-aid, and drills.</p>';
  } else if (val === 'Drills') {
    out.innerHTML = '<p>Mock drills conducted quarterly to simulate disaster response.</p>';
  } else if (val === 'DM Emergency Response Team') {
    out.innerHTML = '<p>Dedicated team for each block assigned emergency roles.</p>';
  } else if (val === 'Evacuation Plans') {
    out.innerHTML = '<p>Evacution Plan </p>';
  }
});

let damageLog = [];

function recordDamage() {
  const type = document.getElementById("damageType").value;
  const cost = document.getElementById("damageCost").value;
  const replaced = document.getElementById("damageReplaced").value;
  const time = new Date().toLocaleString();
  damageLog.push({ time, type, cost, replaced });
  alert("Recorded.");
}

function toggleDamageHistory() {
  const container = document.getElementById("damageHistory");
  if (container.style.display === "none") {
    container.style.display = "block";
    let table = "<table><tr><th>Time</th><th>Type</th><th>Cost</th><th>Replaced</th></tr>";
    damageLog.forEach(d => {
      table += `<tr><td>${d.time}</td><td>${d.type}</td><td>${d.cost}</td><td>${d.replaced}</td></tr>`;
    });
    table += "</table>";
    container.innerHTML = table;
  } else {
    container.style.display = "none";
  }
}

let structData = [];
let itData = [];

function saveStructDamage() {
  const entry = {
    Time: new Date().toLocaleString(),
    Location: document.getElementById('structLoc').value,
    Level: document.getElementById('structLevel').value,
    Remarks: document.getElementById('structRemarks').value
  };
  structData.push(entry);
  alert("Saved Structural Damage Record.");
}

function saveITLoss() {
  const entry = {
    Time: new Date().toLocaleString(),
    Area: document.getElementById('itArea').value,
    Equipment: document.getElementById('itType').value,
    Remarks: document.getElementById('itRemarks').value
  };
  itData.push(entry);
  alert("Saved IT Damage Record.");
}

function viewHistory(type) {
  let data = [], id = '';
  if (type === 'struct') {
    data = structData;
    id = 'structHistory';
  } else if (type === 'it') {
    data = itData;
    id = 'itHistory';
  }
  else if (type==='casual'){
    data = casualtyData;
    id='casualtyData'
  }
  else if(type==='re_cost'){
    data= recoveryData;
    id='recoveryData';
  }
  
  let table = '<table border="1"><tr>';
  Object.keys(data[0] || {}).forEach(k => table += `<th>${k}</th>`);
  table += '</tr>';
  data.forEach(row => {
    table += '<tr>';
    Object.values(row).forEach(cell => table += `<td>${cell}</td>`);
    table += '</tr>';
  });
  table += '</table>';
  document.getElementById(id).innerHTML = table;
}

function downloadCSV(type) {
  let data = [], filename = '';
  if (type === 'struct') {
    data = structData;
    filename = 'structural_damage.csv';
  } else if (type === 'it') {
    data = itData;
    filename = 'it_equipment_loss.csv';
  } else if(type=='casual'){
    data=casualtyData;
    filename='casualty_injury_reoprt.csv';
  }
  else if(type='re_cost'){
    data=recoveryData;
    filename='recovery_cost.csv';
  }
  if (!data.length) {
    alert("No records found.");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => `"${row[h]}"`).join(','));
  const csvContent = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

  function downloadAllCSVs() {
      downloadCSV('it');
      downloadCSV('struct');
      downloadCSV('re_cost');
      downloadCSV('casual');
    }
let casualtyData = [];

function saveCasualtyDamage() {
  const entry = {
    Time: new Date().toLocaleString(),
    Name: document.getElementById('casualtyName').value,
    Severity: document.getElementById('casualtySeverity').value,
    Description: document.getElementById('casualtyNote').value
  };
  casualtyData.push(entry);
  alert("Saved Casualty/Injury Record.");
}
let recoveryData = [];

function saveRecoveryLoss() {
  const entry = {
    Time: new Date().toLocaleString(),
    Cost: document.getElementById('recoveryCost').value,
    Area: document.getElementById('recoveryArea').value,
    Remarks: document.getElementById('recoveryRemarks').value
  };
  recoveryData.push(entry);
  alert("Saved Recovery Cost Record.");
}

// Update Mitigation content
document.getElementById('disasterMitig').addEventListener('change', function () {
  const val = this.value;
  const out = document.getElementById('mitigContent');
  out.innerHTML = '';
  if (val === 'Training') {
    out.innerHTML = '<p>Mitigation training focuses on risk audits and fire safety compliance.</p>';
  } else if (val === 'Drills') {
    out.innerHTML = '<p>Equipment and route testing for all emergency exits.</p>';
  } else if (val === 'DM Emergency Response Team') {
    out.innerHTML = '<p>Team performs periodic safety inspections and readiness checks.</p>';
  } else if (val === 'Evacuation Plans') {
    out.innerHTML = '<p>Maps are placed in key areas for fast reference during emergencies.</p>';
  }
});

// Initialize Leaflet map  lat: 12.87025, lon: 77.42980 
const map = L.map('mapid').setView([12.87025, 77.42980], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
map.on('rotate', () => {
  const angle = map.getBearing(); // If using rotation plugin
  document.getElementById('compassIcon').style.transform = `rotate(${-angle}deg)`;
});

// Sample fire stations
const fireStations = [
  { name: "Nagarbhavi Fire Station", lat: 12.93542, lon: 77.51003 },
  { name: "RamaNagar Fire Station", lat: 12.74299, lon: 77.3106 }
];

fireStations.forEach(fs => {
  L.marker([fs.lat, fs.lon]).addTo(map).bindPopup(`<b>${fs.name}</b>`);
});


//const hazards = [
//  { name: "Flood Zone - Basement", lat: 12.9072, lon: 77.4329, icon: "💧" },
  //{ name: "Fire Risk - Pantry", lat: 12.9076, lon: 77.4333, icon: "🔥" },
//  { name: "Short Circuit - Lab", lat: 12.9078, lon: 77.4335, icon: "⚡" }
//];

hazards.forEach(h => {
  L.marker([h.lat, h.lon])
    .addTo(map)
    .bindPopup(`<b>${h.icon} ${h.name}</b>`);
});

// Sample campus markers
const campusLocations = [
  { name: "Admin Block", lat: 12.87025, lon: 77.42980 },
  { name: "Hostel", lat: 12.867583, lon: 77.428444}
  
];
const fireIcon = L.icon({
  iconUrl: 'fireStation.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const hospitalIcon = L.icon({
  iconUrl: 'hospital.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const policeIcon = L.icon({
  iconUrl: 'police.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

campusLocations.forEach(loc => {
  L.circleMarker([loc.lat, loc.lon], {
    radius: 6,
    fillColor: '#007bff',
    color: '#003366',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`<b>${loc.name}</b>`);

  // Assuming you already have a Leaflet map initialized as `map`

L.marker([12.93542, 77.51003],{ icon: fireIcon }) // 🔥 Nagarbhavi Fire Station
  .addTo(map)
  .bindPopup("<b>Nagarbhavi Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 14.7km</b><b> Time ~ 32min</b>");
L.marker([12.74299, 77.3106],{ icon: fireIcon }) // 🔥 ramanagara Fire Station
  .addTo(map)
  .bindPopup("<b>Ramanagara Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 21.4km</b><b> Time ~ 34min</b>");

L.marker([12.896507938688266, 77.46182557283645],{ icon: hospitalIcon }) // 🏥 St. John's Hospital
  .addTo(map)
  .bindPopup("<b>RajaRajeshwari hospital, Kengeri </b><br>📞 <a href='tel:08028437888'>08028437888</a>");
L.marker([12.893717728784821, 77.4574634250733],{ icon: hospitalIcon }) // 🏥 
  .addTo(map)
  .bindPopup("<b>Sdm Institute Of Ayurveda and Hospital, Kengeri </b><br>📞 <a href='tel:09741897124'>09741897124</a>");
  
L.marker([12.903171772113318, 77.49750795390914],{ icon: hospitalIcon }) // 🏥 Narayana Multispeciality
  .addTo(map)
  .bindPopup("<b>Gleneagles bgs hospital, Kengeri y</b><br>📞 <a href='tel:8527306331'>8527306331</a>");

L.marker([12.93214692297212, 77.49295223601291],{ icon: hospitalIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Bangalore Hospital Kengeri</b><br>📞 <a href='tel:9090804680'>9090804680</a>");
L.marker([12.912371214356572, 77.48172766982762],{ icon: policeIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Kengeri Police Station</b><br>📞 <a href='tel:08022942510'>08022942510</a>");
L.marker([12.884487098478836, 77.44940630107578],{ icon: policeIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Kumbalagudu Police Station</b><br>📞 <a href='tel:08028437599'>08028437599</a>");

});
// Campus boundary (example coordinates)
const campusOutline = [
 [12.871694, 77.430694],
[12.871917, 77.430167],
[12.868528, 77.428500],
[12.866333, 77.427528],
[12.864222, 77.426750],
[12.864083, 77.427028],
[12.865056, 77.427750],
[12.866917, 77.428556],
[12.868194, 77.429306],
[12.869944, 77.430083],
[12.870944, 77.430500]
];

L.polygon(campusOutline, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}).addTo(map).bindPopup("IRIDM Campus Boundary");

*/
// local storage helper

function saveToStorage(key, entry) {
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push(entry);
  localStorage.setItem(key, JSON.stringify(existing));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function clearStorage(key) {
  localStorage.removeItem(key);
}

// Handle tab switching
function showTab(tabId) {
  // Hide all panels
  document.querySelectorAll('.tabPanel').forEach(panel => panel.style.display = 'none');
  // Remove active class from all tab buttons
  document.querySelectorAll('#tabs button').forEach(btn => btn.classList.remove('active-tab'));
  // Show selected panel
  document.getElementById(tabId).style.display = 'block';
  // Highlight active tab
  const activeButton = Array.from(document.querySelectorAll('#tabs button'))
    .find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeButton) activeButton.classList.add('active-tab');
}


function toggleInfoBox(id) {
  const tab = document.getElementById(id);
  tab.style.display = (tab.style.display === 'none') ? 'block' : 'none';
}
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.accordion-content').forEach(content => {
      if (content !== this.nextElementSibling) {
        content.style.display = 'none';
      }
    });
    const content = this.nextElementSibling;
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  });
});

// Update Preparedness content
document.getElementById('disasterPrep').addEventListener('change', function () {
  const val = this.value;
  const out = document.getElementById('prepContent');
  out.innerHTML = '';
  if (val === 'Training') {
    out.innerHTML = '<p>Preparedness training includes fire safety, first-aid, and drills.</p>';
  } else if (val === 'Drills') {
    out.innerHTML = '<p>Mock drills conducted quarterly to simulate disaster response.</p>';
  } else if (val === 'DM Emergency Response Team') {
    out.innerHTML = '<p>Dedicated team for each block assigned emergency roles.</p>';
  } else if (val === 'Evacuation Plans') {
    out.innerHTML = '<p>Evacution Plan </p>';
  }
});

let damageLog = [];

function recordDamage() {
  const type = document.getElementById("damageType").value;
  const cost = document.getElementById("damageCost").value;
  const replaced = document.getElementById("damageReplaced").value;
  const time = new Date().toLocaleString();
  damageLog.push({ time, type, cost, replaced });
  alert("Recorded.");
}

function toggleDamageHistory() {
  const container = document.getElementById("damageHistory");
  if (container.style.display === "none") {
    container.style.display = "block";
    let table = "<table><tr><th>Time</th><th>Type</th><th>Cost</th><th>Replaced</th></tr>";
    damageLog.forEach(d => {
      table += `<tr><td>${d.time}</td><td>${d.type}</td><td>${d.cost}</td><td>${d.replaced}</td></tr>`;
    });
    table += "</table>";
    container.innerHTML = table;
  } else {
    container.style.display = "none";
  }
}

// ========= GLOBAL STORAGE UTILITIES =========
function saveToStorage(key, entry) {
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push(entry);
  localStorage.setItem(key, JSON.stringify(existing));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function clearStorage(key) {
  localStorage.removeItem(key);
}

// ========= SAVE FUNCTIONS =========
function saveStructDamage() {
  const entry = {
    Time: new Date().toLocaleString(),
    Location: document.getElementById('structLoc').value,
    Level: document.getElementById('structLevel').value,
    Remarks: document.getElementById('structRemarks').value
  };
  saveToStorage("structData", entry);
  alert("✅ Structural Damage Record Saved.");
}

function saveITLoss() {
  const entry = {
    Time: new Date().toLocaleString(),
    Area: document.getElementById('itArea').value,
    Equipment: document.getElementById('itType').value,
    Remarks: document.getElementById('itRemarks').value
  };
  saveToStorage("itData", entry);
  alert("✅ IT Damage Record Saved.");
}

function saveCasualtyDamage() {
  const entry = {
    Time: new Date().toLocaleString(),
    Name: document.getElementById('casualtyName').value,
    Severity: document.getElementById('casualtySeverity').value,
    Description: document.getElementById('casualtyNote').value
  };
  saveToStorage("casualtyData", entry);
  alert("✅ Casualty/Injury Record Saved.");
}

function saveRecoveryLoss() {
  const entry = {
    Time: new Date().toLocaleString(),
    Cost: document.getElementById('recoveryCost').value,
    Area: document.getElementById('recoveryArea').value,
    Remarks: document.getElementById('recoveryRemarks').value
  };
  saveToStorage("recoveryData", entry);
  alert("✅ Recovery Cost Record Saved.");
}

// ========= VIEW HISTORY =========
function viewHistory(type) {
  const keyMap = {
    struct: "structData",
    it: "itData",
    casual: "casualtyData",
    re_cost: "recoveryData"
  };

  const idMap = {
    struct: "structHistory",
    it: "itHistory",
    casual: "casualtyHistory",     // ✅ Updated: previously wrong (was overwriting form)
    re_cost: "recoveryHistory"     // ✅ Updated: same issue
  };

  const data = getFromStorage(keyMap[type]);
  const id = idMap[type];
  const container = document.getElementById(id);

  if (!container) return;
  if (!data || !data.length) {
    container.innerHTML = "<p class='text-muted'>No data available.</p>";
    return;
  }

  let table = `<table class="table table-bordered table-sm mt-2">
  <thead class="table-light"><tr>`;
  Object.keys(data[0] || {}).forEach(k => table += `<th>${k}</th>`);
  table += `</tr></thead><tbody>`;
  data.forEach(row => {
    table += '<tr>';
    Object.values(row).forEach(cell => table += `<td>${cell}</td>`);
    table += '</tr>';
  });
  table += '</tbody></table>';
  container.innerHTML = table;
}

// ========= DOWNLOAD CSV =========
function downloadCSV(type) {
  const keyMap = {
    struct: ["structData", "structural_damage.csv"],
    it: ["itData", "it_equipment_loss.csv"],
    casual: ["casualtyData", "casualty_injury_report.csv"],
    re_cost: ["recoveryData", "recovery_cost.csv"]
  };

  const [storageKey, filename] = keyMap[type];
  const data = getFromStorage(storageKey);

  if (!data.length) {
    alert("⚠️ No data to export.");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => `"${row[h]}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ========= AUTO-LOAD HISTORY ON PAGE LOAD =========
window.onload = function () {
  viewHistory('struct');
  viewHistory('it');
  viewHistory('casual');
  viewHistory('re_cost');
};


function clearAllDamageData() {
  ["structData", "itData", "casualtyData", "recoveryData"].forEach(clearStorage);
  alert("All local data cleared.");
  location.reload();
}


  function downloadAllCSVs() {
      downloadCSV('it');
      downloadCSV('struct');
      downloadCSV('re_cost');
      downloadCSV('casual');
    }
let casualtyData = [];

function saveCasualtyDamage() {
  const entry = {
    Time: new Date().toLocaleString(),
    Name: document.getElementById('casualtyName').value,
    Severity: document.getElementById('casualtySeverity').value,
    Description: document.getElementById('casualtyNote').value
  };
  casualtyData.push(entry);
  alert("Saved Casualty/Injury Record.");
}
let recoveryData = [];

function saveRecoveryLoss() {
  const entry = {
    Time: new Date().toLocaleString(),
    Cost: document.getElementById('recoveryCost').value,
    Area: document.getElementById('recoveryArea').value,
    Remarks: document.getElementById('recoveryRemarks').value
  };
  recoveryData.push(entry);
  alert("Saved Recovery Cost Record.");
}

//======================== chat bot finction =============================
/*function toggleChatPopup() {
  const popup = document.getElementById("chatPopup");
  popup.style.display = (popup.style.display === "flex") ? "none" : "flex";
}

function askChatbot() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  const messages = document.getElementById("chatMessages");
  messages.innerHTML += <div class='user'>${message}</div>;
  input.value = "";

  // Send to backend
  fetch("http://localhost:5000/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: message })
  })
    .then(res => res.json())
    .then(data => {
      messages.innerHTML += <div class='bot'>${data.response}</div>;
      messages.scrollTop = messages.scrollHeight;
    })
    .catch(err => {
      messages.innerHTML += <div class='bot'>Error contacting bot.</div>;
      messages.scrollTop = messages.scrollHeight;
    });
}
*/
// Update Mitigation content
document.getElementById('disasterMitig').addEventListener('change', function () {
  const val = this.value;
  const out = document.getElementById('mitigContent');
  out.innerHTML = '';
  if (val === 'Training') {
    out.innerHTML = '<p>Mitigation training focuses on risk audits and fire safety compliance.</p>';
  } else if (val === 'Drills') {
    out.innerHTML = '<p>Equipment and route testing for all emergency exits.</p>';
  } else if (val === 'DM Emergency Response Team') {
    out.innerHTML = '<p>Team performs periodic safety inspections and readiness checks.</p>';
  } else if (val === 'Evacuation Plans') {
    out.innerHTML = '<p>Maps are placed in key areas for fast reference during emergencies.</p>';
  }
});

// Initialize Leaflet map 12.871694, 77.430694
const map = L.map('mapid').setView([12.871694, 77.430694], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
map.on('rotate', () => {
  const angle = map.getBearing(); // If using rotation plugin
  document.getElementById('compassIcon').style.transform = `rotate(${-angle}deg)`;
});

// Sample fire stations
const fireStations = [
  { name: "Nagarbhavi Fire Station", lat: 12.93542, lon: 77.51003 },
  { name: "RamaNagar Fire Station", lat: 12.74299, lon: 77.3106 }
];

fireStations.forEach(fs => {
  L.marker([fs.lat, fs.lon]).addTo(map).bindPopup(`<b>${fs.name}</b>`);
});


const hazards = [
  { name: "Flood Zone - Basement", lat: 12.9072, lon: 77.4329, icon: "💧" },
  { name: "Fire Risk - Pantry", lat: 12.9076, lon: 77.4333, icon: "🔥" },
  { name: "Short Circuit - Lab", lat: 12.9078, lon: 77.4335, icon: "⚡" }
];

/*hazards.forEach(h => {
  L.marker([h.lat, h.lon])
    .addTo(map)
    .bindPopup(`<b>${h.icon} ${h.name}</b>`);
});*/

//  campus markers 12.87025, lon: 77.42980  12.867583, lon: 77.428444
const campusLocations = [
  { name: "Admin Block", lat: 12.87025, lon: 77.42980 },
  { name: "Hostel", lat: 12.867583, lon: 77.428444}
];
const fireIcon = L.icon({
  iconUrl: 'fireStation.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const hospitalIcon = L.icon({
  iconUrl: 'hospital.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const policeIcon = L.icon({
  iconUrl: 'police.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

campusLocations.forEach(loc => {
  L.marker([loc.lat, loc.lon], {
    radius: 6,
    fillColor: '#007bff',
    color: '#003366',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`<b>${loc.name}</b>`);

  // Assuming you already have a Leaflet map initialized as `map`

L.marker([12.93542, 77.51003],{ icon: fireIcon }) // 🔥 Nagarbhavi Fire Station
  .addTo(map)
  .bindPopup("<b>Nagarbhavi Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 14.7km</b><b> Time ~ 32min</b>");
L.marker([12.74299, 77.3106],{ icon: fireIcon }) // 🔥 ramanagara Fire Station
  .addTo(map)
  .bindPopup("<b>Ramanagara Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 21.4km</b><b> Time ~ 34min</b>");

L.marker([12.896507938688266, 77.46182557283645],{ icon: hospitalIcon }) // 🏥 St. John's Hospital
  .addTo(map)
  .bindPopup("<b>RajaRajeshwari hospital, Kengeri </b><br>📞 <a href='tel:08028437888'>08028437888</a>");
L.marker([12.893717728784821, 77.4574634250733],{ icon: hospitalIcon }) // 🏥 
  .addTo(map)
  .bindPopup("<b>Sdm Institute Of Ayurveda and Hospital, Kengeri </b><br>📞 <a href='tel:09741897124'>09741897124</a>");
  
L.marker([12.903171772113318, 77.49750795390914],{ icon: hospitalIcon }) // 🏥 Narayana Multispeciality
  .addTo(map)
  .bindPopup("<b>Gleneagles bgs hospital, Kengeri y</b><br>📞 <a href='tel:8527306331'>8527306331</a>");

L.marker([12.93214692297212, 77.49295223601291],{ icon: hospitalIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Bangalore Hospital Kengeri</b><br>📞 <a href='tel:9090804680'>9090804680</a>");
L.marker([12.912371214356572, 77.48172766982762],{ icon: policeIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Kengeri Police Station</b><br>📞 <a href='tel:08022942510'>08022942510</a>");
L.marker([12.884487098478836, 77.44940630107578],{ icon: policeIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>Kumbalagudu Police Station</b><br>📞 <a href='tel:08028437599'>08028437599</a>");

});

// Campus boundary (
const campusOutline = [
[12.875194, 77.431583], 
[12.871972, 77.430167],
[12.870611, 77.429500],  
[12.869694, 77.429028], 
[12.867806, 77.428167],  
[12.866083, 77.427444], 
[12.864194, 77.426722], 
[12.861250, 77.425750], 
[12.861167, 77.425933], 
[12.862999, 77.426667], 
[12.863556, 77.426833], 
[12.865194, 77.428111], 
[12.866917, 77.428806], 
[12.868139, 77.429444], 
[12.869333, 77.429972], 
[12.869833, 77.430139], 
[12.871278, 77.430833], 
[12.873000, 77.431500], 
[12.873806, 77.431694], 
[12.874806, 77.431806], 
[12.875167, 77.431722]
];

L.polygon(campusOutline, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}).addTo(map).bindPopup("IRIDM Campus Boundary");