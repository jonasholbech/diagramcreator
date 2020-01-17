const form = document.querySelector("form");
const updateForm = document.querySelector("#updateForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  console.log(form.elements);
  addMessage(form.elements.name.value, form.elements.content.value);
});

updateForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = updateForm.elements.name.value;
  const content = updateForm.elements.content.value;
  const id = updateForm.elements.id.value;

  update(id, name, content);
});

function getData() {
  fetch("https://xxx.mockapi.io/messages")
    .then(res => res.json())
    .then(showMessages);
}
getData();

const temp = document.querySelector("#messageTemplate").content;

function showMessages(data) {
  data.forEach(showMessage);
}
function showMessage(mes) {
  const clone = temp.cloneNode(true);
  clone.querySelector("h2").textContent = mes.name;
  clone.querySelector("header p").textContent = mes.createdAt;
  clone.querySelector("div").textContent = mes.content;
  clone.querySelector("article").dataset.id = mes.id;
  clone.querySelector(".edit").addEventListener("click", populateEditForm);
  document.querySelector("main").appendChild(clone);
}

function populateEditForm(e) {
  //console.log(e.target.parentElement.dataset.id);
  const parent = e.target.parentElement;
  const id = e.target.parentElement.dataset.id;
  console.log(parent.querySelector("h2").textContent);
  updateForm.elements.name.value = parent.querySelector("h2").textContent;
  updateForm.elements.content.value = parent.querySelector("div").textContent;
  updateForm.elements.id.value = id;
}
function deleteMessage(id) {
  //
  fetch("https://xxx.mockapi.io/messages/" + id, {
    method: "delete"
  })
    .then(res => res.json())
    .then(data => {
      console.log("data was deleted", data);
    });
}
/*
DELETEION
1. a button
1.5 add data-attribute to template (containg the id)
2. addEventListener
    read data atribute
    call  deleteMessage
3. remove from DOM
    elem.remove()
*/
function addMessage(formName, formContent) {
  const data = {
    name: formName,
    content: formContent,
    createdAt: "2018-11-01T08:30:27.154Z"
  };
  console.log(JSON.stringify(data));

  fetch(`https://xxx.mockapi.io/messages`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(d => {
      console.log(d);
      showMessage(d);
    });
}

/*
    1. 
    4. add eveenthandler to form
    
*/
function update(id, updatedName, updatedContent) {
  const payLoad = {
    name: updatedName,
    content: updatedContent
  };

  const postData = JSON.stringify(payLoad);
  fetch(`https://xxx.mockapi.io/messages/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: postData
  })
    .then(res => res.json())
    .then(d => {
      console.log(d);
    });
}
