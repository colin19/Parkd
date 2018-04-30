import React, {Component} from 'react';

import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import * as d3 from "d3";
import 'd3-transition';
import 'd3-fetch';

import data from './HomeSweHome.json';
import './BubbleChart.css';
import imgBg from '../../images/search/bg.png';


export default class BubbleVisualization extends Component {
    componentDidMount() {
        /* D3 code to append elements to this.svg */
        let svg = d3.select("svg"),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        let color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        let pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        let root = d3.hierarchy(data)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });

        let focus = root,
            nodes = pack(root).descendants(),
            view;

        let circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
            .style("fill", function(d) { return d.children ? color(d.depth) : null; })
            .on("click", function(d) { if (focus !== d) zoom(d); d3.event.stopPropagation(); });

        // eslint-disable-next-line
        let text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
            .text(function(d) { return d.data.name; });

        let node = g.selectAll("circle,text");

        svg
            .style("background", color(-1))
            .on("click", function() { zoom(root); });

        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            // eslint-disable-next-line
            let focus0 = focus; focus = d;

            let transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
                .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }

        function zoomTo(v) {
            let k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });
        }

    }

    shouldComponentUpdate() {
        return false; // This prevents future re-renders of this component
    }

    render() {
        return (
            <div className={'svg-container'}>
                <IntroHeader bgUrl={imgBg}
                             description={'Data Visualization of group Home SWEet Home'}
                             title={'Visualization'}/>
                <br/><br/>

                <svg width="800" height="800"></svg>

                <Footer/>
            </div>
        );
    };
}