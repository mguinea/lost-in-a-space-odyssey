var shipPositions = [
    [-64 + 15, -8], // Up
    [-64 + 30, -8], // Down
    [64 - 12 - 30, -8], // Left
    [64 - 12 - 15, -8], // Right
    //[64, 0]// Turret
];

var turretsPositions = [
    [0, -64], // Up
    [0, 64], // Down
    [-64, 0], // Left
    [64, 0], // Right
];
/*
ctx.arc(px, py - r, 12, 0, Math.PI * 2, true);
ctx.arc(px, py + r, 12, 0, Math.PI * 2, true);
ctx.arc(px - r, py, 12, 0, Math.PI * 2, true);
ctx.arc(px + r, py, 12, 0, Math.PI * 2, true);
*/

var turretsAngles = [
    -90, 90, 180, 0
]; // Turret angles
