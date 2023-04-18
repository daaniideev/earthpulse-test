import { onMount } from 'svelte';
import { browser } from '$app/environment';

export function addingGeoJson(officeCoordenades, linesCoordinates, layer) {
	const myLines = [
		{
			type: 'LineString',
			coordinates: linesCoordinates
		}
	];

	function onEachFeature(feature, layer) {
		layer.on('click', function (e) {
			layer.bindPopup('Perimeter that sorounds your office').openPopup();
		});
	}

	const myStyle = {
		color: '#ff7800',
		weight: 5,
		opacity: 0.65
	};

	L.geoJSON(myLines, {
		style: myStyle,
		onEachFeature: onEachFeature
	}).addTo(map);
}
