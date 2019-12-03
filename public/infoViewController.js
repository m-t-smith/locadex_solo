//This module handles the presentation and flow of
// textual information between data-processing models
// and the user interface

var scribe = (function () {
  
  const toggle = document.querySelector("#display-toggle"),
        view = document.querySelector("#info-view"),
        out = document.querySelector("#text"),
        list = document.querySelector("#data-categories"),
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
  
  function listEventHandler(indx) {
    
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