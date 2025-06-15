// Handle tab switching
function showTab(tabId) {
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

// Initialize Leaflet map
const map = L.map('mapid').setView([12.9076, 77.4329], 16);

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

hazards.forEach(h => {
  L.marker([h.lat, h.lon])
    .addTo(map)
    .bindPopup(`<b>${h.icon} ${h.name}</b>`);
});

// Sample campus markers
const campusLocations = [
  { name: "Admin Block", lat: 12.9079, lon: 77.4332 },
  { name: "Hostel", lat: 12.9074, lon: 77.4326 }
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
  iconUrl: 'icons/police.png',
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
L.marker([12.9133, 77.4488],{ icon: fireIcon }) // 🔥 Nagarbhavi Fire Station
  .addTo(map)
  .bindPopup("<b>Nagarbhavi Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 14.7km</b><b> Time ~ 32min</b>");
L.marker([12.9133, 77.4488],{ icon: fireIcon }) // 🔥 ramanagara Fire Station
  .addTo(map)
  .bindPopup("<b>Ramanagara Fire Station</b><br>📞 <a href='tel:101'>101</a><b>Distance : 21.4km</b><b> Time ~ 34min</b>");

L.marker([12.9353, 77.6067],{ icon: hospitalIcon }) // 🏥 St. John's Hospital
  .addTo(map)
  .bindPopup("<b>St. John's Hospital</b><br>📞 <a href='tel:18004250000'>1800-425-0000</a>");

L.marker([12.9357, 77.5445],{ icon: hospitalIcon }) // 🏥 Narayana Multispeciality
  .addTo(map)
  .bindPopup("<b>Narayana Multispeciality</b><br>📞 <a href='tel:18003090000'>1800-309-0000</a>");

L.marker([12.9066, 77.5193],{ icon: hospitalIcon }) // 🏥 RajaRajeswari Medical Hospital
  .addTo(map)
  .bindPopup("<b>RajaRajeswari Medical Hospital</b><br>📞 <a href='tel:08028437878'>080-2843-7878</a>");


});
// Campus boundary (example coordinates)
const campusOutline = [
  [12.9079, 77.4332],
  [12.9075, 77.4338],
  [12.9070, 77.4333],
  [12.9074, 77.4326]
];

L.polygon(campusOutline, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.1
}).addTo(map).bindPopup("IRIDM Campus Boundary");

