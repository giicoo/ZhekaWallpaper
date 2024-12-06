const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
    console.log('Connected to the server');
    socket.send(JSON.stringify({ type: 'greeting', message: 'Hello, server!' }));
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Message from server:', data);
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});


socket.addEventListener('close', () => {
  console.log('Connection closed');
});


function updateWeather() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=Tula,ru&appid=5b2c84c4859a9efb2401c9c9fec0fb6f",
        type: "GET",
        crossDomain: true,
        data: "",
        dataType: "json",
        success: function (response) {
            
                var resp = JSON.parse(JSON.stringify(response));

            $("#temp").text((resp.main.temp).toFixed(2)+"К");
            $("#weath").text(resp.weather[0].main);
            console.log();
            console.log(resp.main.temp)

            
        },
        error: function (xhr, status) {
                
            fetch('./HanyiSentyPagoda.ttf')
            .then(resp => resp.arrayBuffer())
            .then(font => {
                const fontFace = new FontFace('HanyiSentyPagoda', font);
                document.fonts.add(fontFace);
                
            })
           
            $("#weath").text("万口人乚山口认");
            $("#temp").text("冂凵匚扣卄");
            $("#weath").css("font-family", "HanyiSentyPagoda");
            $("#temp").css("font-family", "HanyiSentyPagoda");


            
        }
    });
} setInterval(updateWeather, 3.6e+6);

function updateTime() { 
    const now = new Date(); 
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const date = now.getDate().toString();
    const month = now.getMonth() + 1;
    month.toString();
    const year = now.getUTCFullYear().toString();
    document.getElementById('time').textContent = `${hours}:${minutes}`; 
    document.getElementById('Date_month').textContent = `${date}.${month}.${year}`;
} setInterval(updateTime, 1000);

updateWeather();


$(document).ready(function(){
    $('#browser').click(function() {
        generateTip();
    }); 
  });

  function generateTip() {
    socket.send(JSON.stringify({ type: 'greeting', message: 'Button click' }));
  }







