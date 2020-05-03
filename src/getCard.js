export default class GetCard{
    constructor(data,swiper,id){
        this.data = data
        this.href = 'https://www.imdb.com/title/'+id
        this.title = data.Title.length>23 ? data.Title.slice(0,20)+'...' : data.Title
        this.poster = data.Poster === 'N/A' ? '/img/cinema.jpg' : data.Poster
        this.year = data.Year;
        this.rating = data.imdbRating
        this.parent = document.querySelector('.swiper-wrapper')
        this.swiper = swiper
    }
    renderHtmlElement(parent, tag, className, inner, src, href){
        const element = document.createElement(tag); 
        if(className){
            element.className = className
        }
        if(inner){
            element.innerHTML = inner
        }
        if(src){
            element.src = src
        }
        if(href){
            element.href = href
        }
        parent.append(element)
        return element
    }
    render(){
        const wrapperHTML = this.renderHtmlElement(this.parent, 'div', 'swiper-slide')
        const title = this.renderHtmlElement(wrapperHTML, 'a', 'title', this.title, null, this.href)
        const poster = this.renderHtmlElement(wrapperHTML, 'img', 'poster', null,  this.poster)
        const year = this.renderHtmlElement(wrapperHTML, 'p', 'year', this.year)
        const rating = this.renderHtmlElement(wrapperHTML, 'p', 'rating', this.rating)
        this.swiper.updateProgress();
        this.swiper.updateSlides();
        this.swiper.update()
        // this.swiper.updateContainerSize()
        // this.swiper.update()
    }
    init(){
        this.render()
    }
}