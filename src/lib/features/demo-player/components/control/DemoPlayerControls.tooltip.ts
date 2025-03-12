import type { Chart, Point, ScriptableTooltipContext } from 'chart.js';
import { findLastLowerIndex, tickToTime } from '../../utils';

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode!.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = '1';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.zIndex = '1000';
    tooltipEl.style.display = 'flex';
    tooltipEl.style.flexDirection = 'column';
    tooltipEl.style.alignItems = 'center';

    chart.canvas.parentNode!.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler =
  (onTickChange: (tick: number) => void) =>
  (context: ScriptableTooltipContext<'scatter'>) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    const scale = chart.scales['x'];
    const waveStartTick = scale.min;
    const selectedTick = Math.round(
      scale.getValueForPixel((chart as any).corsair.x) || 0
    );

    onTickChange(selectedTick);

    // Set Text
    if (tooltip.body) {
      const timer = document.createElement('div');
      timer.style.fontWeight = 'bold';

      const div = document.createElement('div');
      div.appendChild(
        document.createTextNode(tickToTime(selectedTick - waveStartTick))
      );

      timer.appendChild(div);

      const table = document.createElement('div');
      table.style.display = 'grid';
      table.style.gridTemplateColumns = '100px 150px';
      table.style.gap = '0.25rem';
      table.style.alignItems = 'center';
      table.style.fontSize = '14px';
      table.style.background = 'rgba(0, 0, 0, 0.7)';
      table.style.padding = '0.5rem';

      const difficulty = chart.data.datasets.find(
        (dataset) => dataset.label === 'difficulty'
      );

      if (difficulty) {
        const idx = findLastLowerIndex(
          difficulty.data,
          (item: any, needle) => item.x - needle,
          selectedTick
        );
        const nearest = difficulty.data[idx] as Point;

        if (nearest) {
          const name = document.createElement('div');
          name.appendChild(document.createTextNode('Difficulty'));

          const value = document.createElement('div');
          value.innerHTML = `${(nearest.y - 10).toFixed(2)}`;

          table.appendChild(name);
          table.appendChild(value);
        }
      }

      const insideZedtime = chart.data.datasets
        .filter((dataset) => dataset.label === 'zedtime')
        .find((dataset) => {
          const start_tick = (dataset.data[0] as any).x;
          const end_tick = (dataset.data[1] as any).x;

          return selectedTick >= start_tick && selectedTick <= end_tick;
        });

      // Remove old children
      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      if (insideZedtime) {
        const start_tick: number = (insideZedtime.data[0] as any).x;
        const end_tick: number = (insideZedtime.data[1] as any).x;
        const duration = (end_tick - start_tick) / 100;

        const name = document.createElement('div');
        name.appendChild(document.createTextNode('Zedtime event'));

        const value = document.createElement('div');
        value.innerHTML = `${tickToTime(
          start_tick - waveStartTick
        )} - ${tickToTime(end_tick - waveStartTick)} (${duration.toFixed(2)}s)`;

        table.appendChild(name);
        table.appendChild(value);
      }

      tooltipEl.appendChild(table);
      tooltipEl.appendChild(timer);
    }

    const {
      offsetLeft: positionX,
      offsetTop: positionY,
      offsetWidth: canvasWidth,
    } = chart.canvas;
    const { caretX } = tooltip;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left =
      positionX +
      caretX -
      ((caretX - canvasWidth / 2) / canvasWidth) * 280 +
      'px';
    tooltipEl.style.bottom = positionY + 16 + 'px';
    tooltipEl.style.padding =
      tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };
