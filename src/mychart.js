var Chart = require('chart.js');

function rand() { return Math.random() * 255; }

function getColor(i) {
    return 'rgba(' + rand() + ', ' + rand() + ', ' + rand() + ', 1)';
}

class MyChart {
    constructor(options) {
        if (typeof(options.id) == "undefined") {
            console.error('id는 반드시 입력해야함 ');
            return;
        }
        this.options = Object.assign({
            type: 'radar',
            label: '기본 라벨'
        }, options);

        if (typeof(this.options.data) == "undefined") {
            this.setData(this.options.data);
        }
    }
    setData(data) {
        var ctx = document.getElementById(this.options.id);


        ctx.innerHTML = "";
        ctx.innerHTML = '<canvas id="' + this.options.id + '_graph"></canvas>';
        if (typeof(data) == "undefined" || data.length == 0) {

        } else {
            var graphCtx = document.getElementById(this.options.id + "_graph");
            this.destroy();
            this.options.data = Object.assign([], data);
            this.chart = new Chart(graphCtx, {
                type: this.options.type,
                data: {
                    labels: data.map(d => { return d.name; }),
                    datasets: [{
                        label: this.options.label,
                        data: data.map((d) => { return d.value }),
                        backgroundColor: data.map((d, i) => { return getColor(i); }),
                        borderColor: data.map((d, i) => { return getColor(i); }),
                        borderWidth: 1
                    }]
                },

                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }

    }
    addData(label, data) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        this.options.data.push({ name: label, value: data });
        this.chart.update();
    }

    removeData() {
        this.chart.data.labels.pop();
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        this.options.data.pop();
        this.chart.update();
    }
    setType(type) {
        this.options.type = type;
        this.setData(this.options.data);
    }
    destroy() {
        if (typeof(this.chart) != "undefined") {
            this.chart.destroy();
            this.chart = undefined;
        }
    }
};

module.exports = { MyChart: MyChart, getColor: getColor };