document.getElementById("fileSubmitButton").addEventListener("click", changeBackground());

function changeBackground() {
    //delete previous image in localstorage
    //add image in localstorage
    //get the image from local storage and set as background
    if (localStorage.getItem('image') != null) {
        deleteImageInStorage();
    }
    saveImageInStorage();

    //get the image from local storage and set as background
    console.log("got here");
}

function deleteImageInStorage() {
    localStorage.removeItem('image');
}

function saveImageInStorage() {
    //localStorage can only save data in string
    //must be saved in JSON.stringify
    //use JSON.parse to undo stringify
    localStorage.setItem('image', JSON.stringify(document.getElementById("fileUpload").value));
}

