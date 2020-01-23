const somethingList = document.querySelector("#something-list");

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

db.collection('somethings').get().then((snapshot) => {
    //console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        renderSomething(doc);
    });
});