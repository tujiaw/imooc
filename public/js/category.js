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
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        $.ajax({
            type: 'DELETE',
            url: '/admin/category?id=' + id
        }).done(function(results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        });
    });
});