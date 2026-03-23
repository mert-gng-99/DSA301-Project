d3.select('#datavis_header')
.style('color', '#2f466b')
.text('Japan Inbound Immigration - V2 (Improved)');

const margin = {top: 40, bottom: 60, left: 90, right: 30};
const width = 760 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const svg = d3.select('#chart')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select('body')
.append('div')
.style('position', 'absolute')
.style('background', 'rgba(0,0,0,0.75)')
.style('color', 'white')
.style('padding', '6px 10px')
.style('border-radius', '5px')
.style('font-size', '12px')
.style('pointer-events', 'none')
.style('opacity', 0);

const svgBar = d3.select('body')
.append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', 300)
.append('g')
.attr('transform', `translate(${margin.left}, 20)`);

d3.select('body')
.insert('div', '#chart')
.attr('id', 'controls')
.style('text-align', 'center')
.style('margin', '10px')
.html(`<label style="font-size:14px; font-weight:bold;">Select Year: 
  <select id="yearSelect" style="font-size:14px; padding:4px;">
    <option value="1980">1980</option>
    <option value="1985">1985</option>
    <option value="1990">1990</option>
    <option value="1995">1995</option>
    <option value="2000">2000</option>
    <option value="2005" selected>2005</option>
  </select>
</label>`);

d3.csv('./src/japan_immigration_statistics_inbound.csv').then(data => {

  data.forEach(d => {
    d.year = +d.year;
    d.total = +d.total || 0;
    d.asia = +d.asia || 0;
    d.europe = +d.europe || 0;
    d.north_america = +d.north_america || 0;
    d.south_korea = +d.south_korea || 0;
    d.china = +d.china || 0;
    d.taiwan = +d.taiwan || 0;
    d.united_states = +d.united_states || 0;
    d.philippines = +d.philippines || 0;
    d.thailand = +d.thailand || 0;
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
  .call(d3.axisLeft(y).tickFormat(d => (d / 1000000).toFixed(1) + 'M'));

  svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 45)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .style('fill', '#444')
  .text('Year');

  svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -75)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .style('fill', '#444')
  .text('Total Arrivals');

  // total line is thicker then others so it stand out
  const regions = [
    {key: 'total', label: 'Total', color: '#333'},
    {key: 'asia', label: 'Asia', color: 'steelblue'},
    {key: 'north_america', label: 'N. America', color: 'green'},
    {key: 'europe', label: 'Europe', color: 'orange'}
  ];

  regions.forEach(r => {
    const lineFn = d3.line()
    .x(d => x(d.year))
    .y(d => y(d[r.key]));

    svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', r.color)
    .attr('stroke-width', r.key === 'total' ? 2.5 : 1.5)
    .attr('d', lineFn);
  });

  svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => x(d.year))
  .attr('cy', d => y(d.total))
  .attr('r', 4)
  .attr('fill', '#333')
  .attr('opacity', 0.7)
  .on('mouseover', (event, d) => {
    tooltip.transition().duration(200).style('opacity', 1);
    tooltip.html(`<strong>${d.year}</strong><br>Total: ${d3.format(',')(d.total)}`)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 20) + 'px');
  })
  .on('mouseout', () => {
    tooltip.transition().duration(300).style('opacity', 0);
  });

  regions.forEach((r, i) => {
    svg.append('line')
    .attr('x1', width - 120).attr('x2', width - 100)
    .attr('y1', 15 + i * 20).attr('y2', 15 + i * 20)
    .attr('stroke', r.color).attr('stroke-width', 2);
    svg.append('text')
    .attr('x', width - 95).attr('y', 19 + i * 20)
    .text(r.label).style('font-size', '11px').style('fill', '#333');
  });

  function updateBarChart(selectedYear) {
    const yearData = data.filter(d => d.year === selectedYear)[0];
    if (!yearData) return;

    const countries = [
      {name: 'S. Korea', value: yearData.south_korea},
      {name: 'Taiwan', value: yearData.taiwan},
      {name: 'USA', value: yearData.united_states},
      {name: 'China', value: yearData.china},
      {name: 'Philippines', value: yearData.philippines},
      {name: 'Thailand', value: yearData.thailand}
    ].sort((a, b) => b.value - a.value);

    svgBar.selectAll('*').remove();

    const bx = d3.scaleBand()
    .domain(countries.map(d => d.name))
    .range([0, width])
    .padding(0.25);

    const by = d3.scaleLinear()
    .domain([0, d3.max(countries, d => d.value)])
    .range([240, 0]);

    svgBar.append('g')
    .attr('transform', 'translate(0, 240)')
    .call(d3.axisBottom(bx));

    svgBar.append('g')
    .call(d3.axisLeft(by).tickFormat(d => (d / 1000) + 'K'));

    svgBar.selectAll('rect')
    .data(countries)
    .enter()
    .append('rect')
    .attr('x', d => bx(d.name))
    .attr('y', d => by(d.value))
    .attr('width', bx.bandwidth())
    .attr('height', d => 240 - by(d.value))
    .attr('fill', 'steelblue')
    .attr('opacity', 0.8);

    svgBar.append('text')
    .attr('x', width / 2)
    .attr('y', 275)
    .attr('text-anchor', 'middle')
    .style('font-size', '13px')
    .text(`Top Countries in ${selectedYear}`);
  }

  updateBarChart(2005);

  d3.select('#yearSelect').on('change', function() {
    updateBarChart(+this.value);
  });

});
