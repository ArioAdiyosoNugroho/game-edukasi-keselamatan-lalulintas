// Core App Logic - LajuAman

const app = (function() {
    // --- State ---
    let state = {
        nama: "",
        totalPoin: 0,
        currentLevel: "Pesepeda",
        badges: [],
        sessionCount: 0,
        highScore: 0,
        lastPlayed: null,
        currentMode: null,
        scenarioIndex: 0,
        combo: 0,
        correctCount: 0,
        timerInterval: null,
        timeTaken: 0,
        modesDimainkan: []
    };

    let leaderboard = [];

    // --- Image Assets ---
    const imgAssets = {};
    const imgNames = ['motorcycle.png', 'road main.png', 'car.png', 'truck.png', 'becak.png', 'perempatan.png', 'zebra cros.png'];
    let imagesLoaded = 0;

    function preloadImages(callback) {
        if (imgNames.length === 0) return callback();
        imgNames.forEach(name => {
            const img = new Image();
            img.src = `assets/image/${name}`;
            img.onload = () => {
                imgAssets[name.replace('.png', '')] = img;
                imagesLoaded++;
                if (imagesLoaded === imgNames.length) callback();
            };
            img.onerror = () => {
                console.error("Failed to load image:", name);
                imagesLoaded++;
                if (imagesLoaded === imgNames.length) callback();
            };
        });
    }

    // --- Audio System (Web Audio API) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playTone(freq, type, duration, vol=0.1) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    function playDing() {
        playTone(600, 'sine', 0.1);
        setTimeout(() => playTone(800, 'sine', 0.2), 100);
    }

    function playBuzz() {
        playTone(150, 'sawtooth', 0.3, 0.2);
    }

    // --- LocalStorage ---
    function loadData() {
        const saved = localStorage.getItem('lajuaman_player');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
        
        const savedLeaderboard = localStorage.getItem('lajuaman_leaderboard');
        if (savedLeaderboard) {
            leaderboard = JSON.parse(savedLeaderboard);
        } else {
            // Mock data if empty
            leaderboard = [
                { nama: "Budi", skor: 140, rank: "Pelopor" },
                { nama: "Citra", skor: 120, rank: "Pengendara" },
                { nama: "Andi", skor: 80, rank: "Pelajar" }
            ];
            saveLeaderboard();
        }
    }

    function saveData() {
        localStorage.setItem('lajuaman_player', JSON.stringify(state));
    }

    function saveLeaderboard() {
        localStorage.setItem('lajuaman_leaderboard', JSON.stringify(leaderboard));
    }

    // --- UI Navigation ---
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');

        if (screenId === 'leaderboard') {
            renderLeaderboard();
        }
    }
    
    function showGameMenu() { showScreen('game-menu'); }
    function showEdukasiMenu() { showScreen('edukasi-menu'); }

    // --- Gamification ---
    function checkLevelUp() {
        let newLevel = LEVELS[0].name;
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (state.totalPoin >= LEVELS[i].minPoin) {
                newLevel = LEVELS[i].name;
                break;
            }
        }
        if (newLevel !== state.currentLevel) {
            state.currentLevel = newLevel;
            // Optionally could show a Level Up notification here
        }
        document.getElementById('ui-level').textContent = `Level: ${state.currentLevel}`;
    }

    function awardBadge(badgeId) {
        if (!state.badges.includes(badgeId)) {
            state.badges.push(badgeId);
            const badgeDef = BADGES.find(b => b.id === badgeId);
            if (badgeDef) {
                showBadgePopup(badgeDef.label);
            }
            saveData();
        }
    }

    function showBadgePopup(badgeName) {
        const popup = document.getElementById('badge-notification');
        document.getElementById('badge-name-notif').textContent = badgeName;
        popup.classList.remove('hidden', 'hiding');
        
        setTimeout(() => {
            popup.classList.add('hiding');
            setTimeout(() => popup.classList.add('hidden'), 500);
        }, 3000);
    }

    function getActiveData() {
        return state.currentMode === 'kuis' ? KUIS_DATA : SCENARIOS;
    }

    // --- Gameplay Logic ---
    function startGame(mode) {
        const nameInput = document.getElementById('player-name').value.trim();
        if (!nameInput) {
            alert("Silakan masukkan nama Anda di menu utama terlebih dahulu!");
            showScreen('main-menu');
            return;
        }

        state.nama = nameInput;
        state.currentMode = mode;
        state.scenarioIndex = 0;
        state.totalPoin = state.totalPoin || 0; 
        state.sessionScore = 0;
        state.combo = 0;
        state.correctCount = 0;
        
        state.sessionCount++;
        if (state.sessionCount === 1) awardBadge("first_play");
        if (state.sessionCount === 3) awardBadge("persistent");

        if (!state.modesDimainkan.includes(mode)) state.modesDimainkan.push(mode);
        if (state.modesDimainkan.length >= 4) awardBadge("all_modes");

        checkLevelUp();
        document.getElementById('ui-score').textContent = `Skor: 0`;

        const uiTimer = document.getElementById('ui-timer');
        uiTimer.style.display = 'none';

        const gameScreen = document.getElementById('game-screen');
        gameScreen.classList.remove('arcade-mode');

        if (mode === 'tantangan' || mode === 'tebak_rambu' || mode === 'arcade') {
            uiTimer.style.display = 'inline';
            uiTimer.textContent = '⏱️ 0s';
            uiTimer.classList.remove('timer-warning');
        }

        showScreen('game-screen');
        startCanvasAnimation();

        if (mode === 'arcade') {
            gameScreen.classList.add('arcade-mode');
            startArcadeLogic();
        } else if (mode === 'tebak_rambu') {
            loadTebakRambu();
        } else {
            loadScenario();
        }
    }
    
    function startArcade() {
        startGame('arcade');
    }

    function startArcadeLogic() {
        state.sessionScore = 0;
        state.timeTaken = 0;
        clearInterval(state.timerInterval);
        
        const uiTimer = document.getElementById('ui-timer');
        state.timerInterval = setInterval(() => {
            state.timeTaken++;
            state.sessionScore += 5; // +5 points per second survived
            uiTimer.textContent = `⏱️ ${state.timeTaken}s`;
            document.getElementById('ui-score').textContent = `Skor: ${state.sessionScore}`;
        }, 1000);
    }

    function loadScenario() {
        const data = getActiveData();
        if (state.scenarioIndex >= data.length) {
            endGame();
            return;
        }

        const sc = data[state.scenarioIndex];
        const prefix = state.currentMode === 'kuis' ? 'Soal' : 'Skenario';
        document.getElementById('ui-scenario-counter').textContent = `${prefix} ${state.scenarioIndex + 1}/${data.length}`;
        document.getElementById('ui-scenario-text').innerHTML = sc.situasi;

        const pb = document.getElementById('progress-bar');
        pb.style.width = `${((state.scenarioIndex) / data.length) * 100}%`;

        const choicesContainer = document.getElementById('ui-choices');
        choicesContainer.innerHTML = '';

        sc.pilihan.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<strong>[${p.id}]</strong> &nbsp; ${p.teks}`;
            btn.onclick = () => handleAnswer(p.id, btn);
            choicesContainer.appendChild(btn);
        });

        // Reset flash
        document.getElementById('flash-overlay').style.opacity = '0';
        
        // Timer for Tantangan
        if (state.currentMode === 'tantangan') {
            clearInterval(state.timerInterval);
            state.timeTaken = 0;
            const uiTimer = document.getElementById('ui-timer');
            uiTimer.textContent = `⏱️ 0s`;
            uiTimer.classList.remove('timer-warning');
            
            state.timerInterval = setInterval(() => {
                state.timeTaken++;
                uiTimer.textContent = `⏱️ ${state.timeTaken}s`;
                if (state.timeTaken >= 10) {
                    uiTimer.classList.add('timer-warning');
                }
            }, 1000);
        }
    }

    let tebakRambuData = [];
    
    function loadTebakRambu() {
        if (state.scenarioIndex === 0) {
            tebakRambuData = [...RAMBU_DATA].sort(() => 0.5 - Math.random()).slice(0, 10);
        }
        
        if (state.scenarioIndex >= tebakRambuData.length) {
            endGame();
            return;
        }

        const rambu = tebakRambuData[state.scenarioIndex];
        document.getElementById('ui-scenario-counter').textContent = `Tebak Rambu ${state.scenarioIndex + 1}/${tebakRambuData.length}`;
        
        document.getElementById('ui-scenario-text').innerHTML = `
            <div style="text-align:center; font-size: 60px; margin: 10px 0;">
                ${rambu.ikon}
            </div>
            <div style="text-align:center; font-weight: bold;">Apa arti rambu di atas?</div>
        `;

        const pb = document.getElementById('progress-bar');
        pb.style.width = `${((state.scenarioIndex) / tebakRambuData.length) * 100}%`;

        const choicesContainer = document.getElementById('ui-choices');
        choicesContainer.innerHTML = '';

        const wrongChoices = RAMBU_DATA.filter(r => r.nama !== rambu.nama).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [...wrongChoices, rambu].sort(() => 0.5 - Math.random());
        
        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            const letter = String.fromCharCode(65 + idx);
            btn.innerHTML = `<strong>[${letter}]</strong> &nbsp; ${opt.nama}`;
            btn.onclick = () => handleTebakRambuAnswer(opt.nama === rambu.nama, btn, rambu);
            choicesContainer.appendChild(btn);
        });

        document.getElementById('flash-overlay').style.opacity = '0';
        
        clearInterval(state.timerInterval);
        state.timeTaken = 10;
        const uiTimer = document.getElementById('ui-timer');
        uiTimer.textContent = `⏱️ 10s`;
        uiTimer.classList.remove('timer-warning');
        
        state.timerInterval = setInterval(() => {
            state.timeTaken--;
            uiTimer.textContent = `⏱️ ${state.timeTaken}s`;
            if (state.timeTaken <= 3) {
                uiTimer.classList.add('timer-warning');
            }
            if (state.timeTaken <= 0) {
                clearInterval(state.timerInterval);
                const fakeBtn = document.createElement('div');
                handleTebakRambuAnswer(false, fakeBtn, rambu);
            }
        }, 1000);
    }

    function handleAnswer(selectedId, btnElement) {
        clearInterval(state.timerInterval);
        
        // Disable all buttons
        document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

        const data = getActiveData();
        const sc = data[state.scenarioIndex];
        const isCorrect = selectedId === sc.jawaban;

        if (isCorrect) {
            btnElement.classList.add('correct');
            playDing();
            triggerConfetti();
            
            let pointsGained = sc.poin;
            state.combo++;
            state.correctCount++;
            
            if (state.combo >= 3) {
                pointsGained += 5;
                showComboPopup();
            }
            if (state.combo === 5) awardBadge("combo_king");
            
            if (state.currentMode === 'tantangan' && state.timeTaken < 5) {
                pointsGained += 3;
            }
            
            state.sessionScore += pointsGained;
            state.totalPoin += pointsGained;
            
            showFeedback(true, pointsGained, sc);
        } else {
            btnElement.classList.add('wrong');
            playBuzz();
            triggerFlashShake();
            
            state.combo = 0;
            
            // highlight correct
            document.querySelectorAll('.choice-btn').forEach(b => {
                if (b.innerHTML.includes(`[${sc.jawaban}]`)) {
                    b.classList.add('correct');
                }
            });
            
            showFeedback(false, 0, sc);
        }

        document.getElementById('ui-score').textContent = `Skor: ${state.sessionScore}`;
        checkLevelUp();
        saveData();
    }

    function handleTebakRambuAnswer(isCorrect, btnElement, rambu) {
        clearInterval(state.timerInterval);
        document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

        if (isCorrect) {
            btnElement.classList.add('correct');
            playDing();
            triggerConfetti();
            
            let pointsGained = 15;
            state.combo++;
            state.correctCount++;
            
            if (state.combo >= 3) {
                pointsGained += 5;
                showComboPopup();
            }
            
            state.sessionScore += pointsGained;
            state.totalPoin += pointsGained;
            
            showFeedback(true, pointsGained, { penjelasan: rambu.deskripsi, pasal: rambu.tipe });
        } else {
            btnElement.classList.add('wrong');
            playBuzz();
            triggerFlashShake();
            state.combo = 0;
            
            document.querySelectorAll('.choice-btn').forEach(b => {
                if (b.innerHTML.includes(rambu.nama)) b.classList.add('correct');
            });
            
            showFeedback(false, 0, { penjelasan: rambu.deskripsi, pasal: rambu.tipe });
        }

        document.getElementById('ui-score').textContent = `Skor: ${state.sessionScore}`;
        checkLevelUp();
        saveData();
    }

    function showComboPopup() {
        const p = document.getElementById('ui-combo-popup');
        p.classList.remove('hidden');
        p.style.animation = 'none';
        void p.offsetWidth; // trigger reflow
        p.style.animation = 'popup 1s forwards';
        setTimeout(() => p.classList.add('hidden'), 1000);
    }

    function showFeedback(isCorrect, points, sc) {
        setTimeout(() => {
            document.getElementById('ui-feedback-title').textContent = isCorrect ? "✅ BENAR!" : "❌ SALAH!";
            document.getElementById('ui-feedback-title').className = `feedback-title ${isCorrect ? 'correct' : 'wrong'}`;
            document.getElementById('ui-feedback-points').textContent = isCorrect ? `+${points} Poin` : "+0 Poin";
            document.getElementById('ui-feedback-explanation').textContent = sc.penjelasan;
            document.getElementById('ui-feedback-pasal').textContent = sc.pasal;
            
            showScreen('feedback-screen');
        }, 1000); // 1 second delay to see right/wrong colors
    }

    function nextScenario() {
        state.scenarioIndex++;
        if (state.currentMode === 'tebak_rambu') {
            showScreen('game-screen');
            loadTebakRambu();
        } else {
            const data = getActiveData();
            if (state.scenarioIndex < data.length) {
                showScreen('game-screen');
                loadScenario();
            } else {
                endGame();
            }
        }
    }

    function endGame() {
        clearInterval(state.timerInterval);
        const data = getActiveData();
        
        // Check final badges
        if (state.currentMode === 'skenario' || state.currentMode === 'tantangan') {
            awardBadge("etika_hero");
        }
        if (state.currentMode === 'kuis' && state.sessionScore >= 80) {
            awardBadge("uu_master");
        }
        
        if (state.correctCount === data.length) {
            awardBadge("zero_violation");
        }
        
        if (state.sessionScore > state.highScore) {
            state.highScore = state.sessionScore;
        }

        // Update Leaderboard
        leaderboard.push({
            nama: state.nama,
            skor: state.sessionScore,
            rank: state.currentLevel
        });
        leaderboard.sort((a, b) => b.skor - a.skor);
        leaderboard = leaderboard.slice(0, 10); // Keep top 10
        saveLeaderboard();

        // Check if top 3
        const myRank = leaderboard.findIndex(entry => entry.nama === state.nama && entry.skor === state.sessionScore);
        if (myRank >= 0 && myRank < 3) {
            awardBadge("top_scorer");
        }

        saveData();

        // Populate Result Screen
        document.getElementById('ui-result-name').textContent = state.nama;
        document.getElementById('ui-result-score').textContent = state.sessionScore;
        document.getElementById('ui-result-rank').textContent = `⭐ ${state.currentLevel}`;
        
        const accuracy = Math.round((state.correctCount / data.length) * 100);
        document.getElementById('ui-result-accuracy').textContent = `${state.correctCount}/${data.length} (${accuracy}%)`;

        // Stop canvas
        stopCanvasAnimation();

        showScreen('result-screen');
    }

    function renderLeaderboard() {
        const list = document.getElementById('ui-leaderboard-list');
        list.innerHTML = '';
        
        leaderboard.forEach((entry, i) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${i+1}. ${entry.nama}</span> <span>${entry.skor} ⭐ ${entry.rank}</span>`;
            list.appendChild(li);
        });

        const cur = document.getElementById('ui-leaderboard-current');
        if (state.nama) {
            cur.innerHTML = `Kamu: ${state.nama} | Skor Tertinggi: ${state.highScore} | Rank: ${state.currentLevel}`;
        } else {
            cur.innerHTML = `Mainkan game untuk masuk ke Leaderboard!`;
        }
    }

    // --- Canvas Animation ---
    let animId;
    let canvas, ctx;
    let roadOffset = 0;
    let particles = [];
    let traffic = [];
    let playerY = 100;
    let targetPlayerY = 100;
    let controlsSetup = false;
    
    function startCanvasAnimation() {
        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        traffic = [];
        playerY = canvas.height / 2;
        targetPlayerY = playerY;
        animId = requestAnimationFrame(drawCanvas);
        setupControls();
    }

    function setupControls() {
        if (controlsSetup) return;
        controlsSetup = true;

        window.addEventListener('keydown', (e) => {
            if (state.currentMode !== 'arcade') return;
            const speed = 25;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                targetPlayerY -= speed;
                e.preventDefault();
            } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                targetPlayerY += speed;
                e.preventDefault();
            }
        });
        
        let isDragging = false;
        canvas.addEventListener('mousedown', (e) => {
            if (state.currentMode !== 'arcade') return;
            isDragging = true;
            const rect = canvas.getBoundingClientRect();
            targetPlayerY = e.clientY - rect.top;
        });
        window.addEventListener('mouseup', () => isDragging = false);
        canvas.addEventListener('mousemove', (e) => {
            if (isDragging && state.currentMode === 'arcade') {
                const rect = canvas.getBoundingClientRect();
                targetPlayerY = e.clientY - rect.top;
            }
        });
        
        canvas.addEventListener('touchstart', (e) => {
            if (state.currentMode !== 'arcade') return;
            const rect = canvas.getBoundingClientRect();
            targetPlayerY = e.touches[0].clientY - rect.top;
        }, {passive: true});
        canvas.addEventListener('touchmove', (e) => {
            if (state.currentMode !== 'arcade') return;
            const rect = canvas.getBoundingClientRect();
            targetPlayerY = e.touches[0].clientY - rect.top;
        }, {passive: true});
    }

    function stopCanvasAnimation() {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    function drawCanvas() {
        // Mode edukasi = jalan lambat, mode arcade = cepat
        const roadSpeed = (state.currentMode === 'arcade') ? 5 : 1;

        // Update player position smoothly (only really matters in arcade)
        if (state.currentMode === 'arcade') {
            playerY += (targetPlayerY - playerY) * 0.15;
            if (playerY < 20) playerY = 20;
            if (playerY > canvas.height - 20) playerY = canvas.height - 20;
            targetPlayerY = Math.max(20, Math.min(canvas.height - 20, targetPlayerY));
        } else {
            // Auto-center in non-arcade mode
            playerY = canvas.height / 2; 
        }

        const roadImg = imgAssets['road main'];
        if (roadImg && roadImg.complete && roadImg.naturalWidth > 0) {
            const roadH = canvas.height;
            const ratio = roadImg.width / roadImg.height;
            const roadW = roadH * ratio;

            roadOffset += roadSpeed; 
            if (roadOffset >= roadW) roadOffset = 0;
            
            // Draw Side Scrolling Road
            ctx.drawImage(roadImg, -roadOffset, 0, roadW, roadH);
            ctx.drawImage(roadImg, roadW - roadOffset, 0, roadW, roadH);
            if (roadW - roadOffset < canvas.width) {
                ctx.drawImage(roadImg, roadW * 2 - roadOffset, 0, roadW, roadH);
            }
        } else {
            ctx.fillStyle = '#444'; // Asphalt
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw moving dashed lines horizontally
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 6;
            ctx.setLineDash([30, 30]);
            
            roadOffset += roadSpeed;
            if (roadOffset > 60) roadOffset = 0;
            
            ctx.lineDashOffset = roadOffset; 
            
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        }

        // Spawn random traffic only in arcade mode
        if (state.currentMode === 'arcade' && Math.random() < 0.02) {
            const types = ['car', 'truck', 'becak'];
            const type = types[Math.floor(Math.random() * types.length)];
            const img = imgAssets[type];
            if (img && img.complete && img.naturalWidth > 0) {
                traffic.push({
                    img: img,
                    x: canvas.width + 100,
                    y: 20 + Math.random() * (canvas.height - 40),
                    speed: 2 + Math.random() * 3
                });
            }
        }

        // Draw and update traffic
        const playerX = canvas.width * 0.15; 

        for (let i = traffic.length - 1; i >= 0; i--) {
            let t = traffic[i];
            t.x -= (t.speed + roadSpeed); 
            
            const h = Math.min(canvas.height * 0.35, 70);
            const ratio = t.img.width / t.img.height;
            const w = h * ratio;
            
            ctx.drawImage(t.img, t.x - w/2, t.y - h/2, w, h);
            
            // Collision Detection
            if (state.currentMode === 'arcade') {
                const dx = t.x - playerX;
                const dy = t.y - playerY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < (h/2 + 20)) {
                    triggerFlashShake();
                    playBuzz();
                    traffic.splice(i, 1);
                    endGame(); // Game Over
                    continue;
                }
            }
            
            if (t.x < -150) {
                traffic.splice(i, 1);
            }
        }

        // Draw Player Vehicle (Motorcycle)
        const motorImg = imgAssets['motorcycle'];
        
        if (motorImg && motorImg.complete && motorImg.naturalWidth > 0) {
            const h = Math.min(canvas.height * 0.3, 60);
            const ratio = motorImg.width / motorImg.height;
            const w = h * ratio;
            ctx.drawImage(motorImg, playerX - w/2, playerY - h/2, w, h);
        } else {
            ctx.fillStyle = '#FFC000'; 
            ctx.fillRect(playerX - 20, playerY - 10, 40, 20);
            ctx.fillStyle = '#111';
            ctx.fillRect(playerX - 15, playerY - 12, 10, 4);
            ctx.fillRect(playerX - 15, playerY + 8, 10, 4);
            ctx.fillRect(playerX + 5, playerY - 12, 10, 4);
            ctx.fillRect(playerX + 5, playerY + 8, 10, 4);
        }
        
        // Draw Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.y += p.vy;
            p.x += p.vx;
            p.life--;
            
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            
            if (p.life <= 0) particles.splice(i, 1);
        }

        animId = requestAnimationFrame(drawCanvas);
    }

    function triggerConfetti() {
        for(let i=0; i<30; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height - 50,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 1) * 10,
                size: Math.random() * 6 + 2,
                color: Math.random() > 0.5 ? '#FFC000' : '#70AD47',
                life: 60 + Math.random() * 40
            });
        }
    }

    function triggerFlashShake() {
        const overlay = document.getElementById('flash-overlay');
        overlay.style.opacity = '1';
        setTimeout(() => overlay.style.opacity = '0', 100);
        
        const container = document.getElementById('game-screen');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }

    function notImplementedYet(feature) {
        alert(`Fitur ${feature} masih dalam pengembangan untuk fase berikutnya!`);
    }

    function showBelajar() {
        if (!state.modesDimainkan.includes('belajar')) state.modesDimainkan.push('belajar');
        if (state.modesDimainkan.length >= 4) awardBadge("all_modes");

        const list = document.getElementById('ui-rambu-list');
        list.innerHTML = '';
        
        RAMBU_DATA.forEach(r => {
            const div = document.createElement('div');
            div.className = 'rambu-item';
            div.innerHTML = `
                <div class="rambu-icon">${r.ikon}</div>
                <div class="rambu-info">
                    <h4>${r.nama}</h4>
                    <span>${r.tipe}</span>
                    <p>${r.deskripsi}</p>
                </div>
            `;
            list.appendChild(div);
        });
        
        showScreen('belajar-screen');
    }

    // --- Initialization ---
    window.onload = () => {
        preloadImages(() => {
            setTimeout(() => {
                loadData();
                if (!state.modesDimainkan) state.modesDimainkan = [];
                showScreen('main-menu');
                if (state.nama) {
                    document.getElementById('player-name').value = state.nama;
                }
            }, 1000); // Fake loading screen for polish
        });
    };

    // Expose public methods
    return {
        startGame,
        startArcade,
        nextScenario,
        showScreen,
        showGameMenu,
        showEdukasiMenu,
        showBelajar,
        notImplementedYet
    };
})();
