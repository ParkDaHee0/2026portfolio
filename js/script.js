const toggle = document.getElementById('toggle');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const title = document.querySelector('#logo .title')

// 이미 토글을 누른 적 있으면 스크롤 허용
if (sessionStorage.getItem('introPlayed')) {
  document.body.style.overflow = 'auto';
  toggle.classList.add('on');
  left.classList.add('active');
  right.classList.add('active');
} else {
  document.body.style.overflow = 'hidden';
}

toggle.addEventListener('click', () => {
  left.classList.toggle('active');
  right.classList.toggle('active');
  toggle.classList.toggle('on');

  document.body.style.overflow = 'auto';

  // 토글 누른 상태 저장
  sessionStorage.setItem('introPlayed', 'true');
  if (toggle.classList.contains('on')) {
    title.classList.add('white');
  } else {
    title.classList.remove('white');
  }

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
  // 방향 감지 코드 있으면 전부 제거
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

// 모바일 nav 링크 클릭 시 닫기
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', closeNav);
});

const togglebtn = document.getElementById('togglebtn');
const card = document.querySelector('.card');

togglebtn.addEventListener('click', () => {
  togglebtn.classList.toggle('on');
  card.classList.toggle('flip');
});

const slides = [
  { img: '../images/main/work_golf.jpg', title: '파크골프 예약 어플리케이션', sub: 'Mobile / 기여도 100%', label: '파크골프 예약 어플리케이션' },
  { img: '../images/main/work_esim.jpg', title: 'eSIM 구매 어플리케이션', sub: 'Mobile / 기여도 100%', label: 'eSIM 구매 어플리케이션' },
  { img: 'images/main/work_tire.jpg', title: '순환자원 수거 어플리케이션', sub: 'Mobile / 기여도 100%', label: '순환자원 수거 어플리케이션' },
  { img: 'images/main/work_pluto.jpg', title: '그룹웨어 다크모드 UI', sub: 'Web / 기여도 60%', label: '그룹웨어 다크모드 UI' },
  { img: 'images/main/work_pig.jpg', title: '목촌돼지국밥 웹사이트', sub: 'Web / 서브기여도 90%', label: '목촌돼지국밥' },
  { img: 'images/main/work_ybglobal.jpg', title: 'YB글로벌 웹사이트', sub: 'Web / 서브기여도 100%', label: 'YB글로벌' },
  { img: 'images/main/work_nature.jpg', title: '자연농산 웹사이트', sub: 'Web / 기여도 100%', label: '자연농산' },
  { img: 'images/main/work_cremon.jpg', title: '끄레몽 웹사이트', sub: 'Web / 기여도 100%', label: '끄레몽' },
];

const CARD_W = 500;
const CARD_H = 666;
const GAP = 250;
const STEP = CARD_W + GAP; // 650px

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
  el.addEventListener('click', () => { current = i; render(); });
  track.appendChild(el);
  cards.push(el);
});

