function createScheduleUrl(options) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    ...options,
  });
  return "https://google.com/calendar/event?" + params.toString();
}

function convertDateFormat(date, addHour = 0) {
  if (addHour > 0) {
    date.setHours(date.getHours() + addHour);
  }
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScriptの月は0から始まるため、1を足す
  let day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = "00"; // 秒は常に00
  return `${year}${month}${day}T${hours}${minutes}${seconds}00`;
}

function copyCompanyName() {
  const items = document.querySelectorAll(
    ".m-mypage-entries-box__body-item-name .a-text-primary-small"
  );
  const textList = Array.from(items).map((item) => item.textContent);
  navigator.clipboard
    .writeText(textList.join(",").replaceAll(",", "\n"))
    .then((val) => {
      alert("コピーに成功しました");
    })
    .catch(() => {
      alert("コピーに失敗しました");
    });
}

function isDetail() {
  return /\/entries\/?.*\/detail/.test(location.pathname);
}

function isMypage() {
  return location.pathname === "/career/mypage";
}

function mypage() {
  console.log("mypage");

  const box = document.querySelector(".m-mypage-entries-box");

  const btn = document.createElement("button");
  btn.classList.add("a-button-primary-small");
  btn.style.display = "block";
  btn.style.margin = "16px 0";
  btn.textContent = "会社名をコピーする";
  btn.addEventListener("click", copyCompanyName);
  box.after(btn);
}

function detail() {
  console.log("detail");
  const scheduleDetail = document.querySelector(".schedule_confirm__detail");

  const companyName = (() => {
    const ul = scheduleDetail.querySelector("ul");
    if (!ul) return "";
    const li = ul.querySelector("li");
    if (!li) return "";
    const text = li.textContent;
    if (text.indexOf("面接企業：") == -1) return "";
    return text.replace("面接企業：", "").trim();
  })();

  const dates = (() => {
    const elements = scheduleDetail.querySelectorAll("p");
    const p = Array.from(elements).find(
      (p) => p.textContent.indexOf("日　時") >= 0
    );
    if (!p) return "";
    const text = p.textContent.match(
      /(\d{4}年\d{1,2}月\d{1,2}日).*?(\d{1,2}:\d{2})/
    );
    let dateString = `${text[1]} ${text[2]}`;
    dateString = dateString.replace(/年|月/g, "-").replace("日", "");

    const base = convertDateFormat(new Date(dateString));
    const after = convertDateFormat(new Date(dateString), 1);
    return `${base}/${after}`;
  })();

  const params = {
    text: companyName,
    dates: dates,
    details: scheduleDetail.textContent,
  };

  const btn = document.createElement("a");
  btn.setAttribute("href", createScheduleUrl(params));
  btn.setAttribute("target", "_blank");
  btn.style.display = "block";
  btn.style.margin = "16px 0";
  btn.style.textDecoration = "underline";
  btn.textContent = "予定をGoogleカレンダーに追加する";
  scheduleDetail.appendChild(btn);
}

window.addEventListener("load", () => {
  if (isMypage()) mypage();
  if (isDetail()) detail();
});
