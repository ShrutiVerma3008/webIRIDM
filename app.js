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

const hostelIcon = L.icon({
  iconUrl: 'hostel.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const adminIcon = L.icon({
  iconUrl: 'adminBlockIcon.png',
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

/**const campusLocations = [
  { name: "Admin Block", lat: 12.87025, lon: 77.42980 },
  { name: "Hostel", lat: 12.867583, lon: 77.428444}
]; */

L.marker([12.87025, 77.42980],{ icon: adminIcon }) // admin block
  .addTo(map)
  .bindPopup("<b>Admin Building</b><");
L.marker([12.867583, 77.428444],{ icon: hostelIcon }) // admin block
  .addTo(map)
  .bindPopup("<b>Hostel Building</b><");
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


// images tuening
function showHazardGallery(title, desc, imgArray) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;

  const container = document.getElementById('modalImages');
  container.innerHTML = '';

  imgArray.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title + ' image';
    container.appendChild(img);
  });

  document.getElementById('hazardModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('hazardModal').style.display = 'none';
}

// Modal logic
function openImageModal(img) {
  document.getElementById('modalSliderImg').src = img.src;
  document.getElementById('imageModal').style.display = 'flex';
}
function closeImageModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// User control scrolling
function scrollSlider(direction) {
  const slider = document.getElementById('floatingSlider');
  slider.scrollBy({
    left: direction * 300,
    behavior: 'smooth'
  });
}

function openInfraGallery(title, desc, imageList) {
  document.getElementById('infraTitle').textContent = title;
  document.getElementById('infraDesc').textContent = desc;

  const gallery = document.getElementById('infraImages');
  gallery.innerHTML = '';

  imageList.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    gallery.appendChild(img);
  });

  document.getElementById('infraModal').style.display = 'flex';
}

function closeInfraModal() {
  document.getElementById('infraModal').style.display = 'none';
}



// ========== DUMMY DATA FOR STRUCTURAL DAMAGE ==========
const structDummyData = [
  { Location: "Admin Block", Damage: "Moderate Cracks", Remarks: "Visible cracks in central columns due to tremors" },
  { Location: "Boys Hostel", Damage: "Ceiling Collapse", Remarks: "Roof collapsed in one room, no casualties" },
  { Location: "Canteen Area", Damage: "Broken Windows", Remarks: "Glass shattered due to shockwave" },
  { Location: "Lecture Hall 2", Damage: "Wall Damage", Remarks: "Plaster fallen, brickwork exposed" },
  { Location: "Main Gate", Damage: "Gate Misalignment", Remarks: "Gate frame tilted, stuck partially" },
  { Location: "Parking Shed", Damage: "Roof Dislodged", Remarks: "Shed roof lifted partially during storm" },
  { Location: "Library Wing", Damage: "Water Leakage", Remarks: "Leak in roof due to cracks" },
  { Location: "Girls Hostel", Damage: "Door Jammed", Remarks: "Entry gate distorted, needs replacement" },
  { Location: "Guest House", Damage: "Minor Cracks", Remarks: "Hairline cracks in bedroom wall" },
  { Location: "Fire Drill Storage", Damage: "Structure Bent", Remarks: "Frame support twisted, unsafe" }
];
localStorage.setItem('struct', JSON.stringify(structDummyData));

// ========== DUMMY DATA FOR IT LOSS ==========
const itDummyData = [
  { Area: "Control Room", Equipment: "Server Rack", Remarks: "Hard drive failure due to power surge" },
  { Area: "Computer Lab", Equipment: "Desktop PCs", Remarks: "4 systems water damaged due to roof leak" },
  { Area: "Admin Office", Equipment: "Printers", Remarks: "Laser printer malfunctioned" },
  { Area: "Surveillance Unit", Equipment: "CCTV Cameras", Remarks: "3 cameras not working post-incident" },
  { Area: "Library Network", Equipment: "Switches", Remarks: "Ethernet switch burnt due to lightning" },
  { Area: "Accounts Section", Equipment: "UPS Unit", Remarks: "Battery backup failed" },
  { Area: "WiFi Node - Block A", Equipment: "Router", Remarks: "Device not responding" },
  { Area: "Training Hall", Equipment: "Projector", Remarks: "Projection lens damaged" },
  { Area: "Server Room", Equipment: "Cooling Unit", Remarks: "Overheated and auto shut down" },
  { Area: "Reception Desk", Equipment: "POS System", Remarks: "Monitor broken, keyboard unresponsive" }
];
localStorage.setItem('it', JSON.stringify(itDummyData));

