const button = document.querySelector(`#submitButton`)
let input = document.querySelector(`#textInput`)
let tempSelector = document.querySelector(`#textInput`).value
let animeList = []


const getAnime = async () => {
    const animes = await axios.get(`https://api.jikan.moe/v4/anime?q=${input.value}`)
    console.log()
    animeList = animes.data.data.map(anime => anime.title)
    console.log(animes)
}
//window.onload = getAnime()
// async function renderData(){
//     await getAnime()
// }

let animeTitleEnglish = document.querySelector(`#animeTitleEnglish`)
let animeTitleJapanese = document.querySelector(`#animeTitleJapanese`)
let Synopsis = document.querySelector(`#Synopsis`)
let Card = document.querySelector(`#animeCard`)
let trailer = document.querySelector(`#trailer`)
let resultsBox = document.querySelector(`.resultBox`)



// button.addEventListener(`click`, async() => {

//     let input = document.querySelector(`#textInput`).value
//     console.log(input)
//     let response = await axios.get(
//         `https://api.jikan.moe/v4/anime?q=${input}&sfw`
//     )

//     let titleEnglish = response.data.data[0].title_english
//     let titleJapanese = response.data.data[0].title_japanese
//     let animeSynopsis = response.data.data[0].synopsis
//     let animeCard = response.data.data[0].images.jpg.image_url
//     let animeTrailer = response.data.data[0].trailer.embed_url

//     animeTitleEnglish.innerText = titleEnglish
//     animeTitleJapanese.innerText = titleJapanese
//     Synopsis.innerText = animeSynopsis
//     Card.setAttribute (`src`, `${animeCard}`)
//     trailer.setAttribute (`src`, `${animeTrailer}`)
//     input.onkeyup = function(){
//         let result = []
//         let inputs = input.value
//         if(inputs.length){
//             result = response.data.filter((anime) =>{
//                 anime.includes(inputs)
//             })
//             console.log(result)

//         }
//     }
// console.log(titleEnglish)
// console.log(titleJapanese)
// console.log(response)
// })

async function animeSearch() {
    
    let inputBox = document.querySelector(`#textInput`).value
    console.log(input)
    let response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${inputBox}&sfw`, {timeout: 3000}
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
    // input.onkeyup = function(){
    //     let result = []
    //     let inputs = input.value
    //     if(inputs.length){
    //         result = response.data.filter((anime) =>{
    //             anime.includes(inputs)
    //         })
    //         console.log(result)

    //     }
    // }
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

input.onkeyup = async function(){   
    await delay(2000)
    getAnime()
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

//renderData()

function display(result){

    const content = result.map((list) =>{
        return "<li>" + list + "</li>"
    })

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>"
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
