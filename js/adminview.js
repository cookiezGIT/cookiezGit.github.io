/**
 * Created by Renzo on 29/09/2016.
 */
var $TABLE = $('#table');
var $BTN = $('#sub');
var $EXPORT = $('#export');
$('.table-add').click(function () {
    var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
    $TABLE.find('table').append($clone);
});
$('.table-remove').click(function () {
    $(this).parents('tr').detach();
});
$('.table-up').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === 1)
        return;
    $row.prev().before($row.get(0));
});
$('.table-down').click(function () {
    var $row = $(this).parents('tr');
    $row.next().after($row.get(0));
});
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;
$BTN.click(function () {
    var $rows = $TABLE.find('tr:not(:hidden)');
    var headers = [];
    var data = [];
    $($rows.shift()).find('th:not(:empty)').each(function () {
        headers.push($(this).text().toLowerCase());
    });
    $rows.each(function () {
        var $td = $(this).find('td');
        var h = {};
        headers.forEach(function (header, i) {
            h[header] = $td.eq(i).text();
        });
        data.push(h);
    });
    $EXPORT.text(JSON.stringify(data));
});
//# sourceURL=pen.js