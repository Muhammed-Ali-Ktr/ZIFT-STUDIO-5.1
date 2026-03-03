// ============================================================
// YKS KONU TAKİP - APP.JS
// ============================================================

// ---- State ----
let state = {
  completed: {},   // { topicKey: true }
  stars: {},       // { topicKey: 1-5 }
};

// ---- Modal State ----
let currentModalTopic = null;

// ---- Audio ----
const audioCtx = typeof AudioContext !== 'undefined' ? new AudioContext() : null;

// ---- AYT Track Selection ----
const AYT_TRACKS = {
  sayisal: {
    label: 'Sayısal',
    hint: 'Sayısal: Matematik + Fen (Fizik, Kimya, Biyoloji)',
    subjectIds: ['ayt_matematik', 'ayt_fizik', 'ayt_kimya', 'ayt_biyoloji']
  },
  esitagirlik: {
    label: 'Eşit Ağırlık',
    hint: 'Eşit Ağırlık: Matematik + Edebiyat + Sosyal (Tarih-1, Coğrafya-1)',
    subjectIds: ['ayt_matematik', 'ayt_edebiyat', 'ayt_tarih1', 'ayt_cografya1']
  },
  sozel: {
    label: 'Sözel',
    hint: 'Sözel: Edebiyat + Sosyal (Tarih-1/2, Coğrafya-1/2, Felsefe Grubu)',
    subjectIds: ['ayt_edebiyat', 'ayt_tarih1', 'ayt_tarih2', 'ayt_cografya1', 'ayt_cografya2', 'ayt_felsefe_grubu']
  }
};

function getAytTrack() {
  return localStorage.getItem('yks_ayt_track') || '';
}

function setAytTrack(track) {
  if (!track) {
    localStorage.removeItem('yks_ayt_track');
  } else {
    localStorage.setItem('yks_ayt_track', track);
  }
}

function getExamSubjects(examId) {
  const all = (YKS_DATA[examId] && YKS_DATA[examId].subjects) ? YKS_DATA[examId].subjects : [];
  if (examId !== 'ayt') return all;
  const tr = getAytTrack();
  if (!tr || !AYT_TRACKS[tr]) return [];
  const allowed = new Set(AYT_TRACKS[tr].subjectIds);
  return all.filter(s => allowed.has(s.id));
}

function playCompleteSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.4);
}

// ---- LocalStorage ----
function loadState() {
  try {
    const saved = localStorage.getItem('yks_tracker_v2');
    if (saved) state = JSON.parse(saved);
  } catch(e) { console.error('State load error', e); }
}

function saveState() {
  localStorage.setItem('yks_tracker_v2', JSON.stringify(state));
}

// ---- Helpers ----
function topicKey(examId, subjectId, unitTitle, topicTitle) {
  return `${examId}__${subjectId}__${unitTitle}__${topicTitle}`;
}

