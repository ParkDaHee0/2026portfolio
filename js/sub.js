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

  const BASE_SPEED = 0.8;   // 기본 속도 (px/frame)
  const BOOST_SPEED = 1.4;  // 스크롤 시 속도
  const BOOST_DURATION = 200; // 스크롤 후 유지 시간 (ms)

  let posUl = 0;
  let posOl = 0;
  let boostUntil = 0;

  window.addEventListener('scroll', () => {
    boostUntil = performance.now() + BOOST_DURATION;
  }, { passive: true });

  function loop(now) {
    const speed = (now < boostUntil) ? BOOST_SPEED : BASE_SPEED;

    const halfUl = ul.scrollWidth / 2;
    const halfOl = ol.scrollWidth / 2;

    // ul: 왼쪽으로 이동
    posUl -= speed;
    if (posUl <= -halfUl) posUl += halfUl;
    ul.style.transform = `translateX(${posUl}px)`;

    // ol: 오른쪽으로 이동 (반대 방향)
    posOl += speed;
    if (posOl >= halfOl) posOl -= halfOl;
    ol.style.transform = `translateX(${-halfOl + posOl}px)`;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // ✅ 이전 코드에서 쓰던 target 관련 로직 제거
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