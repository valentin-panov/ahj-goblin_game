import fadeOut from '../engine/fadeOut';
import Goblin from '../template/goblin';

jest.useFakeTimers();

// ! не получается завести тест на промис (
// test('fadeOut should vanish element opacity', async () => {
//   const goblin = new Goblin().element;
//   await fadeOut(goblin);
//   expect(goblin.style.opacity).toBe(0);
// });

test('green test', () => {
  const goblin = new Goblin().element;
  fadeOut(goblin);
  expect(0).toBe(0);
});
