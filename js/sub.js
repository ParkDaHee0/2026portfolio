document.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('#worklist ol li');
  const items = document.querySelectorAll('.work_wrap li');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('on'));
      tab.classList.add('on');

      const filter = tab.dataset.filter;

      items.forEach(item => {
        const type = item.dataset.type;
        if (filter === 'all' || filter === type) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const ul = document.querySelector('#marquee ul');
  const ol = document.querySelector('#marquee ol');


  // marquee가 있는 페이지에서만 실행
  if (ul && ol) {

    // li 자동 복제
    function duplicateItems(target) {

      const items = [...target.children];

      while (target.scrollWidth < window.innerWidth * 3) {

        items.forEach(item => {
          const clone = item.cloneNode(true);
          target.appendChild(clone);
        });

      }

    }

    duplicateItems(ul);
    duplicateItems(ol);


    const BASE_SPEED = 0.35;
    const BOOST_SPEED = 1.4;
    const BOOST_DURATION = 300;

    let currentSpeed = BASE_SPEED;
    let targetSpeed = BASE_SPEED;

    let posUl = 0;
    let posOl = 0;

    let boostTimeout;

    window.addEventListener('scroll', () => {

      targetSpeed = BOOST_SPEED;

      clearTimeout(boostTimeout);

      boostTimeout = setTimeout(() => {
        targetSpeed = BASE_SPEED;
      }, BOOST_DURATION);

    }, { passive: true });


    function loop() {

      // 속도 부드럽게 변화
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      const halfUl = ul.scrollWidth / 2;
      const halfOl = ol.scrollWidth / 2;

      // ul 왼쪽 이동
      posUl -= currentSpeed;

      if (posUl <= -halfUl) {
        posUl += halfUl;
      }

      // ol 오른쪽 이동
      posOl += currentSpeed;

      if (posOl >= halfOl) {
        posOl -= halfOl;
      }

      ul.style.transform = `translate3d(${posUl}px,0,0)`;
      ol.style.transform = `translate3d(${-halfOl + posOl}px,0,0)`;

      requestAnimationFrame(loop);

    }

    requestAnimationFrame(loop);

  }


  // GSAP
  gsap.registerPlugin(ScrollTrigger);


  // sub_vis 이미지 확대
  const subVisImg = document.querySelector('#sub_vis figure img');

  if (subVisImg) {

    gsap.fromTo(subVisImg,
      { scale: 1.4 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#sub_vis figure",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

  }


  // sub_mokup 이미지 확대
  const subMockupImg = document.querySelector('#sub_mokup img');

  if (subMockupImg) {

    gsap.fromTo(subMockupImg,
      { scale: 1.3 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#sub_mokup",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

  }

  requestAnimationFrame(loop);

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo("#sub_vis figure img",
    { scale: 1.4 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: "#sub_vis figure",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );

  gsap.fromTo("#sub_mokup img",
    { scale: 1.6 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: "#sub_mokup",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );

});

const faqItems = document.querySelectorAll('#faq ul li');

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('on');
  });
});

document.addEventListener('DOMContentLoaded', () => {

  const text = [
    '다양한 경험을 가진',
    '브랜딩을 고민하는',
    '사용자를 생각하는',
    '디테일에 진심인'
  ];

  const typingElement = document.querySelector('.typing');

  let textIndex = 0;
  let charIndex = 0;

  function typing() {

    if (charIndex < text[textIndex].length) {

      typingElement.textContent += text[textIndex][charIndex];

      charIndex++;

      setTimeout(typing, 100);
    } else {

      setTimeout(() => {

        typingElement.textContent = '';

        charIndex = 0;

        textIndex++;

        if (textIndex >= text.length) {
          textIndex = 0;
        }

        typing();

      }, 2000);

    }

  }

  typing();

});

//여기부터 새로운 거임
/* =========================
   ABILITY TEXT SPLIT
========================= */

const fillTexts = document.querySelectorAll(".fill_text");

fillTexts.forEach(text => {

  const chars = text.textContent.split("");

  text.innerHTML = chars.map(char => {

    if (char === " ") {
      return "<span>&nbsp;</span>";
    }

    return `<span>${char}</span>`;

  }).join("");

});


/* =========================
   ABILITY SCROLL FILL
========================= */

const texts = document.querySelectorAll('.fill_text');
const ability = document.querySelector('#ability');

window.addEventListener('scroll', () => {

  const rect = ability.getBoundingClientRect();

  const progress =
    (window.innerHeight - rect.top) /
    (rect.height + window.innerHeight);

  texts.forEach((text, index) => {

    const offset = 0.15;

    const start = offset + (index * 0.13);
    const end = start + 0.13;

    let p = (progress - start) / (end - start);

    p = Math.max(0, Math.min(1, p));

    text.style.backgroundImage = `
      linear-gradient(
        to right,
        #E24101 ${p * 100}%,
        #d0d0d0 ${p * 100}%
      )
    `;

  });

});


/* =========================
   EXPERIENCE IMAGE CHANGE
========================= */

const historyItems = document.querySelectorAll(".history_item");
const previewImage = document.querySelector(".exp_img img");
const expImg = document.querySelector(".exp_img");

let currentImg = "";

window.addEventListener("scroll", () => {

  const imgRect = expImg.getBoundingClientRect();

  // 이미지 중앙선 기준
  const triggerPoint =
    imgRect.top + (imgRect.height / 2);

  historyItems.forEach((item) => {

    const rect = item.getBoundingClientRect();

    if (
      rect.top <= triggerPoint &&
      rect.bottom > triggerPoint
    ) {

      const nextImg = item.dataset.img;

      if (currentImg === nextImg) return;

      currentImg = nextImg;

      previewImage.style.opacity = 0;

      setTimeout(() => {

        previewImage.src = nextImg;
        previewImage.style.opacity = 1;

      }, 50);

    }

  });

});

// 새로고침 시 첫 이미지 맞추기
window.dispatchEvent(new Event("scroll"));

/* =========================
   MOBILE NAV
========================= */

const hamBtn = document.getElementById('hamBtn');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('closeBtn');

if (hamBtn && mobileNav && navOverlay && closeBtn) {

  function openNav() {
    mobileNav.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

}