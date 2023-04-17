mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "mapCollapse", // container ID
  style: "mapbox://styles/jacqueschuis/clfj0n7g100dm01t5pel5u9fi", // style URL
  center: museum.geometry.coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(museum.geometry.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<h5>${museum.name}</h5>`
//     )
//   )
  .addTo(map);
