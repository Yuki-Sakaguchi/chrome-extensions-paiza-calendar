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

function isNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

function copyCompanyName() {
  const items = document.querySelectorAll(
    ".m-mypage-entries-box__body-item-name .a-text-primary-small"
  );

  const rankingItems = Array.from(items).filter((item) => {
    const data = item.getAttribute("data-ranking");
    return data != null && isNumeric(data) && Number(data) > 0;
  });

  let textList;
  if (rankingItems.length > 0) {
    textList = Array.from(rankingItems)
      .sort((a, b) => {
        return (
          Number(a.getAttribute("data-ranking")) -
          Number(b.getAttribute("data-ranking"))
        );
      })
      .map((item) => {
        const ranking = item.getAttribute("data-ranking");
        return `${ranking}位：${item.textContent}`;
      });
  } else {
    textList = Array.from(items).map((item) => item.textContent);
  }

  navigator.clipboard
    .writeText(textList.join(",").replaceAll(",", "\n"))
    .then((val) => {
      alert("コピーに成功しました");
    })
    .catch(() => {
      alert("コピーに失敗しました");
    });
}

function addRanking() {
  const items = document.querySelectorAll(
    ".m-mypage-entries-box__body .m-mypage-entries-box__body-item .m-mypage-entries-box__body-item-name"
  );

  Array.from(items).forEach((value, index) => {
    const title = value.querySelector(".a-text-primary-small");

    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-40px";
    div.style.top = 0;
    div.style.bottom = 0;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.transform = "translate(-100%, 0)";

    const input = document.createElement("input");
    input.type = "number";
    input.style.width = "50px";
    input.style.height = "30px";
    input.style.fontSize = "16px";
    input.style.padding = "8px 0 8px 8px";
    input.addEventListener("change", () => {
      title.setAttribute("data-ranking", input.value);
    });
    div.appendChild(input);

    const span = document.createElement("span");
    span.textContent = "位";
    div.appendChild(span);

    value.style.position = "relative";
    value.appendChild(div);
  });
}

function isDetail() {
  return /\/entries\/?.*\/detail/.test(location.pathname);
}

function isMypage() {
  return location.pathname === "/career/mypage";
}

function mypage() {
  const box = document.querySelector(".m-mypage-entries-box");

  const wrap = document.createElement("div");
  wrap.style.display = "block";
  wrap.style.margin = "16px 0";

  const btn = document.createElement("button");
  btn.classList.add("a-button-primary-small");
  btn.textContent = "会社名をコピーする";
  btn.addEventListener("click", copyCompanyName);
  wrap.appendChild(btn);

  const btn2 = document.createElement("button");
  btn2.classList.add("a-button-primary-small");
  btn2.textContent = "順位をつける";
  btn2.style.marginLeft = "8px";
  btn2.addEventListener("click", addRanking);
  wrap.appendChild(btn2);

  box.after(wrap);
}

function detail() {
  const scheduleDetail = document.querySelector(".schedule_confirm__detail");
  if (!scheduleDetail) return;

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
