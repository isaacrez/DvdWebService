
$(document).ready(function() {
    hideExceptFor('main');
    loadDvds();
});

function hideExceptFor(name) {
    hideables = ['main', 'edit'];
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
                entry += '<td><button class="btn btn-primary" onclick="showEdit(' + dvd.id + ')">Edit</button></td>';
                entry += '<td><button class="btn btn-danger">Delete</button></td>';
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
    
}

function addError(msg) {
    $('#errorMessage')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text(msg));
}