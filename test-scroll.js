const colors = ['#040013', '#0048ff', '#8705f2', '#f501d3', '#0048ff', '#8705f2', '#f501d3', '#040013'];
const step = 1 / (colors.length - 1);
const points = colors.map((_, i) => i * step);
console.log(points);
