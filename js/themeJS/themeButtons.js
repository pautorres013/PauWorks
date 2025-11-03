let isCursorPresent = false;
export function themesButton() {
    const themeBar = document.getElementById('themeBar');
    const sidebarToggle = document.getElementById("sidebar");
    const themeBtn = document.getElementById("themebtn-container");
    const themeTxt = document.getElementById("theme-text");

    if (!isCursorPresent) {
        themeBar.addEventListener("mouseenter", () => {
            themeExpand(sidebarToggle, themeBtn, themeTxt);
        });
        themeBar.addEventListener("mouseleave", () => {
            themeClose(sidebarToggle, themeBtn, themeTxt);
        });
    }
    themeBar.addEventListener("click", () => {
        isCursorPresent = true;
        clickThemebar(sidebarToggle, themeBtn, themeTxt);
    });
}
function themeClose(sidebar, btn, text) {
    btn.classList.add('hidden');
    btn.classList.remove('flex');
    sidebar.classList.toggle('expanded-themebar');
    sidebar.classList.add('hidden-themebar');
    text.classList.remove('opacity-0');
    text.classList.add('opacity-100');
}
function themeExpand(sidebar, btn, text) {
    btn.classList.remove('hidden');
    btn.classList.add('flex');
    sidebar.classList.toggle('hidden-themebar');
    sidebar.classList.add('expanded-themebar');
    text.classList.remove('opacity-100');
    text.classList.add('opacity-0');
}
function clickThemebar(sidebar, btn, text) {
    if (sidebar.classList.contains('hidden-themebar')) {
        themeExpand(sidebar, btn, text);
    } else {
        themeClose(sidebar, btn, text);
    }
    isCursorPresent = false;
}
