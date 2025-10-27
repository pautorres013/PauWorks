let footerHTML = `
        <p class = 'int-title'>Contacts</p>
        <div class = 'flex-row fixed hidden bottom-7 space-x-3' id = 'footerBTN'>
            <a href="mailto:your-pautorres013@gmail.com" target="_blank" >
                <img src="asset/img/gmail.png" >
            </a>
            <a href="https://www.linkedin.com/in/paulus-leo-torres" target="_blank">
                <img src="asset/img/linkedin-logo.png">
            </a>
            <a href="https://github.com/pautorres013" target="_blank">
                <img src="asset/img/github.png">
            </a>
        </div>
        <span class = 'text-sm fixed bottom-0 right-3'>Website Version 1.2</span>
`;
let isPressed = false;
let foot;
function defaultFooter(footBTN) {
    foot.classList.add('shrinkFootbar');
    foot.classList.remove('h-24', 'bg-[var(--color-bg)]', 'opacity-100');
    footBTN.classList.add('hidden');
    footBTN.classList.remove('flex');
    console.log("error close");
}
function openFooter(footBTN) {
    foot.classList.add('h-24', 'bg-[var(--color-bg)]', 'opacity-100');
    foot.classList.remove('shrinkFootbar');
    footBTN.classList.remove('hidden');
    footBTN.classList.add('flex');
    console.log("error open");
}
generateFooter();
function generateFooter() {
    let createfooter = document.createElement('footer');
    createfooter.innerHTML = footerHTML;
    createfooter.classList.add('group',
        'defaultFootbar',
        'cursor-pointer',
        'shrinkFootbar',
        'transition-all',
        'duration-200'
    );
    document.querySelector('body').appendChild(createfooter);
    
    foot =  document.querySelector('footer');
    let footBTN = document.querySelector('#footerBTN');
    if (!isPressed) {
        foot.addEventListener("mouseenter", () => {
            openFooter(footBTN);
        });
        foot.addEventListener("mouseleave", () => {
            defaultFooter(footBTN);
        });
    }
    foot.addEventListener("click", () => {
        isPressed = true;
        clickFooter(foot, footBTN);
    });
    
}

function clickFooter(foot, footBTN) {
    if (foot.classList.contains('expandedFootbar')) {
        openFooter(footBTN);
    } else {
        defaultFooter(footBTN);
    }
    isPressed = false;
}


