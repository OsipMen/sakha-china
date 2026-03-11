// ===== SAKHA-CHINA ROADMAP PAGE =====

// ===== INFO EXPLANATIONS DATABASE =====
const infoExplanations = {
    roadmapOverview: {
        title: '🗓️ Дорожная карта проекта',
        content: `
            <p><strong>Назначение:</strong> Поэтапный план развития Sakha-China на 36 месяцев с геймификацией прогресса.</p>
            <p><strong>4 этапа развития:</strong></p>
            <ul>
                <li><strong>Этап 1 (М1-4):</strong> Запуск и MVP — регистрация, разработка, первые заказы</li>
                <li><strong>Этап 2 (М5-8):</strong> Агрегатор и рост — подключение партнёров, AI-ассистент</li>
                <li><strong>Этап 3 (М9-18):</strong> Масштабирование — регионы ДВ, B2B, прямые API</li>
                <li><strong>Этап 4 (М19-36):</strong> Экспансия — франшиза, Series A, международный рынок</li>
            </ul>
            <p><strong>Геймификация:</strong> Выполнение задач даёт XP, открытие наград, достижения, повышение уровня.</p>
            <p><strong>Сохранение:</strong> Прогресс автоматически сохраняется в localStorage браузера.</p>
        `
    },
    achievements: {
        title: '🏆 Достижения и статистика',
        content: `
            <p><strong>Система достижений:</strong></p>
            <ul>
                <li>Выполнение задач даёт XP (опыт)</li>
                <li>Накопление XP повышает уровень</li>
                <li>Открытие достижений за里程碑 (первый заказ, 100 заказов, 1000 заказов...)</li>
                <li>Награды за завершение этапов</li>
            </ul>
            <p><strong>Статистика отслеживает:</strong></p>
            <ul>
                <li>Всего XP</li>
                <li>Выполнено задач (из 24)</li>
                <li>Получено наград (из 8)</li>
                <li>Открыто достижений (из 20)</li>
                <li>Текущий уровень</li>
            </ul>
            <p><strong>Совет:</strong> Отмечайте выполненные задачи честно — это ваш личный трекер прогресса!</p>
        `
    }
};

// ===== GLOBAL STATE =====
const roadmapState = {
    currentLevel: 1,
    totalXP: 0,
    completedTasks: [],
    unlockedRewards: [],
    unlockedAchievements: ['achievement-0'], // Новичок по умолчанию
    phaseMetrics: {},
    lastSaved: null
};

// ===== TASK DEFINITIONS =====
const taskDefinitions = {
    '1.1': { xp: 100, title: 'Регистрация ООО и открытие счетов' },
    '1.2': { xp: 500, title: 'Разработка MVP приложения' },
    '1.3': { xp: 300, title: 'Настройка склада в Хэйхэ' },
    '1.4': { xp: 200, title: 'Подключение платёжного агента' },
    '1.5': { xp: 400, title: 'Тестовые заказы (20-30 шт)' },
    '1.6': { xp: 150, title: 'Регистрация в «Честный ЗНАК»' },
    '2.1': { xp: 300, title: 'Поиск и проверка логистических партнёров' },
    '2.2': { xp: 400, title: 'Разработка калькулятора доставки' },
    '2.3': { xp: 250, title: 'Запуск Telegram-бота' },
    '2.4': { xp: 200, title: 'Форма «Найти в Китае»' },
    '2.5': { xp: 350, title: 'Маркетинг роста' },
    '3.1': { xp: 600, title: 'Открытие регионов ДВ' },
    '3.2': { xp: 500, title: 'B2B-портал' },
    '3.3': { xp: 700, title: 'Прямые API (Poizon, Alibaba)' },
    '3.4': { xp: 550, title: 'AI-ассистент 2.0' },
    '3.5': { xp: 300, title: 'Премиум-подписка' },
    '4.1': { xp: 1000, title: 'Франшиза модели' },
    '4.2': { xp: 800, title: 'SaaS для агрегаторов' },
    '4.3': { xp: 1200, title: 'Подготовка к Series A' },
    '4.4': { xp: 900, title: 'Экосистема сервисов' }
};

