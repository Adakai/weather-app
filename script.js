window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = temperatureSection.children[1];
    let iconID = document.querySelector('.icon');
    

    //console.log(temperatureSpan.textContent);
    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = "https://bypasscors.herokuapp.com/api/?url=" + encodeURIComponent(`https://api.darksky.net/forecast/e699a9b218f5a3b72a6fb2312ef5947e/${lat},${long}`);

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    // set DOM elements from the API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // set degree to celsisu/farenheit
                    let celsisu = ((temperature - 32) * (5 / 9))

                    // set icon
                    setIcons(icon, iconID);

                    // change temperature to celsius/farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsisu);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    });
                });
        });
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

