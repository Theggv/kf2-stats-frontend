import type { PeriodData } from '$lib/api/analytics';
import type { Chart, Color, ScriptableTooltipContext } from 'chart.js';

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode!.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
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
  (label: string, renderValue: (item: number) => string) =>
  (context: ScriptableTooltipContext<'line'>) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];

      const header = document.createElement('div');
      header.style.fontWeight = 'bold';

      titleLines.forEach((title) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(title));

        header.appendChild(div);
      });

      const table = document.createElement('div');
      table.style.display = 'grid';
      table.style.paddingTop = '0.5rem';
      table.style.gridTemplateColumns = 'auto 100px auto';
      table.style.gap = '0.25rem';
      table.style.alignItems = 'center';
      table.style.fontSize = '14px';

      function generateRow(
        markColor: Color | null,
        label: string,
        data: string
      ) {
        const mark = document.createElement('span');
        mark.style.backgroundColor = markColor ? markColor.toString() : '';
        mark.style.width = '5px';
        mark.style.height = '20px';

        const name = document.createElement('div');
        name.appendChild(document.createTextNode(`${label}`));

        const value = document.createElement('div');
        value.appendChild(document.createTextNode(data));

        return { mark, name, value };
      }

      const { dataPoint, colors } = tooltip.dataPoints.map((dataPoint, i) => ({
        dataPoint,
        colors: tooltip.labelColors[i],
      }))[0];

      const raw = dataPoint.raw as PeriodData;

      const valueRow = generateRow(
        colors.borderColor,
        label,
        renderValue(raw.value)
      );

      if (raw.prev > 0) {
        const diff = document.createElement('span');
        diff.style.paddingLeft = '0.25rem';

        if (raw.diff > 0) {
          diff.appendChild(
            document.createTextNode(
              `(+${((raw.value / raw.prev - 1) * 100).toFixed(0)}%)`
            )
          );
          diff.style.color = 'var(--color-win)';
        } else if (raw.diff < 0) {
          diff.appendChild(
            document.createTextNode(
              `(-${((raw.prev / raw.value - 1) * 100).toFixed(0)}%)`
            )
          );
          diff.style.color = 'var(--color-lose)';
        }

        valueRow.value.appendChild(diff);
      }

      table.appendChild(valueRow.mark);
      table.appendChild(valueRow.name);
      table.appendChild(valueRow.value);

      const hr = document.createElement('hr');
      hr.style.gridColumn = '1 / span 3';
      table.appendChild(hr);

      if (raw.prev > 0) {
        const prevRow = generateRow(null, 'Prev. Value', renderValue(raw.prev));

        table.appendChild(prevRow.mark);
        table.appendChild(prevRow.name);
        table.appendChild(prevRow.value);
      }

      const trendRow = generateRow(null, 'Trend', renderValue(raw.trend));

      table.appendChild(trendRow.mark);
      table.appendChild(trendRow.name);
      table.appendChild(trendRow.value);

      // Remove old children
      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      tooltipEl.appendChild(header);
      tooltipEl.appendChild(table);
    }

    const {
      offsetLeft: positionX,
      offsetTop: positionY,
      offsetWidth: canvasWidth,
    } = chart.canvas;
    const { caretX, caretY } = tooltip;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left =
      positionX +
      caretX -
      ((caretX - canvasWidth / 2) / canvasWidth) * 200 +
      'px';
    tooltipEl.style.top = positionY + caretY / 2 + 'px';
    tooltipEl.style.padding =
      tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };
