(function() {
    console.log("start app...");

    // Elementos da tela
    var ui = {
        fields: document.querySelectorAll(".pure-form input"),
        button: document.querySelector(".pure-button"),
        table: document.querySelector(".pure-table")
    };


    // Ações da tela
    var validateFields = function() { debugger; };

    var addContact = function() {};

    var getContacts = function() {};

    var removeContact = function() {};

    var init = function() {
        ui.button.onclick = validateFields;
    }();


    console.log(ui);
})();