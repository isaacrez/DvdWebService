
$(document).ready(function() {
    hideExceptFor('main');
    loadDvds();
});

function hideExceptFor(name) {
    $('#errorMessage').empty();
    hideables = ['main', 'edit', 'add'];
    $.each(hideables, function(index, value) {
        if (value !== name) {
            $('.' + value).hide();
        } else {
            $('.' + value).show();
        }
    })
}

function loadDvds() {
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvds',
        success: function (dvdArray) {
            var dvdRows = $('#contentRows');
            dvdRows.empty();
            $.each(dvdArray, function(index, dvd) {
                var title = dvd.title;
                var releaseDate = dvd.releaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                
                var entry = '<tr>';
                entry += '<td>' + title + '</td>';
                entry += '<td>' + releaseDate + '</td>';
                entry += '<td>' + director + '</td>';
                entry += '<td>' + rating + '</td>';
                entry += '<td><div class="d-flex justify-content-center"><button class="btn btn-primary mx-1" onclick="showEdit(' + dvd.id + ')">Edit</button>';
                entry += '<button class="btn btn-danger mx-1">Delete</button></div></td>';
                entry += '</tr>';
                
                dvdRows.append(entry);
            });
        },
        error: function() {
            addError('Could not communicate with database.  Try again later.');
        }
    });
}

function showEdit(id) {
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + id,
        success: function (dvd) {
            hideExceptFor('edit');
            $('#editTitleHeader').text('Edit Dvd: ' + dvd.title);
            $('#editTitle').val(dvd.title);
            $('#editReleaseYear').val(dvd.releaseYear);
            $('#editDirector').val(dvd.director);
            $('#editRating').val(dvd.rating);
            $('#editNotes').val(dvd.notes);
            $('#editId').val(dvd.id);
        },
        error: function() {
            addError('Could not communicate with database.  Try again later.');
        }
    });
}

function editDvd() {
    if (isValidInput($('#editForm').find('input'))) {
        $.ajax({
            type: 'PUT',
            url: 'https://tsg-dvds.herokuapp.com/dvd/' + $('#editId').val(),
            contentType: 'application/json',
            data: JSON.stringify({
                id: $('#editId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),

            success: function() {
                $('#errorMessage').empty();
                hideExceptFor('main');
                loadDvds();
            },

            error: function(xhr, status, error) {
                addError('Error calling web service.  Please try again later.');
            }
        });
    }
}

function isValidInput(input) {
    var isValid = true;
    $('errorMessage').empty();
    
    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            addError(errorField + ' ' + this.validationMessage);
            isValid = false;
        }
    })
    
    return isValid;
}

function addError(msg) {
    $('#errorMessage')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger mb-1'})
        .text(msg));
}
