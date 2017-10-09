
/*default map on app, coords set to our classroom location*/
/*maptype set to hybrid instead of default streetmap. this gives satellite view with markers*//
 function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.89989698213954, lng: -79.01249361429444},
          zoom: 19,
          mapTypeId: google.maps.MapTypeId.HYBRID
        });


         /*input bar for testing, will move from inside the map to our html*/

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
       
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
          
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

        var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

             if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnNcKtuovwZfvrD9e3jO8lHrn6buwQ3Rg&libraries=places&callback=initAutocomplete"
         async defer></script>