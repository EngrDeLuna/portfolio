// =========================
// DOM Ready
// =========================
document.addEventListener("DOMContentLoaded", () => {











  // =========================
  // Scroll Line Animation (Vertical red lines)
  // =========================
  const scrollLines = document.querySelectorAll('.scroll-line');

  function animateLinesOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    scrollLines.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom && rect.bottom > 0) {
        if (!el.classList.contains('visible')) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 150);
        }
      } else {
        el.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', animateLinesOnScroll);
  animateLinesOnScroll();

  // =========================
// Certifications: Generate & Activate Dots on Scroll
// =========================
const certContainer = document.querySelector('.cert-carousel-container');
const certTrack = document.querySelector(".cert-carousel-track");
const certDotContainer = document.querySelector(".cert-dots");

if (certContainer && certTrack && certDotContainer) {
  const certSlides = certTrack.querySelectorAll(".cert-slide");

  // STEP 1: Dynamically generate dots
  certSlides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("cert-dot");
    if (index === 0) dot.classList.add("active"); // First active initially
    certDotContainer.appendChild(dot);
  });

  // STEP 2: Re-select dots after generating
  const certDots = certDotContainer.querySelectorAll(".cert-dot");

  // STEP 3: Scroll listener to highlight center slide's dot
  certContainer.addEventListener("scroll", () => {
    const center = certContainer.scrollLeft + certContainer.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    certSlides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    certDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === closestIndex);
    });
  });
}


  // =========================
  // Home Animation on Load and Hash Change
  // =========================
  function triggerHomeAnimation() {
    const homeContent = document.getElementById("home-content");
    if (homeContent) {
      homeContent.classList.remove("home-animate");
      void homeContent.offsetWidth;
      homeContent.classList.add("home-animate");
    }
  }

  const homeContent = document.querySelector("#home-content");

  if (homeContent && (!location.hash || location.hash === "#home")) {
    setTimeout(() => {
      homeContent.classList.add("animate-visible");
    }, 100);
  }

  window.addEventListener("hashchange", () => {
    if (location.hash === "#home" && homeContent) {
      homeContent.classList.remove("animate-visible");
      void homeContent.offsetWidth;
      setTimeout(() => {
        homeContent.classList.add("animate-visible");
      }, 50);
    }
  });

  // =========================
  // Home Left and Right Fade Animation
  // =========================
  window.addEventListener("hashchange", () => {
    if (location.hash === "#home") {
      const left = document.querySelector(".left-content");
      const right = document.querySelector(".profile-wrapper");

      if (left && right) {
        left.classList.remove("scroll-visible");
        right.classList.remove("scroll-visible");
        void left.offsetWidth;
        void right.offsetWidth;
        setTimeout(() => {
          left.classList.add("scroll-visible");
          right.classList.add("scroll-visible");
        }, 50);
      }
    }
  });

  // =========================
  // Typing Effect for Roles
  // =========================
  const name = document.getElementById("name-text");
  const button = document.querySelector(".btn");
  const typedText = document.getElementById("typed-text");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  const nameWidth = name.offsetWidth;
  if (button) button.style.width = nameWidth + "px";

  const roles = [
    "Computer Engineering graduate",
    "Programmer",
    "Wev Developer",
    "Aspiring Software Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function startTypingEffect() {
    const currentRole = roles[roleIndex];
    const displayedText = currentRole.substring(0, charIndex);
    typedText.textContent = displayedText;

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex++;
      setTimeout(startTypingEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(startTypingEffect, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(startTypingEffect, isDeleting ? 1000 : 500);
    }
  }

  startTypingEffect();

  // =========================
  // Hamburger Menu Toggle (Mobile Nav)
  // =========================
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  });

  // =========================
  // Close Mobile Nav on Link Click
  // =========================
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // =========================
  // Projects Image Carousel
  // =========================
  const projectContainers = document.querySelectorAll(".project-container");

  projectContainers.forEach((container) => {
    const images = container.querySelectorAll(".carousel-image");
    const prevBtn = container.querySelector(".carousel-buttons .prev");
    const nextBtn = container.querySelector(".carousel-buttons .next");
    const dots = container.querySelectorAll(".carousel-dots .dot");

    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.remove("active");
        img.style.opacity = "0";
        img.style.zIndex = "0";
        img.style.transform = i > index ? "translateX(100%)" : "translateX(-100%)";
      });

      images[index].classList.add("active");
      images[index].style.opacity = "1";
      images[index].style.zIndex = "1";
      images[index].style.transform = "translateX(0)";

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    if (prevBtn && nextBtn && images.length > 0 && dots.length > 0) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });

      dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
          currentIndex = dotIndex;
          showImage(currentIndex);
        });
      });

      showImage(currentIndex);

      const isReverse = container.classList.contains("reverse-layout");
      setInterval(() => {
        currentIndex = isReverse
          ? (currentIndex + 1) % images.length
          : (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }, 4000);
    }
  });

  // =========================
  // Scroll-based Fade In for Sections
  // =========================
  const scrollAnimElements = document.querySelectorAll(".scroll-animate");

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    scrollAnimElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });

    // Fade out home section when scrolled down
    const homeSection = document.getElementById("home");
    if (homeSection) {
      const homeBottom = homeSection.getBoundingClientRect().bottom;
      if (homeBottom < 0) {
        homeSection.style.opacity = "0";
      } else if (homeBottom < window.innerHeight) {
        const ratio = homeBottom / window.innerHeight;
        homeSection.style.opacity = ratio;
      } else {
        homeSection.style.opacity = "1";
      }
    }

    // Left and Right fade-in
    const fadeLeftEls = document.querySelectorAll(".scroll-fade-left");
    const fadeRightEls = document.querySelectorAll(".scroll-fade-right");

    fadeLeftEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add("scroll-visible");
      } else {
        el.classList.remove("scroll-visible");
      }
    });

    fadeRightEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add("scroll-visible");
      } else {
        el.classList.remove("scroll-visible");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();

  // =========================
  // Highlight Active Nav Link Based on Scroll
  // =========================
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(`#${currentSectionId}`)) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // =========================
  // Skills Cards Fade In on Scroll
  // =========================
  const skillCards = document.querySelectorAll(".skill-card");

  function animateSkillsOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    skillCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardVisible = rect.top < triggerBottom && rect.bottom > 0;

      if (cardVisible) {
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
      }
    });
  }

  window.addEventListener("scroll", animateSkillsOnScroll);
  animateSkillsOnScroll();
});