// ===== REWARD DEFINITIONS =====
const rewardDefinitions = {
    'reward1-1': { xp: 1000, name: '🎖️ Пионер', requirement: 'phase1-complete' },
    'reward1-2': { xp: 500, name: '📈 Безубыточность', requirement: 'phase1-breakeven' },
    'reward2-1': { xp: 1500, name: '🎖️ Агрегатор', requirement: 'phase2-complete' },
    'reward2-2': { xp: 1000, name: '👥 5 000 пользователей', requirement: 'phase2-users' },
    'reward3-1': { xp: 2000, name: '🎖️ Лидер ДВ', requirement: 'phase3-complete' },
    'reward3-2': { xp: 1500, name: '🚀 1 млн ₽/мес прибыль', requirement: 'phase3-profit' },
    'reward4-1': { xp: 5000, name: '👑 Империя', requirement: 'phase4-complete' },
    'reward4-2': { xp: 3000, name: '🦄 Единорог', requirement: 'phase4-valuation' }
};

// ===== ACHIEVEMENT DEFINITIONS =====
const achievementDefinitions = {
    'achievement-0': { name: 'Новичок', description: 'За регистрацию в системе', xp: 50 },
    'achievement-1': { name: 'Первый заказ', description: 'За обработку первого заказа', xp: 100 },
    'achievement-2': { name: 'Сотня', description: 'За 100 обработанных заказов', xp: 500 },
    'achievement-3': { name: 'Тысячник', description: 'За 1000 обработанных заказов', xp: 2000 }
};

// ===== LEVEL THRESHOLDS =====
const levelThresholds = [
    { level: 1, xp: 0 },
    { level: 2, xp: 500 },
    { level: 3, xp: 1500 },
    { level: 4, xp: 3000 },
    { level: 5, xp: 5000 },
    { level: 6, xp: 8000 },
    { level: 7, xp: 12000 },
    { level: 8, xp: 17000 },
    { level: 9, xp: 23000 },
    { level: 10, xp: 30000 }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. Active Navigation =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.header-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && currentPage === linkHref) {
            link.classList.add('active');
        }
    });
    
    // ===== 2. Load State from localStorage =====
    loadState();
    
    // ===== 3. Restore Task Checkboxes =====
    roadmapState.completedTasks.forEach(taskId => {
        const checkbox = document.getElementById(`task${taskId.replace('.', '-')}`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.closest('.task-card').classList.add('completed');
            // Disable if from locked phase
            const phase = checkbox.getAttribute('data-phase');
            if (phase > 1 && !isPhaseUnlocked(parseInt(phase))) {
                checkbox.disabled = true;
            }
        }
    });
    
    // ===== 4. Update Phase Statuses =====
    updatePhaseStatuses();
    
    // ===== 5. Update Rewards and Achievements =====
    updateRewards();
    updateAchievements();
    
    // ===== 6. Update Stats =====
    updateStats();
    
    // ===== 7. Info Icon Handlers =====
    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.getAttribute('data-info');
            if (key && infoExplanations[key]) {
                openInfoModal(key);
            }
        });
    });
    
    // ===== 8. Console Info =====
    console.log('%c SAKHA-CHINA ', 'background: #3498db; color: #fff; font-size: 16px; font-weight: bold; padding: 4px 8px;');
    console.log('%c Roadmap Page Loaded ', 'color: #9b59b6; font-size: 12px;');
    console.log('%c Osmart company ', 'color: #f39c12; font-size: 12px;');
    console.log(`%c Level ${roadmapState.currentLevel} · ${roadmapState.totalXP} XP `, 'color: #2ecc71; font-size: 12px;');
    
});

// ===== STATE MANAGEMENT =====
function loadState() {
    const saved = localStorage.getItem('sakha-china-roadmap');
    if (saved) {
        const parsed = JSON.parse(saved);
        roadmapState.currentLevel = parsed.currentLevel || 1;
        roadmapState.totalXP = parsed.totalXP || 0;
        roadmapState.completedTasks = parsed.completedTasks || [];
        roadmapState.unlockedRewards = parsed.unlockedRewards || [];
        roadmapState.unlockedAchievements = parsed.unlockedAchievements || ['achievement-0'];
        roadmapState.phaseMetrics = parsed.phaseMetrics || {};
        roadmapState.lastSaved = parsed.lastSaved || null;
    }
}

