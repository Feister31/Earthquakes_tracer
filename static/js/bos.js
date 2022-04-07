d3.json(earthdata).then(function(data) {
    // function return style for each earthquake we plot on the map 
    
    function bigquakes(feature){
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 1.5
      }
    };

    function getColor(magnitude){
        if(magnitude > 6) {
          return "#ea2c2c";
        }
        if(magnitude > 5) {
          return "#ea822c";
        }
        if(magnitude > 4) {
          return "#ea9c00";
        }
          function getRadius(magnitude){
            if(magnitude === 2) {
              return 3;
            }
            return magnitude * 2;
 }}
 d3.json(tecno).then(function(plateData){
    L.geoJson(plateData, {
      color: "#ff6500",
      weight: 2
    }).addTo(marjorEarthquakes)
  })

marjorEarthquakes.addTo(map)})