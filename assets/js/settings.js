const path = require('path');
const Store = require('./store.js');
window.$ = window.jQuery = require('jquery');


// mainWindow.on('resize', () => {
//     // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
//     // the height, width, and x and y coordinates.
//     let { width, height } = mainWindow.getBounds();
//     // Now that we have them, save them using the `set` method.
//     store.set('windowBounds', { width, height });
//     store.set('windowBounds', { width, height });

//     console.log('resized');
// });


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



const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        hideTimeDateText: { field: 'true' },
        spiralTime: { field: 'day'},
        palette: { field: 'snow'}
    }
});

hideTimeDateText = store.get('hideTimeDateText').field;
spiralTime = store.get('spiralTime').field;
palette = store.get('palette').field;

if (hideTimeDateText == true) {
    console.log('checked 💛')
    $("#hide_time_date_text").prop("checked", true);
}

$("#time_select").val(spiralTime);
$("#palette_select").val(palette);





// $('#palette_select').change(function() {
//     console.log($(this).val());
// });
