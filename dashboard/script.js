//TESTER = document.getElementById('tester');
TESTER = $('#tester')[0];

Plotly.plot(TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
}], {
    margin: {
        t: 0
    }
}, {
    showSendToCloud: true
});

function asdf() {
    console.log('f');
}
