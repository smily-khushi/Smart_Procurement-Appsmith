export default {
  countdownInterval: null,
  endTime: null,

  // Initialize countdown to 3 minutes
  startCountdown() {
    this.endTime = Date.now() + 180 * 1000;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((this.endTime - Date.now()) / 1000)
      );

      storeValue("countdownSeconds", remaining);
    }, 250);

    storeValue("countdownSeconds", 180);

    return "Countdown started";
  },

  // Extend countdown by 20 seconds
  extendCountdown() {
    const now = Date.now();

    // If expired, restart from now; otherwise extend existing time
    this.endTime = Math.max(this.endTime || now, now) + 20 * 1000;

    const remaining = Math.max(
      0,
      Math.ceil((this.endTime - now) / 1000)
    );

    storeValue("countdownSeconds", remaining);

    // Start interval again if it was previously stopped
    if (!this.countdownInterval) {
      this.countdownInterval = setInterval(() => {
        const seconds = Math.max(
          0,
          Math.ceil((this.endTime - Date.now()) / 1000)
        );

        storeValue("countdownSeconds", seconds);
      }, 250);
    }

    return "Countdown extended by 20 seconds";
  },

  // Format seconds as MM:SS for displaying in the UI
  getCountdownDisplay() {
    const seconds = appsmith.store.countdownSeconds ?? 180;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  },

  // Stop countdown when required
  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    return "Countdown stopped";
  }
};
