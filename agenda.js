(function() {
    var endpoint = "http://localhost:4000/schedule";

    // Elementos da tela
    var ui = {
        fields: document.querySelectorAll(".pure-form input"),
        button: document.querySelector(".pure-button"),
        table: document.querySelector(".pure-table tbody")
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

        if (errors > 0) {
            document.querySelector(".error").focus();
        } else {
            addContact(data);
        }
    };

    var addContact = contact => {
        var config = {
            method: "POST",
            body: JSON.stringify(contact),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };

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
        .then(resp => { return resp.json() })
        .then(getContactsSuccess)
        .catch(genericError);
    };

    var getContactsSuccess = contacts => {
        var html = [];
        if (contacts.length == 0) {
            html.push(`
                <tr>
                    <td colspan="5">Não existem dados registrados!</td>
                </tr>
            `);
        } else {
            contacts.forEach(contact => {
                html.push(`
                    <tr>
                        <td>${contact.id}</td>
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.phone}</td>
                        <td><a href="#" data-action="delete" data-id="${contact.id}">Excluir</a></td>
                    </tr>
                `);
            });
        }
        ui.table.innerHTML = html.join("");
    };

    var handlerAction = e => {
        // e.currentTarget === this --> não funcionam nesta situação
        if (e.target.dataset.action === "delete") {
            e.preventDefault();
            removeContact(e.target.dataset.id);
        }
    };

    var removeContact = function(id) {
        var config = {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };

        fetch(`${endpoint}/${id}`, config)
        .then(getContacts)
        .catch(genericError);
    };

    var init = function() {
        ui.button.onclick = validateFields;
        ui.table.onclick = handlerAction;
        getContacts();
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