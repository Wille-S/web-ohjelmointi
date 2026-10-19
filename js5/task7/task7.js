'use strict';
// sources:
// https://digitransit.fi/en/developers/apis/1-routing-api/itinerary-planning/
// route points are in Google polyline encoded format, so you need to add support for Leafletiin:
// https://github.com/jieter/Leaflet.encoded

const apiKey = 'api_key_here'; //API KEY HERE
// show the map
const map = L.map('map').setView([60.1785553, 24.8786212], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const apiAddress = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1'; // cors issues may arise, use proxy or browser plugin if necessary
const transportColors = {
    WALK: 'green',
    BUS: 'red',
    RAIL: 'cyan',
    TRAM: 'magenta',
    OTHER: 'blue',
};

document.querySelectorAll('.legend-color').forEach(function (swatch) {
    swatch.style.backgroundColor = transportColors[swatch.dataset.mode];
});

const routeForm = document.getElementById('route-form');
const routeContainer = document.getElementById('route-container');

async function getOriginCoordinates(originAddress) {
    const url = `https://api.digitransit.fi/geocoding/v1/search?text=${encodeURIComponent(originAddress)}&size=1`;
    const response = await fetch(url, { headers: { 'digitransit-subscription-key': apiKey } });

    if (!response.ok) {
        throw new Error(`Address lookup failed (${response.status})`);
    }
    const result = await response.json();
    const coordinates = result.features[0]?.geometry?.coordinates;

    if (!coordinates) {
        throw new Error('No matching address found. Check the address and try again.');
    }

    const [longitude, latitude] = coordinates;
    return { latitude, longitude };
}

routeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originAddress = new FormData(routeForm).get('origin');
    const errorMessage = document.getElementById('route-error');
    errorMessage.textContent = '';
    routeForm.hidden = true;
    routeContainer.hidden = false;
    map.invalidateSize();

    try {
        const originCoordinates = await getOriginCoordinates(originAddress);
        await getRoute(originCoordinates, {latitude: 60.2241077, longitude: 24.7587198});
    } catch (error) {
        errorMessage.textContent = error.message;
        routeContainer.hidden = true;
        routeForm.hidden = false;
    }
});

// fetch route with origin and target
function getRoute(origin, target) {
    // GraphQL query
    const GQLQuery = `{
    planConnection(
        origin: {location: {coordinate: {latitude: ${origin.latitude}, longitude: ${origin.longitude}}}}
        destination: {location: {coordinate: {latitude: ${target.latitude}, longitude: ${target.longitude}}}}
        first: 1
    ) {
        edges {
        node {
            start
            end
            legs {
            mode
            duration
            distance
            legGeometry {
                points
            }
            }
        }
        }
    }
}`;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'digitransit-subscription-key': apiKey,
        },
        body: JSON.stringify({query: GQLQuery}),
    };
    fetch(apiAddress, fetchOptions).then(function (response) {
        return response.json();
    }).then(function (result) {
        const itinerary = result.data.planConnection.edges[0].node;
        console.log(itinerary.legs);
        const googleEncodedRoute = itinerary.legs;
        const startTime = new Date(itinerary.start).toLocaleTimeString('fi-FI', {hour: '2-digit', minute: '2-digit'});
        const endTime = new Date(itinerary.end).toLocaleTimeString('fi-FI', {hour: '2-digit', minute: '2-digit'});
        for (let i = 0; i < googleEncodedRoute.length; i++) {
            const color = transportColors[googleEncodedRoute[i].mode] || transportColors.OTHER;
            const route = (googleEncodedRoute[i].legGeometry.points);
            const pointObjects = L.Polyline.fromEncoded(route).getLatLngs(); // fromEncoded: convert Google encoding to Leaflet polylines
            L.polyline(pointObjects).setStyle({
                color
            }).addTo(map);
        }
        map.fitBounds([[origin.latitude, origin.longitude], [target.latitude, target.longitude]]);
        document.getElementById('starting-time').textContent = startTime;
        document.getElementById('ending-time').textContent = endTime;
    }).catch(function (e) {
        console.error(e.message);
    });
}

// get route from origin to target
// getRoute(originCoordinates, {latitude: 60.2241077, longitude: 24.7587198})
