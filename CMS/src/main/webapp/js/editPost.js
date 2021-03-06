var tags = [];

$(document).ready(function () {
    startTagit();


});

tinymce.init({
    selector: '#contentEditArea',
    image_caption: true,
    height: 263,
    theme: 'modern',
    plugins: [
        'advlist autolink lists link image hr',
        'wordcount searchreplace visualblocks visualchars code',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'paste textpattern imagetools toc'
    ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    image_advtab: true
});

function doAddCategory() {
    event.preventDefault();
    $('#validationErrors').empty();
    $('#addCategory').attr({
    });

    $.ajax({
        type: 'POST',
        url: '/CMS/admin/add/category',
        // Build a JSON object from the data in the form
        data: JSON.stringify({
            name: $('#createCategory').val()

        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'
    }).success(function (data, status) {
        // If the call succeeds, clear the form and reload the page
        location.reload();
    }).error(function (data, status) {
        // #2 - Go through each of the fieldErrors and display the associated error
        // message in the validationErrors div
        $.each(data.responseJSON.fieldErrors, function (index, validationError) {
            var errorDiv = $('#validation-errors-category');
            errorDiv.append(validationError.message).attr({class:'text-danger'}).append($('<br>'));
        });
    });
}


function startTagit() {
    $.ajax({
        type: 'GET',
        url: '/CMS/admin/hashtags'

    }).success(function (data, success) {
        tags = data;
        $("#hashtags").tagit({
            availableTags: tags,
            singleField: true
        });

    });


}