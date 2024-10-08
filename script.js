const button = document.querySelector(`#submitButton`)
let input = document.querySelector(`#textInput`)
let animeList = []
const regex = new RegExp('★', 'gi')
const subst = ' '
const getAnime = async () => {
    const animes = await axios.get(`https://api.jikan.moe/v4/anime?q=${input.value}&sfw&limit=4`)
    console.log()
    animeList = animes.data.data.map(anime => anime.title)
    console.log(animes)
}

let animeTitleEnglish = document.querySelector(`#animeTitleEnglish`)
let animeTitleJapanese = document.querySelector(`#animeTitleJapanese`)
let Synopsis = document.querySelector(`#Synopsis`)
let Card = document.querySelector(`#animeCard`)
let trailer = document.querySelector(`#trailer`)
let resultsBox = document.querySelector(`.resultBox`)



async function animeSearch() {
    
    let inputBox = document.querySelector(`#textInput`).value
    console.log(input)
    let substitute = inputBox.replace(regex, subst)
    let response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${substitute}&sfw&limit=4`, 
    )
    let titleEnglish = response.data.data[0].title_english
    let titleJapanese = response.data.data[0].title_japanese
    let animeSynopsis = response.data.data[0].synopsis
    let animeCard = response.data.data[0].images.jpg.image_url
    let animeTrailer = response.data.data[0].trailer.embed_url

    animeTitleEnglish.innerText = titleEnglish
    animeTitleJapanese.innerText = titleJapanese
    Synopsis.innerText = animeSynopsis
    Card.setAttribute (`src`, `${animeCard}`)
    trailer.setAttribute (`src`, `${animeTrailer}`)

console.log(titleEnglish)
console.log(titleJapanese)
console.log(response)
}


input.addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
            animeSearch()
            e.preventDefault()
    }
})

button.addEventListener(`click`, () => {
    animeSearch()
})
let typingTimer
let doneTypingInterval = 1000

input.addEventListener(`keyup`, () =>{
    clearTimeout(typingTimer);
    if (input.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
})

async function doneTyping(){   
    await getAnime()
    let result = []
    let inputs = input.value
    if(inputs.length){
        
        result = animeList.filter((keyword)=>{
            return keyword.toLowerCase().includes(inputs.toLowerCase())
        })
         console.log(result)

    }
    display(result)

    if(!result.length){
        resultsBox.innerHTML = ""
    }
}

async function display(result){
    const content = result.map((list) =>{
        return "<li onclick=selectInput(this)>" + list + "</li>"
    })

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>"
}
function selectInput(list){
    input.value = list.innerText

    animeSearch()
}

