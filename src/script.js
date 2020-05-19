import Swiper from 'swiper';
import GetCard from './getCard';

var swiper = new Swiper('.swiper-container', {
  // slidesPerView: 4,
  // spaceBetween: 30,
  slidesPerGroup: 1,
  loop: false,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1700: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    800: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    }
});


// console.log(document.body.clientWidth)

// bodySize()

// function bodySize(){
//   let size = document.body.clientWidth
//   if(size< 1650){
//     console.log(swiper.slidesPerView)
//   }
// }

let isAddSlide = false
let isDeleteSilides = false
let page = 1
let word = 'interstellar'
getInfo(word)
document.querySelector('form').addEventListener('submit', (e)=>{
  e.preventDefault()
  isAddSlide = false
  isDeleteSilides = true
  word = document.querySelector('.text').value
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200422T141128Z.dd52065382ad8a96.75a601c4137245008380fc26f2e31d94eaa0a27c&text= ${word} &lang=ru-en`)
  .then(res => res.json())
  .then(data => {
  word = data.text[0].trim();
  getInfo(data.text[0].trim())
  })
})

swiper.on('fromEdge', function () {
  isAddSlide = true
});

swiper.on('reachEnd', function () {
  if(isAddSlide){
    page++
    getInfo(word);
  }
});






function getInfo(word){
  let url
  if(isAddSlide){
    url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=8229539e`;
  } else {
    url = `https://www.omdbapi.com/?s=${word}&apikey=8229539e`
  }
  loaderOn()


  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.Response)
    if(data.Search === undefined){
      document.querySelector('.info').innerHTML = 'No results were found for ' + word
      loaderOff()
    } 
    else if(isDeleteSilides){
      page = 1
      document.querySelector('.swiper-wrapper').innerHTML = ''
      infoCard(data.Search)
      isDeleteSilides = false
      document.querySelector('.info').innerHTML = 'Showing results for ' + word
    }
    else if(!isDeleteSilides){
      infoCard(data.Search)
    }
  })
}


function infoCard(info){
  loaderOff()
  info.forEach(item => {
    fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=8229539e`)
    .then(res => res.json())
    .then(data => {
    const card = new GetCard(data,swiper,item.imdbID);
    card.init()
    })

  })
}


function loaderOn(){
  document.querySelector('.swiper-container').style.display = 'none';
  document.querySelector('.camera__wrap').style.display = 'block';

  document.querySelector('.delete').style.display = 'none';
  document.querySelector('.loader').style.display = 'block';
}

function loaderOff(){
  document.querySelector('.swiper-container').style.display = 'block';
  document.querySelector('.camera__wrap').style.display = 'none';

  document.querySelector('.delete').style.display = 'block';
  document.querySelector('.loader').style.display = 'none';
}

document.querySelector('.delete').addEventListener('click', ()=>{
  document.querySelector('.text').value = ''
})