function saveState() {
    roadmapState.lastSaved = new Date().toISOString();
    localStorage.setItem('sakha-china-roadmap', JSON.stringify(roadmapState));
    console.log('💾 Roadmap state saved');
}

// ===== TASK COMPLETION =====
function updateTaskStatus(taskId, phase) {
    const checkbox = document.getElementById(`task${taskId.replace('.', '-')}`);
    const taskCard = checkbox.closest('.task-card');
    const taskDef = taskDefinitions[taskId];
    
    if (checkbox.checked) {
        // Task completed
        if (!roadmapState.completedTasks.includes(taskId)) {
            roadmapState.completedTasks.push(taskId);
            taskCard.classList.add('completed');
            
            // Add XP
            if (taskDef && taskDef.xp) {
                addXP(taskDef.xp);
                showNotification(`✅ ${taskDef.title}`, `+${taskDef.xp} XP`);
            }
            
            // Check phase completion
            checkPhaseCompletion(phase);
        }
    } else {
        // Task uncompleted
        const index = roadmapState.completedTasks.indexOf(taskId);
        if (index > -1) {
            roadmapState.completedTasks.splice(index, 1);
            taskCard.classList.remove('completed');
            
            // Remove XP (optional - could keep for motivation)
            // For now, we keep XP even if unchecked
        }
    }
    
    updateStats();
    saveState();
}

// ===== PHASE MANAGEMENT =====
function isPhaseUnlocked(phaseNum) {
    if (phaseNum === 1) return true;
    
    const prevPhaseTasks = Object.keys(taskDefinitions).filter(id => {
        const taskPhase = parseInt(id.split('.')[0]);
        return taskPhase === phaseNum - 1;
    });
    
    const completedPrevPhase = prevPhaseTasks.every(id => 
        roadmapState.completedTasks.includes(id)
    );
    
    return completedPrevPhase;
}

function updatePhaseStatuses() {
    for (let phase = 1; phase <= 4; phase++) {
        const statusEl = document.getElementById(`phase${phase}Status`);
        const section = document.getElementById(`phase${phase}`);
        const inputs = section.querySelectorAll('input, select');
        
        if (phase === 1) {
            statusEl.textContent = '🟢 В работе';
            statusEl.style.background = 'rgba(46, 204, 113, 0.2)';
            statusEl.style.color = 'var(--accent-green)';
            section.setAttribute('data-phase', phase);
        } else if (isPhaseUnlocked(phase)) {
            statusEl.textContent = '🟡 Доступно';
            statusEl.style.background = 'rgba(243, 156, 18, 0.2)';
            statusEl.style.color = 'var(--accent-yellow)';
            section.setAttribute('data-phase', phase);
            inputs.forEach(input => input.disabled = false);
        } else {
            statusEl.textContent = '⚪ Заблокировано';
            statusEl.style.background = 'rgba(148, 163, 184, 0.2)';
            statusEl.style.color = 'var(--text-muted)';
            section.setAttribute('data-phase', phase);
            inputs.forEach(input => input.disabled = true);
        }
    }
    
    updateOverallProgress();
}

function checkPhaseCompletion(phase) {
    const phaseTasks = Object.keys(taskDefinitions).filter(id => {
        const taskPhase = parseInt(id.split('.')[0]);
        return taskPhase === phase;
    });
    
    const allCompleted = phaseTasks.every(id => 
        roadmapState.completedTasks.includes(id)
    );
    
    if (allCompleted) {
        // Award phase completion reward
        const rewardId = `reward${phase}-1`;
        if (rewardDefinitions[rewardId] && !roadmapState.unlockedRewards.includes(rewardId)) {
            unlockReward(rewardId);
        }
        
        // Unlock next phase
        if (phase < 4) {
            showNotification(`🎉 Этап ${phase} завершён!`, `Этап ${phase + 1} разблокирован`);
        } else {
            showNotification(`🏆 ПОЗДРАВЛЯЕМ!`, `Все этапы завершены!`);
        }
        
        updatePhaseStatuses();
    }
}

