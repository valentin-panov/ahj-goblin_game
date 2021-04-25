import fadeOut from '../engine/fadeOut';
import Goblin from '../template/goblin';

test('fadeOut should vanish element opacity', () => {
  const goblin = new Goblin().element;
  fadeOut(goblin).then(() => {
    expect(goblin.style.opacity).toBe(0);
  });
}, 4000);
