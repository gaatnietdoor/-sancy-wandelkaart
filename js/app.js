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
      permanent: false,
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
    if (trail.gpx) {
      html += '<div style="margin-top:6px"><a href="' + trail.gpx + '" download class="gpx-download">⬇ Download GPX</a></div>';
    }
    if (trail.url) {
      html += '<div style="margin-top:4px"><a href="' + trail.url + '" target="_blank" rel="noopener" class="trail-source-link">Meer info</a></div>';
    }
    return html;
  }

  // Trail detail panel
  var trailDetail = document.getElementById('trail-detail');
  var detailContent = document.getElementById('detail-content');
  var elevationCanvas = document.getElementById('elevation-canvas');
  var elevationStats = document.getElementById('elevation-stats');
  var elevationProfile = document.getElementById('elevation-profile');

  // Cache for parsed GPX elevation data
  var gpxElevationCache = {};

  function loadGPXElevation(gpxUrl, callback) {
    if (gpxElevationCache[gpxUrl]) {
      callback(gpxElevationCache[gpxUrl]);
      return;
    }
    fetch(gpxUrl)
      .then(function (r) { return r.text(); })
      .then(function (gpxText) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(gpxText, 'text/xml');
        var points = doc.querySelectorAll('trkpt');
        var data = [];
        var totalDist = 0;
        var prevLat = null, prevLon = null;
        points.forEach(function (pt) {
          var lat = parseFloat(pt.getAttribute('lat'));
          var lon = parseFloat(pt.getAttribute('lon'));
          var eleEl = pt.querySelector('ele');
          var ele = eleEl ? parseFloat(eleEl.textContent) : 0;
          if (prevLat !== null) {
            totalDist += haversine(prevLat, prevLon, lat, lon);
          }
          data.push({ dist: totalDist, ele: ele, lat: lat, lon: lon });
          prevLat = lat;
          prevLon = lon;
        });
        gpxElevationCache[gpxUrl] = data;
        callback(data);
      })
      .catch(function () { callback(null); });
  }

  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function drawElevationProfile(data) {
    var canvas = elevationCanvas;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    var w = rect.width;
    var h = rect.height;
    var pad = { top: 10, right: 10, bottom: 24, left: 40 };

    var elevations = data.map(function (d) { return d.ele; });
    var distances = data.map(function (d) { return d.dist; });
    var minEle = Math.min.apply(null, elevations) - 10;
    var maxEle = Math.max.apply(null, elevations) + 10;
    var maxDist = distances[distances.length - 1];

    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    var eleSteps = 4;
    for (var i = 0; i <= eleSteps; i++) {
      var y = pad.top + (chartH / eleSteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      // Labels
      var eleLabel = Math.round(maxEle - ((maxEle - minEle) / eleSteps) * i);
      ctx.fillStyle = '#999';
      ctx.font = '10px Nunito, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(eleLabel + 'm', pad.left - 4, y + 3);
    }

    // Distance labels
    ctx.textAlign = 'center';
    var distSteps = 4;
    for (var j = 0; j <= distSteps; j++) {
      var x = pad.left + (chartW / distSteps) * j;
      var distLabel = (maxDist / 1000 / distSteps * j).toFixed(1);
      ctx.fillText(distLabel + 'km', x, h - 4);
    }

    // Fill area
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + chartH);
    data.forEach(function (d) {
      var x = pad.left + (d.dist / maxDist) * chartW;
      var y = pad.top + chartH - ((d.ele - minEle) / (maxEle - minEle)) * chartH;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.left + chartW, pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(45, 106, 79, 0.15)';
    ctx.fill();

    // Line
    ctx.beginPath();
    data.forEach(function (d, idx) {
      var x = pad.left + (d.dist / maxDist) * chartW;
      var y = pad.top + chartH - ((d.ele - minEle) / (maxEle - minEle)) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#2d6a4f';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function showTrailDetail(trail) {
    var html = '<div class="detail-title"><span class="trail-number">' + trail.id + '</span> ' + trail.name + '</div>';
    html += '<div class="detail-meta">';
    html += '<span><strong>Start:</strong> ' + trail.gemeente + '</span>';
    html += '<span><strong>Afstand:</strong> ' + trail.afstand + '</span>';
    html += '<span><strong>Duur:</strong> ' + trail.duur + '</span>';
    html += '<span><strong>Hoogteverschil:</strong> ' + trail.hoogteverschil + '</span>';
    html += '<span class="badge badge-' + trail.moeilijkheid + '">' + trail.moeilijkheid + '</span>';
    html += '</div>';
    html += '<div class="detail-description">' + trail.beschrijving + '</div>';
    if (trail.hoogtepunten && trail.hoogtepunten.length > 0) {
      html += '<div class="detail-highlights"><strong>Hoogtepunten:</strong> ' + trail.hoogtepunten.join(', ') + '</div>';
    }
    if (trail.gpx) {
      html += '<div><a href="' + trail.gpx + '" download class="gpx-download">⬇ Download GPX</a></div>';
    }
    if (trail.url) {
      html += '<div style="margin-top:6px"><a href="' + trail.url + '" target="_blank" rel="noopener" class="trail-source-link">Meer info op sancy.com</a></div>';
    }
    detailContent.innerHTML = html;

    // Show/hide elevation
    if (trail.gpx) {
      elevationProfile.style.display = 'block';
      loadGPXElevation(trail.gpx, function (data) {
        if (!data || data.length === 0) {
          elevationProfile.style.display = 'none';
          return;
        }
        drawElevationProfile(data);

        var elevations = data.map(function (d) { return d.ele; });
        var minE = Math.round(Math.min.apply(null, elevations));
        var maxE = Math.round(Math.max.apply(null, elevations));
        var totalUp = 0, totalDown = 0;
        for (var i = 1; i < elevations.length; i++) {
          var diff = elevations[i] - elevations[i - 1];
          if (diff > 0) totalUp += diff;
          else totalDown -= diff;
        }
        var totalDist = (data[data.length - 1].dist / 1000).toFixed(1);
        elevationStats.innerHTML =
          '<span>Min: ' + minE + 'm</span>' +
          '<span>Max: ' + maxE + 'm</span>' +
          '<span>Stijging: +' + Math.round(totalUp) + 'm</span>' +
          '<span>Daling: -' + Math.round(totalDown) + 'm</span>' +
          '<span>Afstand: ' + totalDist + ' km</span>';
      });
    } else {
      elevationProfile.style.display = 'none';
    }

    trailList.style.display = 'none';
    trailDetail.style.display = 'block';
  }

  function hideTrailDetail() {
    trailDetail.style.display = 'none';
    trailList.style.display = 'block';
  }

  document.getElementById('detail-close').addEventListener('click', hideTrailDetail);

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
      var gpxLink = trail.gpx ? '<a href="' + trail.gpx + '" download class="gpx-download" title="Download GPX">⬇ GPX</a>' : '';
      li.innerHTML =
        '<div class="trail-item-name"><span class="trail-number">' + trail.id + '</span> ' + trail.name + '</div>' +
        '<div class="trail-item-meta">' +
        '<span>' + trail.afstand + '</span>' +
        '<span>' + trail.duur + '</span>' +
        '<span class="badge badge-' + trail.moeilijkheid + '">' + trail.moeilijkheid + '</span>' +
        gpxLink +
        '</div>';
      li.addEventListener('click', function (e) {
        if (e.target.classList.contains('gpx-download')) return;
        setActiveTrail(trail.id);
        map.setView(trail.startPunt, 14);
        // Open popup
        trailMarkers.eachLayer(function (layer) {
          if (layer.trailId === trail.id) {
            layer.openPopup();
          }
        });
        // Show detail panel
        showTrailDetail(trail);
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

  // Load GPX routes linked to trails
  TRAILS.forEach(function (trail) {
    if (trail.gpx) {
      loadGPX(trail.gpx, trail);
    }
  });

  function bearing(lat1, lon1, lat2, lon2) {
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    var x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
      Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  function addRouteArrows(latlngs, layerGroup) {
    if (latlngs.length < 2) return;
    var totalDist = 0;
    var dists = [0];
    for (var i = 1; i < latlngs.length; i++) {
      totalDist += haversine(latlngs[i - 1][0], latlngs[i - 1][1], latlngs[i][0], latlngs[i][1]);
      dists.push(totalDist);
    }
    var interval = Math.max(400, totalDist / 20);
    var nextArrow = interval;
    for (var j = 1; j < latlngs.length; j++) {
      if (dists[j] >= nextArrow) {
        var angle = bearing(latlngs[j - 1][0], latlngs[j - 1][1], latlngs[j][0], latlngs[j][1]) - 90;
        var icon = L.divIcon({
          html: '<div class="route-arrow" style="transform:rotate(' + angle + 'deg)">&#9654;</div>',
          className: 'route-arrow-container',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        L.marker(latlngs[j], { icon: icon, interactive: false }).addTo(layerGroup);
        nextArrow += interval;
      }
    }
  }

  function addRouteFromPoints(latlngs, popupTitle, url, layerGroup) {
    var polyline = L.polyline(latlngs, {
      color: '#2d6a4f',
      weight: 4,
      opacity: 0.8
    }).addTo(layerGroup);
    polyline.bindPopup('<strong>' + popupTitle + '</strong><br><a href="' + url + '" download class="gpx-download">⬇ Download GPX</a>');
    addRouteArrows(latlngs, layerGroup);
  }

  function loadGPX(url, trail) {
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
              var popupTitle = trail ? trail.name : (name ? name.textContent : 'Route');
              addRouteFromPoints(latlngs, popupTitle, url, gpxRoutes);
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
            var popupTitle = trail ? trail.name : (name ? name.textContent : 'Route');
            addRouteFromPoints(latlngs, popupTitle, url, gpxRoutes);
          }
        });
      })
      .catch(function (err) {
        console.warn('Kon GPX bestand niet laden: ' + url, err);
      });
  }

})();