function updatePhaseMetric(phase, metric) {
    const input = document.getElementById(`phase${phase}${metric.charAt(0).toUpperCase() + metric.slice(1)}`);
    if (!input) return;
    
    const value = input.value;
    
    if (!roadmapState.phaseMetrics[phase]) {
        roadmapState.phaseMetrics[phase] = {};
    }
    roadmapState.phaseMetrics[phase][metric] = value;
    
    // Check for metric-based rewards
    checkMetricRewards(phase, metric, value);
    
    saveState();
}

function checkMetricRewards(phase, metric, value) {
    // Example: Check for breakeven reward
    if (phase === 1 && metric === 'breakeven' && value === 'yes') {
        const rewardId = 'reward1-2';
        if (rewardDefinitions[rewardId] && !roadmapState.unlockedRewards.includes(rewardId)) {
            unlockReward(rewardId);
        }
    }
}

// ===== XP AND LEVELING =====
function addXP(amount) {
    roadmapState.totalXP += amount;
    
    // Check for level up
    const newLevel = calculateLevel(roadmapState.totalXP);
    if (newLevel > roadmapState.currentLevel) {
        roadmapState.currentLevel = newLevel;
        showNotification(`🎊 Уровень повышен!`, `Уровень ${newLevel}`);
    }
    
    updateStats();
    saveState();
}

function calculateLevel(xp) {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (xp >= levelThresholds[i].xp) {
            return levelThresholds[i].level;
        }
    }
    return 1;
}

function getXPForNextLevel() {
    const currentLevel = roadmapState.currentLevel;
    const nextThreshold = levelThresholds.find(t => t.level === currentLevel + 1);
    return nextThreshold ? nextThreshold.xp : 'MAX';
}

function getLevelProgress() {
    const currentLevel = roadmapState.currentLevel;
    const currentThreshold = levelThresholds.find(t => t.level === currentLevel);
    const nextThreshold = levelThresholds.find(t => t.level === currentLevel + 1);
    
    if (!nextThreshold) return 100;
    
    const xpInCurrentLevel = roadmapState.totalXP - currentThreshold.xp;
    const xpNeeded = nextThreshold.xp - currentThreshold.xp;
    
    return (xpInCurrentLevel / xpNeeded) * 100;
}

// ===== REWARDS =====
function unlockReward(rewardId) {
    if (roadmapState.unlockedRewards.includes(rewardId)) return;
    
    roadmapState.unlockedRewards.push(rewardId);
    
    const rewardDef = rewardDefinitions[rewardId];
    if (rewardDef && rewardDef.xp) {
        addXP(rewardDef.xp);
    }
    
    // Update UI
    const rewardCard = document.getElementById(rewardId);
    if (rewardCard) {
        rewardCard.classList.remove('locked');
        rewardCard.classList.add('unlocked');
    }
    
    showNotification(`🏆 Награда получена!`, rewardDef ? rewardDef.name : '');
    saveState();
}

function updateRewards() {
    roadmapState.unlockedRewards.forEach(rewardId => {
        const rewardCard = document.getElementById(rewardId);
        if (rewardCard) {
            rewardCard.classList.remove('locked');
            rewardCard.classList.add('unlocked');
        }
    });
}

// ===== ACHIEVEMENTS =====
function unlockAchievement(achievementId) {
    if (roadmapState.unlockedAchievements.includes(achievementId)) return;
    
    roadmapState.unlockedAchievements.push(achievementId);
    
    const achievementDef = achievementDefinitions[achievementId];
    if (achievementDef && achievementDef.xp) {
        addXP(achievementDef.xp);
    }
    
    showNotification(`🎯 Достижение!`, achievementDef ? achievementDef.name : '');
    saveState();
}

function updateAchievements() {
    roadmapState.unlockedAchievements.forEach(achievementId => {
        const achievementCard = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (achievementCard) {
            achievementCard.classList.remove('locked');
            achievementCard.classList.add('unlocked');
        }
    });
}

