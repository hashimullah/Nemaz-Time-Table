let solarMonthValue = "";
let solarYearValue = "";
let islamicMonthValue = "";
const calendar = document.getElementById("calendar");
let inputMonthElement = document.getElementById("solar-month");
let inputYearElement = document.getElementById("solar-year");
let inputhijriElement = document.getElementById("hijri-input");
let calendarSolarMonth = document.getElementById("calendar-solar-month");
let calendarHijriMonth = document.getElementById("calendar-hijri-month");
const applyButton = document.getElementById("btn");
function calculateJamaaahTime(prayerTime, offsetMinutes) {
  const prayerTimeParts = prayerTime.split(":");
  const prayerMinutes =
    parseInt(prayerTimeParts[0]) * 60 + parseInt(prayerTimeParts[1]);
  const jamaaahTimeMinutes = prayerMinutes + offsetMinutes;
  const jamaaahHours = Math.floor(jamaaahTimeMinutes / 60);
  const jamaaahMinutes = jamaaahTimeMinutes % 60;
  return `${String(jamaaahHours).padStart(2, "0")}:${String(
    jamaaahMinutes
  ).padStart(2, "0")}`;
}
function convertTo12HourFormat(time) {
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}
let url = `https://api.aladhan.com/v1/calendar/2024/1?latitude=53.83333000&longitude=-1.83333000&method=2`;
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    let apiResult = data;
    console.log(apiResult);
    const calanderArray = apiResult.data.map((date) => {
      const jamaaahOffsetMinutes = 15;

      return `<section class="flex items-center border-b w-[850px] ${
        date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
      } ${
        date.date.gregorian.weekday.en == "Friday" ? "font-semibold" : ""
      } border-[#26A5D2] text-[14px]">
          <div class="border-[#26A5D2] border-r py-1 ">
            <input
              name="date"
              type="text"
              value="${date.date.gregorian.day}"
              class="px-2 text-center outline-none ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              } w-[45px]"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="day"
              type="text"
              value="${date.date.gregorian.weekday.en.substring(0, 3)}"
              class="px-1 text-center outline-none w-[39px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="hijri"
              type="text"
              value="${date.date.hijri.day}"
              class="px-1 text-center outline-none w-[49px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Start"
              type="text"
              value="${date.timings.Fajr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[57px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jamaa'ah"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Fajr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[77px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Sunrise"
              type="text"
              value="${date.timings.Sunrise.substring(0, 5)}"
              class="px-1 text-center outline-none w-[78px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Duhar"
              type="text"
              value="${date.timings.Dhuhr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[59px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'ah Jamaa'ah"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Dhuhr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[92px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'Asr"
              type="text"
              value="${date.timings.Asr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'Asr"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Asr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[76px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Maghrib"
              type="text"
              value="${date.timings.Maghrib.substring(0, 5)}"
              class="px-1 text-center outline-none w-[83px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Ishaa"
              type="text"
              value="${date.timings.Isha.substring(0, 5)}"
              class="px-1 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] py-1">
            <input
              name="Ishaa"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Isha,
                jamaaahOffsetMinutes
              )}"
              class="pl-4 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
        </section>`;
    });
    const defaultMonth = "January";
    const defaultYear = "2024";
    inputMonthElement.value = defaultMonth;
    inputYearElement.value = defaultYear;
    solarYearValue = defaultYear;
    calendarSolarMonth.innerHTML = defaultMonth;
    calendarHijriMonth.innerHTML = apiResult.data[0].date.hijri.month.en;
    inputhijriElement.value =
      apiResult.data[0].date.hijri.month.en +
      ` AH ${apiResult.data[0].date.hijri.year}`;
    console.log("Date: ", apiResult.data[0].date.hijri.month.en);
    const calendarString = calanderArray.join("");
    calendar.innerHTML = calendarString;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
function handleInputChange(inputId) {
  const inputElement = document.getElementById(inputId);
  if (inputElement) {
    switch (inputId) {
      case "solar-month":
        const monthNameToNumber = {
          january: 1,
          february: 2,
          march: 3,
          april: 4,
          may: 5,
          june: 6,
          july: 7,
          august: 8,
          september: 9,
          october: 10,
          november: 11,
          december: 12,
        };
        let userInputMonth = inputElement.value.toLowerCase();
        solarMonthValue = monthNameToNumber[userInputMonth];
        break;
      case "solar-year":
        solarYearValue = inputElement.value;
        break;
      case "hijr-year":
        islamicMonthValue = inputElement.value;
        break;
      default:
        break;
    }
    let url = `https://api.aladhan.com/v1/calendar/${solarYearValue}/${solarMonthValue}?latitude=53.83333000&longitude=-1.83333000&method=2`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let apiResult = data;
        console.log(apiResult);
        if (Array.isArray(apiResult.data) && apiResult.data.length > 0) {
          const calanderArray = apiResult.data.map((date) => {
            const jamaaahOffsetMinutes = 15;
            return `<section class="flex items-center border-b w-[850px] ${
              date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
            } ${
              date.date.gregorian.weekday.en == "Friday" ? "font-semibold" : ""
            } border-[#26A5D2] text-[14px]">
          <div class="border-[#26A5D2] border-r py-1 ">
            <input
              name="date"
              type="text"
              value="${date.date.gregorian.day}"
              class="px-2 text-center outline-none ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              } w-[45px]"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="day"
              type="text"
              value="${date.date.gregorian.weekday.en.substring(0, 3)}"
              class="px-1 text-center outline-none w-[39px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="hijri"
              type="text"
              value="${date.date.hijri.day}"
              class="px-1 text-center outline-none w-[49px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Start"
              type="text"
              value="${date.timings.Fajr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[57px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jamaa'ah"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Fajr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[77px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Sunrise"
              type="text"
              value="${date.timings.Sunrise.substring(0, 5)}"
              class="px-1 text-center outline-none w-[78px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Duhar"
              type="text"
              value="${date.timings.Dhuhr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[59px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'ah Jamaa'ah"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Dhuhr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[92px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'Asr"
              type="text"
              value="${date.timings.Asr.substring(0, 5)}"
              class="px-1 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Jumu'Asr"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Asr,
                jamaaahOffsetMinutes
              )}"
              class="px-1 text-center outline-none w-[76px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Maghrib"
              type="text"
              value="${date.timings.Maghrib.substring(0, 5)}"
              class="px-1 text-center outline-none w-[83px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] border-r py-1">
            <input
              name="Ishaa"
              type="text"
              value="${date.timings.Isha.substring(0, 5)}"
              class="px-1 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
          <div class="border-[#26A5D2] py-1">
            <input
              name="Ishaa"
              type="text"
              value="${calculateJamaaahTime(
                date.timings.Isha,
                jamaaahOffsetMinutes
              )}"
              class="pl-4 text-center outline-none w-[58px] ${
                date.date.gregorian.weekday.en == "Monday" ? "bg-[#a4d7f3]" : ""
              }"
            />
          </div>
        </section>`;
          });
          calendarSolarMonth.innerHTML =
            apiResult.data[0].date.gregorian.month.en;
          calendarHijriMonth.innerHTML = apiResult.data[0].date.hijri.month.en;
          inputhijriElement.value =
            apiResult.data[0].date.hijri.month.en +
            ` AH ${apiResult.data[0].date.hijri.year}`;
          const calendarString = calanderArray.join("");
          calendar.innerHTML = calendarString;
        } else {
          console.error("Invalid or empty data received from the API.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    console.log("Solar Month:", solarMonthValue);
    console.log("Solar Year:", solarYearValue);
    console.log("Islamic Month:", islamicMonthValue);
  }
}
