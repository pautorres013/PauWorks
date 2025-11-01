// Optimized Function to initialize scroll effect after dynamic content is loaded
let currentIndex = 0;
let isScrolling = false;

function initializeScroll() {
    const sections = document.querySelectorAll("section");
    const dots = document.querySelectorAll(".dots");

    // Ensure sections and dots are loaded and accessible
    if (sections.length === 0 || dots.length === 0) return;

    // Highlight the first dot on page load
    dots[0].classList.add("opacity-100");
    dots.forEach((dot, index) => {
        if (index !== 0) {
            dot.classList.add("opacity-30");
        }
    });


    // // Handle touch gestures for mobile
    // window.addEventListener("touchstart", (e) => {
    //     touchStartY = e.touches[0].clientY;
    // });

    // window.addEventListener("touchmove", (e) => {
    //     touchEndY = e.touches[0].clientY;
    // });

    // window.addEventListener("touchend", () => {
    //     if (isScrolling) return;

    //     let swipeDistance = touchStartY - touchEndY;

    //     if (swipeDistance > 50 && currentIndex < sections.length - 1) {
    //         currentIndex++; // Swipe up (scroll down)
    //         dir = "down";
    //     } else if (swipeDistance < -50 && currentIndex > 0) {
    //         currentIndex--; // Swipe down (scroll up)
    //         dir = "up";
    //     }

    //     scrollToSection(currentIndex, sections, dots, dir);
    // });
    /*
    // Scroll with mouse wheel
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;

        currentIndex += (e.deltaY > 0 && currentIndex < sections.length - 1) ? 1 : (e.deltaY < 0 && currentIndex > 0) ? -1 : 0;
        scrollToSection(currentIndex, sections, dots , dir);
    });*/

   // Scroll with mouse wheel
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;

        const direction = e.deltaY > 0 ? "down" : "up";

        if (direction === "down") {
            currentIndex = (currentIndex + 1) % sections.length; // loops forward
        } else if (direction === "up") {
            currentIndex = (currentIndex - 1 + sections.length) % sections.length; // loops backward
        }

        scrollToSection(currentIndex, sections, dots, direction);
    });



    // Handle dot navigation clicks
    sideNav.addEventListener("click", (e) => {
        const dot = e.target.closest(".dots");
        if (!dot) return;

        const index = Array.from(dots).indexOf(dot);
        if (index !== currentIndex) {
            currentIndex = index;
            scrollToSection(currentIndex, sections, dots);
        }
    });
}

// Function to scroll and highlight active dot
function scrollToSection(index, sections, dots) {
    const sect = sections[index];
    
    if (index === 0) {
        sect.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    } else {
        sect.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        sect.classList.remove("animate-collapseWidth");
        sect.classList.add("animate-expandWidth");
        // Remove animation class after animation completes
        setTimeout(() => {
            sect.classList.remove("animate-expandWidth");
        }, 800);
        sections.forEach((sections, i) => {
            if (i !== index && i !== 0) {
                sections.classList.add("animate-collapseWidth");
            }  
        });
    }    

    // 🔹 Highlight active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle("opacity-100", i === index); // Active dot
        dot.classList.toggle("opacity-30", i !== index);  // Inactive dots
    });

    // 🔹 Unlock scrolling after animation completes
    setTimeout(() => {
        isScrolling = false;
    }, 800); // matches animation duration
}



// Initialize scroll effect after content is loaded or dynamically updated
document.addEventListener("DOMContentLoaded", generateDot);

window.onload = function () {
    topPage();
};

// Dynamically toggle dots visibility
export function toggleDots() {
    const dots = document.querySelectorAll(".dots");

    dots.forEach((dot, i) => {
        dot.classList.toggle("hidden");
        if (i === 0) {
            dot.classList.toggle("opacity-100");
        } else {
            dot.classList.toggle("opacity-30");
        }
    });
    currentIndex = 0;
    topPage();
}

// Scroll to the top of the page
function topPage() {
    window.scrollTo(0, 0);
}

// Generate dots based on the number of sections in the main container
function generateDot() {
    const sideNav = document.getElementById("sideNav");
    const sections = document.querySelectorAll("section");

    // Check if sections are present
    if (sections.length === 0) {
        console.error("No sections found inside the main container!");
        return;
    }

    // Clear existing dots
    sideNav.innerHTML = '';

    // Create a dot for each section
    sections.forEach(() => {
        const dot = document.createElement("div");
        dot.classList.add("dots");
        sideNav.appendChild(dot);
    });

    // Initialize the scroll effects after generating the dots
    initializeScroll();
}
