// api.js
(function () {
  // Inject main.css from GitHub raw
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "main.css"
    "https://raw.githubusercontent.com/Tituswashere/website/main/main.css";
  document.head.appendChild(styleLink);

  // Sidebar + components setup
  function initSidebar() {
    const mobileSidebar = document.querySelector("sidebar-mobile");
    if (!mobileSidebar) return;

    mobileSidebar.classList.add("sidebar-mobile");
    mobileSidebar.insertAdjacentHTML(
      "afterbegin",
      `<button class="close-btn"><span class="material-icons">close</span></button>`
    );

    const hamburger = document.createElement("div");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    document.body.insertBefore(hamburger, document.body.firstChild);

    hamburger.addEventListener("click", () => {
      mobileSidebar.classList.toggle("open");
    });

    mobileSidebar.querySelector(".close-btn").addEventListener("click", () => {
      mobileSidebar.classList.remove("open");
    });
  }

  document.addEventListener("DOMContentLoaded", initSidebar);
})();
