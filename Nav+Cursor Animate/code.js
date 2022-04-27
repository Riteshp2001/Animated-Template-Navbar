let mouse = document.querySelector(".cursor");
let navmouse = document.querySelectorAll("ul li");
let section = document.querySelectorAll("p");
let bubble = document.querySelector(".bubble");
let colors = [
  "linear-gradient(to right,#b8cbb8 0%,#b8cbb8 0%,#b465da 0%,#cf6cc9 33%,#ee609c 66%,#ee609c 100%)",
  "linear-gradient(to right,#f78ca0 0%,#f9748f 19%,#fd868c 60%,#fe9a8b 100%)",
  "linear-gradient(180deg,#191818 0%,#6284ff 33%,#d9afd9 66%)",
];

window.addEventListener("mousemove", cursor);

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
section.forEach((sect) => {
  sect.addEventListener("mouseleave", () => {
    mouse.classList.remove("bg-black-sec");
    sect.classList.remove("hovered");
  });
  sect.addEventListener("mouseover", () => {
    mouse.classList.add("bg-black-sec");
    sect.classList.add("hovered");
  });
});
navmouse.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    mouse.classList.remove("bg-black");
    link.classList.remove("hovered");
  });
  link.addEventListener("mouseover", () => {
    mouse.classList.add("bg-black");
    link.classList.add("hovered");
  });
});

let options = {
  threshold: 0.7,
};

let observer = new IntersectionObserver(navcheck, options);

function navcheck(entries) {
  entries.forEach((entry) => {
      const classname = entry.target.classname;
      console.log(classname);
      const anchor = document.querySelector(`[data-type=${classname}]`);
      const gradients = entry.target.getAttribute(`data-index`);
      const coords = anchor.getBoundingClientRect();
      const length = {
        height: coords.height,
        width: coords.width,
        top: coords.top,
        left: coords.left,
      };
      if (entry.isIntersecting) {
        bubble.style.setProperty("left", `${length.left}px`);
        bubble.style.setProperty("height", `${length.height}px`);
        bubble.style.setProperty("width", `${length.width}px`);
        bubble.style.setProperty("top", `${length.top}px`);
        bubble.style.background = colors[gradients];
      }
    });
}

section.forEach((sections) => {
  observer.observe(sections);
});
