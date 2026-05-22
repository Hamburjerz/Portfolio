// ─── LOADER ───

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 2000);
});

// ─── NAV TOGGLE ───
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenuOpen(open) {
    navLinks.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("open"));
});
document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        setMenuOpen(false);
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setMenuOpen(false);
});

// ─── ACTIVE NAV ───
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
function updateNav() {
    let cur = "";
    sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navAs.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
    });
}
window.addEventListener("scroll", updateNav);

// ─── REVEAL on SCROLL ───
const reveals = document.querySelectorAll(
    ".reveal,.reveal-left,.reveal-right",
);
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                // animate skill bars when visible
                e.target
                    .querySelectorAll(".skill-fill[data-w]")
                    .forEach((bar) => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.w + "%";
                        }, 200);
                    });
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);
reveals.forEach((el) => observer.observe(el));

// also trigger skill fills when parent card becomes visible
document.querySelectorAll(".skill-fill[data-w]").forEach((bar) => {
    const card = bar.closest(".reveal");
    if (!card) return;
    const cardObs = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    bar.style.width = bar.dataset.w + "%";
                }, 400);
                cardObs.disconnect();
            }
        },
        { threshold: 0.2 },
    );
    cardObs.observe(card);
});

// ─── TYPING EFFECT ───
const words = [
    "Full-stack Development",
    "Back-end Development",
    "Front-end Development",
];
let wi = 0,
    ci = 0,
    deleting = false;
const typEl = document.getElementById("typing-text");
function type() {
    const word = words[wi];
    if (deleting) {
        typEl.textContent = word.substring(0, ci--);
        if (ci < 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 60);
    } else {
        typEl.textContent = word.substring(0, ci++);
        if (ci > word.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
        setTimeout(type, 90);
    }
}
setTimeout(type, 2200);

// ─── COUNTER ANIMATION ───
function animateCounter(el, target) {
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.dataset.target === "100" ? "%" : "+");
        if (current >= target) clearInterval(timer);
    }, 30);
}
const counterObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                document.querySelectorAll("[data-target]").forEach((el) => {
                    animateCounter(el, parseInt(el.dataset.target));
                });
                counterObs.disconnect();
            }
        });
    },
    { threshold: 0.5 },
);
const heroStats = document.querySelector(".hero-stats");
if (heroStats) counterObs.observe(heroStats);

// ─── LIVE PREVIEW MODAL ───
function openPreview(url, name) {
    const modal = document.getElementById("preview-modal");
    document.getElementById("modal-url").textContent = url;
    document.getElementById("modal-ext").href = url;
    const iframe = document.getElementById("modal-iframe");
    iframe.removeAttribute("srcdoc");
    iframe.src = url;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function openAguaPreview() {
    const modal = document.getElementById("preview-modal");
    const iframe = document.getElementById("modal-iframe");
    const firstImage = "assets/img/Agua_prototype%20%282%29.jpeg";

    document.getElementById("modal-url").textContent =
        "Agua prototype image preview";
    document.getElementById("modal-ext").href = firstImage;
    iframe.src = "about:blank";
    iframe.srcdoc = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    padding: 24px;
                    background: #030b1a;
                    color: #f7fafc;
                    font-family: Arial, sans-serif;
                }
                .gallery {
                    display: grid;
                    gap: 18px;
                    max-width: 1180px;
                    margin: 0 auto;
                }
                figure {
                    margin: 0;
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    border-radius: 8px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.04);
                }
                img {
                    display: block;
                    width: 100%;
                    max-height: 78vh;
                    object-fit: contain;
                    background: #fff;
                }
                figcaption {
                    padding: 12px 14px;
                    font-size: 14px;
                    color: #cbd5e1;
                }
                @media (max-width: 640px) {
                    body {
                        padding: 12px;
                    }
                    .gallery {
                        gap: 12px;
                    }
                    figcaption {
                        padding: 10px 12px;
                        font-size: 13px;
                    }
                }
                </style>
            </head>
            <body>
                <main class="gallery">
                <figure>
                    <img src="assets/img/Agua_prototype%20%282%29.jpeg" alt="Agua prototype front view" />
                    <figcaption>Prototype front view</figcaption>
                </figure>
                <figure>
                    <img src="assets/img/Agua_prototype%20%283%29.jpeg" alt="Agua prototype top view" />
                    <figcaption>Prototype top view</figcaption>
                </figure>
                <figure>
                    <img src="assets/img/wiring%20frame.png" alt="Agua Arduino wiring frame" />
                    <figcaption>Arduino wiring frame with sensor, GSM module, LEDs, and buzzer</figcaption>
                </figure>
                </main>
            </body>
        </html>
    `;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closePreview() {
    const iframe = document.getElementById("modal-iframe");
    document.getElementById("preview-modal").classList.remove("open");
    iframe.src = "";
    iframe.removeAttribute("srcdoc");
    document.body.style.overflow = "";
}

window.openPreview = openPreview;
window.openAguaPreview = openAguaPreview;
window.closePreview = closePreview;

document
    .getElementById("preview-modal")
    .addEventListener("click", function (e) {
        if (e.target === this) closePreview();
    });
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePreview();
});

["wrap-fra", "wrap-dcc"].forEach((id) => {
    const fbId = "fb-" + id.replace("wrap-", "");
    const fb = document.getElementById(fbId);
    if (fb) {
        fb.classList.add("show");
    } 
});
function iframeLoaded(iframe, wrapId) {
    try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc && doc.body && doc.body.innerHTML.length > 100) {
            
            const fbId = "fb-" + wrapId.replace("wrap-", "");
            const fb = document.getElementById(fbId);
            if (fb) fb.classList.remove("show");
            iframe.style.display = "block";
        } else {
            throw new Error("empty");
        }
    } catch (e) {
        
        iframe.style.display = "none";
    }
}
function iframeError(wrapId) {
    const wrap = document.getElementById(wrapId);
    if (wrap) {
        const iframe = wrap.querySelector("iframe");
        if (iframe) iframe.style.display = "none";
    }
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.dataset.filter;
        document.querySelectorAll(".project-card").forEach((card) => {
            if (filter === "all" || card.dataset.cat === filter) {
                card.style.display = "block";
                card.style.opacity = "0";
                setTimeout(() => {
                    card.style.transition = "opacity .4s";
                    card.style.opacity = "1";
                }, 50);
            } else {
                card.style.display = "none";
            }
        });
    });
});
