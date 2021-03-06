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

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "0",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// CONFIGURATION
// map bounds
const mapBound = {
  x: [1, 2, 3, 6, 12, 24, 47],
  y: [1, 2, 3, 5, 10, 19, 37]
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

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}

function initMap() {
  map = new google.maps.Map(mapElement, {
    center: (initialCoordinatesCenter)?initialCoordinatesCenter:{lat: 60, lng: -42},
    zoom: 3,
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
            '/' + zoom + '/' + normalizedCoord.x + '/' + normalizedCoord.y + '.png';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 6,
	  minZoom: 0,
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
        var width = feature.getProperty('width') || 32
        var height = feature.getProperty('height') || 32
        var color = feature.getProperty('color') || '#FFF'
        // console.log(color)
        if(icon) {
          return {
            label: label,
            // animation: google.maps.Animation.DROP,
            flat: true,
            // icon: pinSymbol(color),
            icon: {
              url: icon,
              size: new google.maps.Size(width, height),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32),
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
        var strokeWeight = feature.getProperty('strokeWeight')
        var strokeColor = feature.getProperty('strokeColor')
        var fillOpacity = feature.getProperty('fillOpacity')
        return {
          fillColor: fillColor,
          strokeWeight: strokeWeight,
          strokeColor: strokeColor,
          fillOpacity: fillOpacity,
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

  map.data.addListener("mouseover",function(event){
    toastr.remove()
    toastr.info(event.feature.getProperty('name'))

    map.data.overrideStyle(event.feature, {strokeWeight: 2, fillOpacity: 0.7});
  });

  map.data.addListener("mouseout",function(event){
   toastr.clear()
   map.data.revertStyle()
  });

	// map.data.addListener('click', function(event) {
 //    let type = event.feature.getProperty('featureType')
 //    if(type == "city" || type == "mission" || type == "sector") {
 //      let content = ""

 //      if(type == "city") {

 //        if(event.feature.getProperty('info').url)
 //          content += `<a href="${event.feature.getProperty('info').url}" target="_blank">Post sul forum</a><br><br>`

 //        if(event.feature.getProperty('image'))
 //          content += `<div class="modal-image-container"><img class="modal-image" src="${event.feature.getProperty('image')}"/></div>`

 //        content += event.feature.getProperty('description')
 //        content += `<hr>`

 //        content += `<div>`

 //        // Continente
 //        if(event.feature.getProperty('info').continente)
 //          content += `<div class="description-info"><b>Continente: </b>${event.feature.getProperty('info').continente}</div>`

 //        // Superficie
 //        if(event.feature.getProperty('info').superficie)
 //          content += `<div class="description-info"><b>Superficie: </b>${event.feature.getProperty('info').superficie}</div>`

 //        // Abitanti
 //        if(event.feature.getProperty('info').abitanti)
 //          content += `<div class="description-info"><b>Abitanti: </b>${event.feature.getProperty('info').abitanti}</div>`

 //        // Appellativo
 //        if(event.feature.getProperty('info').appellativo)
 //          content += `<div class="description-info"><b>Appellativo: </b>${event.feature.getProperty('info').appellativo}</div>`

 //        // Porto
 //        if(event.feature.getProperty('info').porto || event.feature.getProperty('info').c_porto) {
 //          content += `<div class="description-info"><b>Porto: </b>`
 //          if(event.feature.getProperty('info').c_porto) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_porto}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').porto)
 //            content += event.feature.getProperty('info').porto

 //          content += `</div>`
 //        }

 //        // Ferrovie
 //        if(event.feature.getProperty('info').ferrovie || event.feature.getProperty('info').c_ferrovie) {
 //          content += `<div class="description-info"><b>Ferrovie: </b>`
 //          if(event.feature.getProperty('info').c_ferrovie) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_ferrovie}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').ferrovie)
 //            content += event.feature.getProperty('info').ferrovie

 //          content += `</div>`
 //        }

 //        // Aeroporto
 //        if(event.feature.getProperty('info').aeroporto || event.feature.getProperty('info').c_aeroporto) {
 //          content += `<div class="description-info"><b>Aeroporto: </b>`
 //          if(event.feature.getProperty('info').c_aeroporto) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_aeroporto}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').aeroporto)
 //            content += event.feature.getProperty('info').aeroporto

 //          content += `</div>`
 //        }

 //        // Metropolitana
 //        if(event.feature.getProperty('info').metropolitana || event.feature.getProperty('info').c_metropolitana) {
 //          content += `<div class="description-info"><b>Metropolitana: </b>`
 //          if(event.feature.getProperty('info').c_metropolitana) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_metropolitana}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').metropolitana)
 //            content += event.feature.getProperty('info').metropolitana

 //          content += `</div>`
 //        }

 //        // Pulizia
 //        if(event.feature.getProperty('info').pulizia || event.feature.getProperty('info').c_pulizia) {
 //          content += `<div class="description-info"><b>Pulizia: </b>`
 //          if(event.feature.getProperty('info').c_pulizia) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_pulizia}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').pulizia)
 //            content += event.feature.getProperty('info').pulizia

 //          content += `</div>`
 //        }

 //        // Criminalità
 //        if(event.feature.getProperty('info').criminalita || event.feature.getProperty('info').c_criminalita) {
 //          content += `<div class="description-info"><b>Criminalità: </b>`
 //          if(event.feature.getProperty('info').c_criminalita) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_criminalita}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').criminalita)
 //            content += event.feature.getProperty('info').criminalita

 //          content += `</div>`
 //        }

 //        // Tecnologia
 //        if(event.feature.getProperty('info').tecnologia || event.feature.getProperty('info').c_tecnologia) {
 //          content += `<div class="description-info"><b>Livello tecnologico: </b>`
 //          if(event.feature.getProperty('info').c_tecnologia) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_tecnologia}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').tecnologia)
 //            content += event.feature.getProperty('info').tecnologia

 //          content += `</div>`
 //        }

 //        // Ricchezza
 //        if(event.feature.getProperty('info').ricchezza || event.feature.getProperty('info').c_ricchezza) {
 //          content += `<div class="description-info"><b>Ricchezza: </b>`
 //          if(event.feature.getProperty('info').c_ricchezza) {
 //            content += `<span class="underline">${event.feature.getProperty('info').c_ricchezza}</span><br>`
 //          } else {
 //            content += `<br>`
 //          }

 //          if(event.feature.getProperty('info').ricchezza)
 //            content += event.feature.getProperty('info').ricchezza

 //          content += `</div>`
 //        }

 //        // Personalità Politiche
 //        if(event.feature.getProperty('info').politica) {
 //          content += `<div class="description-info"><b>Personalità politiche: </b> <br>`

 //          if(event.feature.getProperty('info').politica)
 //            content += event.feature.getProperty('info').politica

 //          content += `</div>`
 //        }

 //        // Commercio
 //        if(event.feature.getProperty('info').commercio) {
 //          content += `<div class="description-info"><b>Commercio: </b> <br>`

 //          if(event.feature.getProperty('info').commercio)
 //            content += event.feature.getProperty('info').commercio

 //          content += `</div>`
 //        }

 //        // Punti di Interesse
 //        if(event.feature.getProperty('info').interesse) {
 //          content += `<div class="description-info"><b>Punti di Interesse: </b> <br>`

 //          if(event.feature.getProperty('info').interesse)
 //            content += `<a href="${event.feature.getProperty('info').interesse}" target="_blank">Post sul forum</a>`

 //          content += `</div>`
 //        }

 //        // Curiosità
 //        if(event.feature.getProperty('info').curiosita.length > 0) {
 //          content += `<div class="description-info"><b>Curiosità: </b> <br>`

 //          content += `<ol>`
 //          for(let i = 0; i < event.feature.getProperty('info').curiosita.length; i++) {
 //            content += `<li>${event.feature.getProperty('info').curiosita[i]}</li><br>`
 //          }
 //          content += `</ol></div>`
 //        }

 //        content += `</div>`

 //      } else if(type == "mission") {
 //        if(event.feature.getProperty('url'))
 //          content += `<a href="${event.feature.getProperty('url')}" target="_blank">Post sul forum</a><br><br>`

 //        if(event.feature.getProperty('image'))
 //          content += `<div class="modal-image-container"><img class="modal-image" src="${event.feature.getProperty('image')}"/></div>`

 //        content += event.feature.getProperty('description')

 //      } else if (type == "sector") {

 //        content += ''
 //      }

 //      ssi_modal.show({
 //        content: content,
 //        sizeClass: 'small',
 //        title: event.feature.getProperty('name'),
 //        animation: true
 //      });
 //    }
 //  });

  var styleControl = document.getElementById('style-selector-control');
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(styleControl);

  controllerViewFeature.addEventListener('click', activateMarkerDisableOthers(map, controllerViewFeature))

  // default seen features
  activateMarkerDisableOthers(map, controllerViewFeature)()


  // styleCharactersTab.addEventListener('click', showCharacter(map))
  // addCharactersToDOM(styleCharactersTab)
}

/*
 * DROPDOWN MENUS
 */

// let infoOpenFlag = true
// openCloseInfoButton.addEventListener('click', function() {
//   infoOpenFlag = !infoOpenFlag
//   if(infoOpenFlag) {
//     infoTab.style.display = 'flex'
//     infoOpenIcon.innerHTML = 'arrow_drop_up'
//   } else {
//     infoTab.style.display = 'none'
//     infoOpenIcon.innerHTML = 'arrow_drop_down'
//   }
// })

// let characterOpenFlag = true
// openCloseStyleCharactersButton.addEventListener('click', function() {
//   infoOpenFlag = !infoOpenFlag
//   if(infoOpenFlag) {
//     styleCharactersTab.style.display = 'block'
//     styleCharactersOpenIcon.innerHTML = 'arrow_drop_up'
//   } else {
//     styleCharactersTab.style.display = 'none'
//     styleCharactersOpenIcon.innerHTML = 'arrow_drop_down'
//   }
// })
