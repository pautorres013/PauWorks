async function loadCaseStudies() {
  try {
    const response = await fetch("./json/cs.json");
    const data = await response.json();

    const container = document.getElementById("cs-container");
    let currentIndex = 0;

    // Create one "page" per case study
    data.forEach((study) => {
      const studyDiv = document.createElement("div");
      studyDiv.className =
        "case-study";

      const title = document.createElement("h2");
      title.textContent = study.title;
      title.classList.add("bullet-title");
      studyDiv.appendChild(title);

      for (const [heading, content] of Object.entries(study.sections)) {
        const h3 = document.createElement("h3");
        h3.textContent = heading;
        h3.classList.add("int-title", "mt-6");

        const p = document.createElement("p");
        p.textContent = content;
        p.classList.add("int-paragr");

        studyDiv.appendChild(h3);
        studyDiv.appendChild(p);
      }

      container.appendChild(studyDiv);
    });

    const pages = container.querySelectorAll(".case-study");

    function updateVisibility() {
      pages.forEach((page, i) => {
        page.style.display = i === currentIndex ? "block" : "none";
      });
    }

    document.getElementById("next-btn").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % pages.length;
      updateVisibility();
    });

    document.getElementById("prev-btn").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + pages.length) % pages.length;
      updateVisibility();
    });

    updateVisibility(); // initialize
  } catch (error) {
    console.error("Error loading case studies:", error);
  }
}

loadCaseStudies();
