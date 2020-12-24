const IP = "10.60.1.8";

const request = (url, payload) => {
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("on")[0].addEventListener("click", () => {
    request(`http://${IP}/tv/api/on`, {});
  });
  document.getElementsByClassName("off")[0].addEventListener("click", () => {
    request(`http://${IP}/tv/api/off`, {});
  });
  document.getElementsByClassName("switch")[0].addEventListener("click", () => {
    request(`http://${IP}/tv/api/input`, { input: "switch" });
  });
  document.getElementsByClassName("chrome")[0].addEventListener("click", () => {
    request(`http://${IP}/tv/api/input`, { input: "chromecast" });
  });
  document.getElementsByClassName("volume-input")[0].addEventListener(
    "input",
    _.throttle(
      () => {
        const value = document.getElementsByClassName("volume-input")[0].value;
        console.log(value);
        request(`http://${IP}/tv/api/volume`, { volume: value });
      },
      200,
      { trailing: true }
    )
  );
  document
    .getElementsByClassName("toast-send")[0]
    .addEventListener("click", () => {
      const message = document.getElementsByClassName("toast-input")[0].value;
      document.getElementsByClassName("toast-input")[0].value = "";
      request(`http://${IP}/tv/api/toast`, { message });
    });

  document
    .getElementsByClassName("toast-input")[0]
    .addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      const message = document.getElementsByClassName("toast-input")[0].value;
      document.getElementsByClassName("toast-input")[0].value = "";
      request(`http://${IP}/tv/api/toast`, { message });
    });
});
