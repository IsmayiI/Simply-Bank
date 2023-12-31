'use strict';

// ========================================Variables

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
   '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('section--1')
const section2 = document.getElementById('section--2')
const section3 = document.getElementById('section--3')
const navLinks = document.querySelector('.nav__links')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const operationsTabContainer = document.querySelector('.operations__tab-container')
const dotsContainer = document.querySelector('.dots')



let currentSlide = 0
const countSlides = slides.length

// ========================================Functions



const openModalWindow = (e) => {
   e.preventDefault()
   modalWindow.classList.remove('hidden');
   overlay.classList.remove('hidden');
};

const closeModalWindow = () => {
   modalWindow.classList.add('hidden');
   overlay.classList.add('hidden');
};

const scrollToSection = (e) => {
   e.preventDefault()
   if (e.target.classList.contains('nav__link') && e.target.getAttribute('href') !== '#') {
      const href = e.target.getAttribute('href')
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
   }
}

const onActiveTab = (tab, content) => {
   if (!tab || !content) return
   tab.classList.add('operations__tab--active')
   content.classList.add('operations__content--active')
}

const offActiveTab = (tab, content) => {
   if (!tab || !content) return
   tab.classList.remove('operations__tab--active')
   content.classList.remove('operations__content--active')
}

const activateTab = (e) => {
   const activeTab = e.target
   if (activeTab.classList.contains('operations__tab')) {
      const tabs = document.querySelectorAll('.operations__tab')
      const contents = document.querySelectorAll('.operations__content')
      const activeContent = document.querySelector(`.operations__content--${activeTab.dataset.tab}`)

      tabs.forEach((tab, i) => offActiveTab(tab, contents[i]))
      onActiveTab(activeTab, activeContent)
   }
}

const animationHoverNavLinks = (e, op) => {
   if (e.target.classList.contains('nav__link')) {
      const activeLink = e.target
      const links = [...document.querySelectorAll('.nav__link')].filter(link => link !== activeLink)

      links.forEach(link => link.style.opacity = op)
   }
}

const moveSlide = (currentSlide) => {
   slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`
   })
}

const nextSlide = () => {
   if (currentSlide === countSlides - 1) {
      currentSlide = 0
   } else {
      currentSlide += 1
   }

   moveSlide(currentSlide)
   activeDot(currentSlide)
}

const previousSlide = () => {
   if (currentSlide === 0) {
      currentSlide = countSlides - 1
   } else {
      currentSlide -= 1
   }

   moveSlide(currentSlide)
   activeDot(currentSlide)

}

const activeDot = (currentSlide) => {
   document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
   document.querySelector(`.dots__dot[data-slide="${currentSlide}"]`).classList.add('dots__dot--active')
}


// ========================================Events

document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
      closeModalWindow();
   }
});

btnScrollTo.addEventListener('click', () => {
   section1.scrollIntoView({ behavior: 'smooth' })
})

btnsOpenModalWindow.forEach(btn => btn.addEventListener('click', openModalWindow))

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

navLinks.addEventListener('click', scrollToSection)

navLinks.addEventListener('mouseover', (e) => {
   animationHoverNavLinks(e, 0.5)
})

navLinks.addEventListener('mouseout', (e) => {
   animationHoverNavLinks(e, 1)
})

operationsTabContainer.addEventListener('click', activateTab)

btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', previousSlide)

document.addEventListener('keydown', (e) => {
   if (e.key === 'ArrowRight') nextSlide()
   if (e.key === 'ArrowLeft') previousSlide()
})

dotsContainer.addEventListener('click', (e) => {
   if (e.target.classList.contains('dots__dot')) {
      currentSlide = +e.target.dataset.slide

      moveSlide(currentSlide)
      activeDot(currentSlide)
   }
})


// ========================================Observe


// === Header

const navHeight = nav.getBoundingClientRect().height

const observerCallback = (entries) => {
   const entry = entries[0]

   if (!entry.isIntersecting) {
      nav.classList.add('sticky')
   }
   else {
      nav.classList.remove('sticky')
   }
}

const observerHeader = new IntersectionObserver(observerCallback, {
   root: null,
   threshold: 0,
   rootMargin: `-${navHeight}px`
})

observerHeader.observe(header)

// === Sections

const allSections = document.querySelectorAll('.section')

const appearanceSection = (entries, observer) => {
   entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.remove('section--hidden')
      observer.unobserve(entry.target)
   })
}

const observerSection = new IntersectionObserver(appearanceSection, {
   root: null,
   threshold: 0.2,
})

allSections.forEach(section => {
   observerSection.observe(section)
   section.classList.add('section--hidden')
})

// === Images

const lazyImages = document.querySelectorAll('img[data-src]')

const showImage = (entries, observer) => {
   entries.forEach(entry => {
      const lazyImg = entry.target
      if (!entry.isIntersecting) return
      lazyImg.src = lazyImg.dataset.src
      lazyImg.addEventListener('load', () => {
         lazyImg.classList.remove('lazy-img')
      })
      observer.unobserve(lazyImg)
   })
}

const observerLazyImages = new IntersectionObserver(showImage, {
   root: null,
   threshold: 0.8,
})

lazyImages.forEach(img => observerLazyImages.observe(img))


// ========================================Code


slides.forEach((_, i) => {
   const dot = `<button class="dots__dot" data-slide="${i}"></button>`
   dotsContainer.insertAdjacentHTML('beforeend', dot)
})


moveSlide(0)
activeDot(currentSlide)






























