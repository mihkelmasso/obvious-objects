const header = document.querySelector("header");
const gallery = document.querySelector(".gallery");
const cursor = document.querySelector(".cursor");


/* =========================================
   AUTOMATIC GALLERY
   Reads every image from:

   images/gallery/

   No need to edit index.html when
   adding new images.
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
      files
        .filter(file => {

          if(file.type !== "file"){
            return false;
          }

          return /\.(jpg|jpeg|png|webp|avif)$/i
            .test(file.name);
        })
        .sort((a,b) =>
          a.name.localeCompare(
            b.name,
            undefined,
            {
              numeric:true,
              sensitivity:"base"
            }
          )
        );


    /*
      Remove the hard-coded images
      currently present in index.html.
    */

    gallery
      .querySelectorAll(".tile")
      .forEach(tile => tile.remove());


    /*
      Create the gallery dynamically.
    */

    imageFiles.forEach((file,index) => {

      const tile =
        document.createElement("div");

      tile.className =
        "tile";


      /*
        Position pattern.

        Every image gets a different
        horizontal position, size and
        vertical rhythm.
      */

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


      /*
        Small random-looking variation,
        but deterministic so the layout
        doesn't jump around on reload.
      */

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


      /*
        Each image gets its own
        movement personality.
      */

      const speed =
        0.018 +
        (
          Math.abs(
            Math.sin(index * 1.73)
          ) * 0.025
        );


      const direction =
        index % 2 === 0
          ? 1
          : -1;


      const scale =
        0.90 +
        (
          Math.abs(
            Math.cos(index * 2.13)
          ) * 0.16
        );


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

      img.alt =
        "";

      img.loading =
        index < 4
          ? "eager"
          : "lazy";


      img.decoding =
        "async";


      /*
        If a file disappears from
        GitHub, simply remove its tile.
      */

      img.onerror = () => {
        tile.remove();
      };


      tile.appendChild(img);

      gallery.appendChild(tile);

    });


    /*
      Give the gallery enough vertical
      space for all images.
    */

    const galleryHeight =
      Math.max(
        900,
        imageFiles.length * 68 + 260
      );


    gallery.style.minHeight =
      `${galleryHeight}vh`;


    /*
      Start movement after the
      images have been created.
    */

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
   HEADER
   ========================================= */

function updateHeader(){

  if(!header){
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 60
  );

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


  floatingItems.forEach(
    (item,index) => {

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


      /*
        Depth.
      */

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


      /*
        Different trajectories.
      */

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


      /*
        Subtle breathing scale.
      */

      const scale =
        baseScale +
        Math.sin(
          scroll * 0.00125 + phase
        ) *
        0.045 *
        depth;


      /*
        Tiny rotation.
      */

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

    }
  );

}


/* =========================================
   UNDER CONSTRUCTION WATERMARK
   ========================================= */

const watermarkWords = [

  {
    text:"UNDER",
    direction:-1
  },

  {
    text:"CONSTRUCTION",
    direction:1
  },

  {
    text:"OVER",
    direction:-1
  },

  {
    text:"WHELMING",
    direction:1
  }

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


  watermarkWords.forEach(
    word => {

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


      line.appendChild(text);

      watermark.appendChild(line);

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


  document.head.appendChild(
    style
  );

}


createWatermark();


function updateWatermark(){

  const elements =
    document.querySelectorAll(
      ".watermark-word"
    );


  if(!elements.length){
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
    Two complete cycles.
  */

  const cycleProgress =
    (progress * 2) % 1;


  elements.forEach(
    (element,index) => {

      const direction =
        parseFloat(
          element.dataset.direction
        );


      const travel =
        window.innerWidth * 1.45;


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
        cycleProgress;


      const y =
        Math.sin(
          cycleProgress *
          Math.PI *
          2 +
          index
        ) *
        24;


      const rotationY =
        Math.sin(
          cycleProgress *
          Math.PI *
          2
        ) *
        22;


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
        translate3d(
          ${x}px,
          ${y}px,
          0
        )
        rotateY(${rotationY}deg)
        scale(${scale})
        `;


      let opacity = 1;


      if(progress > .86){

        opacity =
          1 -
          (
            (progress - .86) /
            .14
          );

      }


      element.style.opacity =
        Math.max(
          opacity,
          0
        );

    }
  );


  const watermark =
    document.querySelector(
      ".scroll-watermark"
    );


  if(watermark){

    let opacity = 1;


    if(progress > .86){

      opacity =
        1 -
        (
          (progress - .86) /
          .14
        );

    }


    watermark.style.opacity =
      Math.max(
        opacity,
        0
      );

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
   INERTIA CURSOR
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
      0.22;


    cursorY +=
      (
        mouseY -
        cursorY
      ) *
      0.22;


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
        speed * 0.08,
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
