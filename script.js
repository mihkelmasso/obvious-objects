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


    /* Remove existing tiles */

    gallery
      .querySelectorAll(".tile")
      .forEach(tile => tile.remove());


    /* =====================================
       CREATE TIGHTER / LARGER GALLERY
       ===================================== */

    imageFiles.forEach((file,index) => {

      const tile =
        document.createElement("div");

      tile.className =
        "tile";


      const pattern =
        index % 8;

      let width;
      let left;
      let top;


      if(pattern === 0){

        width = 31;
        left = 4;
        top = index * 29 + 4;

      }

      else if(pattern === 1){

        width = 28;
        left = 57;
        top = index * 29 + 17;

      }

      else if(pattern === 2){

        width = 34;
        left = 18;
        top = index * 29 + 30;

      }

      else if(pattern === 3){

        width = 29;
        left = 67;
        top = index * 29 + 43;

      }

      else if(pattern === 4){

        width = 32;
        left = 35;
        top = index * 29 + 56;

      }

      else if(pattern === 5){

        width = 27;
        left = 1;
        top = index * 29 + 69;

      }

      else if(pattern === 6){

        width = 30;
        left = 53;
        top = index * 29 + 82;

      }

      else{

        width = 33;
        left = 16;
        top = index * 29 + 95;

      }


      const sizeVariation =
        Math.sin(index * 3.17) * 3.5;


      const horizontalVariation =
        Math.cos(index * 2.41) * 4;


      width =
        Math.max(
          25,
          width + sizeVariation
        );


      left =
        Math.max(
          1,
          Math.min(
            70,
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
        Existing floating movement.
      */

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
        index < 6
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


    /*
      Keep the gallery compact.
    */

    const galleryHeight =
      Math.max(
        620,
        imageFiles.length * 29 + 100
      );


    gallery.style.minHeight =
      `${galleryHeight}vh`;


    /*
      Compact contact ending.

      Previously this was tied to the
      gallery height and created a huge
      empty final area.
    */

    const contact =
      document.querySelector(
        ".contact-end"
      );


    if(contact){

      contact.style.minHeight =
        "78vh";

    }


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
   WATERMARK SECTIONS
   =========================================

   SECTION 1
   RIGHT → LEFT

   UNDER
   CONSTRUCTION


   SECTION 2
   LEFT → RIGHT

   UNDER
   CONSTRUCTION


   SECTION 3
   RIGHT → LEFT

   CONTACT
   ========================================= */

const watermarkSections = [

  [
    {
      text:"UNDER",
      direction:-1,
      delay:0,
      speed:0.78
    },

    {
      text:"CONSTRUCTION",
      direction:-1,
      delay:0.12,
      speed:0.82
    }
  ],


  [
    {
      text:"UNDER",
      direction:1,
      delay:0,
      speed:0.76
    },

    {
      text:"CONSTRUCTION",
      direction:1,
      delay:0.12,
      speed:0.80
    }
  ],


  [
    {
      text:"CONTACT",
      direction:-1,
      delay:0,
      speed:0.48
    }
  ]

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


  watermarkSections.forEach(
    (section,sectionIndex)=>{

      const sectionElement =
        document.createElement("div");


      sectionElement.className =
        `watermark-section watermark-section-${sectionIndex}`;


      section.forEach(
        (word,rowIndex)=>{

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


          text.dataset.delay =
            word.delay;


          text.dataset.speed =
            word.speed;


          line.appendChild(
            text
          );


          sectionElement.appendChild(
            line
          );

        }
      );


      watermark.appendChild(
        sectionElement
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


    .watermark-section{
      position:absolute;
      inset:0;

      opacity:0;

      pointer-events:none;
    }


    .watermark-section-0{
      opacity:1;
    }


    .watermark-line{
      position:absolute;

      left:0;

      width:100%;

      height:30vh;

      display:flex;

      align-items:center;

      overflow:visible;

      perspective:1000px;
    }


    .watermark-line:nth-child(1){
      top:15vh;
    }


    .watermark-line:nth-child(2){
      top:53vh;
    }


    .watermark-section-2
    .watermark-line:nth-child(1){
      top:12vh;
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

    }

  `;


  document.head.appendChild(
    style
  );

}


createWatermark();


/* =========================================
   WATERMARK MOTION
   ========================================= */

function updateWatermark(){

  const watermark =
    document.querySelector(
      ".scroll-watermark"
    );


  const sections =
    document.querySelectorAll(
      ".watermark-section"
    );


  if(
    !watermark ||
    !sections.length
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
    Three equal sections across
    the complete page.
  */

  const sectionCount =
    sections.length;


  const sectionSize =
    1 /
    sectionCount;


  const rawSection =
    progress /
    sectionSize;


  const sectionIndex =
    Math.min(
      Math.floor(rawSection),
      sectionCount - 1
    );


  const sectionProgress =
    Math.min(
      Math.max(
        rawSection -
        sectionIndex,
        0
      ),
      1
    );


  /*
    Smooth handover.
  */

  const transitionZone =
    0.10;


  sections.forEach(
    (section,index)=>{

      let opacity = 0;


      if(index === sectionIndex){

        opacity = 1;

      }


      if(
        index === sectionIndex + 1 &&
        sectionProgress >
          1 - transitionZone
      ){

        opacity =
          (
            sectionProgress -
            (1 - transitionZone)
          ) /
          transitionZone;

      }


      if(
        index === sectionIndex - 1 &&
        sectionProgress <
          transitionZone
      ){

        opacity =
          1 -
          (
            sectionProgress /
            transitionZone
          );

      }


      section.style.opacity =
        Math.max(
          0,
          Math.min(
            1,
            opacity
          )
        );

    }
  );


  /*
    Animate sections.
  */

  sections.forEach(
    (section,sectionNumber)=>{

      const localProgress =
        Math.min(
          Math.max(
            (
              progress -
              sectionNumber *
              sectionSize
            ) /
            sectionSize,
            0
          ),
          1
        );


      const elements =
        section.querySelectorAll(
          ".watermark-word"
        );


      elements.forEach(
        (element,rowIndex)=>{

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
            Upper word enters first.
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


          const individualProgress =
            Math.min(
              Math.max(
                delayedProgress *
                speed,
                0
              ),
              1
            );


          /*
            CONTACT settles at the
            upper-right and never crosses
            the contact form.
          */

          if(
            sectionNumber === 2
          ){

            const settleProgress =
              Math.min(
                individualProgress /
                0.62,
                1
              );


            const startX =
              window.innerWidth +
              160;


            const targetX =
              window.innerWidth *
              0.94;


            const x =
              startX +
              (
                targetX -
                startX
              ) *
              settleProgress;


            const y =
              0;


            const rotationY =
              Math.sin(
                settleProgress *
                Math.PI
              ) *
              10;


            const scale =
              1 +
              Math.sin(
                settleProgress *
                Math.PI
              ) *
              .025;


            element.style.transform =
              `
              translate3d(
                ${x}px,
                ${y}px,
                0
              )
              translateX(-100%)
              rotateY(${rotationY}deg)
              scale(${scale})
              `;


            element.style.opacity =
              1;


            return;

          }


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
              end -
              start
            ) *
            individualProgress;


          const y =
            Math.sin(
              individualProgress *
              Math.PI *
              2 +
              rowIndex
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
              rowIndex
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


          element.style.opacity =
            1;

        }
      );

    }
  );


  watermark.style.opacity =
    1;

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

loadGallery();

updatePage();
