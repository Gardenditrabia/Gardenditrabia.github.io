const mapElement = document.getElementById('map')
const infoTitle = document.getElementById('info-title')
const infoImage = document.getElementById('info-img')
const controllerViewFeature = document.getElementById('feature-show-inputs')
const openCloseInfoButton = document.getElementById('info-open-close')
const infoTab = document.getElementById('info-tab')
const infoOpenIcon = document.getElementById('info-open-close-icon')
const openCloseStyleCharactersButton = document.getElementById('style-characters-open-close')
const styleCharactersTab = document.getElementById('style-characters-tab')
const styleCharactersOpenIcon = document.getElementById('style-characters-open-close-icon')

let map = undefined

// CONFIGURATION
// map bounds
const mapBound = {
  x: [1, 2, 3, 6, 12],
  y: [1, 2 ,3 ,5 ,10]
}

// url parameters
const urlParams = new URLSearchParams(window.location.search) 
const center = urlParams.get('center')
let initialCoordinatesCenter = undefined
if(center) {
  initialCoordinatesCenter = {}
  const lngLat = center.split(",")
  initialCoordinatesCenter.lng = parseFloat(lngLat[0])
  initialCoordinatesCenter.lat = parseFloat(lngLat[1])
}
const show = urlParams.get('show')

function initMap() {
  map = new google.maps.Map(mapElement, {
    center: (initialCoordinatesCenter)?initialCoordinatesCenter:{lat: 78, lng: -33},
    zoom: 4,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['trabia']
    },
    mapTypeControl: false
  });

  const trabiaMapType = new google.maps.ImageMapType({
	  getTileUrl: function(coord, zoom) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        var bound = getTileBounds(zoom)

        if (!normalizedCoord || normalizedCoord.x >= bound.x || normalizedCoord.y >= bound.y) {
          return null;
        }

        return 'img/map' +
            '/' + zoom + '/' + normalizedCoord.x + '/' +
            normalizedCoord.y + '.png';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 4,
	  minZoom: 2,
	  name: 'Trabia'
	});

	map.mapTypes.set('Trabia', trabiaMapType);
	map.setMapTypeId('Trabia');

	google.maps.event.addListener(map, 'click', function( event ){
  	console.log('[' + event.latLng.lng() + ", " + event.latLng.lat() + '],'); 
	});

	map.data.setStyle(function(feature) {
    let type = feature.getProperty('featureType')
    let label = feature.getProperty('label')
    let visible = feature.getProperty('active')
        
    // For custom icons, API here:
    // https://developers.google.com/chart/infographics/docs/dynamic_icons?csw=1#pins
    switch(type) {
      case 'city':
        var icon = feature.getProperty('icon')
        if(icon) {
          return {
            label: label,
            animation: google.maps.Animation.DROP,
            icon: {
              url: icon,
              size: new google.maps.Size(32, 32),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(16, 32)
            },
            visible: visible,
          }
        } else {
          return {
            label: label,
            animation: google.maps.Animation.DROP,
            visible: visible,
          }
        }
        break;
      case 'character':
        var fillColor = feature.getProperty('fillColor')
        var textColor = feature.getProperty('textColor')
        return {
          animation: google.maps.Animation.DROP,
          icon: {
          //   anchor: new google.maps.Point(0,0),
            url: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + label + "|" + fillColor + "|" + textColor
          },
          draggable: true,
          visible: visible,
        }
        break;
      case 'mission': 
        var icon = feature.getProperty('icon')
        var fillColor = feature.getProperty('fillColor')
        var starFill = feature.getProperty('starFill')
        return {
          animation: google.maps.Animation.DROP,
          icon: {
          //   anchor: new google.maps.Point(0,0),
            url: "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|" + icon + "|" + fillColor + "|" + starFill
          },   
          visible: visible,
        }
        break;
      case 'sector':
        var fillColor = feature.getProperty('fillColor')
        var strokeWidth = feature.getProperty('strokeWidth')
        return {
          fillColor: fillColor,
          strokeWeight: strokeWidth,
          visible: visible,
        }
        break;
      default:
        return {}
        break;
    }
  });

	map.data.addGeoJson(cities);
  map.data.addGeoJson(characters);
  map.data.addGeoJson(missions);
  map.data.addGeoJson(sectors);

	map.data.addListener('click', function(event) {
    let type = event.feature.getProperty('featureType')
    if(type == "city" || type == "event" || type == "sector") {
      let content = ""

      content += event.feature.getProperty('description')

      ssi_modal.show({
        content: content,
        sizeClass: 'small',
        title: event.feature.getProperty('name'),
        animation: true
      }); 
    }
  });

  var styleControl = document.getElementById('style-selector-control');
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(styleControl);

  controllerViewFeature.addEventListener('click', activateMarkerDisableOthers(map, controllerViewFeature))
  
  // default seen features
  activateMarkerDisableOthers(map, controllerViewFeature)()
  

  styleCharactersTab.addEventListener('click', showCharacter(map))
  addCharactersToDOM(styleCharactersTab)
}

/* 
 * DROPDOWN MENUS
 */ 

let infoOpenFlag = true
openCloseInfoButton.addEventListener('click', function() {
  infoOpenFlag = !infoOpenFlag
  if(infoOpenFlag) {
    infoTab.style.display = 'flex'
    infoOpenIcon.innerHTML = 'arrow_drop_up'
  } else {
    infoTab.style.display = 'none'
    infoOpenIcon.innerHTML = 'arrow_drop_down'
  }
})

let characterOpenFlag = true
openCloseStyleCharactersButton.addEventListener('click', function() {
  infoOpenFlag = !infoOpenFlag
  if(infoOpenFlag) {
    styleCharactersTab.style.display = 'block'
    styleCharactersOpenIcon.innerHTML = 'arrow_drop_up'
  } else {
    styleCharactersTab.style.display = 'none'
    styleCharactersOpenIcon.innerHTML = 'arrow_drop_down'
  }
})