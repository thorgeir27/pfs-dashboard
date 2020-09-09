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

    let mb30 = {
        x:[],
        y:[],
        name: '30 Mb/s',
        type: 'bar',
        marker: {color: blue}
    };

    let mb100 = {
        x:[],
        y:[],
        name: '100 Mb/s',
        type: 'bar',
        marker: {color: green}
    };

    let mb1000 = {
        x:[],
        y:[],
        name: '1000 Mb/s',
        type: 'bar',
        marker: {color: mustard}
    };

    let ljos = {
        x:[],
        y:[],
        name: 'Ljósleiðari',
        type: 'bar',
        marker: {color: red}
    };

    let data = [mb30, mb100, mb1000, ljos];

    let svf;
    let svfComp;
    for (let i = 2;i < svfSelected.length;i++) {
        if (svfSelected[i].checked) {
            svf = svfSelected[i].id;
            svfComp = svfData.filter(x => (x.sveitarfelag == svf))[0];

            if (gognSelected[0].checked) {
                data[0].x.push(svf);
                data[0].y.push((svfComp.d_30 + svfComp.t_30)/(svfComp.thettbyli_fjoldi + svfComp.dreifbyli_fjoldi)*100);
            }
        }
    }

    console.log(data);


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
