let count1 = 1;
document.getElementById("radio10").checked = true;

setInterval(function () {
  nextImage1();
}, 4000);

function nextImage1() {
  count1++;
  if (count1 > 3) {
    count1 = 1;
  }
  document.getElementById("radio" + (count1 + 4)).checked = true;
}