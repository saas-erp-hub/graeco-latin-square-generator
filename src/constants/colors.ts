export const colorPalette = [
  // Vibrant Primary Hues
  '#FF0000', // Red
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Lime Green
  '#008000', // Green
  '#00FFFF', // Cyan
  '#0000FF', // Blue
  '#800080', // Purple
  '#FF00FF', // Magenta
  '#FF1493', // Deep Pink

  // Lighter/Pastel Variations (distinct from primaries)
  '#FFC0CB', // Pink
  '#FFD700', // Gold (distinct yellow)
  '#ADFF2F', // GreenYellow
  '#7CFC00', // LawnGreen
  '#40E0D0', // Turquoise
  '#1E90FF', // DodgerBlue
  '#6A5ACD', // SlateBlue
  '#BA55D3', // MediumOrchid

  // Darker/Deeper Variations (distinct from primaries)
  '#8B0000', // Dark Red
  '#CD853F', // Peru (Brownish Orange)
  '#BDB76B', // Dark Khaki (Muted Yellow-Green)
  '#2E8B57', // SeaGreen
  '#00CED1', // DarkTurquoise
  '#0000CD', // MediumBlue
  '#4338ca', // Darker Indigo (from original)
  '#6B219C', // Dark Purple (from original)
  '#C026D3', // Vibrant Magenta (from original)

  // More distinct hues/variations to reach ~40
  '#FF4500', // OrangeRed
  '#DAA520', // Goldenrod
  '#32CD32', // LimeGreen (slightly darker than Lime)
  '#20B2AA', // LightSeaGreen
  '#6495ED', // CornflowerBlue
  '#87CEEB', // SkyBlue
  '#ADD8E6', // LightBlue
  '#DDA0DD', // Plum
  '#FF69B4', // HotPink
  '#8A2BE2', // BlueViolet
  '#9400D3', // DarkViolet
  '#9932CC', // DarkOrchid

  // Neutrals/Grays (limited, for contrast)
  '#808080', // Gray
  '#C0C0C0', // Silver
  '#D3D3D3', // LightGray
];

/**
 * Returns a color from the color palette based on the given value.
 * The color is determined by the value modulo the length of the color palette.
 * @param value The number to use for color selection.
 * @returns A hex color string.
 */
export function getColor(value: number): string {
  return colorPalette[value % colorPalette.length];
}
