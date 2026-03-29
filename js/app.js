// Sancy Wandelkaart - App

(function () {
  'use strict';

  // Map initialization
  const map = L.map('map', {
    center: [45.52, 2.85],
    zoom: 12,
    zoomControl: true,
    preferCanvas: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  L.control.scale({ imperial: false }).addTo(map);

  // Layer groups
  const trailMarkers = L.layerGroup().addTo(map);
  const townMarkers = L.layerGroup().addTo(map);
  const poiMarkers = L.layerGroup().addTo(map);
  const gpxRoutes = L.layerGroup().addTo(map);

  // Layer control
  L.control.layers(null, {
    'Wandelingen': trailMarkers,
    'Dorpen': townMarkers,
    'Bezienswaardigheden': poiMarkers,
    'GPX Routes': gpxRoutes
  }, { collapsed: true }).addTo(map);

  // Difficulty colors
  const DIFF_COLORS = {
    makkelijk: '#40916c',
    gemiddeld: '#e76f51',
    moeilijk: '#bc4749'
  };

  // Create trail markers
  let activeTrailId = null;

  TRAILS.forEach(function (trail) {
    const color = DIFF_COLORS[trail.moeilijkheid] || '#40916c';
    const marker = L.circleMarker(trail.startPunt, {
      radius: 9,
      fillColor: color,
      color: '#fff',
      weight: 2,
      fillOpacity: 0.9
    }).addTo(trailMarkers);

    const popupHtml = buildTrailPopup(trail);
    marker.bindPopup(popupHtml, { maxWidth: 280 });

    marker.on('click', function () {
      setActiveTrail(trail.id);
    });

    marker.trailId = trail.id;
  });

  // Create town markers
  TOWNS.forEach(function (town) {
    const marker = L.circleMarker(town.coords, {
      radius: 6,
      fillColor: '#1b4332',
      color: '#fff',
      weight: 1.5,
      fillOpacity: 0.8
    }).addTo(townMarkers);

    marker.bindTooltip(town.name, {
      permanent: true,
      direction: 'top',
      offset: [0, -8],
      className: 'town-tooltip'
    });

    if (town.voorzieningen.length > 0) {
      const facilities = town.voorzieningen
        .map(function (v) {
          const info = VOORZIENINGEN_ICONS[v];
          return info ? info.icon + ' ' + info.label : v;
        })
        .join('<br>');
      marker.bindPopup(
        '<div class="popup-title">' + town.name + '</div>' +
        '<div class="popup-voorzieningen">' + facilities + '</div>',
        { maxWidth: 200 }
      );
    }
  });

  // Create POI markers
  POINTS_OF_INTEREST.forEach(function (poi) {
    const marker = L.circleMarker(poi.coords, {
      radius: 7,
      fillColor: '#d4a373',
      color: '#fff',
      weight: 2,
      fillOpacity: 0.9
    }).addTo(poiMarkers);

    let popupContent = '<div class="popup-title">' + poi.name + '</div>';
    if (poi.hoogte) {
      popupContent += '<div class="popup-meta">' + poi.hoogte + '</div>';
    }
    popupContent += '<div class="popup-description">' + poi.beschrijving + '</div>';

    marker.bindPopup(popupContent, { maxWidth: 250 });
  });

  // Build trail popup HTML
  function buildTrailPopup(trail) {
    let html = '<div class="popup-title"><span class="trail-number">' + trail.id + '</span> ' + trail.name + '</div>';
    html += '<div class="popup-gemeente">Start: ' + trail.gemeente + '</div>';
    html += '<div class="popup-meta">';
    html += '<span>' + trail.afstand + '</span>';
    html += '<span>' + trail.duur + '</span>';
    html += '<span>' + trail.hoogteverschil + '</span>';
    html += '</div>';
    html += '<div style="margin-bottom:6px"><span class="badge badge-' + trail.moeilijkheid + '">' + trail.moeilijkheid + '</span></div>';
    html += '<div class="popup-description">' + trail.beschrijving + '</div>';
    if (trail.hoogtepunten && trail.hoogtepunten.length > 0) {
      html += '<div class="popup-highlights"><strong>Hoogtepunten:</strong> ' + trail.hoogtepunten.join(', ') + '</div>';
    }
    return html;
  }

  // Sidebar trail list
  const trailList = document.getElementById('trail-list');
  const searchInput = document.getElementById('search');
  const filterDifficulty = document.getElementById('filter-difficulty');

  function renderTrailList() {
    const query = searchInput.value.toLowerCase();
    const difficulty = filterDifficulty.value;

    const filtered = TRAILS.filter(function (trail) {
      const matchesSearch = !query ||
        trail.name.toLowerCase().indexOf(query) !== -1 ||
        trail.gemeente.toLowerCase().indexOf(query) !== -1;
      const matchesDifficulty = difficulty === 'alle' || trail.moeilijkheid === difficulty;
      return matchesSearch && matchesDifficulty;
    });

    trailList.innerHTML = '';

    if (filtered.length === 0) {
      trailList.innerHTML = '<li class="no-results">Geen wandelingen gevonden</li>';
      return;
    }

    filtered.forEach(function (trail) {
      const li = document.createElement('li');
      li.className = 'trail-item' + (trail.id === activeTrailId ? ' active' : '');
      li.innerHTML =
        '<div class="trail-item-name"><span class="trail-number">' + trail.id + '</span> ' + trail.name + '</div>' +
        '<div class="trail-item-meta">' +
        '<span>' + trail.afstand + '</span>' +
        '<span>' + trail.duur + '</span>' +
        '<span class="badge badge-' + trail.moeilijkheid + '">' + trail.moeilijkheid + '</span>' +
        '</div>';
      li.addEventListener('click', function () {
        setActiveTrail(trail.id);
        map.setView(trail.startPunt, 14);
        // Open popup
        trailMarkers.eachLayer(function (layer) {
          if (layer.trailId === trail.id) {
            layer.openPopup();
          }
        });
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
      trailList.appendChild(li);
    });

    // Update marker visibility
    trailMarkers.eachLayer(function (layer) {
      var isVisible = filtered.some(function (t) { return t.id === layer.trailId; });
      if (isVisible) {
        layer.setStyle({ opacity: 1, fillOpacity: 0.9 });
      } else {
        layer.setStyle({ opacity: 0.2, fillOpacity: 0.1 });
      }
    });
  }

  function setActiveTrail(id) {
    activeTrailId = id;
    renderTrailList();
  }

  searchInput.addEventListener('input', renderTrailList);
  filterDifficulty.addEventListener('change', renderTrailList);

  // Initial render
  renderTrailList();

  // Sidebar toggle (mobile)
  var sidebar = document.getElementById('sidebar');
  document.getElementById('sidebar-toggle').addEventListener('click', function () {
    sidebar.classList.add('open');
  });
  document.getElementById('sidebar-close').addEventListener('click', function () {
    sidebar.classList.remove('open');
  });

  // Geolocation
  document.getElementById('locate-btn').addEventListener('click', function () {
    map.locate({ setView: true, maxZoom: 15 });
  });

  var locationMarker = null;
  map.on('locationfound', function (e) {
    if (locationMarker) {
      locationMarker.setLatLng(e.latlng);
    } else {
      locationMarker = L.circleMarker(e.latlng, {
        radius: 8,
        fillColor: '#3b82f6',
        color: '#fff',
        weight: 3,
        fillOpacity: 1
      }).addTo(map);
      locationMarker.bindPopup('Jouw locatie');
    }
    locationMarker.openPopup();
  });

  map.on('locationerror', function () {
    alert('Locatie kon niet worden bepaald. Controleer of locatietoegang is ingeschakeld.');
  });

  // GPX loading
  // Loads all GPX files from the gpx/ directory
  // GPX files should be placed in the gpx/ folder and listed in gpxFiles array below
  var gpxFiles = ['gpx/route-18-egliseneuve.gpx'];

  gpxFiles.forEach(function (file) {
    loadGPX(file);
  });

  function loadGPX(url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (gpxText) {
        var parser = new DOMParser();
        var gpxDoc = parser.parseFromString(gpxText, 'text/xml');
        var tracks = gpxDoc.querySelectorAll('trk');

        tracks.forEach(function (track) {
          var segments = track.querySelectorAll('trkseg');
          segments.forEach(function (segment) {
            var points = segment.querySelectorAll('trkpt');
            var latlngs = [];
            points.forEach(function (pt) {
              var lat = parseFloat(pt.getAttribute('lat'));
              var lon = parseFloat(pt.getAttribute('lon'));
              if (!isNaN(lat) && !isNaN(lon)) {
                latlngs.push([lat, lon]);
              }
            });
            if (latlngs.length > 0) {
              var name = track.querySelector('name');
              var polyline = L.polyline(latlngs, {
                color: '#2d6a4f',
                weight: 4,
                opacity: 0.8
              }).addTo(gpxRoutes);
              if (name) {
                polyline.bindPopup('<strong>' + name.textContent + '</strong>');
              }
            }
          });
        });

        // Also parse routes (rte elements)
        var routes = gpxDoc.querySelectorAll('rte');
        routes.forEach(function (route) {
          var points = route.querySelectorAll('rtept');
          var latlngs = [];
          points.forEach(function (pt) {
            var lat = parseFloat(pt.getAttribute('lat'));
            var lon = parseFloat(pt.getAttribute('lon'));
            if (!isNaN(lat) && !isNaN(lon)) {
              latlngs.push([lat, lon]);
            }
          });
          if (latlngs.length > 0) {
            var name = route.querySelector('name');
            var polyline = L.polyline(latlngs, {
              color: '#2d6a4f',
              weight: 4,
              opacity: 0.8
            }).addTo(gpxRoutes);
            if (name) {
              polyline.bindPopup('<strong>' + name.textContent + '</strong>');
            }
          }
        });
      })
      .catch(function (err) {
        console.warn('Kon GPX bestand niet laden: ' + url, err);
      });
  }

})();
