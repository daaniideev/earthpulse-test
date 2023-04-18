<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
crossorigin=""/>
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    let L;
    let map;

    onMount(async () => {
        L = await import('leaflet');
        if (browser) {
            fetch("http://localhost:3000/geometry")
            .then(res=> res.json())
            .then(data=>
                {
                    const linesCoordinates = data.features[0].geometry.coordinates;

                    const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
                    const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    
                    const officeCoordenades =  data.features[1].geometry.coordinates.reverse();
                    let officeCoordenadesMarker = L.marker(officeCoordenades).bindPopup('Your Office');
                    let layerGroups = L.layerGroup([officeCoordenadesMarker]);


                    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                });


                map = L.map('map', {
                    center: officeCoordenades,
                    zoom: 17,
                    layers: [osm, layerGroups]
                });

                console.log(linesCoordinates[0]);
    var myLines = [{
        "type": "LineString",
        "coordinates": linesCoordinates.map( x => x)
    }];

    
    var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };

L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);
    
        })}})



</script>

<h1>This is a title</h1>
<div id="map"></div>

<style>
    h1 {
        text-align: center;
    }

    #map {
        height: 500px;
        width: 500px;
        margin: auto;
    }
</style>
