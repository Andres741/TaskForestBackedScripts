
console.log('Admin starts');


const db = require('./firestoreInstance.js').db;
const { addAttribute_deleted, addAttribute_adviseDate} = require('./UpdateFirestore.js');
const { forEachTask, showAllTasks} = require('./FirestoreUtil');

const collectionPath = 'users/RO9UCnaJ01RZj1pbUNW2S8gszRi1/tasks';

const collection = db.collection(collectionPath);

async function showAll() {
    const snapshot = await collection.get();

    if (snapshot.empty) {
        console.log(collectionPath ,'collection is empty.');
        return;
    }

    snapshot.forEach( doc => {
        const data = doc.data();
        console.log(doc.id, '=>', data);

        console.log("data.title", '=', data.title);
        console.log("data.deleted", '=', data.deleted);
        console.log();
    });
}


async function main() {
    //await showAllTasks();
    await addAttribute_deleted();
    await addAttribute_adviseDate();
}


main().then( res => {
    console.log('finished');
})
.catch( error => {
    console.log("Error: ", error);
    throw error;
});
