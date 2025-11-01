const themeBar = document.getElementById("themeBar");
const body = document.body;

const themeNavHTML = `
        <div id='sidebar' class='transition-all duration-500 hidden-themebar'>         
        <span id ='theme-text' class = 'rotate-90 transition-all duration-500'>THEMES</span>
            <div id = 'themebtn-container' class = 'hidden'>
                <button id="default-theme" class="theme-button">
                    Default
                </button>
                <button id="pastel-theme" class="theme-button">
                    Pastel
                </button>
                <button id="retro-theme" class="theme-button">
                    Retro
                </button>  
            </div>
        </div>
`;

themeBar.innerHTML = themeNavHTML;

// 🔥 Now select the buttons AFTER injecting HTML
let defaultThemeBtn = document.querySelector("#default-theme");
let pastelThemeBtn = document.querySelector("#pastel-theme");
let retroThemeBtn = document.querySelector("#retro-theme");

export function themeNavi() {
  retroThemeBtn.classList.add("retro-theme");
  pastelThemeBtn.classList.add("pastel-theme");
  defaultThemeBtn.classList.add("default-theme");
}

const themes = ["default-theme", "pastel-theme", "retro-theme"];
let currentTheme = localStorage.getItem("theme") || "default-theme";


body.classList.add(currentTheme);

export function themeEvents() {
  try {
    defaultThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("default-theme");

      localStorage.setItem("theme", "default-theme");
      currentTheme = "default-theme";
    });

    pastelThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("pastel-theme");

      localStorage.setItem("theme", "pastel-theme");
      currentTheme = "pastel-theme";
    });

    retroThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("retro-theme");

      localStorage.setItem("theme", "retro-theme");
      currentTheme = "retro-theme";
    });
  } catch (error) {
    console.error("Error in themeEvents:", error);
  }
}
