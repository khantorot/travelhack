window.addEventListener('load', function () {

    gsap.to(".text_wrapper > div", 1, {
        x: "500",
        ease: Expo.easeInOut,
        delay: 1,
        stagger: 0.1,
    });

    gsap.to(".text_wrapper", 3, {
        y: -600,
        scale: 4.5,
        rotate: -90,
        ease: Expo.easeInOut,
        delay: 1.5,
    });

    gsap.to(".text", 1, {
        opacity: 1,
        ease: Expo.easeInOut,
        delay: 3,
    });

    gsap.to(".text_wrapper > div", 4, {
        x: "-3200",
        ease: Expo.easeInOut,
        delay: 3.5,
        stagger: 0.05,
    });

    gsap.to(".text_container", 2, {
        bottom: "-100%",
        ease: Expo.easeInOut,
        delay: 6,
    });


    document.querySelector('.preloader').classList.add('hide_reloader');
});


let user = {};

chekUser();
function chekUser() {
    if (sessionStorage.getItem('user') != null) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
}

document.querySelector('.header_text').addEventListener('click', function (e) {
    if (e.target.classList.contains('modal_show_btn')) {
        if (e.target.classList.contains('reg_btn')) {
            document.querySelector('.login_form').style.display = 'none';
            document.querySelector('.registration_form').style.display = 'flex';
        } else if (e.target.classList.contains('log_btn')) {
            document.querySelector('.registration_form').style.display = 'none';
            document.querySelector('.login_form').style.display = 'flex';
        }
        document.querySelector('.modal').classList.add('modal_show');
        document.querySelector('header').classList.add('header_hide')
    }
});


document.querySelector('.close_modal_btn').addEventListener('click', function () {
    document.querySelector('.modal').classList.remove('modal_show');
    document.querySelector('header').classList.remove('header_hide');
})



const registration_inputs = document.querySelectorAll('.registration_form input');


document.querySelector('.reg_button').addEventListener('click', function (e) {

    let i = 0;
    registration_inputs.forEach(element => {
        if (element.value != '') {
            i++;
        }
    });
    if (i == registration_inputs.length) {
        e.preventDefault();
        if (registration_inputs[4].checked == true) {
            user.role = 'guest';
        } else if(registration_inputs[5].checked == true) {
            user.role = 'local';
        }

        user.name = registration_inputs[0].value;
        user.phone = registration_inputs[1].value;
        user.email = registration_inputs[2].value;
        user.pass = registration_inputs[3].value;

        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'profile.html';
    }
})

const login_inputs = document.querySelectorAll('.login_form input');

document.querySelector('.login_button').addEventListener('click', function(e){

    if (login_inputs[0].value == user.email || login_inputs[0].value == user.phone) {
        e.preventDefault();
        window.location.href = 'profile.html';
    }
});









