
/* OBVIOUS — scroll typography */

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const gallery = document.querySelector(".gallery");
const cursor = document.querySelector(".cursor");

/* SETTINGS */

const SETTINGS = {
  scrollHeight: 520,  // gallery height in vh
  wordSize: 17,       // font size in vw
  tilt: 4,            // rotation in degrees
  emailStart: 0.88
};

const clamp = (value, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const smooth = value => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

const mix = (a, b, t) =>
  a + (b - a) * t;


/* REMOVE IMAGE GALLERY, KEEP SCROLL SPACE */

function preparePage() {
  if (gallery) {
    gallery.querySelectorAll(".tile").forEach(
      tile => tile.remove()
    );

    gallery.querySelectorAll("img").forEach(
      image => image.remove()
    );

    gallery.style.minHeight =
      SETTINGS.scrollHeight + "vh";

    gallery.style.position = "relative";
  } else {
    const spacer = document.createElement("div");
    spacer.style.height =
      SETTINGS.scrollHeight + "vh";

    const contact =
      document.querySelector(".contact-end");

    if (contact) {
      contact.before(spacer);
    } else {
      document.body.appendChild(spacer);
    }
  }

  const contact =
    document.querySelector(".contact-end");

  if (contact) {
    contact.style.minHeight = "78vh";
  }
}


/* UPDATE CONTACT ADDRESS */

function updateEmailAddress() {
  const oldAddress = "not.so@obvious.ee";
  const newAddress = "info@obvious.ee";

  document.querySelectorAll(
    'a[href^="mailto:"]'
  ).forEach(link => {
    if (link.href.includes(oldAddress)) {
      link.href = link.href.replace(
        oldAddress,
        newAddress
      );
      link.textContent = link.textContent.replace(
        oldAddress,
        newAddress
      );
    }
  });

  // Update plain text in footer and contact area.
  [footer, document.querySelector(".contact-end")]
    .filter(Boolean)
    .forEach(element => {
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
      );

      const nodes = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }

      nodes.forEach(node => {
        node.nodeValue = node.nodeValue.replace(
          /not\.so@obvious\.ee/gi,
          newAddress
        );
      });
    });

  // FormSubmit destination.
  document.querySelectorAll(
    'form[action*="formsubmit.co"]'
  ).forEach(form => {
    form.action =
      "https://formsubmit.co/info@obvious.ee";
  });
}


/* ANIMATION DATA — FIVE PASSES */

const movements = [
  {
    fromX: -78, toX: 78,
    fromY: -24, toY: 24,
    fromScale: 0.70, toScale: 1.35,
    fromRotation: -4, toRotation: 4
  },
  {
    fromX: 78, toX: -78,
    fromY: -17, toY: 20,
    fromScale: 1.35, toScale: 0.75,
    fromRotation: 4, toRotation: -4
  },
  {
    fromX: -83, toX: 83,
    fromY: 22, toY: -22,
    fromScale: 0.75, toScale: 1.65,
    fromRotation: -4, toRotation: 4
  },
  {
    fromX: 83, toX: -83,
    fromY: -20, toY: 15,
    fromScale: 1.55, toScale: 0.85,
    fromRotation: 4, toRotation: -4
  },
  {
    fromX: -72, toX: 65,
    fromY: 18, toY: -12,
    fromScale: 0.85, toScale: 1.15,
    fromRotation: -4, toRotation: 0
  }
];


/* CREATE TYPOGRAPHY */

function createTypography() {
  const old =
    document.querySelector(".scroll-obvious");

  if (old) old.remove();

  // Remove any previously injected watermark.
  document.querySelectorAll(
    ".scroll-watermark"
  ).forEach(element => element.remove());

  const layer = document.createElement("div");
  layer.className = "scroll-obvious";

  movements.forEach((movement, index) => {
    const word = document.createElement("div");
    word.className = "obvious-motion-word";
    word.textContent = "OBVIOUS";
    word.dataset.index = index;
    layer.appendChild(word);
  });

  const email = document.createElement("div");
  email.className = "obvious-final-email";
  email.textContent = "INFO@OBVIOUS.EE";
  layer.appendChild(email);

  document.body.appendChild(layer);

  const style = document.createElement("style");
  style.textContent = `
    .scroll-obvious {
      position: fixed;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 20;
    }

    .obvious-motion-word {
      position: absolute;
      left: 50%;
      top: 50%;

      font-family: Arial, Helvetica, sans-serif;
      font-size: clamp(85px, ${SETTINGS.wordSize}vw, 340px);
      font-weight: 800;
      font-style: italic;
      letter-spacing: -0.08em;
      line-height: 0.85;
      white-space: nowrap;

      color: #111;
      opacity: 0;

      transform-origin: center center;
      will-change: transform, opacity, color;
      user-select: none;
    }

    .obvious-final-email {
      position: absolute;
      left: 50%;
      bottom: 12vh;

      font-family: Arial, Helvetica, sans-serif;
      font-size: clamp(25px, 5vw, 82px);
      font-weight: 700;
      letter-spacing: -0.055em;
      line-height: 1;
      white-space: nowrap;

      color: #111;
      opacity: 0;

      transform: translate(-50%, 40px);
      will-change: transform, opacity;
    }

    @media (max-width: 700px) {
      .obvious-motion-word {
        font-size: 24vw;
      }

      .obvious-final-email {
        font-size: 7vw;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .obvious-motion-word {
        will-change: auto;
      }

      .obvious-final-email {
        will-change: auto;
      }
    }
  `;

  document.head.appendChild(style);
}


