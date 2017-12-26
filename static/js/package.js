
// 排序
function paixu() {
    var $tr = $(".tbody").find('tr');

    var array = []; //[{index:0,age:12},{index:1,age:15}~~~]  
    $tr.each(function () {
        var obj = {};

        obj["index"] = $(this).index();
        obj["ID"] = $(this).children('td').eq(1).html();
        obj["age"] = $(this).children('td').eq(4).html();
        obj["cardtotal"] = $(this).children('td').eq(6).html();
        obj["WageTotal"] = $(this).children('td').eq(7).html();
        obj["wechat"] = $(this).children('td').eq(8).html();
        obj["telphone"] = $(this).children('td').eq(9).html();
        obj["time"] = $(this).children('td').eq(11).html();
        array.push(obj);
    });

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    $.each(array, function (i, elem) {
        console.log(array[i].age);
    });
    //排序  
    array.sort(sortBy);

    function sortBy(a, b) {

        return a.age - b.age;
    }
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    //删除旧数组生成新数组  
    // $('.tbody').empty().append($tr);  
    for (var i = 0; i < array.length; i++) {
        $('.tbody').append($tr.eq(array[i].index));
        console.log(array[i].index);
    }
}