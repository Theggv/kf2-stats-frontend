import type { Chart, ScriptableTooltipContext } from 'chart.js';
import type { DataSet } from '../../tabs/GraphsTab.util';
import { Perk } from '$lib/api/matches';

const perkIcons = {
  [Perk.Berserker]: '/assets/perks/berserker.png',
  [Perk.Commando]: '/assets/perks/commando.png',
  [Perk.Medic]: '/assets/perks/medic.png',
  [Perk.Sharpshooter]: '/assets/perks/sharpshooter.png',
  [Perk.Gunslinger]: '/assets/perks/gunslinger.png',
  [Perk.Support]: '/assets/perks/support.png',
  [Perk.Swat]: '/assets/perks/swat.png',
  [Perk.Demolitionist]: '/assets/perks/demolitionist.png',
  [Perk.Firebug]: '/assets/perks/firebug.png',
  [Perk.Survivalist]: '/assets/perks/survivalist.png',
  [Perk.Unknown]: '/assets/perks/survivalist.png',
};

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
  (formatter: (value: DataSet['values'][number]) => string) =>
  (context: ScriptableTooltipContext<any>) => {
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
      table.style.gridTemplateColumns = '24px auto 150px auto';
      table.style.gap = '0.25rem';
      table.style.alignItems = 'center';
      table.style.fontSize = '14px';

      tooltip.dataPoints
        .map((dataPoint, i) => ({
          dataPoint,
          colors: tooltip.labelColors[i],
        }))
        .sort((a, b) => {
          return b.dataPoint.parsed.y - a.dataPoint.parsed.y;
        })
        .forEach(({ dataPoint, colors }) => {
          const dataset = dataPoint.dataset;
          const raw = dataPoint.raw as DataSet['values'][number];

          const perk = raw.player?.perk || Perk.Unknown;

          const img = document.createElement('img');
          img.src = perkIcons[perk];
          img.width = 20;
          img.height = 20;
          img.style.display = 'inline-block';

          const mark = document.createElement('span');
          mark.style.backgroundColor = colors.borderColor.toString();
          mark.style.width = '5px';
          mark.style.height = '20px';

          const name = document.createElement('div');
          name.appendChild(document.createTextNode(` ${dataset.label} `));
          if (raw.player?.is_dead) {
            name.innerHTML = '&#x1F480; ' + name.innerHTML;
          }

          const value = document.createElement('div');
          value.appendChild(document.createTextNode(formatter(raw)));

          table.appendChild(img);
          table.appendChild(mark);
          table.appendChild(name);
          table.appendChild(value);
        });

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
