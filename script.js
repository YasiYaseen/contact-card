
// Get references to elements
const addButton = document.getElementById('add-button');
const modal = document.getElementById('input-modal');
const editmodal = document.getElementById('edit-modal');
const closeedit = document.getElementById('close-edit');
const closeButton = document.getElementById('close-modal');
const submitButton = document.getElementById('submit-button');
let submitedit = document.getElementById('submit-edit');
const deleteButton = document.getElementById('delete-btn');
const editbutton = document.getElementById('edit-btn');
let deleteperson = document.querySelector(".delete-person");



let persons = JSON.parse(localStorage.getItem("persons")) || [["muhammed yaseen", "6238899231"]];
let personsList = document.querySelector(".personList");
let key = 0;
deleteperson.style.display = "none";

document.getElementById('owner').innerText = persons[0][0];
document.getElementById('name').innerText = persons[0][0];
document.getElementById('work').innerText = persons[0][1];
sortpersons();
let currentLetter = null;
persons.forEach((person, index) => {
    if (index != 0) {
        const name = person[0];
        const firstLetter = name.charAt(0).toUpperCase();

        if (firstLetter != currentLetter) {
            currentLetter = firstLetter;
            addSeperator(currentLetter);
        }

        let li = document.createElement("li");
        li.innerText = person[0];
        li.classList.add("person");
        li.setAttribute("key", index);

        personsList.appendChild(li);
    }

});
if (persons.length != 0) {
    const hr = document.createElement('hr');
    hr.classList.add("ms-4", "mt-5")
    personsList.appendChild(hr);
}

// Function to open the modal
addButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Function to close the modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';

});

// Function to handle form submission
submitButton.addEventListener('click', () => {
    let name = document.getElementById('input1').value;
    let number = document.getElementById('input2').value;
    if (name != "" && number != "") {


        let newperson = [name, number];
        persons.push(newperson);

        let personString = JSON.stringify(persons);
        localStorage.setItem("persons", personString);

        while (personsList.firstChild) {
            personsList.removeChild(personsList.firstChild);
        }
        sortpersons();
        let currentLetter = null;
        persons.forEach((person, index) => {
            if (index != 0) {
                const name = person[0];
                const firstLetter = name.charAt(0).toUpperCase();

                if (firstLetter != currentLetter) {
                    currentLetter = firstLetter;
                    addSeperator(currentLetter);
                }

                let li = document.createElement("li");
                li.innerText = person[0];
                li.classList.add("person");
                li.setAttribute("key", index);

                personsList.appendChild(li);
            }

        });


        document.getElementById('input1').value = "";
        document.getElementById('input2').value = "";
    } else {

    }
    // Close the modal
    modal.style.display = 'none';
});

deleteButton.addEventListener('click', () => {
    localStorage.clear("persons");


})

editbutton.addEventListener('click', () => {
    editmodal.style.display = 'block';
    document.getElementById('editname').value = persons[key][0];
    document.getElementById('editnum').value = persons[key][1];
})
closeedit.addEventListener('click', () => {
    editmodal.style.display = 'none';

});
submitedit.addEventListener('click', () => {
    let name = document.getElementById('editname').value;
    let num = document.getElementById('editnum').value;
    if (name != "" && num != "") {
        persons[key][0] = name;
        persons[key][1] = num;

        let personString = JSON.stringify(persons);
        localStorage.setItem("persons", personString);

        if (key == 0) {
            //
            document.getElementById('owner').innerText = persons[0][0];
            document.getElementById('name').innerText = persons[0][0];
            document.getElementById('work').innerText = persons[0][1];
        } else {
            let listItems = personsList.querySelectorAll("li");

            listItems[key - 1].innerText = persons[key][0];
            document.getElementById('name').innerText = persons[key][0];
            document.getElementById('work').innerText = persons[key][1];
        }
    }
    editmodal.style.display = 'none';
})

$('.contactlist').on('click', 'li', (e) => {
    e.preventDefault();
    key = $(e.currentTarget).attr('key');

    // Select all elements with the class "contactlist"
    let contactlist = document.querySelectorAll(".contactlist");

    // Loop through each "contactlist" element
    contactlist.forEach(function (list) {
        // Get all the list items within each "contactlist" element
        let listItems = list.querySelectorAll("li");

        // Loop through the list items and remove the "selected" class
        listItems.forEach(function (item) {
            item.classList.remove("selected");
        });
    });
    $(e.currentTarget).addClass("selected");


    //alert(persons[key])
    document.getElementById('name').innerText = persons[key][0];
    document.getElementById('work').innerText = persons[key][1];

    if (key == 0) {
        deleteperson.style.display = "none";
    } else {
        deleteperson.style.display = "block";
    }

});



// Add a click event listener to the button
deleteperson.addEventListener("click", function () {
    // Display a confirmation dialog
    let confirmation = confirm("Are you sure you want to delete?");

    // Check if the user confirmed (clicked OK)
    if (confirmation) {

        persons.splice(key, 1);
        let personString = JSON.stringify(persons);
        localStorage.setItem("persons", personString);

        location.reload();

    } else {

    }
});

function sortpersons() {
    const firstPerson = persons.shift();

    // Sort the remaining persons based on names
    persons.sort((a, b) => {
        const nameA = a[0].toUpperCase(); // Convert names to uppercase for case-insensitive sorting
        const nameB = b[0].toUpperCase();

        if (nameA < nameB) {
            return -1; // Name A comes before Name B
        }
        if (nameA > nameB) {
            return 1; // Name A comes after Name B
        }
        return 0; // Names are equal
    });

    // Insert the first person back into the beginning of the array
    persons.unshift(firstPerson);
    console.log(persons);
}

function addSeperator(letter) {
    const h6 = document.createElement('h6');
    h6.innerText = letter;
    const hr = document.createElement('hr');
    h6.classList.add("seperator", "px-4", "mt-4");
    hr.classList.add("ms-4");
    personsList.appendChild(h6);
    personsList.appendChild(hr);
}