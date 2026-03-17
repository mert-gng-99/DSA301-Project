d3.select('#datavis_header')
.style('color', 'red')
.text('Turkish Census - Population & Socioeconomic Indicators');

const margin = {top :20, bottom: 50, left:60, right:80};
const width = 800 - margin.left - margin.right;
const height = 450 - margin.top -margin.bottom;

const svg = d3.select('#chart')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('./dataset.csv').then(data => {

  console.log(data);

  const cities = [...new Set(data.map(d => d.city))];

  const nationalData = data
  .filter(d => d.unemployment !== "")
  .filter(d => d.city === 'Istanbul')
  .sort((a, b) => +a.year - +b.year);

  const color = d3.scaleOrdinal()
  .domain(cities)
  .range(['steelblue', 'orange', 'green', 'red', 'purple', 'brown']);

  const x = d3.scaleLinear()
  .domain([1927, 2024])
  .range([0, width]);

  const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => +d.population)])
  .range([height, 0]);

  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickFormat(d3.format('d')));

  svg.append('g')
  .call(d3.axisLeft(y).tickFormat(d => d / 1000000 + 'M'));

  svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 40)
  .attr('text-anchor', 'middle')
  .text('Year');

  svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -50)
  .attr('text-anchor', 'middle')
  .text('Population');

  cities.forEach(city => {
    const cityData = data
    .filter(d => d.city === city)
    .sort((a, b) => +a.year - +b.year);

    const line = d3.line()
    .x(d => x(+d.year))
    .y(d => y(+d.population));

    svg.append('path')
    .datum(cityData)
    .attr('fill', 'none')
    .attr('stroke', color(city))
    .attr('stroke-width', 2)
    .attr('d', line);

    const last = cityData[cityData.length - 1];
    svg.append('text')
    .attr('x', x(+last.year) + 5)
    .attr('y', y(+last.population))
    .attr('fill', color(city))
    .style('font-size', '11px')
    .text(city);
  });

  const margin2 = {top :20, bottom: 50, left:60, right:20};
  const width2 = 800 - margin2.left - margin2.right;
  const height2 = 300 - margin2.top -margin.bottom;

  const svg2 = d3.select('#chart2')
  .attr('width', width2 + margin2.left + margin2.right)
  .attr('height', height2 + margin2.top + margin2.bottom)
  .append('g')
  .attr('transform', `translate(${margin2.left}, ${margin2.top})`);

  const x2 = d3.scaleLinear()
  .domain([2007, 2024])
  .range([0, width2]);

  const y2 = d3.scaleLinear()
  .domain([0, 16])
  .range([height2, 0]);

  svg2.append('g')
  .attr('transform', `translate(0, ${height2})`)
  .call(d3.axisBottom(x2).tickFormat(d3.format('d')));

  svg2.append('g')
  .call(d3.axisLeft(y2).tickFormat(d => d + '%'));

  svg2.append('text')
  .attr('x', width2 / 2)
  .attr('y', height2 + 40)
  .attr('text-anchor', 'middle')
  .text('Year');

  svg2.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height2 / 2)
  .attr('y', -50)
  .attr('text-anchor', 'middle')
  .text('Unemployment Rate (%)');

  const line2 = d3.line()
  .x(d => x2(+d.year))
  .y(d => y2(+d.unemployment));

  svg2.append('path')
  .datum(nationalData)
  .attr('fill', 'none')
  .attr('stroke', 'orange')
  .attr('stroke-width', 2.5)
  .attr('d', line2);

  svg2.selectAll('circle')
  .data(nationalData)
  .enter()
  .append('circle')
  .attr('cx', d=> x2(+d.year))
  .attr('cy', d=> y2(+d.unemployment))
  .attr('r', 4)
  .attr('fill', 'orange');

  const margin3 = {top :20, bottom: 50, left:60, right:20};
  const width3 = 800 - margin3.left - margin3.right;
  const height3 = 300 - margin3.top -margin.bottom;

  const svg3 = d3.select('#chart3')
  .attr('width', width3 + margin3.left + margin3.right)
  .attr('height', height3 + margin3.top + margin3.bottom)
  .append('g')
  .attr('transform', `translate(${margin3.left}, ${margin3.top})`);

  const x3 = d3.scaleLinear()
  .domain([2007, 2024])
  .range([0, width3]);

  const y3 = d3.scaleLinear()
  .domain([1, 2.5])
  .range([height3, 0]);

  svg3.append('g')
  .attr('transform', `translate(0, ${height3})`)
  .call(d3.axisBottom(x3).tickFormat(d3.format('d')));

  svg3.append('g')
  .call(d3.axisLeft(y3));

  svg3.append('text')
  .attr('x', width3 / 2)
  .attr('y', height3 + 40)
  .attr('text-anchor', 'middle')
  .text('Year');

  svg3.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height3 / 2)
  .attr('y', -50)
  .attr('text-anchor', 'middle')
  .text('Total Fertility Rate');

  svg3.append('line')
  .attr('x1', 0)
  .attr('x2', width3)
  .attr('y1', y3(2.1))
  .attr('y2', y3(2.1))
  .attr('stroke', 'gray')
  .attr('stroke-dasharray', '5,5')
  .attr('stroke-width', 1);

  svg3.append('text')
  .attr('x', width3 - 5)
  .attr('y', y3(2.1) - 5)
  .attr('text-anchor', 'end')
  .style('font-size', '10px')
  .attr('fill', 'gray')
  .text('replacement level (2.1)');

  const line3 = d3.line()
  .x(d => x3(+d.year))
  .y(d => y3(+d.fertility));

  svg3.append('path')
  .datum(nationalData)
  .attr('fill', 'none')
  .attr('stroke', 'green')
  .attr('stroke-width', 2.5)
  .attr('d', line3);

  svg3.selectAll('circle')
  .data(nationalData)
  .enter()
  .append('circle')
  .attr('cx', d=> x3(+d.year))
  .attr('cy', d=> y3(+d.fertility))
  .attr('r', 4)
  .attr('fill', 'green');

});