{
    const body = document.body;

    const MathUtils = {
        lerp: (a, b, n) => (1 - n) * a + n * b,
        distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
    }

    let winsize;
    const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) {
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return { x: posx, y: posy };
    }

    let mousePos = lastMousePos = cacheMousePos = { x: 0, y: 0 };

    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    const getMouseDistance = () => MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

    class Image {
        constructor(el) {
            this.DOM = { el: el };
            this.defaultStyle = {
                x: 0,
                y: 0,
                opacity: 0
            };
            this.getRect();
            this.initEvents();
        }
        initEvents() {
            window.addEventListener('resize', () => this.resize());
        }
        resize() {
            TweenMax.set(this.DOM.el, this.defaultStyle);
            this.getRect();
        }
        getRect() {
            this.rect = this.DOM.el.getBoundingClientRect();
        }
        isActive() {
            // return TweenMax.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
        }
    }

    class ImageTrail {
        constructor() {
            this.DOM = { content: document.querySelector('.content') };
            this.images = [];
            [...this.DOM.content.querySelectorAll('img')].forEach(img => this.images.push(new Image(img)));
            this.imagesTotal = this.images.length;
            this.imgPosition = 0;
            this.zIndexVal = 1;
            this.threshold = 50;
            
            requestAnimationFrame(() => this.render());
        }
        render() {
            
            let distance = getMouseDistance();
            
            cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
            cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

            
            if (distance > this.threshold) {
                this.showNextImage();

                ++this.zIndexVal;
                this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

                lastMousePos = mousePos;
            }

            
            let isIdle = true;
            for (let img of this.images) {
                if (img.isActive()) {
                    isIdle = false;
                    break;
                }
            }
            
            if (isIdle && this.zIndexVal !== 1) {
                this.zIndexVal = 1;
            }

            requestAnimationFrame(() => this.render());
        }
        showNextImage() {
            const img = this.images[this.imgPosition];
            
            TweenMax.killTweensOf(img.DOM.el);

            new TimelineMax()
                
                .set(img.DOM.el, {
                    startAt: { opacity: 0 },
                    opacity: 1,
                    zIndex: this.zIndexVal,
                    x: cacheMousePos.x - img.rect.width / 2,
                    y: cacheMousePos.y - img.rect.height / 2
                }, 0)
                
                .to(img.DOM.el, 1.6, {
                    ease: Expo.easeOut,
                    x: mousePos.x - img.rect.width / 2,
                    y: mousePos.y - img.rect.height / 2
                }, 0)
                
                .to(img.DOM.el, 1, {
                    ease: Power1.easeOut,
                    opacity: 0
                }, 0.4)
                
                .to(img.DOM.el, 1, {
                    ease: Quint.easeInOut,
                    y: `+=${winsize.height + img.rect.height / 2}`
                }, 0.4);
        }
    }



    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('.content__img'), resolve);
        });
    };

    preloadImages().then(() => {
        new ImageTrail();
    });
}









