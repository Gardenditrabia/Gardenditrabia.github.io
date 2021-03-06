const container = document.getElementById('show-data')

const el1 = document.getElementById('select-cities')
const el2 = document.getElementById('select-missions')
const el3 = document.getElementById('select-sectors')
const el4 = document.getElementById('select-characters')

const addButton = document.getElementById('add-button')

const copyPaste = document.getElementById('copy-paste')

window.citiesTemplate = {
	type: 'Feature',
	properties: {
		featureType: "city",
    name: "",
    image: "",
    icon: "img/icons/city2.png",
    description: "",
    info: {
    	url: "",
    	continente: "",
    	superficie: "",
    	abitanti: "",
    	appellativo: "",
    	c_porto: "",
    	porto: "",
    	c_ferrovie: "",
    	ferrovie: "",
    	c_aeroporto: "",
    	aeroporto: "",
    	c_metropolitana: "",
    	metropolitana: "",
    	c_pulizia: "",
    	pulizia: "",
    	c_criminalita: "",
    	criminalita: "",
    	c_tecnologia: "",
    	tecnologia: "",
    	politica: "",
    	c_ricchezza: "",
    	ricchezza: "",
    	commercio: "",
    	interesse: "",
    	curiosita: []
    }
	},
	geometry: {
		type: 'Point',
		coordinates: []
	}
}

window.missionsTemplate = {
	type: 'Feature',
	properties: {
		featureType: "mission",
    name: "",
    image: "",
    url: "",
    icon: "postal",
    fillColor: "FFFFFF",
    starFill: "CEC825",
    description: ""
	},
	geometry: {
		type: 'Point',
		coordinates: []
	}
}

window.sectorsTemplate = {
	type: 'Feature',
	properties: {
		featureType: "sector",
    name: "",
    image: "",
    description: "",
    fillColor: "", 
    strokeWidth: 3
	},
	geometry: {
		type: 'Polygon',
		coordinates: [[[1,2],[3,4],[4,5]]]
	}
}

window.charactersTemplate = {
	type: 'Feature',
	properties: {
		featureType: "character",
    name: "",
    grouep: "",
    label: "",
    fillColor: "",
    textColor: "",
	},
	geometry: {
		type: 'Point',
		coordinates: []
	}
}


const load = function() {
	el1.addEventListener('click', onClick)
	el2.addEventListener('click', onClick)
	el3.addEventListener('click', onClick)
	el4.addEventListener('click', onClick)

	addButton.addEventListener('click', addItem)

	const toLoad = getChecked()
	loadGeoJSON(toLoad)
}

const getChecked = function() {
	if(el1.checked)
		return el1.dataset.type
	if(el2.checked)
		return el2.dataset.type
	if(el3.checked)
		return el3.dataset.type
	if(el4.checked)
		return el4.dataset.type

	return undefined
}

const onClick = function(event) {
	loadGeoJSON(event.target.dataset.type)
}

const loadGeoJSON = function(toLoad) {
	console.log('Loading ' + toLoad)

	container.innerHTML = ""

	let acc = "<div>"
	let features = window[toLoad].features
	for(let pos = 0; pos < features.length; pos++) {
		for(let prop in window[toLoad + 'Template'].properties) {
			if(prop != 'description' && prop != 'info') {
				acc += `<div><label>${prop}:</label><input id="${toLoad}-${pos}-properties-${prop}" onchange="inputChange('${toLoad}', ${pos}, 'properties', '${prop}')" type="text" value="${features[pos].properties[prop]}"></input></div>`
			} else if (prop != 'info') {
				acc += `<div><label>${prop}:</label><textarea id="${toLoad}-${pos}-properties-${prop}" onchange="inputChange('${toLoad}', ${pos}, 'properties', '${prop}')" rows="4" cols="50">${features[pos].properties[prop]}</textarea></div>`
			}
		}

		for(let prop in window[toLoad + 'Template'].geometry) {
			if(prop != 'coordinates') {
				acc += `<div><label>${prop}:</label><input id="${toLoad}-${pos}-geometry-${prop}" onchange="inputChange('${toLoad}', ${pos}, 'geometry', '${prop}')" type="text" value="${features[pos].geometry[prop]}"></input></div>`
			} else {
				acc += `<div><label>${prop}:</label><textarea id="${toLoad}-${pos}-geometry-${prop}" onchange="inputChange('${toLoad}', ${pos}, 'geometry', '${prop}')" rows="4" cols="50">${JSON.stringify(features[pos].geometry[prop])}</textarea></div>`
			}
		}

		if(toLoad == 'cities') {
			acc += `<button onclick="showHide('tab-${toLoad}-${pos}-properties-info')">Show / Hide </button><div id="tab-${toLoad}-${pos}-properties-info" style="display:none">`
			for(let info in window[toLoad + 'Template'].properties.info) {
				if(info != 'curiosita')
				acc += `<div><label>${info}:</label><textarea id="${toLoad}-${pos}-properties-info-${info}" onchange="inputChange('${toLoad}', ${pos}, 'properties-info', '${info}')" rows="4" cols="50">${features[pos].properties.info[info]}</textarea></div>`
			}

			console.log()

			acc += `<div id="tab-${toLoad}-${pos}-properties-info-curiosita">`
			acc += `<button onclick="addCuriosity('${pos}')">Aggiungi curiosità</button>`
			for(let i = 0; i < features[pos].properties.info.curiosita.length; i++) {
				acc += `<div><label>${i}:</label><textarea id="${toLoad}-${pos}-properties-info-curiosita-${i}" onchange="inputChange('${toLoad}', ${pos}, 'properties-info-curiosita', '${i}')" rows="4" cols="50">${features[pos].properties.info.curiosita[i]}</textarea></div>`
			}
			acc += `</div>`

			acc += `</div>`
		}

		acc += `</div><hr>`
	}

	container.innerHTML = acc

	copyPaste.value = 'var ' + toLoad + ' = ' + JSON.stringify(window[toLoad])
}

const inputChange = function(obj, position, cat, property) {
	const el = document.getElementById(`${obj}-${position}-${cat}-${property}`)

	if(cat.split("-").length == 3) {
		let split = cat.split("-")
		window[obj].features[position][split[0]][split[1]][split[2]][property] = el.value
	} else if(cat.split("-").length == 2) {
		let split = cat.split("-")
		window[obj].features[position][split[0]][split[1]][property] = el.value
	}else if(property != 'coordinates') {
		window[obj].features[position][cat][property] = el.value
	} else {
		window[obj].features[position][cat][property] = JSON.parse(el.value)
	}

	copyPaste.value = 'var ' + getChecked() + ' = ' + JSON.stringify(window[getChecked()])
}

const showHide = function(id) {
	const el = document.getElementById(id)
	if(el.style.display === 'none') {
		el.style.display = 'block'
	} else {
		el.style.display = 'none'
	}
}

const addItem = function(){
	let toLoad = getChecked()
	window[toLoad].features.unshift(objectAssignDeep({}, window[toLoad + 'Template']))
	loadGeoJSON(toLoad)
}

const addCuriosity = function(position) {
	window.cities.features[position].properties.info.curiosita.push("")
	loadGeoJSON('cities')
}
