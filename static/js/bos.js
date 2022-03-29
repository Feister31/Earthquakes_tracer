console.log()

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark,
  Light: light,
  satelliteStreet: satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('map', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let allEarthquakes = new L.LayerGroup()
let largeEarquakes = new L.LayerGroup()
let tectonicplates = new L.LayerGroup()

let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": allEarthquakes
}

L.control.layers(baseMaps. overlays).addTo(map)

// Retrieve the earthquakes

let earthdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(earthdata).then(function(data) {
    // function return style for each earthquake we plot on the map 
    function styleInfo(feature){
      return {
        opacity: 1,
        fillOpacity: 1,
        fillcolor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      }
    };

    function getColor(magnitude){
        if(magnitude > 5) {
          return "#ea2c2c"
        }
        if(magnitude > 4) {
          return "#ea822c"
        }
        if(magnitude > 3) {
          return "#ea9c00"
        }
        if(magnitude > 2) {
          return "#eecc00"
        }
        if(magnitude > 1) {
          return "#d4ee00"
        }
        return "#98eee00"
    }
    // function determines the radius of the earthquake marker based on its magnitude 
    // Earthquake with a magnitude of 0 being plotted with wrong radius
    function getRadius(magnitude){
      if(magnitude === 0) {
        return 1;
      }
      return magnitude * 4;

    }

    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng)
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude") + feature.properties.mag + "<br>Location: " + feature.properties.place
      }
    }).addTo(allEarthquakes)

    allEarthquakes.addTo(map)

})




// // We create the tile layer that will be the backgroud
// let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data",
//     maxZoom: 18,
//     accessToken: API_KEY
// })

// let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data",
//     maxZoom: 18,
//     accessToken: API_KEY
// })

// let map = L.map("mapid",{
//     center: [40.7, -94.5],
//     zoom: 3,
//     layers: [streets]
// })

// let basemap = {
//     "Streets": streets,
//     "Satellite": satelliteStreets
// }



//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/satellite-streets-v11",
//   accessToken: API_key
// })
// let map = L.map('map', {
//     center: [40.7, -94.5],
//     zoom: 3,
//     layers:[streets]
// })

// let basemap = {
//     "Streets": streets,
//     Light: light
// }

// let streets = L.titleLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/satellite-streets-v11",
//   accessToken: API_key
// })

// let map = L.map('map', {
//     center: [40.7, -94.5],
//     zoom: 3,
//     layers:[streets]
// })