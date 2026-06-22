const toggle = document.getElementById('toggle');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const title = document.querySelector('#logo .title');

// 이미 토글을 누른 적 있으면 스크롤 허용
if (sessionStorage.getItem('introPlayed')) {
  document.body.style.overflow = 'auto';
  toggle.classList.add('on');
  left.classList.add('active');
  right.classList.add('active');
  title.classList.add('white');
} else {
  document.body.style.overflow = 'hidden';
}

toggle.addEventListener('click', () => {
  // 이미 on 상태면 아무것도 안 함
  if (toggle.classList.contains('on')) return;

  left.classList.add('active');
  right.classList.add('active');
  toggle.classList.add('on');

  document.body.style.overflow = 'auto';
  sessionStorage.setItem('introPlayed', 'true');
  title.classList.add('white');

  const nextSection = document.querySelector('#works');
  setTimeout(() => {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }, 1200);
});

// 스크롤 시 header 상태
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

const worksSection = document.getElementById('works');

window.addEventListener('scroll', () => {
  const rect = worksSection.getBoundingClientRect();
  if (rect.top <= 100) {
    title.classList.remove('white');
  } else {
    title.classList.add('white');
  }
});

// 햄버거 메뉴
const hamBtn = document.getElementById('hamBtn');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('closeBtn');

function openNav() {
  mobileNav.classList.add('open');
  navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

hamBtn.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);
navOverlay.addEventListener('click', closeNav);

document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', closeNav);
});

// 프로필 카드 토글
const togglebtn = document.getElementById('togglebtn');
const card = document.querySelector('.card');

togglebtn.addEventListener('click', () => {
  togglebtn.classList.toggle('on');
  card.classList.toggle('flip');
});

// ===== WORKS =====
const slides = [
  { img: '../images/main/work_golf.jpg', title: '파크골프 예약 어플리케이션', sub: 'Mobile / 기여도 100%', label: '파크골프 예약 어플리케이션', href: '../sub/sub_00.html' },
  { img: '../images/main/work_esim.jpg', title: 'eSIM 구매 어플리케이션', sub: 'Mobile / 기여도 100%', label: 'eSIM 구매 어플리케이션', href: '#' },
  { img: 'images/main/work_tire.jpg', title: '순환자원 수거 어플리케이션', sub: 'Mobile / 기여도 100%', label: '순환자원 수거 어플리케이션', href: '#' },
  { img: 'images/main/work_pluto.jpg', title: '그룹웨어 다크모드 UI', sub: 'Web / 기여도 60%', label: '그룹웨어 다크모드 UI', href: '#' },
  { img: 'images/main/work_pig.jpg', title: '목촌돼지국밥 웹사이트', sub: 'Web / 서브기여도 90%', label: '목촌돼지국밥', href: '#' },
  { img: 'images/main/work_ybglobal.jpg', title: 'YB글로벌 웹사이트', sub: 'Web / 서브기여도 100%', label: 'YB글로벌', href: '#' },
  { img: 'images/main/work_nature.jpg', title: '자연농산 웹사이트', sub: 'Web / 기여도 100%', label: '자연농산', href: '#' },
  { img: 'images/main/work_cremon.jpg', title: '끄레몽 웹사이트', sub: 'Web / 기여도 100%', label: '끄레몽', href: '#' },
];

const CARD_W = 400;
const CARD_H = 533;
const GAP = 250;
const STEP = CARD_W + GAP;

let current = 0;
const track = document.getElementById('track');
const labelEl = document.getElementById('works-label');
const cards = [];

slides.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'card-item';
  el.innerHTML = `
    <img src="${s.img}" alt="${s.title}">
    <div class="slide-info">
      <h3>${s.title}</h3>
      <p>${s.sub}</p>
    </div>
  `;
  el.addEventListener('click', () => {
    if (i === current) {
      location.href = s.href;
    } else {
      current = i;
      render();
    }
  });
  track.appendChild(el);
  cards.push(el);
});

function render() {
  const total = slides.length;
  // carousel-wrap의 실제 너비 기준으로 중앙 계산
  const carouselWrap = document.querySelector('.carousel-wrap');
  const trackW = carouselWrap ? carouselWrap.offsetWidth : window.innerWidth;
  const centerX = trackW / 2 - CARD_W / 2;
  const RADIUS = 3000;

  cards.forEach((card, i) => {
    let offset = i - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const visible = Math.abs(offset) <= 1;
    card.style.visibility = visible ? 'visible' : 'hidden';
    card.style.pointerEvents = visible ? 'auto' : 'none';

    const x = centerX + offset * STEP;

    const angleRad = (offset * STEP) / RADIUS;
    const baseY = 20;
    const curveY = offset === 0 ? 0 : RADIUS * (1 - Math.cos(angleRad)) * 0.3 + 62;
    const y = baseY + curveY;

    const rotate = offset * 14;
    const zIndex = offset === 0 ? 10 : 5;

    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.transform = `rotate(${rotate}deg)`;
    card.style.opacity = '1';
    card.style.zIndex = zIndex;
    card.classList.toggle('active', offset === 0);
  });

  // nav-wrap을 active 카드 바로 아래에 배치
  const navWrap = document.getElementById('navWrap');
  const activeCard = cards[current];
  const cardBottom = parseFloat(activeCard.style.top) + CARD_H;
  const cardCenterX = parseFloat(activeCard.style.left) + CARD_W / 2;
  navWrap.style.position = 'absolute';
  navWrap.style.top = (cardBottom + 20) + 'px';
  navWrap.style.left = cardCenterX + 'px';
  navWrap.style.transform = 'translateX(-50%)';
}

