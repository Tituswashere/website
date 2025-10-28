(function () {
  // --- Inject main.css from GitHub raw ---
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://raw.githubusercontent.com/Tituswashere/website/main/main.css";
  styleLink.onload = () => console.log("✅ main.css loaded successfully");
  styleLink.onerror = () =>
    alert("⚠️ Failed to load main.css from GitHub. Check the URL or network.");
  document.head.appendChild(styleLink);

  // --- Sidebar setup ---
  function initSidebar() {
    const mobileSidebar = document.querySelector("sidebar-mobile");

    // Warn if <sidebar-mobile> is missing
    if (!mobileSidebar) {
      alert("⚠️ No <sidebar-mobile> element found on this page!");
      return;
    }

    // Add styling class
    mobileSidebar.classList.add("sidebar-mobile");

    // Add close button inside sidebar
    mobileSidebar.insertAdjacentHTML(
      "afterbegin",
      `<button class="close-btn" aria-label="Close sidebar"><span class="material-icons">close</span></button>`
    );

    // Create hamburger button
    const hamburger = document.createElement("div");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    document.body.insertBefore(hamburger, document.body.firstChild);

    // --- Event listeners ---
    hamburger.addEventListener("click", () => {
      mobileSidebar.classList.toggle("open");
    });

    const closeBtn = mobileSidebar.querySelector(".close-btn");
    if (!closeBtn) {
      alert("⚠️ Close button was not created correctly!");
      return;
    }

    closeBtn.addEventListener("click", () => {
      mobileSidebar.classList.remove("open");
    });

    console.log("✅ Sidebar initialized successfully");
  }

  // --- Wait for DOM to be ready ---
  document.addEventListener("DOMContentLoaded", initSidebar);
})();
