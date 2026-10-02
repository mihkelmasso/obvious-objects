const header = document.querySelector("header");
const footer = document.querySelector("footer");
const gallery = document.querySelector(".gallery");
const cursor = document.querySelector(".cursor");

const GALLERY_API =
  "https://api.github.com/repos/mihkelmasso/obvious-objects/contents/images/gallery";


/* =========================================
   AUTOMATIC GALLERY
   ========================================= */

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


    /* Randomise gallery order */

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


    /* Remove hard-coded gallery tiles */

    gallery
      .querySelectorAll(".tile")
      .forEach(tile => tile.remove());


    /* Create gallery tiles */

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
          scroll * 0.0017 +
          phase
        ) *
        110 *
        depth;


      y +=
        Math.cos(
          scroll * 0.0013 +
          phase
        ) *
        45 *
        depth;

    }


    if(index % 5 === 1){

      x =
        -Math.sin(
          scroll * 0.0015 +
          phase
        ) *
        100 *
        depth;


      y +=
        Math.sin(
          scroll * 0.0019 +
          phase
        ) *
        55 *
        depth;

    }


    if(index % 5 === 2){

      x =
        Math.cos(
          scroll * 0.0017 +
          phase
        ) *
        85 *
        depth;


      y +=
        Math.sin(
          scroll * 0.0012 +
          phase
        ) *
        85 *
        depth;

    }


    if(index % 5 === 3){

      x =
        Math.sin(
          scroll * 0.0013 +
          phase
        ) *
        130 *
        depth;


      y +=
        Math.cos(
          scroll * 0.0017 +
          phase
        ) *
        65 *
        depth;

    }


    if(index % 5 === 4){

      x =
        -Math.cos(
          scroll * 0.0015 +
          phase
        ) *
        95 *
        depth;


      y +=
        Math.sin(
          scroll * 0.0016 +
          phase
        ) *
        75 *
        depth;

    }


    const scale =
      baseScale +
      Math.sin(
        scroll * 0.00125 +
        phase
      ) *
      0.045 *
      depth;


    const rotate =
      Math.sin(
        scroll * 0.0009 +
        phase
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
   WATERMARK COMPOSITIONS
   ========================================= */

/*
   FIRST HALF:

   UNDER
   OVER
   CONSTRUCTION
   DEFINED
   PROCESS
   UNDEFINED
*/

const firstWatermark = [

  {
    text:"UNDER",
    direction:-1,
    delay:0.00,
    speed:1.00
  },

  {
    text:"OVER",
    direction:1,
    delay:0.00,
    speed:0.90
  },

  {
    text:"CONSTRUCTION",
    direction:-1,
    delay:0.075,
    speed:1.06
  },

  {
    text:"DEFINED",
    direction:1,
    delay:0.075,
    speed:0.96
  },

  {
    text:"PROCESS",
    direction:-1,
    delay:0.15,
    speed:1.02
  },

  {
    text:"UNDEFINED",
    direction:1,
    delay:0.15,
    speed:0.92
  }

];


/*
   SECOND HALF:

   empty
   UNDER
   empty
   STOOD
*/

const secondWatermark = [

  {
    text:"",
    direction:-1,
    delay:0.00,
    speed:1.00
  },

  {
    text:"UNDER",
    direction:1,
    delay:0.00,
    speed:0.94
  },

  {
    text:"",
    direction:-1,
    delay:0.075,
    speed:1.04
  },

  {
    text:"STOOD",
    direction:1,
    delay:0.075,
    speed:0.98
  }

];


const watermarkCycles = [
  firstWatermark,
  secondWatermark
];


/* =========================================
   CREATE WATERMARK
   ========================================= */

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


  watermarkCycles.forEach(
    (cycle,cycleIndex)=>{

      const cycleElement =
        document.createElement("div");


      cycleElement.className =
        `watermark-cycle watermark-cycle-${cycleIndex}`;


      cycle.forEach(
        (word,index)=>{

          const line =
            document.createElement("div");


          line.className =
            "watermark-line";


          if(
            cycleIndex === 0 &&
            cycle.length === 6
          ){

            line.style.top =
              `${3 + index * 16}vh`;

          }

          else{

            line.style.top =
              `${8 + index * 23}vh`;

          }


          const text =
            document.createElement("div");


          text.className =
            "watermark-word";


          text.textContent =
            word.text;


          text.dataset.direction =
            word.direction;


          text.dataset.delay =
            word.delay;


          text.dataset.speed =
            word.speed;


          line.appendChild(
            text
          );


          cycleElement.appendChild(
            line
          );

        }
      );


      watermark.appendChild(
        cycleElement
      );

    }
  );


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

      opacity:0;
    }


    .watermark-cycle-0{
      opacity:1;
    }


    .watermark-line{
      position:absolute;

      left:0;

      width:100%;

      height:16vh;

      display:flex;

      align-items:center;

      overflow:visible;

      perspective:1000px;
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
          72px,
          11vw,
          190px
        );

      font-weight:800;

      font-style:italic;

      line-height:.8;

      letter-spacing:-.07em;

      color:#111;

      will-change:
        transform,
        opacity;

      transform-origin:
        center center;

      opacity:.92;
    }


    @media(max-width:900px){

      .watermark-word{
        font-size:18vw;
      }

      .watermark-line{
        height:15vh;
      }

    }

  `;


  document.head.appendChild(
    style
  );

}


/* =========================================
   WATERMARK MOTION
   ========================================= */

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
        window.scrollY /
        maxScroll,
        0
      ),
      1
    );


  /*
    First composition:
    0 → 50%

    Second composition:
    50 → 100%
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


  /*
    Smooth transition at the
    halfway point.
  */

  const transitionZone =
    .055;


  if(
    progress >
      .5 - transitionZone &&
    progress <
      .5 + transitionZone
  ){

    const transitionProgress =
      (
        progress -
        (.5 - transitionZone)
      ) /
      (transitionZone * 2);


    cycles[0].style.opacity =
      1 -
      transitionProgress;


    cycles[1].style.opacity =
      transitionProgress;

  }

  else{

    cycles.forEach(
      (cycle,index)=>{

        cycle.style.opacity =
          index === activeCycle
            ? 1
            : 0;

      }
    );

  }


  /*
    Animate both compositions so
    the transition remains continuous.
  */

  cycles.forEach(
    (cycle,cycleIndex)=>{

      const elements =
        cycle.querySelectorAll(
          ".watermark-word"
        );


      let localProgress;


      if(cycleIndex === 0){

        localProgress =
          Math.min(
            Math.max(
              progress * 2,
              0
            ),
            1
          );

      }

      else{

        localProgress =
          Math.min(
            Math.max(
              (progress - .5) * 2,
              0
            ),
            1
          );

      }


      elements.forEach(
        (element,index)=>{

          const direction =
            parseFloat(
              element.dataset.direction
            );


          const delay =
            parseFloat(
              element.dataset.delay ||
              0
            );


          const speed =
            parseFloat(
              element.dataset.speed ||
              1
            );


          /*
            Empty rows remain invisible,
            but preserve their movement slot.
          */

          if(
            !element.textContent.trim()
          ){

            element.style.opacity = 0;

            return;

          }


          element.style.opacity = 1;


          /*
            Later words enter slightly later.
          */

          const delayedProgress =
            Math.min(
              Math.max(
                (
                  localProgress -
                  delay
                ) /
                (1 - delay),
                0
              ),
              1
            );


          /*
            Different speeds for each line.
          */

          const individualProgress =
            Math.min(
              Math.max(
                delayedProgress *
                speed,
                0
              ),
              1
            );


          const travel =
            window.innerWidth *
            1.45;


          /*
            Right → left.
          */

          const start =
            direction === -1
              ? window.innerWidth + 120
              : -travel - 120;


          /*
            Left → right.
          */

          const end =
            direction === -1
              ? -travel - 120
              : window.innerWidth + 120;


          const x =
            start +
            (
              end -
              start
            ) *
            individualProgress;


          /*
            Slight vertical movement.
          */

          const y =
            Math.sin(
              individualProgress *
              Math.PI *
              2 +
              index
            ) *
            24;


          /*
            Subtle 3D rotation.
          */

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

    }
  );


  /*
    Fade the complete watermark
    away at the very bottom.
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

    watermark.style.opacity =
      1;

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
  window.matchMedia(
    "(pointer:fine)"
  ).matches
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

createWatermark();

loadGallery();

updatePage();
