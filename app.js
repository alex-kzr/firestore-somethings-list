const somethingList = document.querySelector("#something-list");
const somethingAddForm = document.querySelector('#something-add-form');

// create element and render something
function renderSomething(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let note = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    note.textContent = doc.data().name;

    li.appendChild(name);
    li.appendChild(note);

    somethingList.appendChild(li);
}

// getting data
db.collection('somethings').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderSomething(doc);
    });
});

// saving data
somethingAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('somethings').add({
        name: somethingAddForm.name.value,
        note: somethingAddForm.note.value
    });
});