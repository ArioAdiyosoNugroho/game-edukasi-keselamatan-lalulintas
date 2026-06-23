const fs = require('fs');

const htmlContent = fs.readFileSync('d:/laragon/www/GAME/bus.html', 'utf8');

const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
let js = scriptMatch ? scriptMatch[1] : '';

const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<script>/);
let html = bodyMatch ? bodyMatch[1] : '';

// 1. Process JS
// Update IDs
const idsToReplace = [
    'gameCanvas', 'score-display', 'points-display', 'speedo-display',
    'start-menu', 'win-screen', 'lose-screen', 'tutorial-bubble', 'controls-panel',
    'btn-play', 'btn-next', 'btn-retry', 'btn-sound', 'icon-sound',
    'btn-gas', 'btn-brake', 'btn-horn', 'btn-steer-left',
    'win-description', 'lose-description'
];

idsToReplace.forEach(id => {
    // Escape for regex if needed
    if (id === 'gameCanvas') {
        js = js.replace(/getElementById\('gameCanvas'\)/g, "getElementById('busCanvas')");
    } else {
        const regex = new RegExp(`getElementById\\('${id}'\\)`, 'g');
        js = js.replace(regex, `getElementById('bus-${id}')`);
    }
});

// Wrap in IIFE
js = `// ============================================================
// LajuAman — Bus Simulator Cilik
// ============================================================

const BusGame = (function() {
${js}

    return {
        init: () => {
            gameActive = false;
            startMenu.classList.remove('hidden');
            winScreen.classList.add('hidden');
            loseScreen.classList.add('hidden');
            controlsPanel.classList.add('opacity-40', 'cursor-not-allowed', 'pointer-events-none');
            
            // Generate track if needed
            generateRoadTrack();
            BUS.x = LANE_RIGHT;
            BUS.y = 420;
            BUS.speed = 0;
            BUS.passengers = 0;
            worldY = 0;
            score = 0;
            simPoints = 3;
            
            if (!lastTime) requestAnimationFrame(gameLoop);
        },
        quit: () => {
            gameActive = false;
            stopEngineSound();
        }
    };
})();
`;

fs.writeFileSync('d:/laragon/www/GAME/assets/js/bus.js', js);


// 2. Process HTML
// Extract main container
const containerMatch = html.match(/<!-- Kontainer Utama Game -->\s*<div[^>]*>([\s\S]*?)<\/div>\s*<!-- Logika Utama/);
let containerHtml = containerMatch ? containerMatch[0] : html;

// Stop before "Logika Utama"
containerHtml = containerHtml.replace(/<!-- Logika Utama[\s\S]*$/, '</div>');

// Replace IDs in HTML
idsToReplace.forEach(id => {
    if (id === 'gameCanvas') {
        containerHtml = containerHtml.replace(/id="gameCanvas"/g, 'id="busCanvas"');
    } else {
        const regex = new RegExp(`id="${id}"`, 'g');
        containerHtml = containerHtml.replace(regex, `id="bus-${id}"`);
    }
});

// Construct the screen HTML
const finalHtml = `
    <!-- BUS SCREEN -->
    <div id="bus-screen" class="screen">
        <header class="game-header" style="position:absolute; top:0; left:0; width:100%; z-index:50;">
            <button class="btn-back" onclick="app.quitGame()">✕</button>
        </header>
        <div class="h-screen w-screen flex items-center justify-center overflow-hidden p-2 md:p-6 bg-gradient-to-br from-slate-950 to-emerald-950">
            ${containerHtml}
        </div>
    </div>
`;

fs.writeFileSync('d:/laragon/www/GAME/bus-screen.html', finalHtml);
