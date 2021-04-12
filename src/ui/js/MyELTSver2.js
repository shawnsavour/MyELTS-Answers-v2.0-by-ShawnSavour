var x, i;
  x = document.getElementById("activity_container").contentWindow.document.querySelectorAll("button[contains(text(),'Show answers')]");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("ng-hide");
    x[i].removeAttribute("disabled");
  }
// alert('ver2');