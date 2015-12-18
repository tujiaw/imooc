

var x = ['222', '333', '444', '555'];
var y = []
x.map(function(item) {
    y.push(item += 'xx');
});

console.log(y)