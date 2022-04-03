let num;
function loadDoc() {
    let ajaxCall = new XMLHttpRequest();
    ajaxCall.onload = function () {
        console.log('sucess...');
        if (this.readyState == 4 && this.status == 200) {
            let x = JSON.parse(this.responseText);
            num = x.length;
            document.getElementById("view").innerHTML =`${num} Photos`;
            x.forEach((obj) => {
                document.getElementById(
                    "photo"
                ).innerHTML += `<div id=${obj.id} class="gallery" onclick="fade(${obj.id})">
                        <img src=${obj.url} width="400" height="300"/>
                        <div class="desc">${obj.title}</div>
                     </div>`;
            });
        }
    };
    ajaxCall.open("GET", "https://jsonplaceholder.typicode.com/albums/2/photos", true);
    ajaxCall.send();
}
function fade(id) {
    let element = document.getElementById(id);
    let op = 1;
    let timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.remove();
            num--;
            document.getElementById(
                "count"
            ).innerHTML = `<div>${num} Photos</div>`;
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 50);
}