// =========================
// Hide Header on Scroll Down
// =========================
let lastScrollTop = 0;
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});




document.addEventListener("DOMContentLoaded", function () {
  const contactElements = document.querySelectorAll(".contact-section .contact-zoom-animate");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactElements.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("zoom-visible");
          }, i * 100); // Stagger animation
        });
      } else {
        contactElements.forEach(el => {
          el.classList.remove("zoom-visible");
        });
      }
    });
  }, {
    threshold: 0.4
  });

  const contactSection = document.querySelector(".contact-section");
  if (contactSection) {
    observer.observe(contactSection);
  }
});



// =========================
// Certificate Modal Functionality
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const certSlides = document.querySelectorAll(".cert-slide");
  const certModal = document.getElementById("cert-modal");
  const certFrame = document.getElementById("cert-modal-frame");
  const closeModal = document.getElementById("close-cert-modal");

  // Open modal when cert is clicked
  certSlides.forEach(slide => {
    slide.addEventListener("click", () => {
      const fullSrc = slide.getAttribute("data-full");
      if (fullSrc) {
        certFrame.src = fullSrc + "#view=FitH"; // PDF view optimized
        certModal.style.display = "flex";
      }
    });
  });

  // Close modal on close button
  closeModal.addEventListener("click", () => {
    certModal.style.display = "none";
    certFrame.src = "";
  });

  // Close modal when clicking outside the modal content
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      certModal.style.display = "none";
      certFrame.src = "";
    }
  });
});





  document.querySelectorAll('.cert-slide').forEach(slide => {
  slide.addEventListener('click', () => {
    document.querySelectorAll('.cert-slide').forEach(s => s.classList.remove('selected'));
    slide.classList.add('selected');
  });

});
