var JAMS = JAMS || {};
JAMS.Cluster = function(initialCenter, tag) {
    this.data = [];
    this.center = initialCenter || null;
    this.color = Math.floor(Math.random() * 0xFFFFFF);
    this.tag = tag || _.uniqueId('cluster_');
};

// ctor
JAMS.Cluster.prototype.constructor = JAMS.Cluster;

/**
 * Append a point to the cluster.
 * @param {JAMS.Point} p the point to append.
 */
JAMS.Cluster.prototype.Append = function(p) {
    if(this.center === null) this.center = p;
    this.data.push(p);
};

/**
 * Clear the cluster of all its data.
 */
JAMS.Cluster.prototype.Clear = function() {
    this.data = [];
    this.center = null;
};

JAMS.Cluster.prototype.SetCenter = function(center) {
    this.center = center;
};

Object.defineProperty(JAMS.Cluster.prototype, "size", {
    get: function() { return this.data.length; }
});
JAMS.Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

JAMS.Point.prototype.constructor = JAMS.Point;

/**
 * Calculate the distance between two points
 * @param {JAMS.Point} a    the first point
 * @param {JAMS.Point} b    the second point
 */
JAMS.Point.Distance = function(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
};

/**
 * Calculate the distance between this point and another point.
 * @param {JAMS.Point} other    the point to calculate the distance to.
 */
JAMS.Point.prototype.DistanceTo = function(other) {
    var dx = this.x - other.x,
        dy = this.y - other.y;

    return Math.sqrt(dx*dx + dy*dy);
};

JAMS.Point.prototype.ToArray = function() {
    return [this.x, this.y];
};
JAMS.Toolbelt = {
    RandomColor: function() {
        return Math.floor(Math.random() * 0xFFFFFF);
    },

    // CreateID: function() {
    //     var result = (new Date()).toString(16);
    //     result += (Math.random() * 100000000 | 0).toString(16);
    //     return result;
    // }

    Polygon: function(d) {
        return "M" + d.join("L") + "Z";
    }
};
// TODO: General interface for algorithms to implement
JAMS.SequentialLloyds = function(k, metric, tag) {
    this.k = k || 3;
    this.clusters = [];
    this.metric = metric || JAMS.SequentialLloyds.defaultObjective;
    this.tag = tag || _.uniqueId('seq_kmeans_');
};

JAMS.SequentialLloyds.prototype.constructor = JAMS.SequentialLloyds;
JAMS.SequentialLloyds.defaultObjective = JAMS.Point.Distance;

/**
 * Reveal a point to the algorithm.
 * @param {JAMS.Point} point    the new point.
 *
 * @return {int} Index of the closest center.
 */
JAMS.SequentialLloyds.prototype.Reveal = function(point) {
    //~ The first k points are the initial centers.
    if(this.clusters.length < this.k) {
        this.clusters.push(new JAMS.Cluster(point));
        return this.clusters.length - 1;
    }

    //~ Find the cluster with the closest/optimal center.
    var best = 0, test = 0;
    var cost = this.metric(this.clusters[0].center, point);

    for(var i = this.k - 1; i > 0; i--) {
        test = this.metric(this.clusters[i].center, point);

        if(test < cost) {
            best = i;
            cost = test;
        }
    }

    //~ Add point and up centers.
    this.clusters[best].Append(point);
    var size = this.clusters[best].size + 1;
    var old = this.clusters[best].center;
    var result = new JAMS.Point();
    result.x = old.x + (point.x - old.x) / size;
    result.y = old.y + (point.y - old.y) / size;

    this.clusters[best].SetCenter(result);

    return best;
};

/**
 * Reset this instance, clearing all associated data.
 */
JAMS.SequentialLloyds.prototype.Reset = function() {
    this.clusters = [];
};

