const showSection = (sectionClass) => {
    document.querySelectorAll('section').forEach( s => s.classList.add('hidden'))
    document.querySelector(sectionClass).classList.remove('hidden')
}

const showLogin = () => { showSection('.login')}
const showSignup = () => {showSection('.signup')}
const showDashboard = () => {showSection('.dashboard')}
const showProfile = () => {showSection('.profile')}


const loggedIn = () => {
    document.querySelector('#login-link').classList.add('hidden')
    document.querySelector('#signup-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.remove('hidden')
    document.querySelector('#dashboard-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.remove('hidden')
}
const loggedOut = () => {
    document.querySelector('#logout-link').classList.add('hidden')
    document.querySelector('#dashboard-link').classList.add('hidden')
    document.querySelector('#profile-link').classList.add('hidden')
    document.querySelector('.login').classList.add('hidden')
    document.querySelector('.signup').classList.add('hidden')
    document.querySelector('.profile').classList.add('hidden')
    document.querySelector('.dashboard').classList.add('hidden')
}

//toggle between login and logout
if(localStorage.getItem('userId')){
    loggedIn()
    showDashBoard()
  }else{
    loggedOut()
  }

document.querySelector('#home-link').addEventListener('click', () => {
    location.reload();
})

//dashboard link
document.querySelector('#dashboard-link').addEventListener('click', () => {
    showDashBoard()
})


//signup
document.querySelector('#signup-link').addEventListener('click', () => {
    showSection('.signup')
document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const name = document.querySelector('#signup-name').value
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value
    const babyName = document.querySelector('#signup-babyName').value
    const birthday = document.querySelector('#signup-birthday').value
    const gender = document.querySelector('#signup-gender').value
    try {
        const response = await axios.post('http://localhost:3001/users', {
            name: name,
            email: email,
            password: password,
            babyName: babyName,
            birthday: birthday,
            gender: gender
        })

            const userId = response.data.user.id
            localStorage.setItem('userId', userId)
            showLoginBoard()
            alert('Welcome ${response.data.user.babyName}!')

    } catch (error) {
        alert('Email is already used by someone')
    }


//login
document.querySelector('#login-link').addEventListener('click', () => {
    showSection('.login')
document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

try {
    const response = await axios.post('http://localhost:3001/users/login', {
        email: email,
        password: password
    })

    const userId = response.data.user.id
    localStorage.setItem('userId', userId)

    alert(`Hi ${response.data.user.babyName} !`)
    showDashBoard()
    loggedIn()


} catch (error) {
    console.log(error)
    alert('Email or password is incorrect, please try again')
}
})
})


//Logout
document.querySelector('#logout-link').addEventListener('click', () =>{
    localStorage.removeItem('userId')
    location.reload();
})


//Delete user account
let deleteAccount = document.querySelector('.deleteProfile').addEventListener('click', async () => {
    let userId = localStorage.getItem('userId')
    const response = await axios.delete(`http://localhost:3001/users/${userId}`)
    alert(`See you Later, ${response.data.user.BabyName}!`)
    localStorage.removeItem('userId')
    location.reload();
})

//Search by date
let searchForm = document.querySelector('#babyTracker-form')
searchForm.addEventListener('submit', async(event) => {
    event.preventDefault()
    try {
        const searchBar = document.querySelector('#babyData-search').value


        const response = await axios.get(`http://localhost:3001/babyTracker/search/${searchBar}`)

        showResults(response.data)
        saveSearch(response.data)
    } catch (error) {
        console.log(error)
    }
})

//results -- need help with this

const showResults = (data) => {
    let searchResults = document.querySelector('.search-result-container')
    searchResults.classList.remove('hidden')
    let saveButton = document.querySelector('.saveSearch')
    saveButton.classList.remove('hidden')


    let resultDate = document.querySelector('#result-date')
    resultDate.innerText = data.parsed[0].babyTracker.label

}


//show saved data
const getAllData = async () => {
    let userId = localStorage.getItem('userId')
    let response = await axios.get(`http://localhost:3001/users/${userId}/getbabyTracker`)
    // console.log(response.data)
    let data = response.data
    let savedItemBoard = document.querySelector('.saved-item')

    while(savedItemBoard.firstChild) {
        savedItemBoard.firstChild.remove()
 }

//Profile setting
document.querySelector('#profile-link').addEventListener('click', (event) =>{
    event.preventDefault()
    showProfileBoard()
    showUserInfo()
    editProfile()
})

//Show userinfo
const showUserInfo = async () => {
    let userId = localStorage.getItem('userId')
    let response = await axios.get(`http://localhost:3001/users/${userId}/`)
    let data = response
    // console.log(data)

    let name = document.querySelector('#edit-name')
        name.setAttribute('value', `${response.data.user.name}`)
    let email = document.querySelector('#edit-email')
        email.setAttribute('value', `${response.data.user.email}`)
    let password = document.querySelector('#edit-password')
        password.setAttribute('value', `${response.data.user.password}`)
    let babyName = document.querySelector('#edit-babyName')
        babyName.setAttribute('value', `${response.data.user.babyName}`)
    let birthday = document.querySelector('#edit-birthday')
        birthday.setAttribute('value', `${response.data.user.birthday}`)
    let gender = document.querySelector('#edit-gender')
        gender.setAttribute('value', `${response.data.user.gender}`)

}
//Edit account info

const editProfile = async () => {
    document.querySelector('.user-info-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const name = document.querySelector('#edit-name').value
    const email = document.querySelector('#edit-email').value
    const password = document.querySelector('#edit-password').value
    const babyName = document.querySelector('#edit-babyName').value
    const birthday = document.querySelector('#edit-birthday').value
    const gender = document.querySelector('#edit-gender').value


    try {
        let userId = localStorage.getItem('userId')
        let response = await axios.put(`http://localhost:3001/users/${userId}/edit`, {
            name: name,
            email: email,
            password: password,
            babyName: babyName,
            gender: gender
        })
        // console.log(response)
        alert('Profile info is successfully changed')
    } catch (error) {
        console.log(error)
    }
})
}
