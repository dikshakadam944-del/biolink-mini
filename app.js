/**
 * BioLink Mini — Landing Page Client Logic & Live Studio Playground
 */

// Persona Preset Configurations for the Interactive Sandbox
const PERSONAS = {
  creator: {
    name: 'Aarav Sharma',
    role: 'Visual Designer & Creator',
    bio: 'Crafting brand identities & UI kits. Helping digital creators build sleek presence.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80',
    handle: 'aarav',
    link1: 'Portfolio & Case Studies',
    link2: 'Free Design Assets & UI Kit',
    badge: 'Verified Creator',
    theme: 'purple-glow'
  },
  freelancer: {
    name: 'Elena Rostova',
    role: 'Full-Stack Developer & Consultant',
    bio: 'Building SaaS web apps with Next.js, Python & AI. Available for select freelance projects.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=260&q=80',
    handle: 'elena_dev',
    link1: 'GitHub Repos & Client Works',
    link2: 'Book a 30-Min Tech Consultation',
    badge: 'Top Rated Pro',
    theme: 'ocean-deep'
  },
  student: {
    name: 'Maya Patel',
    role: 'Biomedical Student & Digital Artist',
    bio: 'Sharing study notes, medical illustration tutorials, and student productivity templates.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=260&q=80',
    handle: 'maya_notes',
    link1: 'Free Medical Study Flashcards',
    link2: 'Digital Art Prints & Stickers',
    badge: 'Campus Fellow',
    theme: 'emerald-nature'
  }
};

let currentPersona = 'creator';
let currentTheme = 'purple-glow';

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQAccordion();
  initScrollListeners();
  initLiveStudio();
});

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      } else {
        menu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });

    // Close mobile menu on clicking any navigation link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      });
    });
  }
}

/* ================= FAQ ACCORDION ================= */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        // Toggle current
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ================= SCROLL BEHAVIORS ================= */
function initScrollListeners() {
  const header = document.getElementById('main-header');
  const backToTop = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 20) {
        header.classList.add('shadow-md', 'bg-white/95');
        header.classList.remove('bg-white/85');
      } else {
        header.classList.remove('shadow-md', 'bg-white/95');
        header.classList.add('bg-white/85');
      }
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  });
}

/* ================= LIVE PREVIEW STUDIO ================= */
function initLiveStudio() {
  loadPersona('creator');
}

function loadPersona(type) {
  const data = PERSONAS[type];
  if (!data) return;

  currentPersona = type;

  // Update tabs
  document.querySelectorAll('.persona-tab').forEach(tab => {
    tab.classList.remove('active-persona');
    tab.classList.add('text-slate-600', 'border-slate-200');
  });

  const activeTab = document.getElementById(`btn-persona-${type}`);
  if (activeTab) {
    activeTab.classList.add('active-persona');
    activeTab.classList.remove('text-slate-600', 'border-slate-200');
  }

  // Update studio input fields
  const nameInput = document.getElementById('studio-name-input');
  const bioInput = document.getElementById('studio-bio-input');
  if (nameInput) nameInput.value = data.name;
  if (bioInput) bioInput.value = data.bio;

  // Update phone screen UI
  const phoneScreen = document.getElementById('live-phone-screen');
  const nameDisplay = document.getElementById('live-name-display');
  const roleDisplay = document.getElementById('live-role-display');
  const bioDisplay = document.getElementById('live-bio-display');
  const avatarImg = document.getElementById('live-avatar-img');
  const handleDisplay = document.getElementById('live-handle-display');
  const link1 = document.getElementById('live-link-1-text');
  const link2 = document.getElementById('live-link-2-text');

  if (nameDisplay) nameDisplay.textContent = data.name;
  if (roleDisplay) roleDisplay.textContent = data.role;
  if (bioDisplay) bioDisplay.textContent = data.bio;
  if (avatarImg) avatarImg.src = data.avatar;
  if (handleDisplay) handleDisplay.textContent = `biolink.mini/@${data.handle}`;
  if (link1) link1.textContent = data.link1;
  if (link2) link2.textContent = data.link2;

  // Set corresponding theme
  setTheme(data.theme);
}

function updateLivePreview() {
  const nameInput = document.getElementById('studio-name-input');
  const bioInput = document.getElementById('studio-bio-input');

  const nameDisplay = document.getElementById('live-name-display');
  const bioDisplay = document.getElementById('live-bio-display');

  if (nameDisplay && nameInput) {
    nameDisplay.textContent = nameInput.value.trim() || 'Your Name';
  }
  if (bioDisplay && bioInput) {
    bioDisplay.textContent = bioInput.value.trim() || 'Tell visitors what you do.';
  }
}

function setTheme(themeName) {
  currentTheme = themeName;
  const screen = document.getElementById('live-phone-screen');
  if (!screen) return;

  // Remove existing theme classes
  screen.classList.remove(
    'theme-purple-glow',
    'theme-ocean-deep',
    'theme-emerald-nature',
    'theme-sunset-minimal'
  );

  // Add selected theme class
  screen.classList.add(`theme-${themeName}`);

  // Highlight active theme button
  document.querySelectorAll('.theme-choice-btn').forEach(btn => {
    btn.classList.remove('border-2', 'border-brand-500');
    btn.classList.add('border-slate-200');
  });

  const eventTarget = window.event ? window.event.currentTarget : null;
  if (eventTarget && eventTarget.classList) {
    eventTarget.classList.add('border-2', 'border-brand-500');
    eventTarget.classList.remove('border-slate-200');
  }

  showToast(`Switched theme to ${themeName.replace('-', ' ').toUpperCase()}`);
}

