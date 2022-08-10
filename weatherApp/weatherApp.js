window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section h2');
    let temperatureSpan = document.querySelector('.degree-section span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sofia?unitGroup=metric&include=current&key=8KMD372YW2Q8GMA8MVMBV36BS&contentType=json`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const{temp, conditions, icon} = data.currentConditions;
                // console.log({temp, conditions});
                //Set dom Elements from API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = conditions;
                locationTimezone.textContent = data.timezone;
                
                //formula F to C
                // let celsius = (temp - 32) * (5/9);
                let fahrenheit = (temp * (9/5)) + 32;
                //set icons
                setIcons(icon, document.querySelector(".icon"));
            
                //change temperature F to C
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "C" ) {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(fahrenheit);
                        }else{
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temp;
                        }
                })
            
            });
        });
    }else{
        h1.textContent = "We are not able to assist you, please allow your browser location or check your settings!"

    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});