// ========== DUMMY DATA FOR CASUALTY ==========
const casualtyDummyData = [
  { Name: "Ankit Reddy", Severity: "Moderate", Details: "Minor head injury during stair fall" },
  { Name: "Ram Verma", Severity: "Mild", Details: "Sprained ankle during evacuation" },
  { Name: "Rahul Sinha", Severity: "Severe", Details: "Hit by falling debris in hostel" },
  { Name: "Divya Nair", Severity: "Moderate", Details: "Cut on forearm from broken glass" },
  { Name: "Sameer Mehta", Severity: "Mild", Details: "Smoke inhalation during fire drill" },
  { Name: "Priya Sharma", Severity: "Mild", Details: "Collapsed due to panic attack" },
  { Name: "Aman Gupta", Severity: "Severe", Details: "Fractured leg, admitted to nearby hospital" },
  { Name: "Neha Rao", Severity: "Moderate", Details: "Sustained bruises during crowd movement" },
  { Name: "Sanytan Mandal", Severity: "Mild", Details: "Scratches on arms from broken window" },
  { Name: "Shivam Kumar", Severity: "Moderate", Details: "Concussion suspected, under observation" }
];
localStorage.setItem('casual', JSON.stringify(casualtyDummyData));

// ========== DUMMY DATA FOR RECOVERY COST ==========
const recoveryDummyData = [
  { Cost: 120000, Area: "Admin Block", Remarks: "Repair of ceiling and internal wiring" },
  { Cost: 95000, Area: "Canteen", Remarks: "Glasswork and interior furniture replacement" },
  { Cost: 175000, Area: "Computer Lab", Remarks: "System replacements and re-cabling" },
  { Cost: 42000, Area: "Boys Hostel", Remarks: "Temporary roof patch and window repair" },
  { Cost: 135000, Area: "Library", Remarks: "Water damage control and IT recovery" },
  { Cost: 88000, Area: "Guest House", Remarks: "Wall treatment and furniture repair" },
  { Cost: 210000, Area: "Surveillance System", Remarks: "Replacement of damaged cameras" },
  { Cost: 56000, Area: "Lecture Hall 3", Remarks: "Wall panel fix and electrical rewiring" },
  { Cost: 98000, Area: "Server Room", Remarks: "Cooling system and UPS maintenance" },
  { Cost: 30000, Area: "Reception Area", Remarks: "Minor civil repairs and décor" }
];
localStorage.setItem('re_cost', JSON.stringify(recoveryDummyData));



