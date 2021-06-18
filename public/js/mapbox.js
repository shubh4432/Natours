

export const displayMap = (locations) => {
  mapboxgl.accessToken = 
  'pk.eyJ1Ijoic2h1YmhhbTQ0MzIiLCJhIjoiY2twbWNqb3I1MXJ4ZzMycGV6dGUxNmdsbiJ9.3fUFTbD0w9w6hVAF5tkFyA';
 
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shubham4432/ckpmgz9qk5mc917ph97jj9t5f',
    scrollZoom: false
    // center: [-118.113491,34.111475],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
      // Create  marker
      const el = document.createElement('div'); 
      el.className = 'marker';

      //Add marker
      new mapboxgl.Marker({
          element:  el,
          anchor: 'bottom'
      }).setLngLat(loc.coordinates).addTo(map);

       // Add a popup

       new mapboxgl.Popup({
           offset: 30
       })
       .setLngLat(loc.coordinates)
       .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
       .addTo(map);

      // extend map bounds to include the current locations
      bounds.extend(loc.coordinates)
  });

  map.fitBounds(bounds, {
        padding: {
          top: 200,
          bottom: 150,
          left: 100,
          right: 100
        }
    });
  
}

  