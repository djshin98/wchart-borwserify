var { MyChart, getColor } = require('./mychart');

var $ = require("jquery");

function isBrowser() { return window ? true : false; };

if (isBrowser()) {
    $("#id").html("");
} else {
    console.log("id add");
}
/* type을 반드시 넣어야함, 안넣으면 안나옴 */

global.chart = new MyChart({
    id: 'myChart'
});

chart.setData([
    { name: 'Math', value: 50 },
    { name: 'Korean', value: 77 },
    { name: 'Engish', value: 30 },
    { name: 'Science', value: 70 },
    { name: 'History', value: 80 },
    { name: 'Music', value: 90 }
]);