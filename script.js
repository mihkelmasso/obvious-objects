
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <!-- GOOGLE ANALYTICS -->

  <script async
    src="https://www.googletagmanager.com/gtag/js?id=G-EXMT69G95G">
  </script>

  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", "G-EXMT69G95G");
  </script>


  <!-- SEO -->

  <title>OBVIOUS — Furniture, Objects & Products</title>

  <meta
    name="description"
    content="OBVIOUS creates and sells independent furniture, objects and physical products, alongside selected product and industrial design commissions."
  >

  <link rel="canonical"
        href="https://obvious.ee/">

  <meta property="og:title"
        content="OBVIOUS — Furniture, Objects & Products">

  <meta property="og:description"
        content="Independent furniture, objects and physical products, alongside selected product and industrial design commissions.">

  <meta property="og:url"
        content="https://obvious.ee/">

  <meta property="og:type"
        content="website">

  <meta property="og:image"
        content="https://obvious.ee/images/gallery/01.jpg">


  <!-- EXISTING STYLES -->

  <link rel="stylesheet" href="style.css">


  <!-- FLOATING EMAIL STYLES -->

  <style>

    .floating-email-area {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      isolation: isolate;
    }

    .floating-email {
      position: absolute;

      left: 4vw;
      top: 8vh;

      display: block;
      width: max-content;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      font-size: clamp(26px, 5vw, 88px);
      font-weight: 800;
      font-style: italic;

      line-height: 1;
      letter-spacing: -0.07em;

      color: #111;
      text-decoration: none;
      white-space: nowrap;

      cursor: pointer;
      pointer-events: auto;

      z-index: 40;

      animation:
        emailBounce 100s linear infinite;

      will-change: transform;
    }

    /*
      Extremely slow diagonal motion.
      The text reverses horizontal and
      vertical direction at the edges.

      Horizontal travel accounts for
      the actual text width.
    */

    @keyframes emailBounce {

      0% {
        transform:
          translate(0, 0)
          rotate(-4deg)
          scale(0.94);
      }

      25% {
        transform:
          translate(
            calc(92vw - 100%),
            38vh
          )
          rotate(4deg)
          scale(1.04);
      }

      50% {
        transform:
          translate(0, 67vh)
          rotate(-4deg)
          scale(0.96);
      }

      75% {
        transform:
          translate(
            calc(92vw - 100%),
            35vh
          )
          rotate(4deg)
          scale(1.03);
      }

      100% {
        transform:
          translate(0, 0)
          rotate(-4deg)
          scale(0.94);
      }

    }


    .floating-email:hover {
      color: #888;
    }

    .floating-email:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 8px;
    }


    /* MOBILE */

    @media (max-width: 700px) {

      .floating-email-area {
        height: 85vh;
      }

      .floating-email {
        font-size: 7vw;
      }

      @keyframes emailBounce {

        0% {
          transform:
            translate(0, 0)
            rotate(-3deg);
        }

        25% {
          transform:
            translate(
              calc(92vw - 100%),
              28vh
            )
            rotate(3deg);
        }

        50% {
          transform:
            translate(0, 55vh)
            rotate(-3deg);
        }

        75% {
          transform:
            translate(
              calc(92vw - 100%),
              30vh
            )
            rotate(3deg);
        }

        100% {
          transform:
            translate(0, 0)
            rotate(-3deg);
        }

      }

    }


    @media (prefers-reduced-motion: reduce) {

      .floating-email {
        animation: none;
      }

    }

  </style>

</head>


<body>

  <!-- CUSTOM CURSOR -->

  <div class="cursor"></div>


  <!-- HEADER -->

  <header>

    <div class="logo">
      OBVIOUS
    </div>

    <div class="seo-intro">

      <h1>OBVIOUS</h1>

      <p>
        Independent furniture, objects and physical products.
      </p>

      <p>
        Selected product and industrial design commissions.
      </p>

    </div>

  </header>


  <!-- SERVICES -->

  <section class="services"
           aria-label="Design services">

    <h2>Design services</h2>

    <ul>

      <li>Product design</li>

      <li>Industrial design</li>

      <li>Furniture & objects</li>

      <li>Custom development</li>

    </ul>

  </section>


  <!-- GALLERY -->

  <main class="gallery">

    <div class="tile t1">
      <img src="images/gallery/01.jpg" alt="">
    </div>

    <div class="tile t2">
      <img src="images/gallery/03.jpg" alt="">
    </div>

    <div class="tile t3">
      <img src="images/gallery/04.jpg" alt="">
    </div>

    <div class="tile t4">
      <img src="images/gallery/05.jpg" alt="">
    </div>

    <div class="tile t5">
      <img src="images/gallery/07.jpg" alt="">
    </div>

    <div class="tile t6">
      <img src="images/gallery/08.jpg" alt="">
    </div>

    <div class="tile t7">
      <img src="images/gallery/09.jpg" alt="">
    </div>

    <div class="tile t8">
      <img src="images/gallery/10.jpg" alt="">
    </div>

    <div class="tile t9">
      <img src="images/gallery/11.jpg" alt="">
    </div>

    <div class="tile t10">
      <img src="images/gallery/12.jpg" alt="">
    </div>

    <div class="tile t11">
      <img src="images/gallery/13.png" alt="">
    </div>

    <div class="tile t12">
      <img src="images/gallery/14.jpg" alt="">
    </div>

    <div class="tile t13">
      <img src="images/gallery/15.jpg" alt="">
    </div>

  </main>


  <!-- FLOATING EMAIL -->

  <section
    class="floating-email-area"
    aria-label="Email contact">

    <a
      class="floating-email"
      href="mailto:info@obvious.ee">

      INFO@OBVIOUS.EE

    </a>

  </section>


  <!-- CONTACT FORM -->

  <section class="page contact-end">

    <div class="contact-content">

      <h1>Contact</h1>

      <p>
        For product inquiries, commissions,
        availability or further information,
        please get in touch.
      </p>

      <p>
        <a href="mailto:info@obvious.ee">
          info@obvious.ee
        </a>
      </p>


      <form
        action="https://formsubmit.co/info@obvious.ee"
        method="POST">

        <input
          type="hidden"
          name="_subject"
          value="OBVIOUS inquiry"
        >

        <input
          type="hidden"
          name="_captcha"
          value="false"
        >

        <input
          type="hidden"
          name="_template"
          value="table"
        >


        <input
          type="text"
          name="name"
          placeholder="Name"
          required
        >


        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        >


        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          required
        ></textarea>


        <button type="submit">
          Send inquiry
        </button>

      </form>

    </div>

  </section>


  <!-- FOOTER -->

  <footer>

    <a href="mailto:info@obvious.ee">
      info@obvious.ee
    </a>

    <span>
      obvious © 2026
    </span>

  </footer>


  <!-- EXISTING ANIMATIONS -->

  <script src="script.js"></script>

</body>
</html>
