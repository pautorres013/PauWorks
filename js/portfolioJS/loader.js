import { createImageCarousel } from "./imgCarousel.js";

let currentIndex = 0; // Declare currentIndex before usage
let contentData = []; // Declare contentData before usag

const mainContainer = document.querySelector("#pf-cont");
// Select all sections with the ID 'pf-slider'
let pf_slides = document.querySelectorAll("#pf-slider");
let pf_titles = document.querySelectorAll("#pf-title");

document.addEventListener("DOMContentLoaded", () => {
  pf_slides.forEach((pf_slide, index) => {
    pf_slide.addEventListener("click", () => {
      
      slideFX(pf_slides, pf_titles, pf_slide, index);
      // Load the content for the clicked section
      loadContent(index + 1);
    });
    pf_slide.addEventListener("mouseover", () => {
      
      slideFX(pf_slides, pf_titles, pf_slide, index);
      // Load the content for the clicked section
      loadContent(index + 1);
    });
  });
});

function slideFX(pf_slides, pf_titles, pf_slide, index){
  // First reset all slides and titles
  pf_slides.forEach((s, i) => {
  s.classList.remove("pf-slider-fx-focus");
  s.classList.add("pf-slider-fx-idle");
  // pf_titles[i].classList.remove("pf-slider-title-fx-pressed");
  });

  // Then activate the clicked slide and title
  pf_slide.classList.add("pf-slider-fx-focus");
  pf_slide.classList.remove("pf-slider-fx-idle");
  // pf_titles[index].classList.add("pf-slider-title-fx-pressed");
}
const pf_main = document.querySelector("#pf-main");

loadContent(currentIndex);

async function loadContent(contentIndex) {
  try {
    const response = await fetch("./json/content.json");
    const data = await response.json();

    contentData = data["pf-content"]; // Store content data for navigation
    currentIndex = contentIndex; // Track current index

    // Clear existing content and set up the new layout
    const content = contentData[contentIndex];
    mainContainer.innerHTML = `
      <section class="flex flex-col items-center justify-center gap-4 shadow-2xl px-5">
        <h1 class="bullet-title text-left">${content.title}</h1>
        <span class="paragraphs">${content.description}</span>
      </section>
      <section id="pf-desc">
      </section>
      <section id="zoom-overlay" 
          class="fixed inset-0 visible:flex items-center justify-center bg-black/80 hidden w-full h-full z-0">
          <img id="zoomed-img" src="" class="rounded-lg max-w-full max-h-full object-contain">
      </section>
    `;
    
    const imgCarousel = new createImageCarousel(content);

  } catch (error) {
    console.error("Error loading content:", error);
  }
}