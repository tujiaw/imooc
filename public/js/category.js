/**
 * Created by tujiaw on 15/8/30.
 */
$(function() {
    $('#addCategory').click(function(e) {
        var newCategoryName = $('#inputCategory').val().trim();
        if (newCategoryName.length > 0) {
            $.ajax({
                type: 'POST',
                url: '/admin/category/add',
                data: {
                    name: newCategoryName
                }
            }).done(function(results) {
                location.reload();
            });
        }
    });

    $('.del').click(function(e) {
        var target = $(e.target);
        var name = target.data('name');
        var tr = $('.item-name-' + name);
        $.ajax({
            type: 'DELETE',
            url: '/admin/category?name=' + name
        }).done(function(results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        });
    });
});