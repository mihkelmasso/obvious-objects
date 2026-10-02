const header = document.querySelector("header");
const floatingItems = document.querySelectorAll(".tile");
const cursor = document.querySelector(".cursor");


/* =========================================
   HEADER
   ========================================= */

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 60
  );
}


/* =========================================
   FLOATING GALLERY
   ========================================= */

function updateGallery() {

  const scroll = window.scrollY;

  floatingItems.forEach((item, index) => {

    const baseSpeed =
      parseFloat(item.dataset.speed || 0.03);

    const baseScale =
      parseFloat(item.dataset.scale || 1);

    const phase =
      index * 0.85;


    let depth = 1;

    if (index % 3 === 0) {
      depth = 1.35;
    }

    if (index % 3 === 1) {
      depth = 0.85;
    }

    if (index % 3 === 2) {
      depth = 0.55;
    }


    let x = 0;

    let y =
      scroll *
      baseSpeed *
      depth;


    if (index % 5 === 0) {

      x =
        Math.sin(
          scroll * 0.0017 + phase
        ) *
        115 *
        depth;

      y +=
        Math.cos(
          scroll * 0.0013 + phase
        ) *
        45 *
        depth;
    }


    if (index % 5 === 1) {

      x =
        -Math.sin(
          scroll * 0.0015 + phase
        ) *
        105 *
        depth;

      y +=
        Math.sin(
          scroll * 0.0019 + phase
        ) *
        55 *
        depth;
    }


    if (index % 5 === 2) {

      x =
        Math.cos(
          scroll * 0.0017 + phase
        ) *
        85 *
        depth;

      y +=
        Math.sin(
          scroll * 0.0012 + phase
        ) *
        90 *
        depth;
    }


    if (index % 5 === 3) {

      x =
        Math.sin(
          scroll * 0.0013 + phase
        ) *
        135 *
        depth;

      y +=
        Math.cos(
          scroll * 0.0017 + phase
        ) *
        65 *
        depth;
    }


    if (index % 5 === 4) {

      x =
        -Math.cos(
          scroll * 0.0015 + phase
        ) *
        95 *
        depth;

      y +=
        Math.sin(
          scroll * 0.0016 + phase
        ) *
        75 *
        depth;
    }


    const scale =
      baseScale +
      Math.sin(
        scroll * 0.00125 + phase
      ) *
      0.045 *
      depth;


    const rotate =
      Math.sin(
        scroll * 0.0009 + phase
      ) *
      0.8 *
      depth;


    item.style.transform =
      `translate3d(${x}px, ${y}px, 0)
       scale(${scale})
       rotate(${rotate}deg)`;
  });
}


/* =========================================
   UNDER CONSTRUCTION WATERMARK
   ========================================= */

const watermarkWords = [
  {
    text: "UNDER",
    direction: -1,
    row: 0
  },
  {
    text: "CONSTRUCTION",
    direction: 1,
    row: 1
  },
  {
    text: "OVER",
    direction: -1,
    row: 2
  },
  {
    text: "WHELMING",
    direction: 1,
    row: 3
  }
];


function createWatermark() {

  if (document.querySelector(".scroll-watermark")) {
    return;
  }

  const watermark = document.createElement("div");

  watermark.className =
    "scroll-watermark";


  watermarkWords.forEach((word) => {

    const line =
      document.createElement("div");

    line.className =
      "watermark-line";


    const text =
      document.createElement("div");

    text.className =
      "watermark-word";


    text.textContent =
      word.text;


    line.appendChild(text);
    watermark.appendChild(line);
  });


  document.body.appendChild(watermark);


  const style =
    document.createElement("style");


  style.textContent = `

    .scroll-watermark{
      position:fixed;
      inset:0;
      z-index:12;

      pointer-events:none;

      overflow:hidden;

      opacity:1;

      transition:opacity .15s linear;
    }

    .watermark-line{
      position:absolute;

      left:0;
      width:100%;

      height:25vh;

      display:flex;
      align-items:center;

      overflow:visible;

      perspective:1000px;
    }

    .watermark-line:nth-child(1){
      top:8vh;
    }

    .watermark-line:nth-child(2){
      top:31vh;
    }

    .watermark-line:nth-child(3){
      top:54vh;
    }

    .watermark-line:nth-child(4){
      top:77vh;
    }

    .watermark-word{
      position:absolute;

      white-space:nowrap;

      font-family:Arial, Helvetica, sans-serif;

      font-size:clamp(90px, 14vw, 240px);

      font-weight:800;

      font-style:italic;

      line-height:.8;

      letter-spacing:-.07em;

      color:#111;

      will-change:
        transform,
        opacity;

      transform-origin:center center;

      opacity:1;
    }

    @media(max-width:900px){

      .watermark-word{
        font-size:22vw;
      }

      .watermark-line:nth-child(1){
        top:10vh;
      }

      .watermark-line:nth-child(2){
        top:32vh;
      }

      .watermark-line:nth-child(3){
        top:54vh;
      }

      .watermark-line:nth-child(4){
        top:76vh;
      }
    }

  `;


  document.head.appendChild(style);
}


