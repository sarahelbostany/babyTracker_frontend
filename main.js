const url = 'http://localhost:3001/'



const navBar = document.querySelector('.navBar')

const signupPage = document.querySelector('.signupPage')
const loginPage = document.querySelector('.loginPage')
const profilePage = document.querySelector('.profilePage')
const searchPage = document.querySelector('.searchPage')
const showSignUp = document.querySelector('#signupBtn')
const babyTrackerResults = document.querySelector('.babyTrackerResults')


//Nav links
const homeLink = document.querySelector('#home-link')
const profileLink = document.querySelector('#profile-link')
const searchLink = document.querySelector('#search-link')
const logoutLink = document.querySelector('#logout-link')








//button
const addInfo = document.querySelector('.addInfo')



//Form
const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#loginForm')




//Load on screen
const HomePage = () => {
    logInPage.classList.remove('hidden')
    signupPage.classList.add('hidden')
    profilePage.classList.add('hidden')
}
atHomeScreen()
