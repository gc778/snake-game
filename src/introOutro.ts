export const drawInstructions = (ctx:any, canvas:any):undefined => {
   
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#001122");
gradient.addColorStop(1, "#000000");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.shadowColor = "#00ff00";
ctx.shadowBlur = 20;
ctx.fillStyle = "#00ff00";
ctx.font = "bold 64px Arial";
ctx.textAlign = "center";
ctx.fillText("SNAKE", canvas.width/2, 120);

ctx.shadowBlur = 0;

ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
ctx.fillRect(canvas.width/2 - 200, 180, 400, 200);
ctx.strokeStyle = "#00ff00";
ctx.lineWidth = 2;
ctx.strokeRect(canvas.width/2 - 200, 180, 400, 200);

ctx.fillStyle = "#ffffff";
ctx.font = "24px Arial";
ctx.fillText("🎮 Controls:", canvas.width/2, 220);
ctx.font = "18px Arial";
ctx.fillText("↑ ↓ ← → Arrow keys to move", canvas.width/2, 250);
ctx.fillText("🍎 Eat food to grow", canvas.width/2, 280);
ctx.fillText("❌ Don't hit walls or yourself", canvas.width/2, 310);
ctx.fillText("🔄 Press (start / re-start) above to begin", canvas.width/2, 340);

return;
}

export const gameOver = (ctx:any, canvas:any):undefined => {
   
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#001122");
gradient.addColorStop(1, "#000000");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.shadowColor = "#ff0037ff";
ctx.shadowBlur = 20;
ctx.fillStyle = "#ff0000ff";
ctx.font = "bold 64px Arial";
ctx.textAlign = "center";
ctx.fillText("GAME OVER", canvas.width/2, 200);

ctx.shadowBlur = 0;
return;
}

export const victory = (ctx:any, canvas:any):undefined => {
   
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#001122");
gradient.addColorStop(1, "#000000");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.shadowColor = "#9dff00ff";
ctx.shadowBlur = 20;
ctx.fillStyle = "#37ff00ff";
ctx.font = "bold 64px Arial";
ctx.textAlign = "center";
ctx.fillText("VICTORY!!!", canvas.width/2, 200);

ctx.shadowBlur = 0;
return;
}