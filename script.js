document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
  const navbar = document.getElementById('navbar-sticky');

  toggleButton.addEventListener('click', function () {
    navbar.classList.toggle('hidden');
  });
});

const HSThemeAppearance = {
  init() {
    const defaultTheme = 'default';
    let theme = localStorage.getItem('hs_theme') || defaultTheme;

    if (document.querySelector('html').classList.contains('dark')) return;
    this.setAppearance(theme);
  },
  _resetStylesOnLoad() {
    const $resetStyles = document.createElement('style');
    $resetStyles.innerText = `*{transition: unset !important;}`;
    $resetStyles.setAttribute('data-hs-appearance-onload-styles', '');
    document.head.appendChild($resetStyles);
    return $resetStyles;
  },
  setAppearance(theme, saveInStore = true, dispatchEvent = true) {
    const $resetStylesEl = this._resetStylesOnLoad();

    if (saveInStore) {
      localStorage.setItem('hs_theme', theme);
    }

    if (theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
    }

    document.querySelector('html').classList.remove('dark');
    document.querySelector('html').classList.remove('default');
    document.querySelector('html').classList.remove('auto');

    document.querySelector('html').classList.add(this.getOriginalAppearance());

    setTimeout(() => {
      $resetStylesEl.remove();
    });

    if (dispatchEvent) {
      window.dispatchEvent(new CustomEvent('on-hs-appearance-change', { detail: theme }));
    }
  },
  getAppearance() {
    let theme = this.getOriginalAppearance();
    if (theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
    }
    return theme;
  },
  getOriginalAppearance() {
    const defaultTheme = 'default';
    return localStorage.getItem('hs_theme') || defaultTheme;
  },
};
HSThemeAppearance.init();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (HSThemeAppearance.getOriginalAppearance() === 'auto') {
    HSThemeAppearance.setAppearance('auto', false);
  }
});

window.addEventListener('load', () => {
  const $clickableThemes = document.querySelectorAll('[data-hs-theme-click-value]');
  const $switchableThemes = document.querySelectorAll('[data-hs-theme-switch]');

  $clickableThemes.forEach(($item) => {
    $item.addEventListener('click', () => HSThemeAppearance.setAppearance($item.getAttribute('data-hs-theme-click-value'), true, $item));
  });

  $switchableThemes.forEach(($item) => {
    $item.addEventListener('change', (e) => {
      HSThemeAppearance.setAppearance(e.target.checked ? 'dark' : 'default');
    });

    $item.checked = HSThemeAppearance.getAppearance() === 'dark';
  });

  window.addEventListener('on-hs-appearance-change', (e) => {
    $switchableThemes.forEach(($item) => {
      $item.checked = e.detail === 'dark';
    });
  });
});

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const interval = 1000; // Ubah sesuai dengan kecepatan yang Anda inginkan (dalam milidetik)

function showItem(index) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === index) {
      item.classList.add('active');
    }
  });
}

function nextItem() {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
}

function startCarousel() {
  setInterval(nextItem, interval);
}

startCarousel();

const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const music = document.getElementById('music');

let isPlaying = false;

playButton.addEventListener('click', () => {
  if (isPlaying) {
    // Mengganti ikon menjadi "Play" dan menampilkan ikon "Play"
    playIcon.style.display = 'inline-block';
    pauseIcon.style.display = 'none';
    playButton.querySelector('p').textContent = 'Play Music';
    music.pause();
  } else {
    // Mengganti ikon menjadi "Pause" dan menampilkan ikon "Pause"
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline-block';
    playButton.querySelector('p').textContent = 'Pause Music';
    music.play();
  }

  isPlaying = !isPlaying;
});