function render() {
  const total = slides.length;
  const trackW = track.offsetWidth;
  const trackH = track.offsetHeight;
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
    //const baseY = (trackH - CARD_H) / 2;
    const baseY = 20;

    // 중앙은 그대로, 양옆만 아래로
    const curveY = offset === 0 ? 0 : RADIUS * (1 - Math.cos(angleRad)) * 0.3 + 62;
    const y = baseY + curveY;

    const rotate = offset * 14;
    const scale = 1;
    const opacity = 1;
    const zIndex = offset === 0 ? 10 : 5;

    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.transform = `rotate(${rotate}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
    card.classList.toggle('active', offset === 0);
  });

  // 중앙 카드 제목 업데이트
  labelEl.textContent = slides[current].label;
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

  // 전체 스크롤 진행률 0~1
  const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  const maxOffset = 50;
  const leftX = -(maxOffset - scrolled * maxOffset); // 왼쪽에서 → 중앙
  const rightX = maxOffset - scrolled * maxOffset;   // 오른쪽에서 → 중앙

  leftWord.style.transform = `translateX(${leftX}vw)`;
  rightWord.style.transform = `translateX(${rightX}vw)`;

  leftWord.style.transform = `translateX(${leftX}vw)`;
  rightWord.style.transform = `translateX(${rightX}vw)`;

  leftWord.style.transform = `translateX(${leftX}vw)`;
  rightWord.style.transform = `translateX(${rightX}vw)`;

  // 2. 이미지 scale: 1 → 1.3
  const imgScale = 1 + scrolled * 0.3;
  contactImgEl.style.transform = `scale(${imgScale})`;

  // 3. 글자 색상: 이미지와 겹치면 흰색
  // 이미지 rect 가져오기
  const imgRect = contactImg.getBoundingClientRect();
  const leftRect = leftWord.getBoundingClientRect();
  const rightRect = rightWord.getBoundingClientRect();

  // 겹침 체크 함수
  function isOverlapping(wordRect, imgRect) {
    return !(
      wordRect.right < imgRect.left ||
      wordRect.left > imgRect.right ||
      wordRect.bottom < imgRect.top ||
      wordRect.top > imgRect.bottom
    );
  }
});

const stackItems = document.querySelectorAll('.stack-item');

window.addEventListener('scroll', () => {
  const rect = contactSection.getBoundingClientRect();
  const sectionH = contactSection.offsetHeight;
  const viewH = window.innerHeight;

  const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  // 스크롤 초반(0~0.3): 사진들이 아래에서 내려옴
  // 스크롤 후반(0.7~1): 사진들이 위로 빠르게 날아감
  stackItems.forEach((item, i) => {
    const rotates = [5, -8, 3, -5];
    let translateY = 0;

    if (scrolled < 0.3) {
      const enterProgress = scrolled / 0.3;
      const startY = 200 - i * 15;
      translateY = startY * (1 - enterProgress) + i * 10;

    } else if (scrolled > 0.7) {
      const exitStart = 0.7 + i * 0.08; // 👈 핵심: 카드마다 시작 시점 다르게
      const exitProgress = Math.max(0, (scrolled - exitStart) / 0.15);
      translateY = i * 10 - exitProgress * 800;

    } else {
      translateY = i * 10;
    }

    item.style.transform = `translateY(${translateY}px) rotate(${rotates[i]}deg)`;
  });
});

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

  // before 이미지: 0.02~0.15 구간은 랩탑 올라오는 시간 → 0.15부터 스크롤
  if (beforeLaptop.classList.contains('show') && scrolled > 0.15 && scrolled < 0.48) {
    const imgProgress = (scrolled - 0.15) / 0.33;
    const imgH = beforeImg.naturalHeight * (770 / beforeImg.naturalWidth);
    const maxScroll = imgH - 480;
    beforeImg.style.top = `-${imgProgress * maxScroll}px`;
  }

  // after 이미지: 0.55~0.65 구간은 랩탑 올라오는 시간 → 0.65부터 스크롤
  if (afterLaptop.classList.contains('show') && scrolled > 0.65) {
    const imgProgress = (scrolled - 0.65) / 0.35;
    const imgH = afterImg.naturalHeight * (770 / afterImg.naturalWidth);
    const maxScroll = imgH - 480;
    afterImg.style.top = `-${imgProgress * maxScroll}px`;
  }
});

const etcSection = document.getElementById('etc');
const line02 = document.querySelector('.line02');

window.addEventListener('scroll', () => {
  const etcRect = etcSection.getBoundingClientRect();
  // etc 섹션이 뷰포트 끝에 닿을 즈음 settled
  if (etcRect.bottom < window.innerHeight + 100) {
    line02.classList.add('settled');
  } else {
    line02.classList.remove('settled');
  }
});

// OpenStreetMap + Leaflet (카카오맵 키 없어도 됨)
// HTML <head>에 아래 두 줄 추가 필요:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

let map = null;

function initMap(lat, lng) {
  if (map) return; // 중복 방지

  map = L.map('map').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // 마커
  L.circleMarker([lat, lng], {
    radius: 10,
    fillColor: '#FF4800',
    color: '#fff',
    weight: 3,
    fillOpacity: 1
  }).addTo(map).bindPopup('현재 위치').openPopup();
}

// 위치 권한 요청
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      initMap(pos.coords.latitude, pos.coords.longitude);
      document.querySelector('.map-notice').textContent = '현재 위치를 표시하고 있습니다.';
    },
    () => {
      // 거부 시 부산 기본값
      initMap(35.1796, 129.0756);
      document.querySelector('.map-notice').textContent = '위치 권한이 거부되어 기본 위치를 표시합니다.';
    }
  );
}