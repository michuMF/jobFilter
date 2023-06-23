const myRequest = new Request("./data.json")
const container = document.querySelector(".container")
const input = document.querySelector(".input")
const searchBar = document.querySelector(".searchbar")
const clearSeachBar = document.querySelector(".clear")

let jobId = []
let jobLanguages = []
let companyName
let companyLogo = []

let companyLanguages = []
let companyTools

let newParagraph
let featuredParagraph

fetch(myRequest)
	.then(response => response.json())
	.then(jobData => {
		const jobArr = jobData

		setJobsLanguages(jobArr)
		createJobList(jobArr)
	})

	.catch(error => {
		console.log(console.log(error))
	})

const setJobsLanguages = jobs => {
	jobs.forEach(job => {
		companyLanguages += job.languages
		companyLanguages += ","
	})

	jobLanguages = companyLanguages.split(",")
	jobLanguages.pop()
}

const createJobList = jobs => {
	for (i = 0; i < jobs.length; i++) {
		companyLogo = jobs[i]?.logo
		const checkNew = () => {
			if (jobs[i]?.new) {
				return `<h4 class='padding color-dark-cyan'>New!</h4>`
			} else {
				return ""
			}
		}
		const checkFeatured = () => {
			if (jobs[i]?.featured) {
				return `<h4 class="padding color-grayish-cyan"> Featured</h4>`
			} else {
				return ""
			}
		}

		const mainDiv = document.createElement("div")
		const leftDiv = document.createElement("div")
		const rightDiv = document.createElement("div")

		mainDiv.classList.add("grid", "flex")
		leftDiv.classList.add("left-flex")
		rightDiv.classList.add("right-flex")

		leftDiv.innerHTML = `<div class="left-flex"> <img src="${companyLogo}" alt="icon">
    	<div class="information-about-job">
 		  <div class="company-data">
   	  <h3> ${jobs[i]?.company}</h3>
    	${checkNew()}
    	${checkFeatured()}
    
    
  </div>

  <h1> ${jobs[i]?.position}</h1>
  <div class="paragraph">
    <ul>
      <li>${jobs[i]?.postedAt}</li>
      <li>${jobs[i]?.contract}</li>
      <li>${jobs[i]?.location}</li>
    </ul>
  </div>
</div>
</div>
<hr class="hr mobile">`

		rightDiv.innerHTML = `<div class="role">
		<h5 onclick="showInput()" class='open-input x'>${jobs[i]?.role}</h5>
		<h5 onclick="showInput()" class='open-input'>${jobs[i]?.level}</h5>
		${checkLanguage(jobs[i]?.languages)}
		${checkTools(jobs[i]?.tools)}
		
		</div>`

		mainDiv.appendChild(leftDiv)
		container.appendChild(mainDiv)
		mainDiv.appendChild(rightDiv)
	}
}

const checkLanguage = items => {
	if (!items) {
		return ""
	}
	const languages = items

	if (languages.length === 0) {
		return ""
	} else if (languages.length === 1) {
		return `<h5 onclick="showInput()" class='open-input'>${languages[0]}</h5>`
	} else if (languages.length > 1) {
		return languages
			.map(
				language =>
					`<h5 onclick="showInput()" class='open-input x'>${language}</h5>`
			)
			.join("")
	}
}
let toolsId = 1
const checkTools = items => {
	if (!items) {
		return ""
	}
	const tools = items

	if (tools.length === 0) {
		return ""
	} else if (tools.length === 1) {
		return `<h5 onclick="showInput()" class='open-input'>${tools[0]}</h5>`
	} else {
		return tools
			.map(tool => `<h5 onclick="showInput()" class='open-input'>${tool}</h5>`)
			.join("")
	}
}
let arrFilert = []
let id = 1
const showInput = () => {
	const div = document.createElement("div")
	div.classList.add("filter-icon")
	div.setAttribute("id", `${id}`)

	div.innerHTML += `<h5 class="">${event?.target.textContent}</h5><i  onclick="closeX()"class=" fa-solid fa-x"></i>`
	;(input.style.display = "flex"), "important"
	searchBar.appendChild(div)

	id++

	let allOpenInput = document.querySelectorAll(".open-input")
	// console.log(event.target)
	// console.log(allOpenInput)
}

const closeX = () => {
	const close = event.target.closest("div")
	close.remove()
}

clearSeachBar.addEventListener("click", () => (searchBar.innerHTML = ""))
