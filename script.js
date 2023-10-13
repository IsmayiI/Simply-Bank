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
const navLink = document.querySelectorAll('.nav__link')
const navLinks = document.querySelector('.nav__links')

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
   if (e.target.classList.contains('nav__link')) {
      const href = e.target.getAttribute('href')
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
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


// ========================================Code







