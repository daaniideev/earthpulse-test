<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
crossorigin=""/>
<script>
    
    const getOfficePossition = () =>

    {


    }


    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    let L;
    let map;


    
    onMount(async () => {
      if (browser) {
        L = await import('leaflet');
        const officeCoordenades = 
        map = L.map('map').setView([41.3032, 2.00321], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Crea los marcadores
        var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
        var denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
        var aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
        var golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

        // Crea un LayerGroup con los marcadores
        var cities = L.layerGroup([littleton, denver, aurora, golden]);

        // Añade el LayerGroup al mapa
        cities.addTo(map);

        // Añade un Layers Control al mapa
        var baseMaps = {
            "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }),
            "Mapbox Streets": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
            })
        };
        

        var overlayMaps = {
            "Cities": cities
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);
      }
    });
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
