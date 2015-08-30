/**
 * Created by tujiaw on 15/8/29.
 */
$(function() {
    $('.dropdown-toggle').dropdown().on("click", function(data) {
        var text = $(this).text();
        $('#categoryMenu').text(text);
        $('#inputCategory').val(text);
    });
});