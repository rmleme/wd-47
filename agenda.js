(function() {
    console.log("start app...");

    var endpoint = "http://localhost:4000/schedule";

    // Elementos da tela
    var ui = {
        fields: document.querySelectorAll(".pure-form input"),
        button: document.querySelector(".pure-button"),
        table: document.querySelector(".pure-table")
    };


    // Ações da tela
    var validateFields = function(e) {
        // console.log(arguments);
        e.preventDefault();
        var data = {};
        var errors = 0;
        ui.fields.forEach(function(field) {
            var trimmedField = field.value.trim();
            if (trimmedField.length === 0) {
                field.classList.add("error");
                errors++;
            } else {
                field.classList.remove("error");
                data[field.id] = trimmedField;
            }
        });

        console.log(errors, data);

        if (errors > 0) {
            document.querySelector(".error").focus();
        } else {
            addContact(data);
        }
    };

    var addContact = contact => {
        console.log(contact);
        var config = {
            method: "POST",
            body: JSON.stringify(contact),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };

        console.log(config);

        fetch(endpoint, config)
        .then(addContactSuccess)
        .catch(genericError);
    };

    var addContactSuccess = () => {
        cleanFields();
        getContacts();
    };

    var cleanFields = () => ui.fields.forEach(field => field.value = "");

    var genericError = () => console.error(arguments);

    var getContacts = () => {
        var config = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };

        fetch(endpoint, config)
        .then(res => { return res.json() })
        .then(getContactsSuccess)
        .catch(genericError);
    };

    var getContactsSuccess = contacts => {
        console.table(contacts);
        // TODO
    };

    var removeContact = function() {};

    var init = function() {
        ui.button.onclick = validateFields;
    }();


    console.log(ui);
})();


/*
ES5                       ES6
function() {}             () => {}
function(field) {}        (field) => {}
                          field => {}
function(field, pos) {}   (field, pos) => {}
*/