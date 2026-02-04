const section = document.querySelector("section.vid");
const vid = section.querySelector("video");
const storyDivs = document.querySelectorAll("section.vid div.story div");

vid.pause();
if (vid.readyState >= 2) {
  vid.currentTime = 0;
}

function updateVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Function to handle scroll position and video scrubbing
function handleScroll() {
  const distance = window.scrollY - section.offsetTop;
  const total = section.clientHeight - window.innerHeight;
  const viewportHeight = window.innerHeight;
  const sectionBottom = section.offsetTop + section.clientHeight;

  if (window.scrollY + viewportHeight >= sectionBottom) {
    if (vid.duration > 0) {
      vid.currentTime = vid.duration;
    }
    return;
  }

  let percentage = distance / total;
  percentage = Math.max(0, percentage);
  percentage = Math.min(percentage, 1);

  if (vid.readyState >= 2 && vid.duration > 0) {
    vid.currentTime = vid.duration * percentage;
  }
}

// Function to handle window resize
function handleResize() {
  updateVH();
  handleScroll();

  storyDivs.forEach((div) => {
    div.style.height = `${window.innerHeight}px`;
  });
}

// Initialize
updateVH();
handleScroll();

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);

vid.addEventListener("loadedmetadata", function () {
  handleScroll();
});

// Notify parent window that video is ready for playback
vid.addEventListener("loadeddata", function () {
  if (window.parent !== window) {
    window.parent.postMessage({ type: "videoReady" }, "*");
  }
});
