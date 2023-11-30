export const lineHoverPlugin = {
  id: 'corsair',
  defaults: {
    width: 10,
    color: '#d4d4d440',
    dash: [0, 0],
  },
  afterInit: (chart: any, args: any, opts: any) => {
    chart.corsair = {
      x: 0,
      y: 0,
    };
  },
  afterEvent: (chart: any, args: any) => {
    const { inChartArea } = args;
    const { x, y } = args.event;

    chart.corsair = { x, y, draw: inChartArea };
    chart.draw();
  },
  beforeDatasetsDraw: (chart: any, args: any, opts: any) => {
    const { ctx } = chart;
    const { top, bottom, left, right } = chart.chartArea;
    const { x, y, draw } = chart.corsair;
    if (!draw) return;

    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = opts.width;
    ctx.strokeStyle = opts.color;
    ctx.setLineDash(opts.dash);
    ctx.moveTo(x, bottom);
    ctx.lineTo(x, top);
    ctx.stroke();

    ctx.restore();
  },
};
