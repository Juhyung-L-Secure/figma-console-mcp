import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const bridgeUi = readFileSync(
  join(process.cwd(), 'figma-desktop-bridge/ui.html'),
  'utf8'
);

describe('Desktop Bridge reconnect policy', () => {
  test('keeps discovering MCP servers after the initial scan ends', () => {
    expect(bridgeUi).toContain('var DISCOVERY_IDLE_MS = 3000;');
    expect(bridgeUi).toContain('var DISCOVERY_STEADY_MS = 10000;');
    expect(bridgeUi).toContain('discoveryTimer = setTimeout(runDiscoveryPass, delay);');
    expect(bridgeUi).toContain('scheduleDiscovery();');
  });

  test('does not reconnect while the user has paused the bridge', () => {
    expect(bridgeUi).toContain('if (userPaused) { scheduleDiscovery(); return; }');
    expect(bridgeUi).toContain('window.__wsIsPaused = function() { return userPaused; };');
  });
});
