document.addEventListener("DOMContentLoaded", function () {
  const cover = document.getElementById("invitationCover");
  const openButton = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const musicButton = document.getElementById("musicButton");

  document.body.classList.add("cover-open");

  openButton.addEventListener("click", function () {
    cover.classList.add("cover-hidden");
    document.body.classList.remove("cover-open");

    music.play().then(function () {
      musicButton.classList.add("playing");
      musicButton.textContent = "♫";
    }).catch(function () {
      musicButton.classList.remove("playing");
    });
  });

  musicButton.addEventListener("click", function () {
    if (music.paused) {
      music.play().then(function () {
        musicButton.classList.add("playing");
        musicButton.textContent = "♫";
      }).catch(function () {});
    } else {
      music.pause();
      musicButton.classList.remove("playing");
      musicButton.textContent = "♪";
    }
  });

  const weddingDate = new Date("2026-08-11T14:30:00").getTime();

  function updateCountdown() {
    const distance = weddingDate - Date.now();
    const safeDistance = Math.max(distance, 0);

    const days = Math.floor(safeDistance / 86400000);
    const hours = Math.floor((safeDistance % 86400000) / 3600000);
    const minutes = Math.floor((safeDistance % 3600000) / 60000);
    const seconds = Math.floor((safeDistance % 60000) / 1000);

    document.getElementById("days").textContent =
      String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
      String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
      String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
      String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(function (element) {
    observer.observe(element);
  });

  const form = document.getElementById("rsvpForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const whatsappNumber = "YOUR_WHATSAPP_NUMBER";

    if (whatsappNumber === "YOUR_WHATSAPP_NUMBER") {
      alert("Խնդրում ենք script.js ֆայլում ավելացնել WhatsApp համարը։");
      return;
    }

    const guestName = document.getElementById("guestName").value;
    const attendance = document.getElementById("attendance").value;
    const guestCount = document.getElementById("guestCount").value;
    const guestNames = document.getElementById("guestNames").value;

    const message =
`Բարև Ձեզ։

Անիի և Գուրգենի հարսանիքի մասնակցության պատասխան։

Անուն՝ ${guestName}
Մասնակցություն՝ ${attendance}
Հյուրերի քանակ՝ ${guestCount}
Մասնակիցների անուններ՝ ${guestNames || "Նշված չէ"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  });
});
