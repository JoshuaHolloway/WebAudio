$(document).ready(() => {
    
    $('#readButton').click(() => {
        const nameBox = $('#nameBox').val();

        // AJAX:
        // Step 1: Make background (XMLHTTP) request
        // Step 2: Run callback with data arg upon receiving request
        //          -Response will be in JSON format as a string
        // Step 3: Parse JSON-string into JS-Object

        $.ajax({
            // all URLs are relative to http://localhost:3000/
            url: '/users/' + nameBox,
            type: 'GET',
            dataType: 'json', // this URL returns data in JSON format
            success: (data, status, XMLHttpRequest_) => {

                // Function to be called if the request succeeds. 
                // The function gets passed three arguments: 
                //  -The data returned from the server, 
                //   formatted according to the dataType parameter;
                //  -(optional)a string describing the status; 
                //  -the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object. 

                console.log('Data: ', data);
                console.log('-----------------');
                console.log('status: ', status);
                console.log('-----------------');
                console.log('jqXHR object: ', XMLHttpRequest_);
            }
        });               
    });

    // ================================

    // Send to /josh
    $('#josh-button').click(() => {

        console.log('button pressed');

        $.ajax({
            url: '/users',
            type: 'GET',
            dataType: 'json',
            success: res => {

                // Handle response:

                console.log('/users was successful');

                $('#status').html('All users: ' + res);
            }
        })
        .done(res => {
            console.log('in .done()');
            console.log(res);
        })
        .fail(err => {
            console.log('in .fail()');
            console.log(err);
        });
    });
});