//This module handles the presentation and flow of
// textual information between data-processing models
// and the user interface

var scribe = (function () {
  
  const toggle = document.querySelector("#display-toggle"),
        view = document.querySelector("#info-view"),
        out = document.querySelector("#text"),
        list = document.querySelector("#data-categories"),
        obButton = document.querySelector("#observe"),
        form = document.querySelector("#info-in"),
        defCatTit1 = "User Guide",
        defCatTit2 = "Developers",
        defCatInfo1 = `Capture an image by clicking
    the Identify button and relevant information will appear here.
    Click on the category labels above to learn more`,
        defCatInfo2 = "Matt Smitherman, Daniel Tripp, Garrett Mostella";
  
  //category title array
  var cats = [];
  //categoty information array
  var catInfo = [];
  
  function populate() {
    //check if subject category information exists
    if (null) {
      //load from database
    } else {
      //load defaults
      cats.push(defCatTit1);
      cats.push(defCatTit2);
      catInfo.push(defCatInfo1);
      catInfo.push(defCatInfo2);
    }
  }
  //add category titles to DOM tree
  function toList() {
    for(let i = 0; i < cats.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent = cats[i];
      listItem.onclick = function () { 
        out.textContent = catInfo[i];
      }
      list.appendChild(listItem);
    }
  }
  
  function addCategory(myForm, num, prompt) {
    for(let i = 0; i < num; i++){
      var catTitleBox = document.createElement("input");
      var catDataBox = document.createElement("textarea");
      if (prompt == null) {
        catTitleBox.placeholder = "Category Title";
      } else {
        catTitleBox.placeholder = prompt;
      }
      catDataBox.placeholder = "Category Data";
      catTitleBox.className = "catTitle";
      catDataBox.className = "catData";
      myForm.appendChild(catTitleBox);
      myForm.appendChild(catDataBox);
    }
  }
  
  function clearList(myList){
    while(myList.firstChild) {
      myList.removeChild(myList.firstChild);
    }
  }
  
  obButton.onclick = function () {
    out.textContent = "Enter details about the subject of observation below";
    clearList(list);
    addCategory(form, 1, "Subject Name (required)");
    addCategory(form, 2);
  }
  
  toggle.onclick = function () {
   // window.addEventListener('DOMContentLoaded', (event) => {
    view.classList.toggle("small");
   // });
    toggle.classList.toggle("up");
  }
  
  populate();
  toList();
  
  
}());

export { scribe };