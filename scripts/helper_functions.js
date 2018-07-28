function getNormalizedCoord(coord, zoom) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = (x % tileRange + tileRange) % tileRange;
  }

  return {x: x, y: y};
}

function getTileBounds(zoom) {
 	return {x: mapBound.x[zoom], y: mapBound.y[zoom]}
}

function activateMarkerDisableOthers(map, controller) {
  return function(){
    const inputs = controller.getElementsByTagName('input')
    const typeToShow = []
    for(let i = 0; i < inputs.length; i++) {
      if(inputs[i].checked) {
        typeToShow.push(inputs[i].dataset.type)
      }
    }
    map.data.forEach(function(feature){
      let type = feature.getProperty('featureType')
      if(typeToShow.indexOf(type) != -1) {
        if(!feature.getProperty('active')) {
          feature.setProperty('active', true)
        }
      } else if (type != 'character') {
        feature.setProperty('active', false)
      }
    })
  }
}

// function addCharactersToDOM(dom) {
//   const groups = {}

//   let chars = characters.features
//   for(let i = 0; i < chars.length; i++) {
//     let name = chars[i].properties.name
//     let groupName = chars[i].properties.group
//     if(groups[groupName]) {
//       groups[groupName].push(name)
//     } else {
//       groups[groupName] = [name]
//     }
//   }

//   let toAdd = ""
//   for(let groupName in groups) {
//     let names = groups[groupName]
//     toAdd += `<div class="style-characters-group"><div class="style-characters-groupname">${groupName}</div>`
//     for(let i = 0; i < names.length; i++) {
//        toAdd += ` <div class="style-characters-input-label"><input id="show-character-${names[i]}" data-type="character" data-name="${names[i]}" type="checkbox" class="selector-control"><label for="show-character-${names[i]}" data-type="character" data-name="${names[i]}">${names[i]}</label></div>`
//     }

//     toAdd += "</div>"
//   }

//   dom.innerHTML = toAdd
// }

function showCharacter(map) {
  return function(event) {
    let name = event.target.dataset.name
    let type = event.target.dataset.type
    if(name && type == 'character') {
      let show = event.target.checked || false

      map.data.forEach(function(feature){
        let featureName = feature.getProperty('name')
        let featureType = feature.getProperty('featureType')
        if(featureName == name && featureType == type) {
          if(feature.getProperty('active') != show) {
            feature.setProperty('active', show)
          }
        }
      })
    }
  }
}
