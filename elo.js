// utils/elo.js
export function updateELO(player1Rating, player2Rating, winner) {
  // ejemplo sencillo: suma o resta 10 puntos
  if (winner === 1) return [player1Rating + 10, player2Rating - 10]
  if (winner === 2) return [player1Rating - 10, player2Rating + 10]
  return [player1Rating, player2Rating]
}
