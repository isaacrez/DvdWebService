
$(document).ready(function() {
    loadDvds();
})

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
                entry += '<td><button class="btn btn-primary">Edit</button></td>'
                entry += '<td><button class="btn btn-danger">Delete</button></td>'
                entry += '</tr>';
                
                dvdRows.append(entry);
            });
        },
        error: function() {
            addError('Could not communicate with database.  Try again later.');
        }
    })    
}

function addError(msg) {
    $('#errorMessage')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text(msg));
}
