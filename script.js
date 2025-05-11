document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      nav.classList.toggle("active")
    })
  }

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  // Product Tabs
  const tabButtons = document.querySelectorAll(".tab-btn")
  const productCards = document.querySelectorAll(".product-card")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const category = button.getAttribute("data-category")

      // Show/hide products based on category
      productCards.forEach((card) => {
        if (category === "todos" || card.getAttribute("data-category") === category) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Carousel for Featured Products
  const carouselTrack = document.querySelector(".carousel-track")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")

  // Clone product cards for carousel
  if (carouselTrack) {
    const productCards = document.querySelectorAll(".product-card")

    // Add first 6 products to carousel
    let count = 0
    productCards.forEach((card) => {
      if (count < 6) {
        const clone = card.cloneNode(true)
        carouselTrack.appendChild(clone)
        count++
      }
    })

    let position = 0
    const slideWidth = 100 / 3 // For 3 items visible at once

    // Update carousel position
    function updateCarouselPosition() {
      carouselTrack.style.transform = `translateX(-${position}%)`
    }

    // Next slide
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        position += slideWidth

        // Reset position if at end
        if (position >= slideWidth * (count - 2)) {
          position = 0
        }

        updateCarouselPosition()
      })
    }

    // Previous slide
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        position -= slideWidth

        // Go to end if at beginning
        if (position < 0) {
          position = slideWidth * (count - 3)
        }

        updateCarouselPosition()
      })
    }
  }

  // 360° View
  const view360Image = document.getElementById("view360Image")
  const rotateLeft = document.getElementById("rotateLeft")
  const rotateRight = document.getElementById("rotateRight")

  if (view360Image && rotateLeft && rotateRight) {
    const totalFrames = 36
    let currentFrame = 1

    // Function to update the image
    function updateImage() {
      // Format the frame number with leading zeros
      const frameNumber = currentFrame.toString().padStart(2, "0")
      view360Image.src = `images/360/frame-${frameNumber}.jpg`
    }

    // Rotate left
    rotateLeft.addEventListener("click", () => {
      currentFrame--
      if (currentFrame < 1) {
        currentFrame = totalFrames
      }
      updateImage()
    })

    // Rotate right
    rotateRight.addEventListener("click", () => {
      currentFrame++
      if (currentFrame > totalFrames) {
        currentFrame = 1
      }
      updateImage()
    })

    // Enable drag to rotate
    let isDragging = false
    let startX

    view360Image.addEventListener("mousedown", (e) => {
      isDragging = true
      startX = e.clientX
      view360Image.style.cursor = "grabbing"
    })

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return

      const deltaX = e.clientX - startX

      if (Math.abs(deltaX) > 10) {
        if (deltaX > 0) {
          currentFrame--
          if (currentFrame < 1) {
            currentFrame = totalFrames
          }
        } else {
          currentFrame++
          if (currentFrame > totalFrames) {
            currentFrame = 1
          }
        }

        updateImage()
        startX = e.clientX
      }
    })

    window.addEventListener("mouseup", () => {
      isDragging = false
      view360Image.style.cursor = "grab"
    })
  }

  // Testimonials Slider
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  const testimonialItems = document.querySelectorAll(".testimonial-item")

  if (testimonialDots.length > 0 && testimonialItems.length > 0) {
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        // Hide all testimonials
        testimonialItems.forEach((item) => {
          item.style.display = "none"
        })

        // Remove active class from all dots
        testimonialDots.forEach((d) => {
          d.classList.remove("active")
        })

        // Show selected testimonial and activate dot
        testimonialItems[index].style.display = "block"
        dot.classList.add("active")
      })
    })

    // Show first testimonial by default
    testimonialItems.forEach((item, index) => {
      if (index > 0) {
        item.style.display = "none"
      }
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // In a real implementation, you would send the form data to a server
      // For GitHub Pages, you could use a service like Formspree or Netlify Forms

      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      contactForm.reset()
    })
  }

  // Configuração do particles.js
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
})
