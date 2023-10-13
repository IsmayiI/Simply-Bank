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

const operationsTabContainer = document.querySelector('.operations__tab-container')

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

operationsTabContainer.addEventListener('click', activateTab)



// ========================================Code










