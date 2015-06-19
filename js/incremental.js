var DEMO_WIDTH = 960,
    DEMO_HEIGHT = 500;

var MIN_CLUSTERS = 2,
    MAX_CLUSTERS = 100,
    DEFAULT_K = 3;


//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

window.onload = function() {
    console.info("init");

    var algo = new JAMS.SequentialLloyds(DEFAULT_K);

    var demo = new JAMS.IncrementalDemo({
        width:DEMO_WIDTH,
        height:DEMO_HEIGHT
    });

    demo.on('click', function(args) {
        console.log("Got ", args);
    });

    demo.on('redraw', function() {
        d3.selectAll('circle').on('click', function() {
            d3.event.stopPropagation();
            var el = d3.select(this);
            if(el.attr('fill') !== 'rgb(200,200,200);')
                return;


            if(!d3.select('#start').attr('disabled')) {
                d3.select('#start').attr('disabled', true);
                d3.select('#reset').attr('disabled', null);
                d3.select('#next').attr('disabled', null);
            }

            var best = algo.Reveal(new JAMS.Point(Number.parseFloat(el.attr('cx')), Number.parseFloat(el.attr('cy'))));
            el.attr('fill', demo.colors(best));
            demo.centers = algo.centers;
            demo.Redraw();
        });
    });

    demo.on('start', function() {
        d3.select('#next').attr('disabled', null);
    });

    demo.on('reset', function() {
        d3.select('#next').attr('disabled', true);

        console.info('yo', algo);
        d3.selectAll('circle').attr('fill', 'rgb(200,200,200);');
        algo.Reset();
        demo.centers = [];
    });

    d3.select('#next').on('click', function() {
        console.log("TESTTTTTT!");
        // algo.Reveal()
    });

}