var map, heatmap;
var markers = [];
var markersOn = false;
var slider = document.getElementById("radiusrange");
var fileUpload = document.getElementById('loadfile');
var vendors = [];



window.PrintShit("hello world");


fileUpload.onclick = loadFile;

function loadFile(){
    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            var points = processData(content);
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: points,
                map: map
            });

        }
    }

    input.click();
}







// Sets the map on all markers in the array.
function setMapOnAll(mmap) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(mmap);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
    markersOn = false;
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
    markersOn = true;
}



function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var lines = [];
    markers = [];
    var ven = '';
    for (var i = 2; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(/\t/);
        if (data.length == 15) {

            if (data[12] != 0) {
                var tarr = { location: new google.maps.LatLng(parseFloat(data[12]), parseFloat(data[13])), weight: parseFloat(data[14]) };
                lines.push(tarr);
                console.log(tarr);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(data[12]), parseFloat(data[13])),
                    title: data[0] + '\n' + data[3],
                    
                });
                markers.push(marker);
                // check vendors
                if (data[0] != ven){
                    ven = data[0];
                    vendors.push({name: ven, active: true});
                }
            }
        }
    }
    // alert(lines);
    setMapOnAll(map);
    showMarkers();
    return lines;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });





}

// function toggleHeatmap() {
//     heatmap.setMap(heatmap.getMap() ? null : map);
// }

// function toggleMarkers() {
//     if (markersOn)
//         clearMarkers();
//     else
//         showMarkers();
// }

// function changeGradient() {
//     var gradient = [
//         'rgba(0, 255, 255, 0)',
//         'rgba(0, 255, 255, 1)',
//         'rgba(0, 191, 255, 1)',
//         'rgba(0, 127, 255, 1)',
//         'rgba(0, 63, 255, 1)',
//         'rgba(0, 0, 255, 1)',
//         'rgba(0, 0, 223, 1)',
//         'rgba(0, 0, 191, 1)',
//         'rgba(0, 0, 159, 1)',
//         'rgba(0, 0, 127, 1)',
//         'rgba(63, 0, 91, 1)',
//         'rgba(127, 0, 63, 1)',
//         'rgba(191, 0, 31, 1)',
//         'rgba(255, 0, 0, 1)'
//     ]
//     heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
// }

// function changeRadius() {
//     heatmap.set('radius', heatmap.get('radius') ? null : 20);
// }

// function changeOpacity() {
//     heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
// }
