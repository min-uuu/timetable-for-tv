const days = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const makeClass = (classtime) => `<ruby>${classtime[0]}<rp><br /></rp><rt>${classtime[1]}</rt></ruby>`;
const classTypeOf = (time) => ({ string: "single", object: "multiple" }[typeof time[0]]);
const Time = (...t) => t.reduce((prev, next) => prev * 100 + next, 0) * Math.pow(100, 3 - t.length);

// Initialization
for (let i = 0; i < 5; i++) {
  let day = $("<tr>").attr("id", days[i]).append($("<td>").text(days[i]));
  table[i].forEach((classEach) => {
    let classContent = "";
    let classType = classTypeOf(classEach);

    if (classType == "single") {
      classContent = makeClass(classEach);
    } else if (classType == "multiple") {
      classContent = classEach.map(makeClass).join("/");
    } else {
      classContent = "버그";
    }

    day.append($("<td>").addClass(classType).html(classContent));
  });
  $("#시간표").append(day);
}

const lightup = () => {
  let now = new Date();
  let 요일 = now.getDay();
  let 현재시각 = Time(now.getHours(), now.getMinutes());
  console.log(현재시각);

  let 교시;
  if (현재시각 <= Time(9, 50)) 교시 = 1;
  else if (현재시각 <= Time(10, 50)) 교시 = 2;
  else if (현재시각 <= Time(11, 50)) 교시 = 3;
  else if (현재시각 <= Time(13, 40)) 교시 = 4;
  else if (현재시각 <= Time(14, 40)) 교시 = 5;
  else if (현재시각 <= Time(15, 40)) 교시 = 6;
  else if (현재시각 <= Time(16, 40)) 교시 = 7;
  else 교시 = -1;

  $(".today, .now").removeClass("today").removeClass("now");
  $(`table > tr:nth-of-type(${요일})`).addClass("today");
  $(`table > tr:nth-of-type(${요일}) td:nth-child(${교시 + 1})`).addClass("now");
};

lightup();
setInterval(lightup, 60000);
