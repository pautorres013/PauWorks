async function loadCaseStudies() {
  try {
    const response = await fetch("./json/cs.json");
    const data = await response.json();

    const container = document.getElementById("cs-container");

    data.forEach((study, index) => {
      const studyDiv = document.createElement("div");
      studyDiv.className = "case-study";
      studyDiv.setAttribute("data-index", index);

      const title = document.createElement("h2");
      title.textContent = study.title;
      title.classList.add("content-title");
      studyDiv.appendChild(title);

      for (const [heading, content] of Object.entries(study.sections)) {
        const h3 = document.createElement("h3");
        h3.classList.add("paragraphs");
        h3.textContent = heading;

        const p = document.createElement("p");
        p.classList.add("int-title");
        p.textContent = content;

        studyDiv.appendChild(h3);
        studyDiv.appendChild(p);
      }

      container.appendChild(studyDiv);
    });
  } catch (error) {
    console.error("Error loading case studies:", error);
  }
}

loadCaseStudies();
