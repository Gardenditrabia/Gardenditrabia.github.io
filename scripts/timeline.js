const timelineDiv = document.getElementById('timeline')

const load = function() {
	let acc = ""

	let entries = timeline.entries
	for(let i = 0; i < entries.length; i++) {
		if(entries[i].important) 
			acc += `<div class="container ${entries[i].side} important">`
		else 
			acc += `<div class="container ${entries[i].side}">`
			  
		acc += `<div class="content">`
		acc += `<h2>${entries[i].date}</h2>`
		
		if(entries[i].description)
			acc += `<p>${entries[i].description}</p>`
			  
		acc+= `</div></div>`
	}

	timelineDiv.innerHTML = acc
}