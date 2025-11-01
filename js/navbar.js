const navbarHTML = `
  <header>
        <nav id = "navbar" class = "transition-all duration-500">
            <a href = "./index.html" id = "logo">
                    <img class = "logo-img" src="asset/img/logo_ico.png">
            </a>
            <div class = "hidden sm:grid grid-cols-3 left-3/4 space-x-1">
                  <a id = 'nav-icons' class = 'pf-page' href="./portfolio.html" >Portfolio</a>
                  <a id = 'nav-icons' class = 'cs-page' href="./casestudies.html" >Case Studies</a>
            </div>
            <button id="menu-btn">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div id="mobile-menu" class="transition-all duration-300">
                    <a id = 'nav-icons' class = 'pf-page hidden' href="./portfolio.html" >Portfolio</a>
                    <a id = 'nav-icons' class = 'cs-page hidden' href="./casestudies.html" >Case Studies</a>
            </div>
        </nav>
  </header>
`;

document.querySelector("body").innerHTML = document.querySelector("body").innerHTML + navbarHTML;

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.getElementById("navbar");
  const more = document.getElementById("more");

  menuBtn.addEventListener("click", () => {
    toggleMenu();
  });
  function toggleMenu() {
    menuBtn.classList.toggle('text-[var(--color-hover-text)]');
    mobileMenu.classList.toggle('w-0');
    mobileMenu.classList.toggle('w-56');
    mobileMenu.classList.toggle('outline-1');
    let nav = document.querySelectorAll('#nav-icons');

    for (let n = 0; n < nav.length; n++) {
      nav[n].classList.toggle('hidden');
    }
  }
  
  window.addEventListener("scroll", () => { //user scrolls down add these 
    try {
      if (window.scrollY > 1) {
        navbar.classList.add(
          "backdrop-blur-xs",
          "transition-all",
          "duration-300",
          "ease-in-out"
        );
        navbar.classList.remove("relative");
        more.classList.add("hidden");
      } else {
        navbar.classList.remove("backdrop-blur-xs");
        navbar.classList.add(
          "transition-all",
          "duration-300",
          "ease-in-out"
        );
        more.classList.remove("hidden");
      }
    } catch (error) { }
  });
});

function highlightCurrentPage() {
  try {
    let csPage = document.querySelectorAll(".cs-page");
    let pfPage = document.querySelectorAll(".pf-page");

    if (document.title == "Portfolio") {
      //desktop menu
      csPage[0].classList.remove('bg-[var(--color-bg)]');
      pfPage[0].classList.add('bg-[var(--color-bg)]');
      //mobile menu
      csPage[1].classList.remove('bg-[var(--color-bg)]');
      pfPage[1].classList.add('bg-[var(--color-bg)]');
    } else if (document.title == "Case Studies") {
      //desktop menu
      pfPage[0].classList.remove('bg-[var(--color-bg)]');
      csPage[0].classList.add('bg-[var(--color-bg)]');
      //mobile menu
      pfPage[1].classList.remove('bg-[var(--color-bg)]');
      csPage[1].classList.add('bg-[var(--color-bg)]');
    }
  } catch (error) { }
}

highlightCurrentPage();