{
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(minValue,maxValue,precision) {
        if ( typeof(precision) == 'undefined' ) {
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
    }


	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
    };
    
    class Slideshow {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.settings = {
                animation: {
                    slides: {
                        duration: 400,
                        easing: 'easeOutQuint'
                    },
                    shape: {
                        duration: 400,
                        easing: {in: 'easeOutQuint', out: 'easeInQuad'}
                    }
                },
                frameFill: '#000'
            }
            this.init();
        }
        init() {
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slides--images > .slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.DOM.nav = this.DOM.el.querySelector('.slidenav');
            this.DOM.titles = this.DOM.el.querySelector('.slides--titles');
            this.DOM.titlesSlides = Array.from(this.DOM.titles.querySelectorAll('.slide'));
            this.DOM.nextCtrl = this.DOM.nav.querySelector('.slidenav__item--next');
            this.DOM.prevCtrl = this.DOM.nav.querySelector('.slidenav__item--prev');
            this.current = 0;
            this.createFrame(); 
            this.initEvents();
        }
        createFrame() {
            this.rect = this.DOM.el.getBoundingClientRect();
            this.frameSize = this.rect.width/12;
            this.paths = {
                initial: this.calculatePath('initial'),
                final: this.calculatePath('final')
            };
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('class', 'shape');
            this.DOM.svg.setAttribute('width','100%');
            this.DOM.svg.setAttribute('height','100%');
            this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
            
            const imgFillSize = this.calculateImgFillSizes();
            this.DOM.svg.innerHTML = `
                <defs>
                    <clipPath id="shape__clip">
                        <path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>
                    </clipPath>
                </defs>
                <image xlink:href="./content/images/map.png" clip-path="url(#shape__clip)" x="0" y="0" width="${imgFillSize.width}px" height="${imgFillSize.height}px"/>
            `;
            this.DOM.el.insertBefore(this.DOM.svg, this.DOM.titles);
            this.DOM.shape = this.DOM.svg.querySelector('path');
            this.DOM.imgFill = this.DOM.svg.querySelector('image');
        }
        calculateImgFillSizes() {
            const ratio = Math.max(this.rect.width / 1920, this.rect.height / 825);
            return {width: 1920*ratio, height: 825*ratio};
        }
        updateFrame() {
            this.paths.initial = this.calculatePath('initial');
            this.paths.final = this.calculatePath('final');
            this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
            this.DOM.shape.setAttribute('d', this.isAnimating ? this.paths.final : this.paths.initial);
            const imgFillSize = this.calculateImgFillSizes();
            this.DOM.imgFill.setAttribute('width',`${imgFillSize.width}px`);
            this.DOM.imgFill.setAttribute('height',`${imgFillSize.height}px`);
        }
        calculatePath(path = 'initial') {
            const r = Math.sqrt(Math.pow(this.rect.height,2) + Math.pow(this.rect.width,2));
            const rInitialOuter = r;
            const rInitialInner = r;
            const rFinalOuter = r;
            const rFinalInner = this.rect.width/3*getRandomFloat(0.2,0.4);
            const getCenter = () => `${getRandomInt(rFinalInner,this.rect.width-rFinalInner)}, ${getRandomInt(rFinalInner,this.rect.height-rFinalInner)}`;
            return path === 'initial' ? 
                `M ${this.rect.width/2}, ${this.rect.height/2} m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${rInitialOuter-rInitialInner} a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z` :
                `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter-rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
        }
        initEvents() {
            this.DOM.nextCtrl.addEventListener('click', () => this.navigate('next'));
            this.DOM.prevCtrl.addEventListener('click', () => this.navigate('prev'));
            
            window.addEventListener('resize', debounce(() => {
                this.rect = this.DOM.el.getBoundingClientRect();
                this.updateFrame();
            }, 20));
            
            document.addEventListener('keydown', (ev) => {
                const keyCode = ev.keyCode || ev.which;
                if ( keyCode === 37 ) {
                    this.navigate('prev');
                }
                else if ( keyCode === 39 ) {
                    this.navigate('next');
                }
            });
        }
        navigate(dir = 'next') {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            const animateShapeIn = anime({
                targets: this.DOM.shape,
                duration: this.settings.animation.shape.duration,
                easing: this.settings.animation.shape.easing.in,
                d: this.calculatePath('final')
            });

            const animateSlides = () => {
                return new Promise((resolve, reject) => {
                    const currentSlide = this.DOM.slides[this.current];
                    anime({
                        targets: currentSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateY: dir === 'next' ? -1*this.rect.height : this.rect.height,
                        complete: () => {
                            currentSlide.classList.remove('slide--current');
                            resolve();
                        }
                    });

                    const currentTitleSlide = this.DOM.titlesSlides[this.current];
                    anime({
                        targets: currentTitleSlide.children,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        delay: (t,i,total) => dir === 'next' ? i*100 : (total-i-1)*100,
                        translateY: [0, dir === 'next' ? -100 : 100],
                        opacity: [1,0],
                        complete: () => {
                            currentTitleSlide.classList.remove('slide--current');
                            resolve();
                        }
                    });
        
                    this.current = dir === 'next' ? 
                        this.current < this.slidesTotal-1 ? this.current + 1 : 0 :
                        this.current > 0 ? this.current - 1 : this.slidesTotal-1; 
                    
                    const newSlide = this.DOM.slides[this.current];
                    newSlide.classList.add('slide--current');
                    anime({
                        targets: newSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateY: [dir === 'next' ? this.rect.height : -1*this.rect.height,0]
                    });
        
                    const newSlideImg = newSlide.querySelector('.slide__img');
                    anime.remove(newSlideImg);
                    anime({
                        targets: newSlideImg,
                        duration: this.settings.animation.slides.duration*4,
                        easing: this.settings.animation.slides.easing,
                        translateY: [dir === 'next' ? 100 : -100, 0]
                    });
        
                    const newTitleSlide = this.DOM.titlesSlides[this.current];
                    newTitleSlide.classList.add('slide--current');
                    anime({
                        targets: newTitleSlide.children,
                        duration: this.settings.animation.slides.duration*2,
                        easing: this.settings.animation.slides.easing,
                        delay: (t,i,total) => dir === 'next' ? i*100+100 : (total-i-1)*100+100,
                        translateY: [dir === 'next' ? 100 : -100 ,0],
                        opacity: [0,1]
                    });
                });
            };

            const animateShapeOut = () => {
                anime({
                    targets: this.DOM.shape,
                    duration: this.settings.animation.shape.duration,
                    //delay: 100,
                    easing: this.settings.animation.shape.easing.out,
                    d: this.paths.initial,
                    complete: () => this.isAnimating = false
                });
            }

            animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
        }
    };

    new Slideshow(document.querySelector('.slideshow'));
    imagesLoaded('.slide__img', { background: true }, () => document.body.classList.remove('loading'));
};



