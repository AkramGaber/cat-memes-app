import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')


emotionRadios.addEventListener('change', highlightCheckedOption)
closeBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)


function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let element of radios){
        element.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
    class="cat-img"
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1){
        return catsArray[0]
    }else{
        const randonNumber = Math.floor(Math.random()*catsArray.length)
        return catsArray[randonNumber]
    }
}

function getMatchingCatsArray(e){
    const selectedRadio = document.querySelector('input[type="radio"]:checked')
    if(selectedRadio){
        const selectedEmotion = selectedRadio.value
        const isGif = gifsOnlyOption.checked
        const matchedCat = catsData.filter(function(cats){
            if(isGif){
                return cats.emotionTags.includes(selectedEmotion) && cats.isGif
            }else{
                return cats.emotionTags.includes(selectedEmotion)
            }
        })
        return matchedCat
    }
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <input 
            type="radio" 
            value="${emotion}" 
            id="${emotion}" 
            name="emotions"
            >
            <label for="${emotion}">${emotion}</label>
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)
