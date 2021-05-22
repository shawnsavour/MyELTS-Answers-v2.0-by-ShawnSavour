// var x, i;
//   x = document.getElementById("activity_container").contentWindow.document.querySelectorAll("button[contains(text(),'Show answers')]");
//   for (i = 0; i < x.length; i++) {
//     x[i].classList.remove("ng-hide");
//     x[i].removeAttribute("disabled");
//   }
// alert('ver2');
function copyToClipboard(text) {
  var input = document.body.appendChild(document.createElement("input"));
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.parentNode.removeChild(input);
}
shawnA=['create','love','loop','hello']
copyToClipboard(shawnA[0]);
