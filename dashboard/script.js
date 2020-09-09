//TESTER = document.getElementById('tester');
//TESTER = $('#svf-fastanet')[0];

//Plotly.plot(TESTER, [{
//    x: [1, 2, 3, 4, 5],
//    y: [1, 2, 4, 8, 10]
//}], {
//    margin: {
//        t: 0
//    }
//});

const pfsData = loadData();

const fastanetPlot = $('#svf-fastanet')[0];

const blue = '#416B99';
const green = '#4BB8AA';
const mustard = '#F3D48B';
const red = '#EB7253';
const yellow = '#DCEDC1';
const black = '#000000'


const blueT = 'rgba(65,107,153,.8)';
const blueD = 'rgba(65,107,153,.6)';
const greenT = 'rgba(75,184,170,.8)'
const greenD = 'rgba(75,184,170,.6)'
const mustardT = 'rgba(243,212,139,.8)'
const mustardD = 'rgba(243,212,139,.6)'
const redT = 'rgba(235,114,83,.8)'
const redD = 'rgba(235,114,83,.6)'
const yellowT = 'rgba(220,237,193,.8)'
const yellowD = 'rgba(220,237,193,.6)'


function sveitarfelog(event) {
    let svfData = pfsData.filter(x => (x.data == "sveitarfelog"));

    let svfSelected = $("#val_sveitarfelag")[0];
    let gognSelected = $("#val_gogn")[0];

    if (event.target.id == 'allt') {
        svfSelected[1].checked = false
        for (let i = 2;i < svfSelected.length; i++) {
            svfSelected[i].checked = true;
        }
    } else if (event.target.id == 'ekkert') {
        svfSelected[0].checked = false
        for (let i = 0;i < svfSelected.length; i++) {
            svfSelected[i].checked = false;
        }
        svfSelected[1].checked = true;
    } else {
        svfSelected[0].checked = false;
        svfSelected[1].checked = false;
    }

    let data = [
        new Trace('30 Mb/s', blue),
        new Trace('100 Mb/s', green),
        new Trace('1000 Mb/s', mustard),
        new Trace('Ljósleiðari', red),
        new Trace('30 Mb/sT', blueT),
        new Trace('30 Mb/sD', blueD),
        new Trace('100 Mb/sT', greenT),
        new Trace('100 Mb/sD', greenD),
        new Trace('1000 Mb/sT', mustardT),
        new Trace('1000 Mb/sF', mustardD),
        new Trace('LjósleiðariT', redT),
        new Trace('LjósleiðariD', redD)
        
    ];

    let svf;
    let svfComp;
    for (let i = 2;i < svfSelected.length;i++) {
        if (svfSelected[i].checked) {
            svf = svfSelected[i].id;
            svfComp = svfData.filter(x => (x.sveitarfelag == svf))[0];

            if (gognSelected[6].checked) {
                if (gognSelected[0].checked) {
                    data[4].x.push(svf);
                    data[4].y.push((svfComp.t_30/svfComp.thettbyli_fjoldi)*100);
                    data[5].x.push(svf);
                    data[5].y.push((svfComp.d_30/svfComp.dreifbyli_fjoldi)*100);
                }
                if (gognSelected[1].checked) {
                    data[6].x.push(svf);
                    data[6].y.push((svfComp.t_100/svfComp.thettbyli_fjoldi)*100);
                    data[7].x.push(svf);
                    data[7].y.push((svfComp.d_100/svfComp.dreifbyli_fjoldi)*100);
                    }
                if (gognSelected[2].checked) {
                    data[8].x.push(svf);
                    data[8].y.push((svfComp.t_1000/svfComp.thettbyli_fjoldi)*100);
                    data[9].x.push(svf);
                    data[9].y.push((svfComp.d_1000/svfComp.dreifbyli_fjoldi)*100);
                }
                if (gognSelected[3].checked) {
                    data[10].x.push(svf);
                    data[10].y.push((svfComp.t_ljos/svfComp.thettbyli_fjoldi)*100);
                    data[11].x.push(svf);
                    data[11].y.push((svfComp.d_ljos/svfComp.dreifbyli_fjoldi)*100);
                }
            } else {
                if (gognSelected[0].checked) {
                    data[0].x.push(svf);
                    data[0].y.push((svfComp.d_30 + svfComp.t_30)/(svfComp.thettbyli_fjoldi + svfComp.dreifbyli_fjoldi)*100);
                }
                if (gognSelected[1].checked) {
                    data[1].x.push(svf);
                    data[1].y.push((svfComp.d_100 + svfComp.t_100)/(svfComp.thettbyli_fjoldi + svfComp.dreifbyli_fjoldi)*100);
                }
                if (gognSelected[2].checked) {
                    data[2].x.push(svf);
                    data[2].y.push((svfComp.d_1000 + svfComp.t_1000)/(svfComp.thettbyli_fjoldi + svfComp.dreifbyli_fjoldi)*100);
                }
                if (gognSelected[3].checked) {
                    data[3].x.push(svf);
                    data[3].y.push((svfComp.d_ljos + svfComp.t_ljos)/(svfComp.thettbyli_fjoldi + svfComp.dreifbyli_fjoldi)*100);
                }

            }

        }
    }


    let layout = {barmode: 'group'}

    Plotly.newPlot($('#svf-fastanet')[0], data, layout)
}

function pieCharts() {
    let pieData = pfsData.filter(x => (x.data != "sveitarfelog"));
    let pieValues = [];

    pieData.forEach(x => {
        pieValues.push([x.hlutfall_tal*100, 100 - x.hlutfall_tal*100]);
        pieValues.push([x.hlutfall_hh*100, 100 - x.hlutfall_hh*100]);
    });

    

    Plotly.newPlot($('#pie-charts')[0], pData, pieLayout);
}


class Trace {
    constructor(name, clr) {
        this.x = [];
        this.y = [];
        this.name = name;
        this.type = 'bar';
        this.marker = {
            color: clr
        };

    }
}
