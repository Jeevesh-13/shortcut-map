function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 28.6139, lng: 77.2090 },
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("directions-panel"));
  document.getElementById("submit").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  var waypts = [];
  var checkboxArray = document.getElementsByName('waypoints');

  for (let i = 0; i < checkboxArray.length; i++) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true,
      });
    }
  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);

      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function via(){
  var newd = document.createElement('input');
  newd.setAttribute('type','text');
  newd.setAttribute('name','waypoints');
  newd.setAttribute('placeholder','via');
  document.getElementById('way').appendChild(newd);
}

$(function() {
$('[data-toggle="tooltip"]').tooltip();
});
