const somethingList = document.querySelector('#something-list');
const somethingAddForm = document.querySelector('#something-add-form');

// create element and render something
function renderSomething(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let note = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    note.textContent = doc.data().note;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(note);
    li.appendChild(cross);

    somethingList.appendChild(li);

    // delete data
    cross.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('somethings').doc(id).delete();
    });
}

// getting data
// db.collection('somethings').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderSomething(doc);
//     });
// });

// saving data
somethingAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('somethings').add({
        name: somethingAddForm.name.value,
        note: somethingAddForm.note.value
    });
    somethingAddForm.name.value = '';
    somethingAddForm.note.value = '';
});

// real-time listener
db.collection('somethings').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderSomething(change.doc);
        } else if (change.type == 'removed'){
            let li = somethingList.querySelector('[data-id=' + change.doc.id + ']');
            somethingList.removeChild(li);
        }
    });
});