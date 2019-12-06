//This module handles the presentation and flow of
// textual information between data-processing models
// and the user interface

import { identifier as id, SubjectData } from './identifier.js'

var scribe = (function () {
  
  const toggle = document.querySelector("#display-toggle"),
        view = document.querySelector("#info-view"),
        out = document.querySelector("#text"),
        list = document.querySelector("#data-categories"),
        obButton = document.querySelector("#observe"),
        form = document.querySelector("#info-in"),
        title = document.querySelector("#title"),
        defCatTit1 = "User Guide",
        defCatTit2 = "Developers",
        defCatInfo1 = `Capture an image by clicking
    the Identify button and relevant information will appear here.
    Click on the category labels above to learn more`,
        defCatInfo2 = "Matt Smitherman, Daniel Tripp, Garrett Mostella";
  
  //category title array
  var cats = [];
  //category information array
  var catInfo = [];
  //options object to pass subject info
  //to subjectData constructor in indentifier
  var subOps = {};
  //module mode flag
  var isDemo = false;
  //options for module function objects
  var textOps = {};
  //array to store subjectData objects given location or mode
  var subjects = [];
  
  function init() {
    //set initial text display values e.g. welcome message
    textOps.guide = true;   
    populate(textOps, subOps);
    toList(cats, catInfo);
    textOps.guide = false;
    empty(cats);
    empty(catInfo);
    
    textOps.demo = isDemo;
    populate(textOps);
  }
  
//  function loadSubjectDataAsync() { 
    
//  }
  
  async function loadSubjectData(promisedId) {
  //  if(!isDemo){
  //   loadSubjectDataAsync(); 
  //  } else {
    // let promise =  new Promise(function(resolve, reject) {
 
      // console.log(id);
      // if(id){
        // resolve(id);
      // } else {
      // reject(new Error("id retrieval failed"));
      // }
    // });
     // promise.then(function(promInt, broken) {
      // console.log(id);
    cats = ["Numeral", "Type", "History", "Description"];
        var names = ["Zero", "One", "Two", "Three", "Four",
             "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        var type = "Arabic Numeral; Integer; Symbol";
        var history = `The decimal Hindu–Arabic numeral system with zero was
        developed in India by around AD 700. The development was gradual,
        spanning several centuries, but the decisive step was probably provided by 
        Brahmagupta's formulation of zero as a number in AD 628. Prior to Brahmagupta,
        zero was in use various forms but was regarded as a 'blank spot' (sunya sthana)
        in a positional number. It was only used by mathematicians (ganakas—people doing calculations)
        while the general populace used the traditional Brahmi numerals. After 700 AD,
        the decimal numbers with zero replaced the Brahmi numerals. The system was revolutionary
        by limiting the number of individual digits to ten. It is considered an important milestone
        in the development of mathematics.
        
        
        Source: Wikipedia (https://en.wikipedia.org/wiki/Arabic_numerals)`
        var description = "A symbolic representation of a number or quantity."
        var catData = [promisedId, type, history, description];
    // })
      clearList(list);
      title.textContent = names[promisedId];
      console.log(catData);
      console.log(catData[0]);
      toList(cats, catData);
      
      //const tenData = promisedId.dataSync()
      
      //load demo data
      //populate(textOps.demo, subOps, promisedId);
 //   }
  }
  
  //prepare subject info
  function populate(textOps, subOps, target) {
    if (textOps.guide) {
      //load defaults
      title.textContent = "Locadex";
      cats.push(defCatTit1);
      cats.push(defCatTit2);
      catInfo.push(defCatInfo1);
      catInfo.push(defCatInfo2);
      
    } else if (textOps.demo) {
        // subOps.categories = ["Numeral", "Type", "History", "Description"];
        // var names = ["Zero", "One", "Two", "Three", "Four",
             // "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        // var type = "Arabic Numeral; Integer; Symbol";
        // var history = `The decimal Hindu–Arabic numeral system with zero was
        // developed in India by around AD 700. The development was gradual,
        // spanning several centuries, but the decisive step was probably provided by 
        // Brahmagupta's formulation of zero as a number in AD 628. Prior to Brahmagupta,
        // zero was in use various forms but was regarded as a 'blank spot' (sunya sthana)
        // in a positional number. It was only used by mathematicians (ganakas—people doing calculations)
        // while the general populace used the traditional Brahmi numerals. After 700 AD,
        // the decimal numbers with zero replaced the Brahmi numerals. The system was revolutionary
        // by limiting the number of individual digits to ten. It is considered an important milestone
        // in the development of mathematics.
        
        
        // Source: Wikipedia (https://en.wikipedia.org/wiki/Arabic_numerals)`
        // var description = "A symbolic representation of a number or quantity."
        // empty(catData);
        
        //Instantiate SubjectData instances and populate subject array
        // for(let i = 0; i < 10; i++){
          // subOps.name = name[i];
          // subOps.catData = [i, type, history, description];
          // subjects[i] = new SubjectData(names[i], subOps);
        // }
        // textOps.demo = false;
        // populate(subOps);
        
    } else if (subOps) {
      
      console.log(target.dtype);
      var intArr = target.toInt;
      var newTarget = intArr[0];
      console.log(newTarget);
      
      var identified = subjects[newTarget];
     // var identified = (num) => subjects.find(subject.options => subject.options.catData[0] === num)
      
      let targCats = identified.options.categories;
      empty(cats);
      targCats.forEach((element) => {cats.push(element)});
      let targData = identified.options.catData;
      empty(catInfo);
      targData.forEach(function(element){
        catInfo.push(element);
      });
      
      clearList();
      toList();
      
    }
  }
  //add category titles to DOM tree
  function toList(cats, catInfo) {
    for(let i = 0; i < cats.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent = cats[i];
      listItem.onclick = function () { 
        out.textContent = catInfo[i];
      }
      list.appendChild(listItem);
    }
  }
  
  //input form to collect subject data from user
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
  
  function loadDefault(){


        var catInfo = {name, type, history, description};
        var result = [cats, catInfo]; 
        return result;
  }
  
  //clear category title display 
  function clearList(myList){
    while(myList.firstChild) {
      myList.removeChild(myList.firstChild);
    }
  }
  
  function empty(arr){
    arr.length = 0; //also clears secondary references
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
  
  return {
    set mode(bool) {
        isDemo = bool;
    },
    get mode() {
        return isDemo;
    },
    loadSubjectData: loadSubjectData,
    init : init
  };
  
}());

export { scribe };