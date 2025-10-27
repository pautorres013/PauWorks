
// Load images with carousel dots and auto-rotation
export function createImageCarousel(content) {
  const imageContainer = document.querySelector("#pf-desc");

  if (content.renders && Array.isArray(content.renders) && content.renders.length > 0) {
    if (content.renders && Array.isArray(content.renders)) {
      content.renders.forEach((render) => {
        createObject(imageContainer, render);
      });
    }
  }
}
function createObject(imageContainer, render) {
  Object.entries(render).forEach(([category, views]) => {
    const categ_data = document.createElement("div");
    categ_data.classList.add(
      "carousel"
    );

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add(
      "carousel-images"
    );

    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add(
      "carousel-dots"
    );

    // Ensure we are accessing the first object inside the array
    Object.entries(views[0]).forEach(([viewName, src], index) => {

      const figure = document.createElement("figure");
      figure.classList.add("min-w-full", "h-96", "object-contain");
      let img;
      const ext = src.split('.').pop().toLowerCase(); // get file extension

      if (ext === "mp4" || ext === "webm" || ext === "ogv") {
        img = document.createElement("video");
        img.src = src;
        img.controls = true;
      } else {
        img = document.createElement("img");
        img.src = src;
      }

      figure.appendChild(img);

      img.alt = `${category} - ${viewName}`;
      img.classList.add("cursor-pointer", "w-full", "h-full", "object-cover");

      img.addEventListener("click", () => {
        document.getElementById("zoomed-img").src = src;
        document.getElementById("zoom-overlay").classList.remove("hidden");
        document.getElementById("zoom-overlay").classList.add("flex");

        // Ensure zoom-overlay click listener is added **once**
        document.getElementById("zoom-overlay").addEventListener("click", () => {
          document.getElementById("zoom-overlay").classList.remove("flex");
          document.getElementById("zoom-overlay").classList.add("hidden");
        });
      });
      

      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("sm:overflow-hidden", "text-nowrap", "md::text-wrap");
      figcaption.textContent = `${category} - ${viewName}`;

      figure.append(img, figcaption);
      imageWrapper.appendChild(figure);

      // Dots Navigation
      const dot = document.createElement("div");
      dot.classList.add(
        "w-4",
        "h-4",
        "bg-[var(--color-bg)]",
        "rounded-full",
        "cursor-pointer",
        "hover:bg-[var(--color-hover-bg)]",
        "outline-1"
      );
      dot.addEventListener("click", () => moveToSlide(imageWrapper, index));
      dotsContainer.appendChild(dot);
    });
  
    // Ensure the first dot is active
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle("bg-[var(--color-hover-bg)]", idx === 0);
    });
    categ_data.appendChild(imageWrapper);
    categ_data.appendChild(dotsContainer);
    imageContainer.appendChild(categ_data);

    // Rotate only if multiple images exist
    if (imageWrapper.children.length > 1) {
      autoRotate(imageWrapper, dotsContainer, false);
    }
  });
}

function moveToSlide(wrapper, dotsContainer, index) {
  wrapper.style.transform = `translateX(-${index * 100}%)`;
  // Highlight the active dot
  Array.from(dotsContainer.children).forEach((dot, idx) => {
    dot.classList.toggle("bg-[var(--color-hover-bg)]", idx === index);
  });
}

function autoRotate(wrapper, dotsContainer) {
  let currentIndex = 0;
  const slides = wrapper.children.length;
  let autoRotateInterval;

  // Start auto rotation
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides;
      moveToSlide(wrapper, dotsContainer, currentIndex);
    }, 5000);
  }

  // Stop auto rotation
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // Start rotation initially
  

  // Pause when hovering, resume when mouse leaves
  wrapper.addEventListener("mouseenter", stopAutoRotate);
  wrapper.addEventListener("mouseleave", startAutoRotate);

  // Reset auto-rotation on dot click
  Array.from(dotsContainer.children).forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoRotate();
      moveToSlide(wrapper, dotsContainer, index);
      startAutoRotate();
    });
  });
}


