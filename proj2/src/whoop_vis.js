d3.select('#datavis_header')
.style('color', '#2f466b')
.text('WHOOP Health Dashboard - D3 Visualization');

const margin = {top: 40, bottom: 60, left: 70, right: 30};
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
.attr('height', 320)
.append('g')
.attr('transform', `translate(${margin.left}, 20)`);

d3.csv('./src/whoop_fitness_dataset_100k.csv').then(data => {

  // take 125 rows from each fitness level so all collors apear
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];
  let balanced = [];
  levels.forEach(lv => {
    balanced = balanced.concat(data.filter(d => d.fitness_level === lv).slice(0, 125));
  });
  data = balanced;

  data.forEach(d => {
    d.recovery_score = +d.recovery_score;
    d.sleep_hours = +d.sleep_hours;
    d.hrv = +d.hrv;
    d.day_strain = +d.day_strain;
  });

  const colorScale = d3.scaleOrdinal()
  .domain(['Beginner', 'Intermediate', 'Advanced', 'Elite'])
  .range(['#e74c3c', '#f39c12', '#3498db', '#2ecc71']);

  const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.sleep_hours)])
  .range([0, width]);

  const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x));

  svg.append('g')
  .call(d3.axisLeft(y));

  svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 45)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .style('fill', '#444')
  .text('Sleep Hours');

  svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -55)
  .attr('text-anchor', 'middle')
  .style('font-size', '13px')
  .style('fill', '#444')
  .text('Recovery Score');

  svg.append('text')
  .attr('x', width / 2)
  .attr('y', -15)
  .attr('text-anchor', 'middle')
  .style('font-size', '15px')
  .style('font-weight', 'bold')
  .style('fill', '#2f466b')
  .text('Recovery Score vs Sleep Hours');

  svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => x(d.sleep_hours))
  .attr('cy', d => y(d.recovery_score))
  .attr('r', 5)
  .attr('fill', d => colorScale(d.fitness_level))
  .attr('opacity', 0.6)
  .on('mouseover', (event, d) => {
    tooltip.transition().duration(200).style('opacity', 1);
    tooltip.html(
      `<strong>${d.fitness_level}</strong><br>` +
      `Recovery: ${d.recovery_score}<br>` +
      `Sleep: ${d.sleep_hours}h<br>` +
      `HRV: ${d.hrv}`
    )
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 20) + 'px');
  })
  .on('mouseout', () => {
    tooltip.transition().duration(300).style('opacity', 0);
  });

  const levelList = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];
  levelList.forEach((level, i) => {
    svg.append('circle')
    .attr('cx', width - 100).attr('cy', 20 + i * 20)
    .attr('r', 6).attr('fill', colorScale(level));
    svg.append('text')
    .attr('x', width - 90).attr('y', 24 + i * 20)
    .text(level).style('font-size', '11px').style('fill', '#333');
  });

  d3.csv('./src/whoop_fitness_dataset_100k.csv').then(fullData => {

    fullData.forEach(d => {
      d.recovery_score = +d.recovery_score;
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const avgByDay = days.map(day => {
      const filtered = fullData.filter(d => d.day_of_week === day);
      const avg = filtered.length > 0
        ? filtered.reduce((sum, d) => sum + d.recovery_score, 0) / filtered.length
        : 0;
      return {day: day.slice(0, 3), avg: avg};
    });

    const bx = d3.scaleBand()
    .domain(avgByDay.map(d => d.day))
    .range([0, width])
    .padding(0.25);

    const minAvg = d3.min(avgByDay, d => d.avg);
    const maxAvg = d3.max(avgByDay, d => d.avg);
    const padding = (maxAvg - minAvg) * 0.5 || 1;

    const by = d3.scaleLinear()
    .domain([minAvg - padding, maxAvg + padding])
    .range([250, 0]);

    svgBar.append('g')
    .attr('transform', 'translate(0, 250)')
    .call(d3.axisBottom(bx));

    svgBar.append('g')
    .call(d3.axisLeft(by).tickFormat(d => d.toFixed(2)));

    const barColor = d3.scaleLinear()
    .domain([minAvg, maxAvg])
    .range(['#e74c3c', '#2ecc71']);

    svgBar.selectAll('rect')
    .data(avgByDay)
    .enter()
    .append('rect')
    .attr('x', d => bx(d.day))
    .attr('y', d => by(d.avg))
    .attr('width', bx.bandwidth())
    .attr('height', d => 250 - by(d.avg))
    .attr('fill', d => barColor(d.avg))
    .attr('opacity', 0.85);

    svgBar.append('text')
    .attr('x', width / 2)
    .attr('y', 285)
    .attr('text-anchor', 'middle')
    .style('font-size', '13px')
    .style('font-weight', 'bold')
    .style('fill', '#2f466b')
    .text('Average Recovery Score by Day of Week');

    svgBar.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -125)
    .attr('y', -55)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .text('Avg Recovery');
  });
});
