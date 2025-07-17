function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

function removeDistractions() {
  const url = window.location.href;

  // Back to last page from shorts
  if (url.includes("youtube.com/shorts/")) {
    history.back();
    return;
  }

  lockScroll();

  
  const commonSelectors = [
    'ytd-reel-shelf-renderer',
    'ytd-rich-section-renderer',
    'ytd-shelf-renderer[is-shorts]',
    'a[href*="/shorts/"]',
    'tp-yt-paper-tab[title="Shorts"]',

    // Comments
    'ytd-comments',              
    '#comments',                       
    'ytd-comment-thread-renderer',    
    'ytd-comments-header-renderer'    
  ];

  // Main Page recommends
  if (url === "https://www.youtube.com/" || url.includes("youtube.com/?")) {
    commonSelectors.push(
      'ytd-rich-grid-renderer',
      'ytd-browse[page-subtype="home"]'
    );
  }

  // Video Page recommends
  if (url.includes("watch?v=")) {
    commonSelectors.push(
      'ytd-watch-next-secondary-results-renderer',
      'ytd-compact-autoplay-renderer'
    );
  }

  // Search Page
  if (url.includes("results?search_query=")) {
    // Her başlıklı bölümü kontrol et
    document.querySelectorAll('ytd-section-list-renderer ytd-shelf-renderer').forEach(el => {
      const titleEl = el.querySelector('h2');
      if (titleEl && /shorts|başka izleyiciler|ilgili videolar|önerilen/i.test(titleEl.innerText)) {
        el.remove();
      }
    });

    // Shorts
    commonSelectors.push(
      'ytd-reel-shelf-renderer',
      'ytd-video-renderer[is-shorts]',
      'ytd-vertical-list-renderer',
    );
  }

  // Clear
  commonSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  unlockScroll();
}


const observer = new MutationObserver(() => {
  removeDistractions();
});


observer.observe(document, {
  childList: true,
  subtree: true,
});

// RUN
removeDistractions();
