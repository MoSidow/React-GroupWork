// function for google maps api

var searchLocation = document.getElementById('search');

searchLocation.addEventListener("click", function () {
    var searchText = document.getElementById("location-input").value;  

    
    lookupLocation(searchText);
    
});

// Displays Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 51.50,
            lng: -0.12,
        },
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}
// Gets search text and send to the lookuplocation
function getPlaceData() {
    
    var input = getElementById("mapsearch");
    t.input.textcontent.addEventListener("onclick");
    prompt(lookupLocation);
}

function lookupLocation(location) {
    var requestOptions = {
        method: "GET",
        mode: "no-cors",
    };
    fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyCxriIzL6xFwLFzyKhpZ007OoU5597-yVA`
    )
        .then((response) => response.json())
        .then((result) => getPlaceId(result));
}


function getPlaceId(result) {
    console.log(result);
    var placeId = result.predictions[0].place_id;
    geocodePlaceId(placeId);
}

function geocodePlaceId(placeId) {
    geocoder
        .geocode({
            placeId: placeId,
        })
        .then(({ results }) => {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                const marker = new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
}


window.initMap = initMap;

