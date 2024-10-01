const button = document.querySelector(`#submitButton`)
let animeList = []

const getAnime = async () => {
    const animes = await axios.get(`https://api.jikan.moe/v4/anime?q=?limit=1000`)
    animeList = animes.data.data.map(anime => anime.title)
    //console.log(animeList)
}
//window.onload = getAnime()
async function renderData(){
    await getAnime()
}

let animeTitleEnglish = document.querySelector(`#animeTitleEnglish`)
let animeTitleJapanese = document.querySelector(`#animeTitleJapanese`)
let Synopsis = document.querySelector(`#Synopsis`)
let Card = document.querySelector(`#animeCard`)
let trailer = document.querySelector(`#trailer`)
let resultsBox = document.querySelector(`.resultBox`)
let input = document.querySelector(`#textInput`)


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
        `https://api.jikan.moe/v4/anime?q=${inputBox}&sfw`
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

input.onkeyup = function(){   
    let result = []
    let inputs = input.value
    if(inputs.length){
        result = animeList.filter((keyword)=>{
            return keyword.toLowerCase().includes(inputs.toLowerCase())
        })
         console.log(result)

    }
}

renderData()