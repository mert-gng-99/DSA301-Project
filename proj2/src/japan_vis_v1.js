d3.select('#datavis_header')
.style('color', '#2f466b')
.text('Japan Inbound Immigration - V1');

const margin = {top: 40, bottom: 60, left: 80, right: 30};
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('#chart')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('./src/japan_immigration_statistics_inbound.csv').then(data => {

  data.forEach(d => {
    d.year = +d.year;
    d.total = +d.total;
    d.asia = +d.asia || 0;
    d.north_america = +d.north_america || 0;
  });

  const x = d3.scaleLinear()
  .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
  .range([0, width]);

  const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.total)])
  .range([height, 0]);

  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickFormat(d3.format('d')));

  svg.append('g')
  .call(d3.axisLeft(y).tickFormat(d => d / 1000000 + 'M'));

  // three diffrent line for total asia and north america
  const line = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.total));

  svg.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 2)
  .attr('d', line);

  const lineAsia = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.asia));

  svg.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', 'orange')
  .attr('stroke-width', 2)
  .attr('d', lineAsia);

  const lineNA = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.north_america));

  svg.append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('d', lineNA);

  svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => x(d.year))
  .attr('cy', d => y(d.total))
  .attr('r', 3)
  .attr('fill', 'steelblue')
  .attr('opacity', 0.7);

  svg.selectAll('.circle-asia')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'circle-asia')
  .attr('cx', d => x(d.year))
  .attr('cy', d => y(d.asia))
  .attr('r', 2)
  .attr('fill', 'orange')
  .attr('opacity', 0.6);

  svg.selectAll('.circle-na')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'circle-na')
  .attr('cx', d => x(d.year))
  .attr('cy', d => y(d.north_america))
  .attr('r', 2)
  .attr('fill', 'green')
  .attr('opacity', 0.6);

  svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 45)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .text('Year');

  svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -65)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .text('Number of People');

  svg.append('circle').attr('cx', width - 150).attr('cy', 20).attr('r', 6).style('fill', 'steelblue');
  svg.append('text').attr('x', width - 140).attr('y', 24).text('Total').style('font-size', '12px');

  svg.append('circle').attr('cx', width - 150).attr('cy', 40).attr('r', 6).style('fill', 'orange');
  svg.append('text').attr('x', width - 140).attr('y', 44).text('Asia').style('font-size', '12px');

  svg.append('circle').attr('cx', width - 150).attr('cy', 60).attr('r', 6).style('fill', 'green');
  svg.append('text').attr('x', width - 140).attr('y', 64).text('N. America').style('font-size', '12px');

});