/* ================= HERO HANDLE QUICK-CLAIM ================= */
function claimHandleFromHero() {
  const input = document.getElementById('hero-handle-input');
  const handleVal = input ? input.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') : '';
  
  if (!handleVal) {
    showToast('Please type a handle to claim your link!');
    if (input) input.focus();
    return;
  }

  openSignupModal('Free', handleVal);
}

/* ================= MODAL CONTROLLERS ================= */
function openSignupModal(plan = 'Free', prefilledHandle = '') {
  const modal = document.getElementById('modal-signup');
  const handleInput = document.getElementById('modal-handle-input');
  if (modal) {
    modal.classList.remove('hidden');
    if (handleInput) {
      handleInput.value = prefilledHandle || 'creator_' + Math.floor(Math.random() * 899 + 100);
      handleInput.focus();
    }
  }
}

function openLoginModal() {
  const modal = document.getElementById('modal-login');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function openQRModal(userHandle = 'aarav') {
  const modal = document.getElementById('modal-qr');
  const subtext = document.getElementById('qr-handle-subtext');
  if (modal) {
    modal.classList.remove('hidden');
    if (subtext) {
      subtext.textContent = `biolink.mini/@${userHandle}`;
    }
  }
}

function openAboutModal() {
  const modal = document.getElementById('modal-info');
  const content = document.getElementById('info-modal-content');
  if (modal && content) {
    content.innerHTML = `
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-3 text-xl">
          <i class="fa-solid fa-users"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-slate-900">About BioLink Mini</h3>
        <p class="text-xs text-brand-600 font-semibold mt-1">Simplicity for the modern creator economy</p>
      </div>
      <div class="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          <strong>BioLink Mini</strong> was created with a straightforward mission: eliminate the unnecessary complexity of bloated website builders.
        </p>
        <p>
          Modern creators, influencers, college graduates, and indie consultants don't need complex multi-page architectures just to present their work and contact info. They need a fast, elegant, mobile-first one-page bio website that connects everywhere in 60 seconds.
        </p>
        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Our Guarantees:</h4>
          <ul class="space-y-2 text-xs text-slate-700">
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Free forever starter option</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> No intrusive tracking or pop-up ads</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Ultra-fast load times under 100 milliseconds</li>
          </ul>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
  }
}

function openContactModal() {
  const modal = document.getElementById('modal-info');
  const content = document.getElementById('info-modal-content');
  if (modal && content) {
    content.innerHTML = `
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl">
          <i class="fa-solid fa-envelope"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-slate-900">Get in Touch</h3>
        <p class="text-xs text-slate-500 mt-1">We’re here to help you build your dream bio link.</p>
      </div>
      <form onsubmit="handleContactSubmit(event)" class="space-y-3.5">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
          <input type="text" required placeholder="Jane Doe" class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email</label>
          <input type="email" required placeholder="jane@example.com" class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Message</label>
          <textarea rows="3" required placeholder="How can our team help you?" class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"></textarea>
        </div>
        <button type="submit" class="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm transition">
          Send Message
        </button>
      </form>
    `;
    modal.classList.remove('hidden');
  }
}

function openLegalModal(title) {
  const modal = document.getElementById('modal-info');
  const content = document.getElementById('info-modal-content');
  if (modal && content) {
    content.innerHTML = `
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-3 text-xl">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <h3 class="font-display font-bold text-2xl text-slate-900">${title}</h3>
        <p class="text-xs text-slate-500 mt-1">Official policy & consumer terms</p>
      </div>
      <div class="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          At <strong>BioLink Mini</strong>, we treat user privacy and data security as our highest priorities. All profile data, links, and contact parameters are protected via industry-standard encryption protocols.
        </p>
        <p>
          <strong>Account Ownership:</strong> You retain complete ownership of all content, links, trademarks, and media assets you publish on your BioLink Mini page.
        </p>
        <p>
          <strong>Data Retention:</strong> We will never sell your personal contact info or visitor interaction metrics to third-party ad brokers.
        </p>
        <p class="text-[11px] text-slate-400">
          Last updated: November 2026. For specific legal inquiries, contact legal@biolinkmini.sample.
        </p>
      </div>
      <button onclick="closeModals()" class="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition">
        I Understand
      </button>
    `;
    modal.classList.remove('hidden');
  }
}

function closeModals() {
  document.querySelectorAll('[id^="modal-"]').forEach(modal => {
    modal.classList.add('hidden');
  });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target && e.target.id && e.target.id.startsWith('modal-')) {
    closeModals();
  }
});

// Close modals with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModals();
  }
});

/* ================= FORM SUBMISSION SIMULATIONS ================= */
function handleSignupSubmit(e) {
  e.preventDefault();
  closeModals();
  showToast('🎉 Your BioLink Mini page was created! Welcome aboard.');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeModals();
  showToast('Welcome back! Loading your dashboard...');
}

function handleContactSubmit(e) {
  e.preventDefault();
  closeModals();
  showToast('Thank you! Your inquiry was sent successfully.');
}

/* ================= TOAST NOTIFICATION HELPER ================= */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  if (toastTimeout) clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

/* ================= CLIPBOARD COPY HELPER ================= */
function copyLink(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showToast(`Copied to clipboard: ${url}`))
      .catch(() => showToast(`Link ready: ${url}`));
  } else {
    showToast(`Link ready: ${url}`);
  }
}