Object.defineProperty(JAMS.SequentialLloyds.prototype, "centers", {
    get: function() {
        var centers = [];

        for (var i = this.clusters.length - 1; i >= 0; i--) {
            centers.push(this.clusters[i].center);
        }

        return centers;
    }
});
JAMS.IncrementalDemo = function(args) {
    _.defaults(args, {
        //~ Render attributes
        width: 960,
        height: 500,
        colors: d3.scale.category20(),

        pointStyle: {
            cx: function(d){ return d.x; },
            cy: function(d){ return d.y; },
            fill: function(d, i) { return 'rgb(200,200,200);'; },
            r: 5,
        },

        centerStyle: {
            cx: function(d){ return d.x; },
            cy: function(d){ return d.y; },
            fill: 'red',
            r: 5
        },

        //~ DOM elements
        container: '#content',
        start: '#start',
        reset: '#reset',
        clear: '#clear',

        //~ Convenience
        initial: [],
        centers: [],
    });

    this.data = args.initial;
    this.centers = args.centers;

    this.colors = args.colors;
    this.pointStyle = args.pointStyle;

    this.pointOnPoint = false;

    //~ Create SVG
    this.svg = d3.select(args.container).append('svg')
                 .attr('width', args.width)
                 .attr('height', args.height);

    //~ Create voronoi regions.
    this.voronoi = d3.geom.voronoi()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
           .clipExtent([[0, 0], [args.width, args.height]]);

    this.path = this.svg.append("g").selectAll("path");

    //~ Capture buttons
    this.buttons = {
        start: d3.select(args.start),
        reset: d3.select(args.reset),
        clear: d3.select(args.clear),
    };

    //~ Attach listeners
    var self = this;
    this.svg.on('click', function() { self.CreatePoint(d3.mouse(this)); });
    this.buttons.start.on('click', function() { self.Start(); } );
    this.buttons.reset.on('click', function() { self.Reset(); } );
    this.buttons.clear.on('click', function() { self.Clear(); } );

    this.listeners = {
        'click': [],
        'start': [],
        'reset': [],
        'clear': [],
        'redraw': []
    };

    this.Redraw();
};


JAMS.IncrementalDemo.prototype = {
    /**
     * Notify listeners.
     *
     * @param  {String} event   name of the event
     * @param  {Array} args     event arguments
     */
    _fireEvent: function(event, args) {
        var obs = this.listeners[event];
        for (var i = obs.length - 1; i >= 0; i--) {
            obs[i](args);
        }
    },

    /**
     * Add a new point to the svg.
     *
     * @param {Array} coord     array cointaining [x, y] value on svg.
     */
    CreatePoint: function(coord) {
        var point = new JAMS.Point(coord[0], coord[1]);
        this.data.push(point);

        //~ Notify observers and redraw
        this._fireEvent('click', coord);
        this.Redraw();
    },

    /**
     * Run the demo.
     */
    Start: function() {
        console.warn('TODO: Start');
        this.buttons.reset.attr('disabled', null);

        this._fireEvent('start');
    },

    /**
     * Reset the demo.
     */
    Reset: function() {
        console.warn('TODO: Reset');
        this.buttons.start.attr('disabled', null);
        this.buttons.reset.attr('disabled', true);
        this._fireEvent('reset');

        this.Redraw();
    },

    /**
     * Clear the canvas of all graphics.
     */
    Clear: function() {
        console.warn('TODO: Clear');
    },

    /**
     * Redraw the canvas.
     */
    Redraw: function() {
        //~ Update points.
        var points = this.svg.selectAll('.points').data(this.data);
        var self = this;
        points.enter()
            .append('circle')
                .attr(this.pointStyle)
                // .attr('visited', function(d, i){ return d.x % 2 == 0; })
                .classed('points', true);

        points.exit().remove();

        //~ Update centers.
        var path = this.path.data(this.voronoi(this.centers), this.Polygon);
        var colors = this.colors;

        path.exit().remove();
        path.enter().append('path')
            .attr('fill', function(d,i) { return colors(i); })
            .attr('class', function(d, i) { return 'q' + (i % 9) + '-9'; })
            .attr('d', this.Polygon);

        path.order();
        this.path = path || this.svg.append("g").selectAll("path");

        this._fireEvent('redraw');
    },

    Polygon: function(d) {
        if(d !== undefined) {
            return "M" + d.join("L") + "Z";
        }
    },

    on: function(event, listener) {
        if(_.indexOf(_.keys(this.listeners), event) < 0) {
            console.warn(event + ' is not a valid event name!', _.keys(this.listeners));
            return;
        }

        this.listeners[event].push(listener);
    }
};

JAMS.IncrementalDemo.prototype.constructor = JAMS.Demo;