function toBase64Url(str) {
  // Safe DOM id even with Turkish chars/spaces
  const b64 = btoa(unescape(encodeURIComponent(str)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function topicDomIdFromKey(key) {
  return `topic-${toBase64Url(key)}`;
}

function getSubjectLeafNodes(subject) {
  // Returns [{ unitTitle, topicTitle }]
  if (Array.isArray(subject.units)) {
    return subject.units.flatMap(u =>
      (u.topics || []).map(t => ({ unitTitle: u.title, topicTitle: t }))
    );
  }
  // Legacy fallback: subject.topics: string[]
  if (Array.isArray(subject.topics)) {
    return subject.topics.map(t => ({ unitTitle: 'Konular', topicTitle: t }));
  }
  return [];
}

function getUnitProgress(examId, subjectId, unitTitle, topics) {
  const done = (topics || []).filter(t => state.completed[topicKey(examId, subjectId, unitTitle, t)]).length;
  const total = (topics || []).length;
  return { total, done, pct: total > 0 ? Math.round(done / total * 100) : 0 };
}

function getExamProgress(examId) {
  let total = 0, done = 0;
  getExamSubjects(examId).forEach(subj => {
    const leaf = getSubjectLeafNodes(subj);
    total += leaf.length;
    leaf.forEach(n => {
      if (state.completed[topicKey(examId, subj.id, n.unitTitle, n.topicTitle)]) done++;
    });
  });
  return { total, done, pct: total > 0 ? Math.round(done / total * 100) : 0 };
}

function getSubjectProgress(examId, subjectId, subject) {
  const leaf = getSubjectLeafNodes(subject);
  const done = leaf.filter(n => state.completed[topicKey(examId, subjectId, n.unitTitle, n.topicTitle)]).length;
  return { total: leaf.length, done, pct: leaf.length > 0 ? Math.round(done / leaf.length * 100) : 0 };
}

function getGlobalProgress() {
  const tyt = getExamProgress('tyt');
  const ayt = getExamProgress('ayt');
  const total = tyt.total + ayt.total;
  const done = tyt.done + ayt.done;
  return { total, done, pct: total > 0 ? Math.round(done / total * 100) : 0 };
}

// ---- Toast ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ---- Ripple ----
function addRipple(e, el) {
  const r = document.createElement('span');
  r.className = 'ripple';
  const rect = el.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left) + 'px';
  r.style.top = (e.clientY - rect.top) + 'px';
  el.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

// ---- Page Navigation ----
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (pageId === 'dashboard') renderDashboard();
  if (pageId === 'home') updateHomeStats();
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ---- BUILD SUBJECT CARDS ----
function buildSubjectCard(examId, subject, delay = 0) {
  const { id: subjectId, label, icon, color } = subject;
  const prog = getSubjectProgress(examId, subjectId, subject);

  const card = document.createElement('div');
  card.className = 'subject-card';
  card.id = `subj-card-${subjectId}`;
  card.style.animationDelay = delay + 'ms';

  const units = Array.isArray(subject.units) ? subject.units : [{ title: 'Konular', topics: subject.topics || [] }];
  const unitKey = (uTitle) => `${examId}__${subjectId}__${uTitle}`;

  card.innerHTML = `
    <div class="subject-header" onclick="toggleSubject('${subjectId}')">
      <span class="subject-icon">${icon}</span>
      <div class="subject-info">
        <div class="subject-name">${label}</div>
        <div class="subject-progress-text">${prog.done} / ${prog.total} konu tamamlandı</div>
      </div>
      <div class="subject-bar-wrap">
        <div class="subject-bar">
          <div class="subject-bar-fill" id="bar-${subjectId}" style="background: linear-gradient(90deg, ${color}, ${color}99); width: ${prog.pct}%"></div>
        </div>
        <div class="subject-pct" id="pct-${subjectId}">${prog.pct}%</div>
      </div>
      <span class="subject-chevron">▼</span>
    </div>
    <div class="topics-grid" id="grid-${subjectId}">
      ${units.map((u, ui) => {
        const up = getUnitProgress(examId, subjectId, u.title, u.topics || []);
        const uk = unitKey(u.title);
        const uid = `unit-${toBase64Url(uk)}`;
        const allDone = up.total > 0 && up.done === up.total;
        return `
          <div class="topic-group" id="${uid}" style="animation-delay: ${ui * 30}ms">
            <div class="topic-group-header" role="button" tabindex="0" onclick="toggleUnit('${uid}', event)">
              <div class="topic-group-title">${u.title}</div>
              <div class="topic-group-right">
                <div class="topic-group-progress">${up.done} / ${up.total}</div>
                <button class="unit-complete-all ${allDone ? 'done' : ''}" type="button"
                  onclick="bulkToggleUnitComplete('${examId}','${subjectId}','${escapeQ(u.title)}', event)">
                  ${allDone ? '↩ Geri Al' : '✅ Hepsini Tamamla'}
                </button>
                <div class="unit-stars" aria-label="Toplu yıldız">
                  ${[1,2,3,4,5].map(n => `
                    <button class="unit-star" type="button"
                      onclick="bulkSetUnitStars('${examId}','${subjectId}','${escapeQ(u.title)}', ${n}, event)"
                      title="Hepsine ${n} yıldız ver">⭐</button>
                  `).join('')}
                </div>
                <div class="topic-group-chevron">▼</div>
              </div>
            </div>
            <div class="topic-subgrid">
              ${(u.topics || []).map((t, i) => buildTopicItem(examId, subjectId, u.title, t, color, i)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  return card;
}

function toggleUnit(unitId, event) {
  if (event) event.stopPropagation();
  const el = document.getElementById(unitId);
  if (!el) return;
  el.classList.toggle('open');
}

function getUnitTopicsFromData(examId, subjectId, unitTitle) {
  const subj = (YKS_DATA[examId]?.subjects || []).find(s => s.id === subjectId);
  if (!subj) return [];
  const units = Array.isArray(subj.units) ? subj.units : [{ title: 'Konular', topics: subj.topics || [] }];
  const unit = units.find(u => String(u.title) === String(unitTitle));
  return unit && Array.isArray(unit.topics) ? unit.topics : [];
}

function updateUnitHeaderUI(examId, subjectId, unitTitle) {
  const uid = `unit-${toBase64Url(`${examId}__${subjectId}__${unitTitle}`)}`;
  const el = document.getElementById(uid);
  if (!el) return;
  const topics = getUnitTopicsFromData(examId, subjectId, unitTitle);
  const up = getUnitProgress(examId, subjectId, unitTitle, topics);
  const allDone = up.total > 0 && up.done === up.total;
  const progEl = el.querySelector('.topic-group-progress');
  if (progEl) progEl.textContent = `${up.done} / ${up.total}`;
  const btn = el.querySelector('.unit-complete-all');
  if (btn) {
    btn.textContent = allDone ? '↩ Geri Al' : '✅ Hepsini Tamamla';
    btn.classList.toggle('done', allDone);
  }
}

function bulkToggleUnitComplete(examId, subjectId, unitTitle, event) {
  if (event) event.stopPropagation();
  const topics = getUnitTopicsFromData(examId, subjectId, unitTitle);
  if (!topics.length) return;
  const up = getUnitProgress(examId, subjectId, unitTitle, topics);
  const allDone = up.total > 0 && up.done === up.total;
  topics.forEach(t => {
    const key = topicKey(examId, subjectId, unitTitle, t);
    if (allDone) delete state.completed[key];
    else state.completed[key] = true;
    refreshTopicItem(key);
  });
  saveState();
  updateUnitHeaderUI(examId, subjectId, unitTitle);
  refreshSubjectProgress(examId, subjectId);
  refreshExamProgress(examId);
  updateHomeStats();
  showToast(allDone ? '↩ Ünite geri alındı' : '✅ Ünitedeki tüm konular tamamlandı');
}

function bulkSetUnitStars(examId, subjectId, unitTitle, n, event) {
  if (event) event.stopPropagation();
  const topics = getUnitTopicsFromData(examId, subjectId, unitTitle);
  if (!topics.length) return;
  topics.forEach(t => {
    const key = topicKey(examId, subjectId, unitTitle, t);
    state.stars[key] = n;
    const el = document.getElementById(topicDomIdFromKey(key));
    if (el) {
      const stars = el.querySelectorAll('.topic-stars .star');
      stars.forEach((s, i) => s.classList.toggle('active', i < n));
    }
    if (currentModalTopic && currentModalTopic.key === key) updateModalStars(n);
  });
  saveState();
  showToast(`⭐ Ünitedeki tüm konular ${n} yıldızlandı`);
}

function buildTopicItem(examId, subjectId, unitTitle, topicTitle, color, index) {
  const key = topicKey(examId, subjectId, unitTitle, topicTitle);
  const domId = topicDomIdFromKey(key);
  const isCompleted = !!state.completed[key];
  const starCount = state.stars[key] || 0;

  const starsHtml = [1,2,3,4,5].map(n =>
    `<span class="star ${n <= starCount ? 'active' : ''}" 
      onclick="setStar('${examId}','${subjectId}','${escapeQ(unitTitle)}','${escapeQ(topicTitle)}', ${n}, event)"
      title="${n} yıldız">⭐</span>`
  ).join('');

  return `
    <div class="topic-item ${isCompleted ? 'completed' : ''}" 
      id="${domId}" 
      style="animation-delay: ${index * 30}ms">
      <div class="topic-top">
        <span class="topic-name">${topicTitle}</span>
        <span class="topic-complete-badge">✅</span>
      </div>
      <div class="topic-stars">${starsHtml}</div>
      <div class="topic-actions">
        <button class="topic-btn btn-complete ${isCompleted ? 'done' : ''}" 
          onclick="toggleComplete('${examId}','${subjectId}','${escapeQ(unitTitle)}','${escapeQ(topicTitle)}', event)">
          ${isCompleted ? '✅ Tamamlandı' : '☐ Tamamla'}
        </button>
        <button class="topic-btn btn-video"
          onclick="openModal('${examId}','${subjectId}','${escapeQ(unitTitle)}','${escapeQ(topicTitle)}', 'video')">
          📺 Video
        </button>
        <button class="topic-btn btn-pdf"
          onclick="openModal('${examId}','${subjectId}','${escapeQ(unitTitle)}','${escapeQ(topicTitle)}', 'pdf')">
          📄 PDF
        </button>
      </div>
    </div>
  `;
}

function escapeQ(str) {
  return str.replace(/'/g, "\\'");
}

// ---- Toggle Subject Accordion ----
function toggleSubject(subjectId) {
  const card = document.getElementById(`subj-card-${subjectId}`);
  card.classList.toggle('open');
}

// ---- Toggle Complete ----
function toggleComplete(examId, subjectId, unitTitle, topicTitle, event) {
  if (event) { event.stopPropagation(); addRipple(event, event.currentTarget); }
  const key = topicKey(examId, subjectId, unitTitle, topicTitle);
  const wasCompleted = !!state.completed[key];
  if (wasCompleted) {
    delete state.completed[key];
  } else {
    state.completed[key] = true;
    playCompleteSound();
    showToast('✅ Konu tamamlandı: ' + topicTitle);
  }
  saveState();
  refreshTopicItem(key);
  refreshSubjectProgress(examId, subjectId);
  refreshExamProgress(examId);
  updateHomeStats();
}

function refreshTopicItem(key) {
  const el = document.getElementById(topicDomIdFromKey(key));
  if (!el) return;
  const isCompleted = !!state.completed[key];
  el.classList.toggle('completed', isCompleted);
  const btn = el.querySelector('.btn-complete');
  if (btn) {
    btn.textContent = isCompleted ? '✅ Tamamlandı' : '☐ Tamamla';
    btn.classList.toggle('done', isCompleted);
  }
}

function setStar(examId, subjectId, unitTitle, topicTitle, n, event) {
  event.stopPropagation();
  const key = topicKey(examId, subjectId, unitTitle, topicTitle);
  const current = state.stars[key] || 0;
  state.stars[key] = current === n ? 0 : n;
  saveState();
  // Update stars in DOM
  const el = document.getElementById(topicDomIdFromKey(key));
  if (el) {
    const stars = el.querySelectorAll('.topic-stars .star');
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < state.stars[key]);
    });
  }
  // Modal stars
  if (currentModalTopic && currentModalTopic.key === key) {
    updateModalStars(state.stars[key]);
  }
}

// ---- Refresh Progress ----
function refreshSubjectProgress(examId, subjectId) {
  const subj = YKS_DATA[examId].subjects.find(s => s.id === subjectId);
  if (!subj) return;
  const prog = getSubjectProgress(examId, subjectId, subj);
  const bar = document.getElementById('bar-' + subjectId);
  const pct = document.getElementById('pct-' + subjectId);
  const card = document.getElementById('subj-card-' + subjectId);
  if (bar) bar.style.width = prog.pct + '%';
  if (pct) pct.textContent = prog.pct + '%';
  if (card) {
    const info = card.querySelector('.subject-progress-text');
    if (info) info.textContent = `${prog.done} / ${prog.total} konu tamamlandı`;
  }
}

function refreshExamProgress(examId) {
  const prog = getExamProgress(examId);
  const arc = document.getElementById(`${examId}OverallArc`);
  const pct = document.getElementById(`${examId}OverallPct`);
  if (arc) arc.setAttribute('stroke-dasharray', `${prog.pct} ${100 - prog.pct}`);
  if (pct) pct.textContent = prog.pct + '%';
}

// ---- Home Stats ----
function updateHomeStats() {
  const global = getGlobalProgress();
  const tyt = getExamProgress('tyt');
  const ayt = getExamProgress('ayt');

  setText('homeTotalTopics', global.total);
  setText('homeCompletedTopics', global.done);
  setText('homePercent', '%' + global.pct);

  setWidth('tytHomeProgress', tyt.pct + '%');
  setWidth('aytHomeProgress', ayt.pct + '%');
  setText('tytHomePercent', '%' + tyt.pct);
  setText('aytHomePercent', '%' + ayt.pct);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setWidth(id, val) {
  const el = document.getElementById(id);
  if (el) el.style.width = val;
}

// ---- Render Subjects ----
function renderSubjects(examId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  getExamSubjects(examId).forEach((subj, i) => {
    const card = buildSubjectCard(examId, subj, i * 50);
    container.appendChild(card);
  });
  refreshExamProgress(examId);
}

// ---- Dashboard ----
function renderDashboard() {
  const global = getGlobalProgress();
  const tyt = getExamProgress('tyt');
  const ayt = getExamProgress('ayt');

  setText('dashTotal', global.total);
  setText('dashCompleted', global.done);
  setText('dashRemaining', global.total - global.done);
  setText('dashPercent', '%' + global.pct);
  setText('dashTytPct', tyt.pct + '%');
  setText('dashAytPct', ayt.pct + '%');

  // Animate arcs (circumference 50*2*PI ≈ 314)
  animateArc('dashTytArc', tyt.pct, 314);
  animateArc('dashAytArc', ayt.pct, 314);

  // Subject rows
  const container = document.getElementById('dashSubjectsProgress');
  container.innerHTML = '<h3 style="font-family:\'Syne\',sans-serif;font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;">Ders Bazlı İlerleme</h3>';

  ['tyt','ayt'].forEach(examId => {
    getExamSubjects(examId).forEach(subj => {
      const prog = getSubjectProgress(examId, subj.id, subj);
      const row = document.createElement('div');
      row.className = 'dash-subj-row';
      row.innerHTML = `
        <span class="dash-subj-icon">${subj.icon}</span>
        <span class="dash-subj-name">${subj.label}</span>
        <span class="dash-subj-exam">${examId.toUpperCase()}</span>
        <div class="dash-subj-bar">
          <div class="dash-subj-bar-fill" style="background: linear-gradient(90deg, ${subj.color}, ${subj.color}88); width: ${prog.pct}%"></div>
        </div>
        <span class="dash-subj-pct" style="color:${subj.color}">${prog.pct}%</span>
      `;
      container.appendChild(row);
    });
  });
}

function animateArc(id, pct, circumference) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = (pct / 100) * circumference;
  el.setAttribute('stroke-dasharray', `${target} ${circumference - target}`);
}

// ---- Modal ----
function openModal(examId, subjectId, unitTitle, topicTitle, tab) {
  const key = topicKey(examId, subjectId, unitTitle, topicTitle);
  currentModalTopic = { examId, subjectId, unitTitle, topicTitle, key };

  document.getElementById('modalTitle').textContent = `${unitTitle} — ${topicTitle}`;
  updateModalStars(state.stars[key] || 0);
  updateModalCompleteBtn(!!state.completed[key]);

  // Video section
  const videoDiv = document.getElementById('modalVideo');
  const fullQuery = `${unitTitle} ${topicTitle}`;
  const searchQuery = encodeURIComponent(fullQuery + ' konu anlatımı');
  videoDiv.innerHTML = `
    <div class="modal-video-placeholder">
      <span>📺</span>
      <span>YouTube'da "${topicTitle}" için arama yapın</span>
      <a href="https://www.youtube.com/results?search_query=${searchQuery}" target="_blank" rel="noopener" 
        style="color: var(--accent1); font-weight:600; font-size:0.85rem; text-decoration:none; padding: 0.5rem 1rem; background: rgba(110,231,247,0.1); border-radius: 8px; border: 1px solid rgba(110,231,247,0.2); transition: all 0.3s; display:inline-block"
        onmouseover="this.style.background='rgba(110,231,247,0.2)'" 
        onmouseout="this.style.background='rgba(110,231,247,0.1)'">
        🔗 YouTube'da Aç
      </a>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalStars(count) {
  const stars = document.getElementById('modalStars');
  if (!stars || !currentModalTopic) return;
  const { examId, subjectId, unitTitle, topicTitle } = currentModalTopic;
  stars.innerHTML = [1,2,3,4,5].map(n =>
    `<span class="star ${n <= count ? 'active' : ''}" 
      onclick="setStar('${examId}','${subjectId}','${escapeQ(unitTitle)}','${escapeQ(topicTitle)}', ${n}, event)"
      title="${n} yıldız">⭐</span>`
  ).join('');
}

function updateModalCompleteBtn(isDone) {
  const btn = document.getElementById('modalCompleteBtn');
  if (!btn) return;
  btn.textContent = isDone ? '✅ Tamamlandı (Geri Al)' : '☐ Tamamlandı İşaretle';
  btn.classList.toggle('done', isDone);
}

function toggleCompleteFromModal() {
  if (!currentModalTopic) return;
  const { examId, subjectId, unitTitle, topicTitle } = currentModalTopic;
  toggleComplete(examId, subjectId, unitTitle, topicTitle, null);
  updateModalCompleteBtn(!!state.completed[currentModalTopic.key]);
}

function openPDF() {
  if (!currentModalTopic) return;
  const q = encodeURIComponent(`${currentModalTopic.unitTitle} ${currentModalTopic.topicTitle} konu özeti pdf`);
  window.open(`https://www.google.com/search?q=${q}`, '_blank', 'noopener');
}

function closeTopicModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentModalTopic = null;
}

function closeModal(event) {
  if (event.target === document.getElementById('modalOverlay')) {
    closeTopicModal();
  }
}

// ---- Reset ----
function confirmReset() {
  document.getElementById('confirmOverlay').classList.add('open');
}
function cancelReset() {
  document.getElementById('confirmOverlay').classList.remove('open');
}
function doReset() {
  state = { completed: {}, stars: {} };
  saveState();
  cancelReset();
  renderSubjects('tyt', 'tytSubjects');
  renderSubjects('ayt', 'aytSubjects');
  updateHomeStats();
  renderDashboard();
  showToast('🗑️ Tüm veriler sıfırlandı');
}

function migrateLegacyStateIfNeeded() {
  // Legacy keys were: `${examId}__${subjectId}__${topicName}`
  // New keys are: `${examId}__${subjectId}__${unitTitle}__${topicTitle}`
  // Migration rule: if legacy topicName matches a unit title (or "1️⃣ X" without emoji),
  // mark all its subtopics with same completion/stars to avoid losing progress.
  const completedKeys = Object.keys(state.completed || {});
  const starKeys = Object.keys(state.stars || {});
  const legacyCandidates = new Set([...completedKeys, ...starKeys].filter(k => k.split('__').length === 3));
  if (legacyCandidates.size === 0) return;

  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr');
  const stripLeadingEmojiNumber = (s) => (s || '').replace(/^\s*\d+️⃣?\s*/u, '').trim();

  let changed = false;
  legacyCandidates.forEach(k => {
    const parts = k.split('__');
    const examId = parts[0];
    const subjectId = parts[1];
    const legacyTopic = parts.slice(2).join('__');

    const exam = YKS_DATA[examId];
    if (!exam) return;
    const subj = exam.subjects.find(s => s.id === subjectId);
    if (!subj) return;
    if (!Array.isArray(subj.units)) return;

    const legacyNorm = normalize(legacyTopic);
    const unit = subj.units.find(u => {
      const uTitle = u.title || '';
      return normalize(uTitle) === legacyNorm || normalize(stripLeadingEmojiNumber(uTitle)) === legacyNorm;
    });
    if (!unit) return;

    const isDone = !!state.completed[k];
    const stars = state.stars[k];
    (unit.topics || []).forEach(t => {
      const nk = topicKey(examId, subjectId, unit.title, t);
      if (isDone) state.completed[nk] = true;
      if (typeof stars === 'number' && stars >= 0) state.stars[nk] = stars;
    });

    if (k in state.completed) { delete state.completed[k]; changed = true; }
    if (k in state.stars) { delete state.stars[k]; changed = true; }
  });

  if (changed) saveState();
}

// ---- Theme ----
function initTheme() {
  const saved = localStorage.getItem('yks_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').querySelector('.theme-icon').textContent =
    saved === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('yks_theme', next);
  document.getElementById('themeToggle').querySelector('.theme-icon').textContent =
    next === 'dark' ? '🌙' : '☀️';
}

// ---- Hamburger ----
function initHamburger() {
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}

// ---- Scroll Navbar ----
function initScrollNavbar() {
  window.addEventListener('scroll', () => {
    const nb = document.getElementById('navbar');
    if (window.scrollY > 40) {
      nb.style.background = 'rgba(10,10,15,0.95)';
    } else {
      nb.style.background = '';
    }
  }, { passive: true });
}

function initAytTrackUI() {
  const card = document.getElementById('aytTrackCard');
  const hint = document.getElementById('aytTrackHint');
  const resetBtn = document.getElementById('aytTrackResetBtn');
  const buttons = Array.from(document.querySelectorAll('.ayt-track-btn'));
  if (!card || !hint || !resetBtn || buttons.length === 0) return;

  const apply = () => {
    const tr = getAytTrack();
    buttons.forEach(b => b.classList.toggle('active', b.dataset.track === tr));
    resetBtn.style.display = tr ? 'inline-flex' : 'none';
    hint.textContent = tr && AYT_TRACKS[tr] ? AYT_TRACKS[tr].hint : 'Devam etmek için bir alan seç.';

    // Render AYT subjects based on selection
    renderSubjects('ayt', 'aytSubjects');
    refreshExamProgress('ayt');
    updateHomeStats();

    // If dashboard open, keep consistent
    const dash = document.getElementById('page-dashboard');
    if (dash && dash.classList.contains('active')) renderDashboard();
  };

  buttons.forEach(b => {
    b.addEventListener('click', () => {
      const tr = b.dataset.track;
      setAytTrack(tr);
      apply();
      showToast('🎯 AYT alanı seçildi: ' + (AYT_TRACKS[tr]?.label || tr));
    });
  });

  resetBtn.addEventListener('click', () => {
    setAytTrack('');
    apply();
    showToast('🔁 AYT alan seçimi sıfırlandı');
  });

  apply();
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  migrateLegacyStateIfNeeded();
  initTheme();
  initHamburger();
  initScrollNavbar();
  initAytTrackUI();

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Render subject pages
  renderSubjects('tyt', 'tytSubjects');
  // AYT is rendered by initAytTrackUI (based on selection)

  // Home stats
  updateHomeStats();

  // Default page
  showPage('home');

  // Keyboard close modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTopicModal();
      cancelReset();
    }
  });

  // Animate progress fills on home after small delay
  setTimeout(() => {
    const tyt = getExamProgress('tyt');
    const ayt = getExamProgress('ayt');
    setWidth('tytHomeProgress', tyt.pct + '%');
    setWidth('aytHomeProgress', ayt.pct + '%');
  }, 300);
});
