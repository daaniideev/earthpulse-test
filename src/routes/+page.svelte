<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
crossorigin=""/>
<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

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
                    //Extract office coordinates and GeoJSON geometry coordinates:
                    const officeCoordenades =  data.features[1].geometry.coordinates.reverse();
                    const GeoJSONCoordinates = data.features[0].geometry.coordinates;
                    
                    //Create the marker that represents where the office, is using the coordinates fetched by the API endpoint created:
                    let officeMarker = L.marker(officeCoordenades).bindPopup('the office');
                    let layerGroups = L.layerGroup([officeMarker]);

                    //Create the base masp with selectable street layers:
                    var streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                    });

                    //Create the base masp with selectable satellite layers:
                    var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    maxZoom: 19,
                    attribution: 'Map data &copy; <a href="https://www.esri.com/">Esri</a>, '
                    });

                    //Create the object that defines the two types of maps that can be shown:
                    var baseMaps = {
                    "Streets": streets,
                    "Satellite": satellite
                    };

                    //Create the map base:
                    map = L.map('map', {
                        center: officeCoordenades,
                        zoom: 17,
                        layers: [streets, layerGroups]
                    });

                    //Add the button that allows to switch from selectable street layer to satellite
                    L.control.layers(baseMaps).addTo(map);
                    
                    //Create the lines that sorrounds the office: 
                    var myLines = [{
                        "type": "LineString",
                        "coordinates": GeoJSONCoordinates.map( x => x)
                    }];

                    //Create the function that shows a message when click on the perimeter surrounding the office:
                    function onEachFeature(feature, layer) {
                    layer.on('click', function(e) {
                        layer.bindPopup('Perimeter surrounding the office').openPopup();
                        });
                    }
                    
                    //Define the style of the lines:
                    var myStyle = {
                        "color": "#ff7800",
                        "weight": 5,
                        "opacity": 0.65 
                    };
                    
                    //Add to the layer of the line surrounding the office:
                    L.geoJSON(myLines, {
                        style: myStyle,
                        onEachFeature: onEachFeature 
                    }).addTo(map);
    
                })
            }
        })

</script>
<div class="container">
    <h1>Map of the office and its surroundings</h1>
    <h2>Find the office location and explore nearby places with this interactive map</h2>
    <p>This map shows the location of the office and its surroundings in detail. You can use the buttons in the upper right corner of the map to switch between street maps and satellite maps. You can also click on the orange border around the office for additional information about the area. As you can see, this web page is also responsive.</p>
    <div id="map"></div>
    <p class="image-caption">Figure 1: Map of the office and its surroundings</p>
</div>

<style>
    .container
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 1000px;
        margin: auto;
    }

    h1, h2, p {
        text-align: center;
        font-family: 'Font Name', sans-serif;
    }

    h1 {
        font-size: 32px;
    }

    h2 {
        font-size: 28px;
    }

    p {
        font-size: 22px;
        text-align: justify;
        line-height: 1.5;
    }

    #map {
        width: 100%;
        aspect-ratio: 2/1;
        margin: auto!important;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border: 2px solid black;
        margin: 20px;
    }

    .image-caption {
        text-align: center;
    }

    @media (max-width: 1000px) {
        .container {
            width: 95%;
        }
    }
</style>
