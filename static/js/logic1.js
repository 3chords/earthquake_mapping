// store our API endpoint inside a variable, this endpoint is for all earthquakes 2.5+ last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data.features);
    
    // console log to test # of records
    console.log("# of records:", data.features.length)
    
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features)

    // Step 2, Next, send the data.features object to the createMarkers function
    //createMarkers(data.features)
});

// here is where we create our features
function createFeatures(earthquakeData) {
        function myonEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "<hr> Magnitude:" + feature.properties.mag + "</p>");
        }

        // step 2, test to make sure we have length of array correct
        console.log("# of records: " + earthquakeData.length)        
        
        var earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: myonEachFeature
        })
        createMap(earthquakes);
    }


function createMap(earthquakes) {

    // define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 9,
    id: "mapbox.streets",
    accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 9,
    id: "mapbox.dark",
    accessToken: API_KEY
    });

    // define a baseMaps object to hold our base layers
    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    }


// step 2, add markers, define array to hold markers
// function createMarkers(magnitudeData)
//     // define array to hold markers
//     var magMarkers = [];

//     for (var = 0, )



// create a new map
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]  // for step 2 I need to add the marker layer to this eventually
    });
    
// create a layer control containing our baseMaps
// add an overlay layer containing the earthquake GeoJSON
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
}
