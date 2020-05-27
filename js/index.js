/*on page load
    show the first 50 monsters
    show their name, age, description

    get container div
    create div for each monster
    put in html and interopolate vars for each monster
    append each monster div to container div

    create a monster creation form in the 
    create monster div
    do a submit event, and a post fetch to add the monster to api
    get the form.name, form.age, form.description values from the form
    put that data in the body json stringify

    have a button, that when clicked,
    it patches/updates/rerenders(depending on how you want to do it)
    the page with the next 50 monsters

    mistake #1, if ur storing of a div keeps returning null, check
    if ur js script tag is before or after the creation of those HTML elements
    !!!!so move ur script tag to right before the end of the body
    *********
*/

// MAJOR KEY!!! Add name="name", name="age", name="description"
// to the form HTML, allows easy access to form.name.value, form.age.value, etc
// so, once we submit the form, grab the values in it
// ******** MAJOR KEY ALERT^ */

// cristian notes

// always render items of the same type with the same function

// the document is not created everytime, so you don't need to
// re-add its events.
// dont fucking nest ur events

// by adding unique ids to elements and their containers
// we can match elements by these ids and manipulate them
//     ex)   quoteItem.id = `quote-card-${quote.id}`

const monsterContainer = document.querySelector("#monster-container")
const monsterForm = document.querySelector("#create-monster")
let page = 1
// const buttonForward = document.querySelector("#forward")


document.addEventListener("DOMContentLoaded", function (event) {

    const getDataAndRender = (page = 0, limit = 50) => {
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(renderMonsters)
    }
    getDataAndRender()

    function renderMonster(monster) {
        monsterDiv = document.createElement("div")
        monsterDiv.innerHTML =
            `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
            `
        monsterContainer.append(monsterDiv)
    }

    function renderMonsters(monsters) {
        monsterContainer.innerHTML = ""
        monsterForm.innerHTML =
            `<form id="monster-form">
            <input name="name" id="name" placeholder="name...">
            <input name="age" id="age" placeholder="age...">
            <input name="description" id="description" placeholder="description...">
            <button>Create</button>
            </form>`
        monsters.forEach(monster => {
            renderMonster(monster)
        })
    }

    document.addEventListener("submit", function (event) {
        event.preventDefault()
        const form = event.target

        const name = form.name.value
        const age = form.age.value
        const description = form.description.value

        fetch(`http://localhost:3000/monsters/?_limit=50`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'applcation/json'
            },
            body: JSON.stringify(
                { name, age, description }
            )
        })
            .then(response => response.json())
            .then(newMonster => {
                renderMonster(newMonster)
            })
    })

    document.addEventListener("click", function (event) {
        const button = event.target
        if (button.id === "forward") {
            page += 1
            console.log("page", page, new Date())
            //the console above is so you can see
            // when each page is being loaded
            getDataAndRender(page)
        }
        else if (button.id === "back"){
            page--
            getDataAndRender(page)
        }
    })
    
})