/**
 * structral dummy 
 * [
  {"Location": "Admin Block", "Damage Level": "Moderate Cracks", "Remarks": "Visible cracks in central columns due to tremors"},
  {"Location": "Boys Hostel", "Damage Level": "Ceiling Collapse", "Remarks": "Roof collapsed in one room, no casualties"},
  {"Location": "Canteen Area", "Damage Level": "Broken Windows", "Remarks": "Glass shattered due to shockwave"},
  {"Location": "Lecture Hall 2", "Damage Level": "Wall Damage", "Remarks": "Plaster fallen, brickwork exposed"},
  {"Location": "Main Gate", "Damage Level": "Gate Misalignment", "Remarks": "Gate frame tilted, stuck partially"},
  {"Location": "Parking Shed", "Damage Level": "Roof Dislodged", "Remarks": "Shed roof lifted partially during storm"},
  {"Location": "Library Wing", "Damage Level": "Water Leakage", "Remarks": "Leak in roof due to cracks"},
  {"Location": "Girls Hostel", "Damage Level": "Door Jammed", "Remarks": "Entry gate distorted, needs replacement"},
  {"Location": "Guest House", "Damage Level": "Minor Cracks", "Remarks": "Hairline cracks in bedroom wall"},
  {"Location": "Fire Drill Storage", "Damage Level": "Structure Bent", "Remarks": "Frame support twisted, unsafe"}
]

IT
[
  {"System/Area": "Control Room", "Type of Equipment": "Server Rack", "Remarks": "Hard drive failure due to power surge"},
  {"System/Area": "Computer Lab", "Type of Equipment": "Desktop PCs", "Remarks": "4 systems water damaged due to roof leak"},
  {"System/Area": "Admin Office", "Type of Equipment": "Printers", "Remarks": "Laser printer malfunctioned"},
  {"System/Area": "Surveillance Unit", "Type of Equipment": "CCTV Cameras", "Remarks": "3 cameras not working post-incident"},
  {"System/Area": "Library Network", "Type of Equipment": "Switches", "Remarks": "Ethernet switch burnt due to lightning"},
  {"System/Area": "Accounts Section", "Type of Equipment": "UPS Unit", "Remarks": "Battery backup failed"},
  {"System/Area": "WiFi Node - Block A", "Type of Equipment": "Router", "Remarks": "Device not responding"},
  {"System/Area": "Training Hall", "Type of Equipment": "Projector", "Remarks": "Projection lens damaged"},
  {"System/Area": "Server Room", "Type of Equipment": "Cooling Unit", "Remarks": "Overheated and auto shut down"},
  {"System/Area": "Reception Desk", "Type of Equipment": "POS System", "Remarks": "Monitor broken, keyboard unresponsive"}
]

[
  {"Person Name": "Ankit Reddy", "Injury Severity": "Moderate", "Details": "Minor head injury during stair fall"},
  {"Person Name": "Shruti Verma", "Injury Severity": "Mild", "Details": "Sprained ankle during evacuation"},
  {"Person Name": "Rahul Sinha", "Injury Severity": "Severe", "Details": "Hit by falling debris in hostel"},
  {"Person Name": "Divya Nair", "Injury Severity": "Moderate", "Details": "Cut on forearm from broken glass"},
  {"Person Name": "Sameer Mehta", "Injury Severity": "Mild", "Details": "Smoke inhalation during fire drill"},
  {"Person Name": "Priya Sharma", "Injury Severity": "Mild", "Details": "Collapsed due to panic attack"},
  {"Person Name": "Aman Gupta", "Injury Severity": "Severe", "Details": "Fractured leg, admitted to nearby hospital"},
  {"Person Name": "Neha Rao", "Injury Severity": "Moderate", "Details": "Sustained bruises during crowd movement"},
  {"Person Name": "Sanytan Mandal", "Injury Severity": "Mild", "Details": "Scratches on arms from broken window"},
  {"Person Name": "Shivam Kumar", "Injury Severity": "Moderate", "Details": "Concussion suspected, under observation"}
]

[
  {"Estimated Cost (INR)": 120000, "Affected Area": "Admin Block", "Remarks": "Repair of ceiling and internal wiring"},
  {"Estimated Cost (INR)": 95000, "Affected Area": "Canteen", "Remarks": "Glasswork and interior furniture replacement"},
  {"Estimated Cost (INR)": 175000, "Affected Area": "Computer Lab", "Remarks": "System replacements and re-cabling"},
  {"Estimated Cost (INR)": 42000, "Affected Area": "Boys Hostel", "Remarks": "Temporary roof patch and window repair"},
  {"Estimated Cost (INR)": 135000, "Affected Area": "Library", "Remarks": "Water damage control and IT recovery"},
  {"Estimated Cost (INR)": 88000, "Affected Area": "Guest House", "Remarks": "Wall treatment and furniture repair"},
  {"Estimated Cost (INR)": 210000, "Affected Area": "Surveillance System", "Remarks": "Replacement of damaged cameras"},
  {"Estimated Cost (INR)": 56000, "Affected Area": "Lecture Hall 3", "Remarks": "Wall panel fix and electrical rewiring"},
  {"Estimated Cost (INR)": 98000, "Affected Area": "Server Room", "Remarks": "Cooling system and UPS maintenance"},
  {"Estimated Cost (INR)": 30000, "Affected Area": "Reception Area", "Remarks": "Minor civil repairs and décor"}
]

 */