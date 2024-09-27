const button = document.querySelector(`#submitButton`)


const getAnime = async () => {
    const animes = await axios.get(`https://api.jikan.moe/v4`)
    console.log(animes)
}

let animeTitleEnglish = document.querySelector(`#animeTitleEnglish`)
let animeTitleJapanese = document.querySelector(`#animeTitleJapanese`)

button.addEventListener(`click`, async() => {

    let input = document.querySelector(`#textInput`).value
    console.log(input)
    let response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${input}&sfw`
    )

    let titleEnglish = response.data.data[0].title_english
    let titleJapanese = response.data.data[0].title_japanese

    animeTitleEnglish.innerText = titleEnglish
    animeTitleJapanese.innerText = titleJapanese
console.log(titleEnglish)
console.log(titleJapanese)
console.log(response)
})