/* CALCULATE SCROLL POSITION */

function scrollProgress() {
  const maxScroll = Math.max(
    document.documentElement.scrollHeight -
    window.innerHeight,
    1
  );

  return clamp(window.scrollY / maxScroll);
}


/* ANIMATE ALL FIVE WORDS */

function updateTypography() {
  const progress = scrollProgress();

  const words = document.querySelectorAll(
    ".obvious-motion-word"
  );

  // The five movements occupy the first 88%
  // of the scroll, slightly overlapping.
  const range = SETTINGS.emailStart;
  const step = range / movements.length;
  const duration = step * 1.23;

  words.forEach((word, index) => {
    const movement = movements[index];

    const start = index * step - step * 0.115;
    const t = clamp(
      (progress - start) / duration
    );

    // Ease-in and ease-out.
    const eased = smooth(t);

    // Word moves diagonally across the screen.
    const x = mix(
      movement.fromX,
      movement.toX,
      eased
    );

    const y = mix(
      movement.fromY,
      movement.toY,
      eased
    );

    // Gentle additional floating movement.
    const floatY =
      Math.sin(t * Math.PI * 2 + index) * 3;

    const scale = mix(
      movement.fromScale,
      movement.toScale,
      eased
    ) + Math.sin(t * Math.PI) * 0.08;

    const rotation = mix(
      movement.fromRotation,
      movement.toRotation,
      eased
    );

    // Fade in, remain visible, fade out.
    const fadeIn = smooth(t / 0.18);
    const fadeOut = smooth((1 - t) / 0.20);

    const visibility = fadeIn * fadeOut;

    // Change between nearly black and grey.
    const grey =
      Math.round(
        17 +
        Math.sin(t * Math.PI) * 135
      );

    word.style.color =
      `rgb(${grey}, ${grey}, ${grey})`;

    word.style.opacity = visibility;

    word.style.transform = `
      translate(-50%, -50%)
      translate(${x}vw, ${y + floatY}vh)
      rotate(${rotation}deg)
      scale(${scale})
    `;
  });

  // Final email appears at the bottom.
  const email = document.querySelector(
    ".obvious-final-email"
  );

  if (email) {
    const t = smooth(
      (progress - SETTINGS.emailStart) /
      (1 - SETTINGS.emailStart)
    );

    email.style.opacity = t;

    email.style.transform = `
      translate(-50%, ${mix(40, 0, t)}px)
    `;
  }
}


/* HEADER AND FOOTER */

function updateHeader() {
  const scrolled = window.scrollY > 60;

  if (header) {
    header.classList.toggle("scrolled", scrolled);
  }

  if (footer) {
    footer.classList.toggle("scrolled", scrolled);
  }
}


/* SCROLL HANDLER */

let scrollScheduled = false;

function updatePage() {
  updateHeader();
  updateTypography();
}

function scheduleUpdate() {
  if (scrollScheduled) return;

  scrollScheduled = true;

  requestAnimationFrame(() => {
    updatePage();
    scrollScheduled = false;
  });
}

window.addEventListener(
  "scroll",
  scheduleUpdate,
  { passive: true }
);

window.addEventListener(
  "resize",
  scheduleUpdate
);


/* INERTIA DONUT CURSOR */

if (
  cursor &&
  window.matchMedia("(pointer:fine)").matches
) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let previousX = cursorX;
  let previousY = cursorY;

  window.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.classList.remove("hidden");
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;

    const dx = cursorX - previousX;
    const dy = cursorY - previousY;

    const speed = Math.sqrt(dx * dx + dy * dy);
    const stretch = Math.min(speed * 0.08, 8);

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    cursor.style.transform = `
      translate(-50%, -50%)
      scale(
        ${1 + stretch / 100},
        ${1 - stretch / 320}
      )
    `;

    previousX = cursorX;
    previousY = cursorY;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach(
    element => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    }
  );

  document.addEventListener("mouseleave", () => {
    cursor.classList.add("hidden");
  });

  document.addEventListener("mouseenter", () => {
    cursor.classList.remove("hidden");
  });
}


/* START */

preparePage();
updateEmailAddress();
createTypography();
updatePage();
