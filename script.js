document.addEventListener("DOMContentLoaded", () => {
  const invitationCover =
    document.getElementById("invitationCover");

  const openInvitationButton =
    document.getElementById("openInvitation");

  const music =
    document.getElementById("bgMusic");

  const musicButton =
    document.getElementById("musicButton");

  document.body.classList.add("cover-open");

  async function playMusic() {
    try {
      await music.play();

      musicButton.classList.add("playing");
      musicButton.textContent = "♫";
      musicButton.setAttribute(
        "aria-label",
        "Անջատել երաժշտությունը"
      );
    } catch (error) {
      musicButton.classList.remove("playing");
      musicButton.textContent = "♪";
    }
  }

  function pauseMusic() {
    music.pause();

    musicButton.classList.remove("playing");
    musicButton.textContent = "♪";
    musicButton.setAttribute(
      "aria-label",
      "Միացնել երաժշտությունը"
    );
  }

  openInvitationButton.addEventListener("click", async () => {
    invitationCover.classList.add("cover-hidden");
    document.body.classList.remove("cover-open");

    await playMusic();
  });

  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      await playMusic();
    } else {
      pauseMusic();
    }
  });

  const weddingDate =
    new Date("2026-08-11T14:30:00").getTime();

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function updateCountdown() {
    const currentTime = Date.now();
    const remainingTime = weddingDate - currentTime;

    if (remainingTime <= 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      return;
    }

    const days =
      Math.floor(remainingTime / 86400000);

    const hours =
      Math.floor(
        (remainingTime % 86400000) / 3600000
      );

    const minutes =
      Math.floor(
        (remainingTime % 3600000) / 60000
      );

    const seconds =
      Math.floor(
        (remainingTime % 60000) / 1000
      );

    daysElement.textContent =
      formatNumber(days);

    hoursElement.textContent =
      formatNumber(hours);

    minutesElement.textContent =
      formatNumber(minutes);

    secondsElement.textContent =
      formatNumber(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  const rsvpForm =
    document.getElementById("rsvpForm");

  const whatsappNumber =
    "YOUR_WHATSAPP_NUMBER";

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      whatsappNumber === "YOUR_WHATSAPP_NUMBER"
    ) {
      alert(
        "Խնդրում ենք script.js ֆայլում ավելացնել WhatsApp համարը։"
      );

      return;
    }

    const guestName =
      document.getElementById("guestName").value.trim();

    const attendance =
      document.getElementById("attendance").value;

    const guestCount =
      document.getElementById("guestCount").value;

    const guestNames =
      document.getElementById("guestNames").value.trim();

    const message =
`Բարև Ձեզ։

Անիի և Գուրգենի հարսանիքի մասնակցության պատասխան։

Անուն և ազգանուն՝ ${guestName}

Մասնակցություն՝ ${attendance}

Հյուրերի քանակ՝ ${guestCount}

Մասնակիցների անուններ՝ ${guestNames || "Նշված չէ"}`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  });
});
