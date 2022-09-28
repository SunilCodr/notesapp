console.log('This is my Note App');
show()



let sumbit = document.getElementById('submitBtn')
sumbit.addEventListener('click', submit);


function submit() {
  let headingContent = document.getElementById('heading')
  let noteContent = document.getElementById('note')
  let contentCheck = document.getElementById('content-check');

    if(headingContent.value.length == 0) {
      
      contentCheck.style.display = 'block';
      headingContent.value = ''
      noteContent.value = '';

      setTimeout(()=> {
      contentCheck.style.display = 'none';
      },3000)
    }
    else {

      let note = localStorage.getItem('note');
      if (note == null) {
        noteObj = [];
      }
      else {
        noteObj = JSON.parse(note)
      }
      let noteSet = {
        headingContent: headingContent.value,
        noteContent: noteContent.value
      }
      noteObj.push(noteSet);
      localStorage.setItem('note', JSON.stringify(noteObj));
    
      headingContent.value = ''
      noteContent.value = '';
      show();
    }
  
  

 

}



function show(noteObj) {

  let note = localStorage.getItem('note');
  if (note == null) {
    noteObj = [];
  }
  else {
    noteObj = JSON.parse(note)
  }
  let boxOfNote = ''
  noteObj.forEach(function(element,index){ 
    boxOfNote +=`<div class="col-sm-6 mt-3 box ">
    <div class="card">
    <div class="card-body" id='${index}'>
        <h5 class="card-title">${element.headingContent}</h5>
        <p class="card-text">${element.noteContent}.</p>
        <a href="#!" class="btn btn-primary" id='editBtn' onclick="editCard(this)">Edit Note</a>
        <a href="#!" class="btn btn-primary" id='deleteBtn' onclick="remove(this)">Remove</a>
        </div>
        </div>
        </div>`
       
    
  });
  let row = document.getElementById('row-list');
  if(noteObj.length != 0){
    row.innerHTML = boxOfNote;
  } 
  else {
    row.innerHTML = `<h1 style='text-align:center;'> No Notes</h1>`
  }
}

let editBtn = document.getElementById('editBtn');



// editBtn.addEventListener('click', editCard);

function editCard(currentElement) {

  
 
  if(currentElement.textContent == 'Done') {
  
    currentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent = 'Edit Note';
    let currentHeading = currentElement.parentElement.firstElementChild.value;
    let currentPara = currentElement.parentElement.firstElementChild.nextElementSibling.value;
    let heading = document.createElement('h5');
    let para = document.createElement('p');
    heading.className = 'card-title';
    para.className = 'card-text';
    heading.textContent = currentHeading;
    para.textContent = currentPara;
    currentElement.parentElement.replaceChild(heading, currentElement.parentElement.firstElementChild)
    currentElement.parentElement.replaceChild(para, currentElement.parentElement.firstElementChild.nextElementSibling);
    

  let note = localStorage.getItem('note');

  if (note == null) {
    noteObj = [];
  }
  else {
    noteObj = JSON.parse(note)
  }
 
  let currentCard = currentElement.parentElement;
  let currentCardId = currentCard.id;
  let arrayOfNote = JSON.parse(note);
  let currentObj = arrayOfNote[currentCardId];
  currentObj.headingContent= heading.textContent;
  currentObj.noteContent = para.textContent;
  noteObj[currentCardId] = currentObj;
  localStorage.setItem('note', JSON.stringify(noteObj));
 

}

  else {
  
    currentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent = 'Done'
    
    // let currentHeading = currentElement.parentElement.firstElementChild;
    let currentHeadingValue = currentElement.parentElement.firstElementChild.textContent;
    let currentParaValue = currentElement.parentElement.firstElementChild.nextElementSibling.textContent;
    let currentHeadingInput = document.createElement('input');
    let currentParaInput = document.createElement('textarea');
    currentHeadingInput.type = 'text';
    currentHeadingInput.placeholder = 'Heading';
    currentHeadingInput.className='form-control';
    currentParaInput.type = 'text';
    currentParaInput.placeholder = 'Para';
    currentParaInput.className='form-control mt-2 mb-2';
    currentHeadingInput.value = currentHeadingValue;
    currentParaInput.value = currentParaValue;
    currentElement.parentElement.replaceChild(currentHeadingInput,currentElement.parentElement.firstElementChild);
    currentElement.parentElement.replaceChild(currentParaInput,currentElement.parentElement.firstElementChild.nextElementSibling);
   
    
  }
}

function remove(currentElement) {
  let removeElement = currentElement.parentElement.parentElement.parentElement
  removeElement.remove();

  let note = localStorage.getItem('note');

  if (note == null) {
    noteObj = [];
  }
  else {
    noteObj = JSON.parse(note)
  }
 
  let currentCard = currentElement.parentElement;
  let currentCardId = currentCard.id;
  let arrayOfNote = JSON.parse(note);
  let currentObj = arrayOfNote[currentCardId];
  noteObj.splice(currentCardId,1);
  localStorage.setItem('note', JSON.stringify(noteObj))
  show();
  
}


let input = document.getElementById('search');
input.addEventListener('input', search);

function search() {
  inputValue = input.value;

  let box = document.getElementsByClassName('box');

  Array.from(box).forEach((element) => {
    let boxTxt = element.getElementsByTagName('p')[0].innerText;
    if(boxTxt.includes(inputValue)) {
      element.style.display = 'block'
    }
    else {
      element.style.display = 'none'
    }
  })
}












