const path = require('path');
const Store = require('./store.js');
window.$ = window.jQuery = require('jquery');

// Get settings
const store = new Store({
    // Data file is called 'user-preferences' and is stored in Libray/Application Support
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        hideTimeDateText: { field: 'true' },
        spiralTime: { field: 'day'},
        palette: { field: 'snow'}
    }
});

// Set settings
hideTimeDateText = store.get('hideTimeDateText').field;
spiralTime = store.get('spiralTime').field;
palette = store.get('palette').field;

if (hideTimeDateText == true) {
    console.log('checked 💛')
    $("#hide_time_date_text").prop("checked", true);
}

$("#time_select").val(spiralTime);
$("#palette_select").val(palette);

// FUNCTIONS

$('#time_select').change(function() {
    store.set('spiralTime', { field: $(this).val() });
    console.log($(this).val());
});

$('#hide_time_date_text').change(function() {
    console.log($(this).is(':checked'));
    if ($(this).is(':checked')) {
        console.log("show");
        store.set('hideTimeDateText', { field: true });
    } else {
        console.log("hidden");
        store.set('hideTimeDateText', { field: false });
    }
});

$('#palette_select').change(function() {
    store.set('palette', { field: $(this).val() });
    console.log($(this).val());
});

