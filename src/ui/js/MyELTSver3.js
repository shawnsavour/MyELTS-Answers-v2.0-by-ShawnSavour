// var x, i;
x = document.getElementById("activity_container").contentWindow.document.querySelectorAll("button[class*='show-answer-button']");
for (i = 0; i < x.length; i++) {
  x[i].removeAttribute("disabled");
  x[i].classList.remove("ng-hide");
  x[i].innerHTML = "Shawn "+ x[i].innerHTML;
}
// alert('ver3');