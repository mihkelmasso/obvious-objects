const header = document.querySelector("header");
const footer = document.querySelector("footer");
const gallery = document.querySelector(".gallery");
const cursor = document.querySelector(".cursor");


/* =========================================
   AUTOMATIC GALLERY
   ========================================= */

const GALLERY_API =
  "https://api.github.com/repos/mihkelmasso/obvious-objects/contents/images/gallery";


async function loadGallery(){

  if(!gallery){
    return;
  }

  try{

    const response =
      await fetch(GALLERY_API, {
        cache:"no-store"
      });

    if(!response.ok){
      throw new Error(
        `Gallery request failed: ${response.status}`
      );
    }

    const files =
      await response.json();

const imageFiles =
  files.filter(file => {
    return file.type === "file" &&
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name);
  });

for(let i = imageFiles.length - 1; i > 0; i--){

  const j =
    Math.floor(
      Math.random() * (i + 1)
    );

  [
    imageFiles[i],
    imageFiles[j]
  ] = [
    imageFiles[j],
    imageFiles[i]
  ];
}
    gallery
      .querySelectorAll(".tile")
      .forEach(tile => tile.remove());

    imageFiles.forEach((file,index) => {

      const tile =
        document.createElement("div");

      tile.className = "tile";

      const pattern =
        index % 8;

      let width;
      let left;
      let top;

      if(pattern === 0){
        width = 26;
        left = 8;
        top = index * 68 + 8;
      }

      else if(pattern === 1){
        width = 22;
        left = 64;
        top = index * 68 + 32;
      }

      else if(pattern === 2){
        width = 30;
        left = 18;
        top = index * 68 + 58;
      }

      else if(pattern === 3){
        width = 23;
        left = 72;
        top = index * 68 + 82;
      }

      else if(pattern === 4){
        width = 28;
        left = 38;
        top = index * 68 + 108;
      }

      else if(pattern === 5){
        width = 20;
        left = 6;
        top = index * 68 + 138;
      }

      else if(pattern === 6){
        width = 25;
        left = 57;
        top = index * 68 + 164;
      }

      else{
        width = 29;
        left = 25;
        top = index * 68 + 190;
      }

      const sizeVariation =
        Math.sin(index * 3.17) * 3.5;

      const horizontalVariation =
        Math.cos(index * 2.41) * 4;

      width =
        Math.max(
          17,
          width + sizeVariation
        );

      left =
        Math.max(
          2,
          Math.min(
            76,
            left + horizontalVariation
          )
        );

      tile.style.width =
        `${width}vw`;

      tile.style.left =
        `${left}vw`;

      tile.style.top =
        `${top}vh`;

      const speed =
        0.018 +
        Math.abs(
          Math.sin(index * 1.73)
        ) * 0.025;

      const direction =
        index % 2 === 0
          ? 1
          : -1;

      const scale =
        0.90 +
        Math.abs(
          Math.cos(index * 2.13)
        ) * 0.16;

      tile.dataset.speed =
        (
          speed * direction
        ).toFixed(4);

      tile.dataset.scale =
        scale.toFixed(3);

      const img =
        document.createElement("img");

      img.src =
        file.download_url;

      img.alt = "";

      img.loading =
        index < 4
          ? "eager"
          : "lazy";

      img.decoding =
        "async";

      img.onerror = () => {
        tile.remove();
      };

      tile.appendChild(img);

      gallery.appendChild(tile);

    });

    const galleryHeight =
      Math.max(
        900,
        imageFiles.length * 68 + 260
      );

    gallery.style.minHeight =
      `${galleryHeight}vh`;

    updatePage();

  }

  catch(error){

    console.error(
      "OBVIOUS gallery error:",
      error
    );

  }

}


/* =========================================
   HEADER + FOOTER
   ========================================= */

function updateHeader(){

  const scrolled =
    window.scrollY > 60;

  if(header){

    header.classList.toggle(
      "scrolled",
      scrolled
    );

  }

  if(footer){

    footer.classList.toggle(
      "scrolled",
      scrolled
    );

  }

}


/* =========================================
   FLOATING GALLERY MOTION
   ========================================= */

