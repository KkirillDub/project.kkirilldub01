// === ПОИСК ===
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const engine = document.getElementById("search-engine");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if(query !== ""){
        if(engine.value === "AI"){
            // Открываем ChatGPT AI с новой страницей
            window.open("https://talkai.info/ru/chat/", "_blank");
        } else {
            const searchURL = engine.value + encodeURIComponent(query);
            window.open(searchURL, "_blank");
        }
        input.value = "";
    }
});

engine.addEventListener("change", () => {
    if(engine.value === "AI"){
        input.placeholder = "Спросите у AI";
    } else {
        input.placeholder = "Введите запрос...";
    }
});

// === ЧАСЫ И ДАТА ===
function updateTime(){
    const now = new Date();
    let hours = now.getHours(), minutes = now.getMinutes();
    hours = hours<10?"0"+hours:hours;
    minutes = minutes<10?"0"+minutes:minutes;
    document.getElementById("clock").textContent = hours+":"+minutes;

    const day = now.getDate();
    const monthNames = ["Января","Февраля","Марта","Апреля","Мая","Июня",
                        "Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    document.getElementById("date").textContent = `${day} ${month} ${year}`;
}

updateTime();
setInterval(updateTime, 60000);

// === ПАНЕЛЬ НАСТРОЕК ===
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const bgChoices = document.querySelectorAll(".bg-choice");
const textColorInput = document.getElementById("text-color");
const btnColorInput = document.getElementById("btn-color");

// Переключение панели настроек
settingsBtn.addEventListener("click", (e)=>{
    e.stopPropagation(); // чтобы клик на кнопке не закрыл сразу
    settingsPanel.classList.toggle("show");
});

// Скрытие при клике вне панели
document.addEventListener("click", (e)=>{
    if(!settingsPanel.contains(e.target) && e.target !== settingsBtn){
        settingsPanel.classList.remove("show");
    }
});

// Выбор фона
bgChoices.forEach(img=>{
    img.addEventListener("click", ()=>{
        document.body.style.backgroundImage = `url(${img.src})`;
        localStorage.setItem("bg", img.src);
    });
});

// Изменение цвета текста
textColorInput.addEventListener("input", ()=>{
    document.body.style.color = textColorInput.value;
    localStorage.setItem("textColor", textColorInput.value);
});

// Изменение цвета кнопок
btnColorInput.addEventListener("input", ()=>{
    document.querySelectorAll("#search-form button, #settings-btn").forEach(btn=>{
        btn.style.backgroundColor = btnColorInput.value;
    });
    localStorage.setItem("btnColor", btnColorInput.value);
});

// Загрузка настроек из localStorage
window.addEventListener("load", ()=>{
    const bg = localStorage.getItem("bg");
    const textColor = localStorage.getItem("textColor");
    const btnColor = localStorage.getItem("btnColor");

    if(bg) document.body.style.backgroundImage = `url(${bg})`;
    if(textColor) document.body.style.color = textColor;
    if(btnColor){
        document.querySelectorAll("#search-form button, #settings-btn").forEach(btn=>{
            btn.style.backgroundColor = btnColor;
        });
    }
});
