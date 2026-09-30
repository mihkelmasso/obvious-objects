const header = document.querySelector("header");
const floatingItems = document.querySelectorAll(".tile");
const cursor = document.querySelector(".cursor");

function updateMotion(){

  const scroll = window.scrollY;

  if(header){
    header.classList.toggle("scrolled", scroll > 60);
  }

  floatingItems.forEach((item,index)=>{

    const baseSpeed = parseFloat(item.dataset.speed || 0.03);
    const baseScale = parseFloat(item.dataset.scale || 1);
    const phase = index * 0.85;

    let depth = 1;

    if(index % 3 === 0){
      depth = 1.35;
    }

    if(index % 3 === 1){
      depth = 0.85;
    }

    if(index % 3 === 2){
      depth = 0.55;
    }

    let x = 0;
    let y = scroll * baseSpeed * depth;

    if(index % 5 === 0){

      x =
        Math.sin(scroll * 0.0017 + phase)
        * 115
        * depth;

      y +=
        Math.cos(scroll * 0.0013 + phase)
        * 45
        * depth;
    }

    if(index % 5 === 1){

      x =
        -Math.sin(scroll * 0.0015 + phase)
        * 105
        * depth;

      y +=
        Math.sin(scroll * 0.0019 + phase)
        * 55
        * depth;
    }

    if(index % 5 === 2){

      x =
        Math.cos(scroll * 0.0017 + phase)
        * 85
        * depth;

      y +=
        Math.sin(scroll * 0.0012 + phase)
        * 90
        * depth;
    }

    if(index % 5 === 3){

      x =
        Math.sin(scroll * 0.0013 + phase)
        * 135
        * depth;

      y +=
        Math.cos(scroll * 0.0017 + phase)
        * 65
        * depth;
    }

    if(index % 5 === 4){

      x =
        -Math.cos(scroll * 0.0015 + phase)
        * 95
        * depth;

      y +=
        Math.sin(scroll * 0.0016 + phase)
        * 75
        * depth;
    }

    const scale =
      baseScale +
      Math.sin(scroll * 0.00125 + phase)
      * 0.045
      * depth;

    const rotate =
      Math.sin(scroll * 0.0009 + phase)
      * 0.8
      * depth;

    item.style.transform =
      `translate3d(${x}px,${y}px,0) scale(${scale}) rotate(${rotate}deg)`;
  });
}

window.addEventListener(
  "scroll",
  updateMotion,
  {passive:true}
);

window.addEventListener(
  "load",
  updateMotion
);

window.addEventListener(
  "resize",
  updateMotion
);


/* INERTIA CURSOR */

if(
  cursor &&
  window.matchMedia("(pointer:fine)").matches
){

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  let previousX = cursorX;
  let previousY = cursorY;

  window.addEventListener(
    "mousemove",
    (event)=>{

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.classList.remove("hidden");
    }
  );

  function animateCursor(){

    cursorX +=
      (mouseX - cursorX) * 0.22;

    cursorY +=
      (mouseY - cursorY) * 0.22;

    const dx =
      cursorX - previousX;

    const dy =
      cursorY - previousY;

    const speed =
      Math.sqrt(dx * dx + dy * dy);

    const stretch =
      Math.min(speed * 0.08,8);

    cursor.style.left =
      cursorX + "px";

    cursor.style.top =
      cursorY + "px";

    cursor.style.transform =
      `translate(-50%,-50%)
       scale(${1 + stretch / 100},
              ${1 - stretch / 320})`;

    previousX = cursorX;
    previousY = cursorY;

    requestAnimationFrame(
      animateCursor
    );
  }

  animateCursor();

  document
    .querySelectorAll("a,button")
    .forEach((element)=>{

      element.addEventListener(
        "mouseenter",
        ()=>{
          cursor.classList.add("hover");
        }
      );

      element.addEventListener(
        "mouseleave",
        ()=>{
          cursor.classList.remove("hover");
        }
      );

    });

  document.addEventListener(
    "mouseleave",
    ()=>{
      cursor.classList.add("hidden");
    }
  );

  document.addEventListener(
    "mouseenter",
    ()=>{
      cursor.classList.remove("hidden");
    }
  );
}
