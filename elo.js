export function calculateNewRatings(rA, rB, winner, K=32) {
  const Ea = 1 / (1 + Math.pow(10, (rB - rA) / 400));
  const Eb = 1 / (1 + Math.pow(10, (rA - rB) / 400));
  let newA = rA, newB = rB;
  if (winner === 'A') {
    newA = Math.round(rA + K * (1 - Ea));
    newB = Math.round(rB + K * (0 - Eb));
  } else if (winner === 'B') {
    newA = Math.round(rA + K * (0 - Ea));
    newB = Math.round(rB + K * (1 - Eb));
  } else {
    // draw
    newA = Math.round(rA + K * (0.5 - Ea));
    newB = Math.round(rB + K * (0.5 - Eb));
  }
  return { newA, newB, changeA: newA - rA, changeB: newB - rB };
}
