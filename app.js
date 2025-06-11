// Handle tab switching
function showTab(tabId) {
  document.querySelectorAll('.tabPanel').forEach(panel => panel.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

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
    out.innerHTML = '<img src="https://files.oaiusercontent.com/file-Kv57gDDSCx9P1uwpkqZWPQ" alt="Evacuation Plan" style="width:100%; border:1px solid #ccc;" />';
  }
});

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

// Sample fire stations
const fireStations = [
  { name: "Kengeri Fire Station", lat: 12.9133, lon: 77.4488 },
  { name: "Ram Nagar Fire Station", lat: 12.9225, lon: 77.5051 }
];

fireStations.forEach(fs => {
  L.marker([fs.lat, fs.lon]).addTo(map).bindPopup(`<b>${fs.name}</b>`);
});

// Sample campus markers
const campusLocations = [
  { name: "Admin Block", lat: 12.9079, lon: 77.4332 },
  { name: "Hostel", lat: 12.9074, lon: 77.4326 }
];

campusLocations.forEach(loc => {
  L.circleMarker([loc.lat, loc.lon], {
    radius: 6,
    fillColor: '#007bff',
    color: '#003366',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map).bindPopup(`<b>${loc.name}</b>`);
});