function updateGallery(){

  if(!gallery){
    return;
  }

  const floatingItems =
    gallery.querySelectorAll(".tile");

  const scroll =
    window.scrollY;

  floatingItems.forEach((item,index) => {

    const baseSpeed =
      parseFloat(
        item.dataset.speed || 0.03
      );

    const baseScale =
      parseFloat(
        item.dataset.scale || 1
      );

    const phase =
      index * 0.85;

    let depth = 1;

    if(index % 3 === 0){
      depth = 1.30;
    }

    if(index % 3 === 1){
      depth = 0.85;
    }

    if(index % 3 === 2){
      depth = 0.55;
    }

    let x = 0;

    let y =
      scroll *
      baseSpeed *
      depth;

    if(index % 5 === 0){

      x =
        Math.sin(
          scroll * 0.0017 + phase
        ) *
        110 *
        depth;

      y +=
        Math.cos(
          scroll * 0.0013 + phase
        ) *
        45 *
        depth;
    }

    if(index % 5 === 1){

      x =
        -Math.sin(
          scroll * 0.0015 + phase
        ) *
        100 *
        depth;

      y +=
        Math.sin(
          scroll * 0.0019 + phase
        ) *
        55 *
        depth;
    }

    if(index % 5 === 2){

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
        85 *
        depth;
    }

    if(index % 5 === 3){

      x =
        Math.sin(
          scroll * 0.0013 + phase
        ) *
        130 *
        depth;

      y +=
        Math.cos(
          scroll * 0.0017 + phase
        ) *
        65 *
        depth;
    }

    if(index % 5 === 4){

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
      `translate3d(
        ${x}px,
        ${y}px,
        0
      )
      scale(${scale})
      rotate(${rotate}deg)`;
  });
}


/* =========================================
   WATERMARK
   TWO DIFFERENT HALVES
   ========================================= */

const watermarkCycles = [

  [
    {
      text:"UNDER",
      direction:-1,
      speed:1.00,
      lead:true
    },

    {
      text:"OVER",
      direction:1,
      speed:0.88,
      lead:true
    },

    {
      text:"CONSTRUCTION",
      direction:-1,
      speed:1.08,
      lead:false
    },

    {
      text:"WHELMING",
      direction:1,
      speed:0.94,
      lead:false
    }
  ],

  [
    {
      text:"OVER",
      direction:-1,
      speed:0.94,
      lead:true
    },

    {
      text:"UNDER",
      direction:1,
      speed:1.07,
      lead:true
    },

    {
      text:"DEFINED",
      direction:-1,
      speed:0.90,
      lead:false
    },

    {
      text:"WHELMING",
      direction:1,
      speed:1.03,
      lead:false
    }
  ]

];


function createWatermark(){

  if(
    document.querySelector(
      ".scroll-watermark"
    )
  ){
    return;
  }

  const watermark =
    document.createElement("div");

  watermark.className =
    "scroll-watermark";

  watermarkCycles
    .forEach((cycle,cycleIndex)=>{

      const cycleElement =
        document.createElement("div");

      cycleElement.className =
        `watermark-cycle watermark-cycle-${cycleIndex}`;

      cycle.forEach((word)=>{

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

        text.dataset.direction =
          word.direction;

        text.dataset.speed =
          word.speed;

        text.dataset.lead =
          word.lead;

        line.appendChild(text);

        cycleElement.appendChild(
          line
        );

      });

      watermark.appendChild(
        cycleElement
      );

    });

  document.body.appendChild(
    watermark
  );

  const style =
    document.createElement("style");

  style.textContent = `

    .scroll-watermark{
      position:fixed;
      inset:0;
      z-index:20;
      pointer-events:none;
      overflow:hidden;
      opacity:1;
    }

    .watermark-cycle{
      position:absolute;
      inset:0;
    }

    .watermark-cycle-0{
      opacity:1;
    }

    .watermark-cycle-1{
      opacity:0;
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

    .watermark-cycle-0
    .watermark-line:nth-child(1),
    .watermark-cycle-1
    .watermark-line:nth-child(1){
      top:8vh;
    }

    .watermark-cycle-0
    .watermark-line:nth-child(2),
    .watermark-cycle-1
    .watermark-line:nth-child(2){
      top:31vh;
    }

    .watermark-cycle-0
    .watermark-line:nth-child(3),
    .watermark-cycle-1
    .watermark-line:nth-child(3){
      top:54vh;
    }

    .watermark-cycle-0
    .watermark-line:nth-child(4),
    .watermark-cycle-1
    .watermark-line:nth-child(4){
      top:77vh;
    }

    .watermark-word{
      position:absolute;

      white-space:nowrap;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      font-size:
        clamp(
          90px,
          14vw,
          240px
        );

      font-weight:800;
      font-style:italic;

      line-height:.8;
      letter-spacing:-.07em;

      color:#111;

      will-change:
        transform,
        opacity;

      transform-origin:center center;

      opacity:.92;
    }

    @media(max-width:900px){

      .watermark-word{
        font-size:22vw;
      }

    }

  `;

  document.head.appendChild(
    style
  );
}


createWatermark();


function updateWatermark(){

  const watermark =
    document.querySelector(
      ".scroll-watermark"
    );

  const cycles =
    document.querySelectorAll(
      ".watermark-cycle"
    );

  if(
    !watermark ||
    !cycles.length
  ){
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
    First composition:
    first half of page.

    Second composition:
    second half of page.
  */

  let activeCycle;

  let cycleProgress;

  if(progress < .5){

    activeCycle = 0;

    cycleProgress =
      progress * 2;

  }

  else{

    activeCycle = 1;

    cycleProgress =
      (progress - .5) * 2;

  }


  cycles.forEach(
    (cycle,index)=>{

      cycle.style.opacity =
        index === activeCycle
          ? 1
          : 0;

    }
  );


  const activeElements =
    cycles[activeCycle]
      .querySelectorAll(
        ".watermark-word"
      );


  activeElements.forEach(
    (element,index)=>{

      const direction =
        parseFloat(
          element.dataset.direction
        );

      const speed =
        parseFloat(
          element.dataset.speed || 1
        );

      const isLead =
        element.dataset.lead === "true";


      /*
        The lead word of each
        travelling pair gets a
        slight positional advantage
        in the direction of travel.

        Right → left:
        lead starts further right.

        Left → right:
        lead starts further left.
      */

      const leadOffset =
        isLead
          ? direction === -1
            ? 0.12
            : -0.12
          : 0;


      /*
        Slightly different speed for
        lines travelling in the same
        direction.
      */

      const individualProgress =
        Math.min(
          Math.max(
            cycleProgress * speed +
            index * .018 +
            leadOffset,
            0
          ),
          1
        );


      const travel =
        window.innerWidth *
        1.45;


      const start =
        direction === -1
          ? window.innerWidth + 120
          : -travel - 120;


      const end =
        direction === -1
          ? -travel - 120
          : window.innerWidth + 120;


      const x =
        start +
        (
          end - start
        ) *
        individualProgress;


      const y =
        Math.sin(
          individualProgress *
          Math.PI *
          2 +
          index
        ) *
        24;


      const rotationY =
        Math.sin(
          individualProgress *
          Math.PI *
          2
        ) *
        22;


      const scale =
        1 +
        Math.sin(
          individualProgress *
          Math.PI *
          2 +
          index
        ) *
        .025;


      element.style.transform =
        `
        translate3d(
          ${x}px,
          ${y}px,
          0
        )
        rotateY(${rotationY}deg)
        scale(${scale})
        `;

    }
  );


  /*
    Fade everything out at the
    absolute end of the page.
  */

  if(progress > .94){

    const fade =
      1 -
      (
        (progress - .94) /
        .06
      );

    watermark.style.opacity =
      Math.max(
        fade,
        0
      );

  }

  else{

    watermark.style.opacity = 1;

  }

}


/* =========================================
   PAGE UPDATE
   ========================================= */

function updatePage(){

  updateHeader();
  updateGallery();
  updateWatermark();

}


window.addEventListener(
  "scroll",
  updatePage,
  {passive:true}
);

window.addEventListener(
  "resize",
  updatePage
);


/* =========================================
   INERTIA DONUT CURSOR
   ========================================= */

if(
  cursor &&
  window.matchMedia("(pointer:fine)").matches
){

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
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      cursor.classList.remove(
        "hidden"
      );

    }
  );


  function animateCursor(){

    cursorX +=
      (
        mouseX -
        cursorX
      ) *
      .22;

    cursorY +=
      (
        mouseY -
        cursorY
      ) *
      .22;


    const dx =
      cursorX -
      previousX;

    const dy =
      cursorY -
      previousY;


    const speed =
      Math.sqrt(
        dx * dx +
        dy * dy
      );


    const stretch =
      Math.min(
        speed * .08,
        8
      );


    cursor.style.left =
      cursorX + "px";

    cursor.style.top =
      cursorY + "px";


    cursor.style.transform =
      `
      translate(-50%,-50%)
      scale(
        ${1 + stretch / 100},
        ${1 - stretch / 320}
      )
      `;


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
    .querySelectorAll(
      "a, button"
    )
    .forEach(element => {

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


/* =========================================
   START
   ========================================= */

loadGallery();
updatePage();
