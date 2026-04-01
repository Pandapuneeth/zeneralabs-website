function openLink(url) {
  window.open(url, "_blank");
}

// Loader (safe)
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// AOS safe init
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
  });
}

// Particles safe init
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 30 }, // less particles
      color: { value: "#ff4da6" },
      line_linked: { 
        enable: true, 
        color: "#ff007f",
        opacity: 0.15 // 🔥 softer lines
      },
      move: { speed: 1 }, // slower movement
      opacity: {
        value: 0.2 // 🔥 less bright dots
      },
      size: {
        value: 4 // smaller dots
      }
    }
  });
}