// ===== STATS UPDATE =====
function updateStats() {
    document.getElementById('totalXP').textContent = roadmapState.totalXP.toLocaleString();
    document.getElementById('completedTasks').textContent = `${roadmapState.completedTasks.length}/24`;
    document.getElementById('earnedRewards').textContent = `${roadmapState.unlockedRewards.length}/8`;
    document.getElementById('unlockedAchievements').textContent = `${roadmapState.unlockedAchievements.length}/20`;
    document.getElementById('currentLevel').textContent = roadmapState.currentLevel;
    
    const nextLevelXP = getXPForNextLevel();
    document.getElementById('nextLevelXP').textContent = nextLevelXP === 'MAX' ? 'MAX' : `${nextLevelXP.toLocaleString()} XP`;
    
    const levelProgress = getLevelProgress();
    document.getElementById('levelProgressBar').style.width = `${levelProgress}%`;
    
    updateOverallProgress();
}

function updateOverallProgress() {
    const totalTasks = 24;
    const completedTasks = roadmapState.completedTasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    
    document.getElementById('overallProgress').textContent = `${Math.round(progress)}%`;
    document.getElementById('overallProgressBar').style.width = `${progress}%`;
    
    // Update stage indicators
    for (let i = 1; i <= 4; i++) {
        const stage = document.querySelector(`[data-stage="${i}"]`);
        if (stage) {
            const stageTasks = Object.keys(taskDefinitions).filter(id => parseInt(id.split('.')[0]) === i);
            const completedStageTasks = stageTasks.filter(id => roadmapState.completedTasks.includes(id)).length;
            
            if (completedStageTasks === stageTasks.length) {
                stage.classList.add('completed');
                stage.classList.remove('active');
            } else if (completedStageTasks > 0) {
                stage.classList.add('active');
                stage.classList.remove('completed');
            } else {
                stage.classList.remove('completed', 'active');
            }
        }
    }
}

// ===== NOTIFICATIONS =====
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--bg-card);
                border: 1px solid var(--accent-green);
                border-radius: 10px;
                padding: 16px 20px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                z-index: 1001;
                animation: slideIn 0.3s ease-out;
                max-width: 300px;
            }
            .notification-content strong {
                display: block;
                color: var(--accent-green);
                margin-bottom: 4px;
            }
            .notification-content p {
                color: var(--text-muted);
                font-size: 13px;
                margin: 0;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== INFO MODAL (Same as Calculator) =====
function openInfoModal(key) {
    const info = infoExplanations[key];
    if (!info) return;
    
    document.getElementById('infoModalTitle').textContent = info.title;
    document.getElementById('infoModalBody').innerHTML = info.content;
    
    // Create modal if not exists
    if (!document.getElementById('infoModal')) {
        const modal = document.createElement('div');
        modal.id = 'infoModal';
        modal.className = 'info-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="info-modal-content">
                <div class="info-modal-header">
                    <h4 id="infoModalTitle">Пояснение</h4>
                    <button class="info-modal-close" onclick="closeInfoModal()">×</button>
                </div>
                <div class="info-modal-body" id="infoModalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeInfoModal();
        });
    }
    
    document.getElementById('infoModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeInfoModal();
});

// ===== EXPORT/IMPORT =====
function exportProgress() {
    const data = JSON.stringify(roadmapState, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sakha-china-roadmap-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('📥 Экспорт', 'Прогресс сохранён в файл');
}

function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const imported = JSON.parse(event.target.result);
                Object.assign(roadmapState, imported);
                saveState();
                location.reload();
                showNotification('📤 Импорт', 'Прогресс загружен');
            } catch (err) {
                alert('❌ Ошибка импорта: неверный формат файла');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ===== RESET PROGRESS =====
function resetProgress() {
    if (confirm('⚠️ Вы уверены? Весь прогресс будет сброшен!')) {
        localStorage.removeItem('sakha-china-roadmap');
        location.reload();
    }
}

// ===== PAGE NAVIGATION =====
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (e.key === 'ArrowLeft' && currentPage === 'Roadmap.html') {
        window.location.href = 'Calculator.html';
    }
});

// ===== AUTO-SAVE =====
setInterval(() => {
    saveState();
}, 60000); // Save every minute

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        saveState();
    }
});