createWatermark();


const watermarkWordsElements =
  document.querySelectorAll(
    ".watermark-word"
  );


function updateWatermark() {

  if (!watermarkWordsElements.length) {
    return;
  }


  const maxScroll =
    Math.max(
      document.documentElement.scrollHeight -
      window.innerHeight,
      1
    );


  const progress =
    Math.min(
      Math.max(
        window.scrollY / maxScroll,
        0
      ),
      1
    );


  /*
    Two complete passes.

    Progress:
    0.00 → 0.50 = cycle 1
    0.50 → 1.00 = cycle 2
  */

  const cycleProgress =
    (progress * 2) % 1;


  watermarkWordsElements.forEach(
    (element, index) => {

      const config =
        watermarkWords[index];

      /*
        Each word starts at the
        opposite side of the screen.
      */

      const direction =
        config.direction;


      /*
        Move a complete viewport
        plus the width of the word.
      */

      const travel =
        window.innerWidth * 1.35;


      const start =
        direction === -1
          ? window.innerWidth + 100
          : -travel - 100;


      const end =
        direction === -1
          ? -travel - 100
          : window.innerWidth + 100;


      /*
        Horizontal position.

        A tiny vertical movement creates
        a subtle diagonal quality.
      */

      const x =
        start +
        (end - start) *
        cycleProgress;


      const y =
        Math.sin(
          cycleProgress * Math.PI * 2 +
          index
        ) *
        24;


      /*
        Rotation around the vertical axis.

        The text briefly turns away from
        the viewer and returns.
      */

      const rotationY =
        Math.sin(
          cycleProgress *
          Math.PI *
          2
        ) *
        22;


      /*
        Very subtle vertical-axis
        perspective rotation.
      */

      const scale =
        1 +
        Math.sin(
          cycleProgress *
          Math.PI *
          2 +
          index
        ) *
        0.025;


      element.style.transform =
        `
        translate3d(${x}px, ${y}px, 0)
        rotateY(${rotationY}deg)
        scale(${scale})
        `;


      /*
        The second cycle fades out
        towards the end of the page.
      */

      let opacity = 1;


      if (progress > 0.86) {

        opacity =
          1 -
          (
            (progress - 0.86) /
            0.14
          );

      }


      element.style.opacity =
        Math.max(
          opacity,
          0
        );
    });


  const watermark =
    document.querySelector(
      ".scroll-watermark"
    );


  if (watermark) {

    let overallOpacity = 1;

    if (progress > 0.86) {

      overallOpacity =
        1 -
        (
          (progress - 0.86) /
          0.14
        );
    }

    watermark.style.opacity =
      Math.max(
        overallOpacity,
        0
      );
  }
}


/* =========================================
   MAIN SCROLL UPDATE
   ========================================= */

function updatePage() {

  updateHeader();
  updateGallery();
  updateWatermark();

}


window.addEventListener(
  "scroll",
  updatePage,
  { passive:true }
);


window.addEventListener(
  "load",
  updatePage
);


window.addEventListener(
  "resize",
  updatePage
);


/* =========================================
   INERTIA DONUT CURSOR
   ========================================= */

if (
  cursor &&
  window.matchMedia("(pointer:fine)").matches
) {

  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;


  let cursorX =
    mouseX;

  let cursorY =
    mouseY;


  let previousX =
    cursorX;

  let previousY =
    cursorY;


  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      cursor.classList.remove(
        "hidden"
      );
    }
  );


  function animateCursor() {

    cursorX +=
      (mouseX - cursorX) *
      0.22;


    cursorY +=
      (mouseY - cursorY) *
      0.22;


    const dx =
      cursorX - previousX;


    const dy =
      cursorY - previousY;


    const speed =
      Math.sqrt(
        dx * dx +
        dy * dy
      );


    const stretch =
      Math.min(
        speed * 0.08,
        8
      );


    cursor.style.left =
      cursorX + "px";


    cursor.style.top =
      cursorY + "px";


    cursor.style.transform =
      `translate(-50%, -50%)
       scale(
         ${1 + stretch / 100},
         ${1 - stretch / 320}
       )`;


    previousX =
      cursorX;

    previousY =
      cursorY;


    requestAnimationFrame(
      animateCursor
    );
  }


  animateCursor();


  document
    .querySelectorAll("a, button")
    .forEach((element) => {

      element.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add(
            "hover"
          );
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove(
            "hover"
          );
        }
      );

    });


  document.addEventListener(
    "mouseleave",
    () => {
      cursor.classList.add(
        "hidden"
      );
    }
  );


  document.addEventListener(
    "mouseenter",
    () => {
      cursor.classList.remove(
        "hidden"
      );
    }
  );
}
