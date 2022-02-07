// define map
const map = L.map('map').setView([51.505, -0.09], 13);
// set location anchor
const icon = L.icon({
    iconUrl: './images/icon-location.svg',
    // iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




// get IP Form
const iPForm = document.querySelector('.input-ip-form')
// get errorText elemenet
const errText = document.querySelector('.error-text')
iPForm.addEventListener('submit', e => {
    e.preventDefault()

    const ip = document.querySelector('#ip-input').value

    // IP API
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_p0i02HLBe6rmQmR9XcothmSx55eo9&ipAddress=${ip}`)
    .then(result => result.json())
    .then(res =>{
        const infoPanel = document.querySelector('.info-panel')

        // if inputed stringis not ip address
        if(res.code == 422) {
            // get info panel
            infoPanel.classList.remove('appear')
            errText.innerText = `Please ${res.messages}`
            alert(`Error : Please ${res.messages}`)
            console.error(`Please ${res.messages}`)

            return false
        }

        // set error text to null
        errText.innerText = ''
        
        // set map view
        const lat = res.location.lat
        const lng = res.location.lng
        map.panTo(L.latLng(lat, lng))
        L.marker([lat, lng], {icon: icon}).addTo(map)
        // add 'appear' class to info panel
        infoPanel.classList.add('appear')
        // get all the info id
        const ip = document.querySelector('#ip')
        const location = document.querySelector('#location')
        const timezone = document.querySelector('#timezone')
        const isp = document.querySelector('#isp')
        // set all information
        ip.innerText = res.ip
        location.innerText = `${res.location.city}, ${res.location.country}`
        timezone.innerText = `UTC ${res.location.timezone}`
        isp.innerText = res.isp
    
    })
    .catch(err => console.log(err))

})



