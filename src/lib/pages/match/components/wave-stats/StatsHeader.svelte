<script lang="ts">
  import { AvailableMetrics as Metrics } from '../../tabs/StatsTab.store';
  import StatsHeaderCell from './StatsHeaderCell.svelte';
</script>

<div class="root">
  <div class="row">
    <div class="cell">
      <div class="secondary">Kills</div>
      <div class="subcell">
        <StatsHeaderCell primary w75 metric={Metrics.TOTAL_KILLS}>
          Total
        </StatsHeaderCell>
        <StatsHeaderCell primary w75 metric={Metrics.LARGE_KILLS}>
          Larges
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary">Damage</div>
      <div class="subcell">
        <StatsHeaderCell primary metric={Metrics.DAMAGE_DEALT}>
          Dealt
        </StatsHeaderCell>
        <StatsHeaderCell primary w75 metric={Metrics.DAMAGE_TAKEN}>
          Taken
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary">Larges</div>
      <div class="subcell">
        <StatsHeaderCell primary half metric={Metrics.FP_KILLS}>
          FP
        </StatsHeaderCell>
        <StatsHeaderCell primary half metric={Metrics.SC_KILLS}>
          SC
        </StatsHeaderCell>
        <StatsHeaderCell primary half metric={Metrics.QP_KILLS}>
          QP
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary">Husks</div>
      <div class="subcell">
        <StatsHeaderCell
          primary
          half
          metric={Metrics.HUSK_N}
          title="Husk normal kills"
          >N
        </StatsHeaderCell>
        <StatsHeaderCell
          primary
          half
          metric={Metrics.HUSK_B}
          title="Husk backpack kills"
          >B
        </StatsHeaderCell>
        <StatsHeaderCell
          primary
          half
          metric={Metrics.HUSK_R}
          title="FP rages caused by husk explosions"
        >
          R
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary">Accuracy</div>
      <div class="subcell">
        <StatsHeaderCell primary half metric={Metrics.ACCURACY}>
          Overall
        </StatsHeaderCell>
        <StatsHeaderCell primary half metric={Metrics.HS_ACCURACY}>
          HS
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary"></div>
      <StatsHeaderCell primary metric={Metrics.HEADSHOTS}>
        Headshots
      </StatsHeaderCell>
    </div>

    <div class="cell">
      <div class="secondary">Heals</div>
      <div class="subcell">
        <StatsHeaderCell primary w75 metric={Metrics.HEALS_GIVEN}>
          Given
        </StatsHeaderCell>
        <StatsHeaderCell primary w75 metric={Metrics.HEALS_RECV}>
          Received
        </StatsHeaderCell>
      </div>
    </div>

    <div class="cell">
      <div class="secondary">Zedtime</div>
      <StatsHeaderCell primary metric={Metrics.AVG_ZT_LENGTH}>
        AVG Length
      </StatsHeaderCell>
    </div>
  </div>
</div>

<style>
  .root {
    display: table-cell;
  }

  .row {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    gap: 1rem;
    background-color: rgb(0 0 0 / 0.1);
    height: 48px;
  }

  .cell {
    display: grid;
    grid-template:
      'primary' 24px
      'secondary' auto
      / 1fr;

    text-align: center;
    text-transform: uppercase;
    font-weight: bold;

    color: var(--text-secondary);
  }

  .cell .secondary {
    justify-self: center;
    align-self: center;
    font-size: 12px;
    width: 100px;
  }

  .cell > .subcell {
    display: flex;
    flex-direction: row;
  }
</style>
