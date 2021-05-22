short = document.getElementById("activity_container").contentWindow.document;

function copyToClipboard(text) {
  var input = short.body.appendChild(document.createElement("input"));
  input.value = text;
  input.focus();
  input.select();
  short.execCommand('copy');
  input.parentNode.removeChild(input);
}




function MyELTSver5(){
//*************************************************************************************/
  if(!short.getElementsByClassName("view-feedback-button")[0].classList.contains("ng-hide")){
    // Feedback
      x = short.querySelectorAll("button[class*='view-feedback-button']");
      for (i = 0; i < x.length; i++) {
        x[i].removeAttribute("disabled");
        x[i].innerHTML = "Shawn "+ x[i].innerHTML;
      }
      return;
    }

  // var x, i;
  x = short.querySelectorAll("button[class*='show-answer-button']");
  for (i = 0; i < x.length; i++) {
    x[i].removeAttribute("disabled");
    x[i].classList.remove("ng-hide");
    x[i].innerHTML = "Shawn "+ x[i].innerHTML;
  }

  //show answer click
  short.getElementsByClassName("show-answer-button")[0].click();

  //*************************************************************************************/
  //Get Answers
  if(short.querySelectorAll(".t_showAnswer").length >0){
    x = short.querySelectorAll(".t_showAnswer");
  } else if(short.querySelectorAll(".showAnswers").length >0){
    x = short.querySelectorAll(".showAnswers");
  } else if(short.querySelectorAll(".correct").length >0){
    x = short.querySelectorAll(".correct");
  } else {}

  shawnA = [];
  shawnAn = '';
  for (i = 0; i < x.length; i++) {
      if((x[i].querySelectorAll("option").length)>0){
          shawnA.push(x[i].querySelectorAll("option[selected='selected']")[0].value);
          shawnAn += String(i+1) + '. ' + shawnA[i] + '  ';
      }else {
          shawnA.push(x[i].innerText);
          shawnAn += String(i+1) + '. ' + shawnA[i] + '  ';
      }
  }
  //*************************************************************************************/
  //log answers
  console.log(shawnA);
  console.log(shawnAn)
  //show on desktop
  short.getElementsByTagName('ng-bind-html')[0].innerHTML = shawnAn;
  //hide answer click
  short.getElementsByClassName("hide-answers-button")[0].click();
  //*************************************************************************************/
  //copy answer
  copyToClipboard(shawnA[0]);
  //shift copy
  short.querySelectorAll("input").forEach(item => {
    item.addEventListener('focusout',function(e){
      // if(e.which == 9){
      shawnA.shift();
      console.log('tab?');
      copyToClipboard(shawnA[0]);
      // }
    })
  })

  short.addEventListener('keydown',function(e){
    switch (e.which) {
      case 192:
        shawnA.shift();
        console.log('tab?');
        copyToClipboard(shawnA[0]);
      break;
      case 190:
        //show answer click
        short.getElementsByClassName("show-answer-button")[0].click();

      break;
      case  189:
        //hide answer click
        short.getElementsByClassName("hide-answers-button")[0].click();
    }
  })

//*************************************************************************************/
}

function selectAnswers1(){
  x = short.querySelectorAll(".mat-option-wrapper");
  for (i = 0; i < x.length; i++) {
    matoption = "mat-option-id-" + String(i);
    queryanswer = "div[class*='mat-option-in-container'][data-title='" + shawnA[i] +"']";
    short.getElementsByClassName(matoption)[0].querySelectorAll(queryanswer)[0].click();
    short.getElementsByClassName(matoption)[0].getElementsByClassName('mat-selected-container')[0].click();
  }
}
function selectAnswers2(){
  x = short.querySelectorAll(".taptap-gap");
  for (i = 0; i < x.length; i++) {
    short.querySelectorAll(".wordpool-item-taptap").forEach((item) => {
      if(item.innerText == shawnA[i]){
        item.click();
      }
    });
    x[i].click();
  }
}


MyELTSver5();
selectAnswers1();
selectAnswers2();
x = short.querySelectorAll("button[class*='submit-lo-button']");
  for (i = 0; i < x.length; i++) {
    x[i].removeAttribute("disabled");
  }
// alert('ver5');