render();
window.addEventListener('resize', render);

document.getElementById('prevBtn').addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  render();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  current = (current + 1) % slides.length;
  render();
});

// 탭
document.querySelectorAll('.works-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.works-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById('tab-' + btn.dataset.tab).style.display = 'block';
    if (btn.dataset.tab === 'web') render();
  });
});

// ===== CONTACT =====
const contactSection = document.getElementById('contact');
const contactWrap = document.querySelector('.contact-wrap');
const leftWord = document.querySelector('.left-word');
const rightWord = document.querySelector('.right-word');
const contactImg = document.querySelector('.contact-img');
const contactImgEl = document.querySelector('.contact-img img');

window.addEventListener('scroll', () => {
  const rect = contactSection.getBoundingClientRect();
  const sectionH = contactSection.offsetHeight;
  const viewH = window.innerHeight;

  const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  const maxOffset = 50;
  const leftX = -(maxOffset - scrolled * maxOffset);
  const rightX = maxOffset - scrolled * maxOffset;

  leftWord.style.transform = `translateX(${leftX}vw)`;
  rightWord.style.transform = `translateX(${rightX}vw)`;

  const imgScale = 1 + scrolled * 0.3;
  contactImgEl.style.transform = `scale(${imgScale})`;
});

// ===== STACK ITEMS =====
const stackItems = document.querySelectorAll('.stack-item');

window.addEventListener('scroll', () => {
  const rect = contactSection.getBoundingClientRect();
  const sectionH = contactSection.offsetHeight;
  const viewH = window.innerHeight;

  const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  stackItems.forEach((item, i) => {
    const rotates = [5, -8, 3, -5];
    let translateY = 0;

    if (scrolled < 0.3) {
      const enterProgress = scrolled / 0.3;
      const startY = 200 - i * 15;
      translateY = startY * (1 - enterProgress) + i * 10;
    } else if (scrolled > 0.7) {
      const exitStart = 0.7 + i * 0.08;
      const exitProgress = Math.max(0, (scrolled - exitStart) / 0.15);
      translateY = i * 10 - exitProgress * 800;
    } else {
      translateY = i * 10;
    }

    item.style.transform = `translateY(${translateY}px) rotate(${rotates[i]}deg)`;
  });
});

// ===== BEFORE-AFTER =====
const baSection = document.getElementById('before-after');
const baTrack = document.getElementById('baTrack');
const beforeLaptop = document.querySelector('.before-laptop');
const afterLaptop = document.querySelector('.after-laptop');
const beforeImg = document.getElementById('beforeImg');
const afterImg = document.getElementById('afterImg');

window.addEventListener('scroll', () => {
  const rect = baSection.getBoundingClientRect();
  const sectionH = baSection.offsetHeight;
  const viewH = window.innerHeight;

  const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  // 가로 이동
  baTrack.style.transform = `translateX(-${scrolled * 100}vw)`;

  // before 노트북 등장
  if (scrolled > 0.02) {
    beforeLaptop.classList.add('show');
  } else {
    beforeLaptop.classList.remove('show');
  }

  // after 노트북 등장
  if (scrolled > 0.55) {
    afterLaptop.classList.add('show');
  } else {
    afterLaptop.classList.remove('show');
  }

  // before 이미지: 랩탑 올라온 후(0.22)부터 스크롤
  if (beforeLaptop.classList.contains('show') && scrolled > 0.22 && scrolled < 0.48) {
    const imgProgress = (scrolled - 0.22) / (0.48 - 0.22);
    const imgH = beforeImg.naturalHeight * (770 / beforeImg.naturalWidth);
    const maxScroll = imgH - 480;
    beforeImg.style.top = `-${imgProgress * maxScroll}px`;
  } else if (scrolled <= 0.22) {
    beforeImg.style.top = '0px';
  }

  // after 이미지: 랩탑 올라온 후(0.75)부터 스크롤
  if (afterLaptop.classList.contains('show') && scrolled > 0.75) {
    const imgProgress = (scrolled - 0.75) / (1.0 - 0.75);
    const imgH = afterImg.naturalHeight * (770 / afterImg.naturalWidth);
    const maxScroll = imgH - 480;
    afterImg.style.top = `-${imgProgress * maxScroll}px`;
  } else if (scrolled <= 0.75) {
    afterImg.style.top = '0px';
  }
});

// ===== ETC =====
const etcSection = document.getElementById('etc');
const line02 = document.querySelector('.line02');

window.addEventListener('scroll', () => {
  const etcRect = etcSection.getBoundingClientRect();
  if (etcRect.bottom < window.innerHeight + 100) {
    line02.classList.add('settled');
  } else {
    line02.classList.remove('settled');
  }
});

// ===== MAP =====
let map = null;

function initMap(lat, lng) {
  if (map) return;

  map = L.map('map').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.circleMarker([lat, lng], {
    radius: 10,
    fillColor: '#FF4800',
    color: '#fff',
    weight: 3,
    fillOpacity: 1
  }).addTo(map).bindPopup('현재 위치').openPopup();
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      initMap(pos.coords.latitude, pos.coords.longitude);
      document.querySelector('.map-notice').textContent = '현재 위치를 표시하고 있습니다.';
    },
    () => {
      initMap(35.1796, 129.0756);
      document.querySelector('.map-notice').textContent = '위치 권한이 거부되어 기본 위치를 표시합니다.';
    }
  );
}