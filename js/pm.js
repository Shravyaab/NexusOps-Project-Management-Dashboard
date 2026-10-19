
/* ════ DATA ════ */
const TODAY = new Date('2026-06-28');

const DEPT_TREE = [
    {
        name: 'Corporate Office', icon: '🏛️', wm: 'Hybrid', subs: [
            { name: 'Executive', lead: 'Priya Nair', wm: 'On-site' },
            { name: 'HR & People', lead: 'Meera Pillai', wm: 'Hybrid' },
            { name: 'Finance', lead: 'Karthik Iyer', wm: 'Hybrid' },
            { name: 'Legal', lead: '', wm: 'Remote' },
        ]
    },
    {
        name: 'Design & Development', icon: '🎨', wm: 'Remote', subs: [
            { name: 'UI/UX Design', lead: 'Asha Rao', wm: 'Remote' },
            { name: 'Frontend Dev', lead: 'Rahul Sen', wm: 'Remote' },
            { name: 'Backend Dev', lead: '', wm: 'Remote' },
            { name: 'QA & Testing', lead: '', wm: 'Hybrid' },
        ]
    },
    {
        name: 'Production', icon: '⚙️', wm: 'On-site', subs: [
            { name: 'Manufacturing', lead: 'Vivek Sharma', wm: 'On-site' },
            { name: 'Logistics', lead: '', wm: 'On-site' },
            { name: 'Quality Control', lead: '', wm: 'On-site' },
        ]
    },
    {
        name: 'Marketing', icon: '📣', wm: 'Hybrid', subs: [
            { name: 'Digital Marketing', lead: 'Neha Gupta', wm: 'Remote' },
            { name: 'Content & Brand', lead: '', wm: 'Hybrid' },
            { name: 'PR & Comms', lead: '', wm: 'Hybrid' },
        ]
    },
    {
        name: 'Sales', icon: '📈', wm: 'Hybrid', subs: [
            { name: 'Inside Sales', lead: 'Karthik Iyer', wm: 'Hybrid' },
            { name: 'Enterprise', lead: '', wm: 'On-site' },
            { name: 'Partnerships', lead: '', wm: 'Remote' },
            { name: 'Customer Success', lead: '', wm: 'Remote' },
        ]
    },
];

let TEAM = [
    { name: 'Priya Nair', role: 'Director', dept: 'Corporate Office', sub: 'Executive', rep: '', rate: 120, hrs: 40, wm: 'On-site' },
    { name: 'Meera Pillai', role: 'Manager', dept: 'Corporate Office', sub: 'HR & People', rep: 'Priya Nair', rate: 95, hrs: 38, wm: 'Hybrid' },
    { name: 'Karthik Iyer', role: 'Manager', dept: 'Sales', sub: 'Inside Sales', rep: 'Priya Nair', rate: 90, hrs: 36, wm: 'Hybrid' },
    { name: 'Asha Rao', role: 'Team Lead', dept: 'Design & Development', sub: 'UI/UX Design', rep: 'Meera Pillai', rate: 85, hrs: 42, wm: 'Remote' },
    { name: 'Rahul Sen', role: 'Employee', dept: 'Design & Development', sub: 'Frontend Dev', rep: 'Asha Rao', rate: 65, hrs: 40, wm: 'Remote' },
    { name: 'Neha Gupta', role: 'Employee', dept: 'Marketing', sub: 'Digital Marketing', rep: 'Meera Pillai', rate: 60, hrs: 35, wm: 'Remote' },
    { name: 'Vivek Sharma', role: 'Team Lead', dept: 'Production', sub: 'Manufacturing', rep: 'Karthik Iyer', rate: 75, hrs: 44, wm: 'On-site' },
];

let PROJECTS = [
    { name: 'Website Redesign', dept: 'Design & Development', lead: 'Asha Rao', alloc: 80000, spent: 38000, due: '2026-07-10', wm: 'Remote' },
    { name: 'Client Migration', dept: 'Corporate Office', lead: 'Meera Pillai', alloc: 120000, spent: 74000, due: '2026-07-20', wm: 'Hybrid' },
    { name: 'Q3 Marketing Campaign', dept: 'Marketing', lead: 'Neha Gupta', alloc: 45000, spent: 12000, due: '2026-08-01', wm: 'Remote' },
    { name: 'Product Launch', dept: 'Production', lead: 'Vivek Sharma', alloc: 200000, spent: 88000, due: '2026-09-01', wm: 'On-site' },
];

let SPRINTS = [
    { name: 'Sprint 12', goal: 'Ship website redesign hero + nav. Close Q3 budget sign-off.', start: '2026-06-15', end: '2026-06-28', budget: 25000, bspent: 22000 },
    { name: 'Sprint 13', goal: 'Client migration blockers cleared. Brand guide v2 published.', start: '2026-06-29', end: '2026-07-12', budget: 28000, bspent: 6000 },
];

let TASKS = [
    { name: 'Website redesign hero', emp: 'Asha Rao', dept: 'Design & Development', sub: 'UI/UX Design', proj: 'Website Redesign', sprint: 'Sprint 12', stage: 'In Progress', pri: 'High', ss: '09:00', se: '13:00', due: '2026-07-10' },
    { name: 'Mobile app icon set', emp: 'Rahul Sen', dept: 'Design & Development', sub: 'Frontend Dev', proj: 'Website Redesign', sprint: 'Sprint 13', stage: 'Not Started', pri: 'Medium', ss: '14:00', se: '17:00', due: '2026-07-18' },
    { name: 'Q3 budget planning', emp: 'Karthik Iyer', dept: 'Sales', sub: 'Inside Sales', proj: 'Client Migration', sprint: 'Sprint 12', stage: 'In Review', pri: 'High', ss: '09:00', se: '12:00', due: '2026-07-01' },
    { name: 'Team onboarding docs', emp: 'Meera Pillai', dept: 'Corporate Office', sub: 'HR & People', proj: 'Client Migration', sprint: 'Sprint 12', stage: 'Completed', pri: 'Low', ss: '13:00', se: '15:00', due: '2026-06-10' },
    { name: 'Client migration setup', emp: 'Meera Pillai', dept: 'Corporate Office', sub: 'HR & People', proj: 'Client Migration', sprint: 'Sprint 13', stage: 'On Hold', pri: 'High', ss: '10:00', se: '12:00', due: '2026-07-20' },
    { name: 'Brand style guide v2', emp: 'Asha Rao', dept: 'Design & Development', sub: 'UI/UX Design', proj: 'Website Redesign', sprint: 'Sprint 13', stage: 'In Progress', pri: 'Medium', ss: '15:00', se: '17:30', due: '2026-07-05' },
    { name: 'Mobile app UI testing', emp: 'Rahul Sen', dept: 'Design & Development', sub: 'QA & Testing', proj: 'Website Redesign', sprint: 'Sprint 12', stage: 'In Progress', pri: 'High', ss: '09:30', se: '13:00', due: '2026-06-30' },
    { name: 'Q3 campaign brief', emp: 'Neha Gupta', dept: 'Marketing', sub: 'Digital Marketing', proj: 'Q3 Marketing Campaign', sprint: 'Sprint 13', stage: 'In Progress', pri: 'Medium', ss: '09:00', se: '11:00', due: '2026-07-08' },
    { name: 'Product launch deck', emp: 'Vivek Sharma', dept: 'Production', sub: 'Manufacturing', proj: 'Product Launch', sprint: 'Sprint 13', stage: 'Not Started', pri: 'High', ss: '10:00', se: '14:00', due: '2026-07-15' },
    { name: 'Quarterly roadmap review', emp: 'Priya Nair', dept: 'Corporate Office', sub: 'Executive', proj: 'Client Migration', sprint: 'Sprint 12', stage: 'In Progress', pri: 'High', ss: '09:00', se: '11:00', due: '2026-07-08' },
];

let SUBTASKS = [
    { id: 1, pt: 'Website redesign hero', name: 'Research competitor hero sections', emp: 'Asha Rao', date: '2026-06-23', est: 2, act: 2, status: 'Done' },
    { id: 2, pt: 'Website redesign hero', name: 'Sketch 3 layout concepts', emp: 'Asha Rao', date: '2026-06-24', est: 3, act: 3.5, status: 'Done' },
    { id: 3, pt: 'Website redesign hero', name: 'Build Figma prototype', emp: 'Asha Rao', date: '2026-06-25', est: 4, act: 4, status: 'Done' },
    { id: 4, pt: 'Website redesign hero', name: 'Stakeholder review & feedback', emp: 'Meera Pillai', date: '2026-06-26', est: 1, act: 1, status: 'Done' },
    { id: 5, pt: 'Website redesign hero', name: 'Incorporate feedback into prototype', emp: 'Asha Rao', date: '2026-06-27', est: 3, act: 0, status: 'In Progress' },
    { id: 6, pt: 'Website redesign hero', name: 'Hand off to Frontend Dev', emp: 'Rahul Sen', date: '2026-06-30', est: 1, act: 0, status: 'To Do' },
    { id: 7, pt: 'Mobile app UI testing', name: 'Write test cases for login flow', emp: 'Rahul Sen', date: '2026-06-25', est: 2, act: 2, status: 'Done' },
    { id: 8, pt: 'Mobile app UI testing', name: 'Run regression suite', emp: 'Rahul Sen', date: '2026-06-27', est: 3, act: 3, status: 'Done' },
    { id: 9, pt: 'Mobile app UI testing', name: 'Log and triage bugs', emp: 'Rahul Sen', date: '2026-06-28', est: 2, act: 1.5, status: 'In Progress' },
    { id: 10, pt: 'Mobile app UI testing', name: 'Fix critical P1 bugs', emp: 'Rahul Sen', date: '2026-06-29', est: 4, act: 0, status: 'To Do' },
    { id: 11, pt: 'Mobile app UI testing', name: 'Re-test after fixes', emp: 'Rahul Sen', date: '2026-06-30', est: 2, act: 0, status: 'To Do' },
    { id: 12, pt: 'Q3 budget planning', name: 'Gather dept budget requests', emp: 'Karthik Iyer', date: '2026-06-22', est: 2, act: 2, status: 'Done' },
    { id: 13, pt: 'Q3 budget planning', name: 'Model scenarios in spreadsheet', emp: 'Karthik Iyer', date: '2026-06-24', est: 4, act: 4, status: 'Done' },
    { id: 14, pt: 'Q3 budget planning', name: 'Present draft to Director', emp: 'Karthik Iyer', date: '2026-06-26', est: 1, act: 1, status: 'Done' },
    { id: 15, pt: 'Q3 budget planning', name: 'Incorporate Director feedback', emp: 'Karthik Iyer', date: '2026-06-28', est: 2, act: 0, status: 'In Progress' },
    { id: 16, pt: 'Q3 budget planning', name: 'Submit final to Finance', emp: 'Karthik Iyer', date: '2026-07-01', est: 1, act: 0, status: 'To Do' },
    { id: 17, pt: 'Q3 campaign brief', name: 'Define target audience segments', emp: 'Neha Gupta', date: '2026-06-28', est: 2, act: 0, status: 'In Progress' },
    { id: 18, pt: 'Q3 campaign brief', name: 'Draft messaging framework', emp: 'Neha Gupta', date: '2026-06-29', est: 3, act: 0, status: 'To Do' },
    { id: 19, pt: 'Q3 campaign brief', name: 'Channel strategy & budget split', emp: 'Neha Gupta', date: '2026-06-30', est: 2, act: 0, status: 'To Do' },
    { id: 20, pt: 'Q3 campaign brief', name: 'Review with Manager', emp: 'Meera Pillai', date: '2026-07-01', est: 1, act: 0, status: 'To Do' },
];

/* ════ CONSTANTS ════ */
const DEPTS = DEPT_TREE.map(d => d.name);
const SP = { 'Not Started': 0, 'In Progress': 50, 'In Review': 80, 'Completed': 100, 'On Hold': 25 };
const STAGES = ['Not Started', 'In Progress', 'In Review', 'Completed', 'On Hold'];
const SC = { 'Not Started': 'var(--dim)', 'In Progress': 'var(--gold)', 'In Review': 'var(--blue)', 'Completed': 'var(--green)', 'On Hold': 'var(--rose)' };
const SB = { 'Not Started': 'b-ns', 'In Progress': 'b-ip', 'In Review': 'b-ir', 'Completed': 'b-done', 'On Hold': 'b-hold' };
const PB = { 'High': 'b-high', 'Medium': 'b-med', 'Low': 'b-low' };
const DC = { 'Corporate Office': 'b-corp', 'Design & Development': 'b-design', 'Production': 'b-prod', 'Marketing': 'b-mkt', 'Sales': 'b-sales' };
const WMB = { 'Remote': 'b-remote', 'Hybrid': 'b-hybrid', 'On-site': 'b-onsite' };
const WMI = { 'Remote': '🌐', 'Hybrid': '🔀', 'On-site': '🏢' };
const STB = { 'Done': 'b-done', 'Overdue': 'b-overdue', 'Due Soon': 'b-due', 'On Track': 'b-ontrack' };
const SUB_SB = { 'To Do': 'b-ns', 'In Progress': 'b-ip', 'Done': 'b-done', 'Blocked': 'b-blocked' };
const SUB_I = { 'To Do': '○', 'In Progress': '◑', 'Done': '●', 'Blocked': '✕' };
const ROLE_C = { 'Director': 'var(--gold)', 'Manager': 'var(--blue)', 'Team Lead': 'var(--violet)', 'Employee': 'var(--dim)' };
const AVC = ['av-c', 'av-r', 'av-g', 'av-v', 'av-gold'];

/* ════ HELPERS ════ */
const dl = d => Math.round((new Date(d) - TODAY) / 86400000);
const statusOf = t => t.stage === 'Completed' ? 'Done' : dl(t.due) < 0 ? 'Overdue' : dl(t.due) <= 3 ? 'Due Soon' : 'On Track';
const ini = n => n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
const avc = n => AVC[n.charCodeAt(0) % AVC.length];
const av = (n, s = 28) => `<span class="av ${avc(n)}" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .36)}px;border-radius:${Math.round(s * .28)}px;">${ini(n)}</span>`;
const badge = (cls, txt) => `<span class="badge ${cls}">${txt}</span>`;
const wbadge = m => badge(WMB[m] || 'b-ns', WMI[m] + ' ' + m);
const pbar = pct => `<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`;
const fmt$ = v => '$' + Number(v).toLocaleString();
const bfill = (s, t) => { const p = Math.min(100, Math.round(s / Math.max(1, t) * 100)); const c = p < 70 ? 'spent-ok' : p < 90 ? 'spent-warn' : 'spent-over'; return `<div class="bbar"><div class="bfill ${c}" style="width:${p}%"></div></div>`; };

/* ════ NAV ════ */
document.getElementById('live-date').textContent = TODAY.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
let activePage = 'overview';
document.querySelectorAll('.nav-item').forEach(n => n.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    n.classList.add('active');
    activePage = n.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + activePage).classList.add('active');
    render();
}));

/* ════ OVERVIEW ════ */
function renderOverview() {
    const tot = TASKS.length, done = TASKS.filter(t => t.stage === 'Completed').length;
    const avg = Math.round(TASKS.reduce((s, t) => s + SP[t.stage], 0) / tot);
    const ov = TASKS.filter(t => statusOf(t) === 'Overdue').length;
    const tb = PROJECTS.reduce((s, p) => s + p.alloc, 0), ts = PROJECTS.reduce((s, p) => s + p.spent, 0);
    const rem = TEAM.filter(m => m.wm === 'Remote').length, hyb = TEAM.filter(m => m.wm === 'Hybrid').length, ons = TEAM.filter(m => m.wm === 'On-site').length;
    document.getElementById('ov-stats').innerHTML = `
    <div class="stat gc g1"><div class="n">${tot}</div><div class="l">Total Tasks</div><div class="d d-up">${done} completed</div></div>
    <div class="stat gc g2"><div class="n">${avg}%</div><div class="l">Avg Progress</div><div class="d d-up">Across all tasks</div></div>
    <div class="stat gc g3"><div class="n">${fmt$(tb)}</div><div class="l">Total Budget</div><div class="d ${ts / tb < .8 ? 'd-up' : 'd-dn'}">${Math.round(ts / tb * 100)}% used</div></div>
    <div class="stat gc g4"><div class="n">${SPRINTS.length}</div><div class="l">Sprints</div><div class="d d-up">${SPRINTS.filter(s => new Date(s.end) >= TODAY).length} active</div></div>
    <div class="stat gc g5"><div class="n">${ov}</div><div class="l">Overdue</div><div class="d d-dn">Needs attention</div></div>
    <div class="stat gc g6"><div class="n" style="font-size:18px;">🌐${rem} 🔀${hyb} 🏢${ons}</div><div class="l">Work Modes</div></div>`;
    document.getElementById('proj-cnt').textContent = PROJECTS.length + ' projects';
    document.getElementById('ov-proj-body').innerHTML = PROJECTS.map(p => {
        const pt = TASKS.filter(t => t.proj === p.name);
        const pa = pt.length ? Math.round(pt.reduce((s, t) => s + SP[t.stage], 0) / pt.length) : 0;
        const pp = Math.round(p.spent / Math.max(1, p.alloc) * 100);
        return `<tr><td><b>${p.name}</b></td><td>${badge(DC[p.dept] || 'b-ns', p.dept.split(' ')[0])}</td><td>${wbadge(p.wm)}</td><td style="min-width:90px;">${pbar(pa)}<span class="mono" style="font-size:10px;color:var(--dim);">${pa}%</span></td><td><span class="mono" style="font-size:11px;color:${pp >= 90 ? 'var(--rose)' : 'var(--green)'};">${pp}%</span></td></tr>`;
    }).join('');
    document.getElementById('dept-bars').innerHTML = DEPT_TREE.map(d => {
        const dt = TASKS.filter(t => t.dept === d.name);
        const da = dt.length ? Math.round(dt.reduce((s, t) => s + SP[t.stage], 0) / dt.length) : 0;
        const dm = TEAM.filter(m => m.dept === d.name).length;
        return `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12px;">${d.icon} ${badge(DC[d.name] || 'b-ns', d.name.split(' ')[0])} <span style="color:var(--dim);font-size:11px;">${dm}p · ${dt.length}t</span></span><span class="mono" style="font-size:11px;color:var(--dim);">${da}%</span></div>${pbar(da)}</div>`;
    }).join('');
    document.getElementById('ov-task-body').innerHTML = [...TASKS].slice(-5).reverse().map(t => {
        const st = statusOf(t);
        return `<tr><td><b>${t.name}</b></td><td><span style="display:flex;align-items:center;gap:6px;">${av(t.emp)}${t.emp}</span></td><td>${badge(SB[t.stage], t.stage)}</td><td class="mono" style="font-size:11px;color:var(--dim);">${t.sprint || '—'}</td><td>${badge(STB[st], st)}</td></tr>`;
    }).join('');
}

/* ════ TASKS ════ */
let taskFilter = 'All';
function renderTasks() {
    const depts = ['All', ...new Set(TASKS.map(t => t.dept))];
    document.getElementById('task-filters').innerHTML = depts.map(d => `<button class="chip ${d === taskFilter ? 'active' : ''}" data-tf="${d}">${d}</button>`).join('');
    document.querySelectorAll('[data-tf]').forEach(c => c.addEventListener('click', () => { taskFilter = c.dataset.tf; renderTasks(); }));
    const filtered = taskFilter === 'All' ? TASKS : TASKS.filter(t => t.dept === taskFilter);
    const m = TEAM.find || ((fn) => { });
    document.getElementById('task-body').innerHTML = filtered.map(t => {
        const st = statusOf(t); const d = dl(t.due); const pg = SP[t.stage];
        const subs = SUBTASKS.filter(s => s.pt === t.name);
        const sdone = subs.filter(s => s.status === 'Done').length;
        const emp = TEAM.find(x => x.name === t.emp) || { wm: 'Remote' };
        return `<tr>
      <td><b style="font-size:13px;">${t.name}</b></td>
      <td><span style="display:flex;align-items:center;gap:6px;">${av(t.emp)}${t.emp}</span></td>
      <td>${badge(DC[t.dept] || 'b-ns', t.dept.split(' ')[0])}</td>
      <td style="font-size:11.5px;color:var(--dim);">${t.proj || '—'}</td>
      <td class="mono" style="font-size:10.5px;color:var(--dim);">${t.sprint || 'Backlog'}</td>
      <td>${badge(SB[t.stage], t.stage)}</td>
      <td style="min-width:80px;">${pbar(pg)}<span class="mono" style="font-size:10px;color:var(--dim);">${pg}%</span></td>
      <td>${badge(PB[t.pri], t.pri)}</td>
      <td>${wbadge(emp.wm)}</td>
      <td class="mono" style="font-size:10.5px;color:var(--dim);">${t.ss}–${t.se}</td>
      <td class="mono" style="font-size:10.5px;">${t.due}</td>
      <td>${badge(STB[st], st)}</td>
      <td style="font-size:11.5px;">${subs.length ? `<span class="mono" style="color:${sdone === subs.length ? 'var(--green)' : 'var(--dim)'};">${sdone}/${subs.length}</span>` : '<span style="color:var(--border2);">—</span>'}</td>
    </tr>`;
    }).join('');
}

/* ════ DAILY SUB-TASKS ════ */
let dailyFilter = 'All';
function renderDailyTasks() {
    const parents = ['All', ...new Set(SUBTASKS.map(s => s.pt))];
    document.getElementById('daily-filters').innerHTML = parents.map(p => `<button class="chip ${p === dailyFilter ? 'active' : ''}" data-df="${p}">${p.length > 28 ? p.slice(0, 28) + '…' : p}</button>`).join('');
    document.querySelectorAll('[data-df]').forEach(c => c.addEventListener('click', () => { dailyFilter = c.dataset.df; renderDailyTasks(); }));

    const show = dailyFilter === 'All' ? [...new Set(SUBTASKS.map(s => s.pt))] : [dailyFilter];
    if (!show.length) { document.getElementById('daily-root').innerHTML = `<div class="empty">No sub-tasks yet. Add one above.</div>`; return; }

    document.getElementById('daily-root').innerHTML = show.map(pName => {
        const subs = SUBTASKS.filter(s => s.pt === pName).sort((a, b) => a.date.localeCompare(b.date));
        const done = subs.filter(s => s.status === 'Done').length;
        const inprog = subs.filter(s => s.status === 'In Progress').length;
        const blocked = subs.filter(s => s.status === 'Blocked').length;
        const prog = subs.length ? Math.round(done / subs.length * 100) : 0;
        const est = subs.reduce((s, x) => s + x.est, 0), act = subs.reduce((s, x) => s + x.act, 0);
        const gid = 'tg_' + pName.replace(/\W+/g, '_');
        const pt = TASKS.find(t => t.name === pName);

        const r = 15, cir = 2 * Math.PI * r, cx = 18, cy = 18;
        const ring = `<svg width="36" height="36" viewBox="0 0 36 36" style="flex:none;">
      <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2DE2D0"/><stop offset="100%" stop-color="#9D70FF"/></linearGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="4"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#rg)" stroke-width="4" stroke-dasharray="${cir * prog / 100} ${cir}" stroke-dashoffset="${cir / 4}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
      <text x="${cx}" y="${cy + 3.5}" text-anchor="middle" font-family="Space Mono" font-size="8" font-weight="700" fill="#DDE4FF">${prog}%</text>
    </svg>`;

        const rows = subs.map(s => {
            const over = s.act > 0 && s.act > s.est;
            const varVal = s.act > 0 ? ((s.act - s.est) > 0 ? `+${(s.act - s.est).toFixed(1)}` : (s.act - s.est).toFixed(1)) : '—';
            return `<div class="st-row">
        <div class="st-icon">${SUB_I[s.status] || '○'}</div>
        <div><div style="font-weight:500;">${s.name}</div><div style="font-size:10.5px;color:var(--dim);margin-top:1px;">${s.date}</div></div>
        <div style="display:flex;align-items:center;gap:6px;">${av(s.emp, 22)}<span style="font-size:11.5px;">${s.emp}</span></div>
        <div>${badge(SUB_SB[s.status], s.status)}</div>
        <div class="st-var" style="color:var(--dim);">${s.est}h est</div>
        <div class="st-var" style="color:${s.act > 0 ? (over ? 'var(--rose)' : 'var(--green)') : 'var(--dim)'};">${s.act || '—'}h</div>
        <div class="st-var" style="color:${over ? 'var(--rose)' : s.act > 0 ? 'var(--green)' : 'var(--dim)'};">${varVal}h</div>
        <div><button onclick="cycleStatus(${s.id})" style="padding:3px 8px;font-size:10px;border-radius:6px;border:1px solid var(--border);background:none;color:var(--dim);cursor:pointer;">▶</button></div>
      </div>`;
        }).join('');

        return `<div class="task-group">
      <div class="tg-hdr" data-gid="${gid}">
        <div style="display:flex;align-items:center;gap:12px;flex:1;">
          ${ring}
          <div>
            <div style="font-weight:700;font-size:14px;">${pName}</div>
            <div style="font-size:11px;color:var(--dim);margin-top:2px;">${pt ? pt.sprint || 'No sprint' : '—'} · ${pt ? pt.proj || 'No project' : '—'} ${pt ? badge(DC[pt.dept] || 'b-ns', pt.dept.split(' ')[0]) : ''}</div>
          </div>
        </div>
        <div class="tg-stats">
          <div class="tg-stat"><div class="v" style="color:var(--green);">${done}</div><div class="l">Done</div></div>
          <div class="tg-stat"><div class="v" style="color:var(--gold);">${inprog}</div><div class="l">Active</div></div>
          <div class="tg-stat"><div class="v" style="color:var(--rose);">${blocked}</div><div class="l">Blocked</div></div>
          <div class="tg-stat"><div class="v">${subs.length}</div><div class="l">Total</div></div>
          <div class="tg-stat"><div class="v" style="color:var(--dim);">${est}h</div><div class="l">Est</div></div>
          <div class="tg-stat"><div class="v" style="color:${act > est ? 'var(--rose)' : 'var(--cyan)'};">${act}h</div><div class="l">Logged</div></div>
        </div>
        <svg class="tg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div class="st-list" id="${gid}">
        <div class="st-hdr-row"><span></span><span>Sub-Task</span><span>Assigned</span><span>Status</span><span>Est.</span><span>Actual</span><span>Variance</span><span></span></div>
        ${rows}
        <div class="st-add"><button class="btn" style="font-size:11.5px;" onclick="quickAdd('${pName.replace(/'/g, "\\'")}')">+ Add daily step</button></div>
      </div>
    </div>`;
    }).join('');

    document.querySelectorAll('.tg-hdr').forEach(h => {
        h.addEventListener('click', e => {
            if (e.target.closest('button')) return;
            h.classList.toggle('open');
            document.getElementById(h.dataset.gid).classList.toggle('open');
        });
    });
    // auto-open first
    const first = document.querySelector('.tg-hdr');
    if (first) { first.classList.add('open'); document.getElementById(first.dataset.gid).classList.add('open'); }
}

function cycleStatus(id) {
    const s = SUBTASKS.find(x => x.id === id); if (!s) return;
    const cyc = ['To Do', 'In Progress', 'Done', 'Blocked'];
    s.status = cyc[(cyc.indexOf(s.status) + 1) % cyc.length];
    renderDailyTasks();
}
window.cycleStatus = cycleStatus;

function quickAdd(pName) {
    fillSel(document.getElementById('mst-parent'), TASKS.map(t => t.name));
    document.getElementById('mst-parent').value = pName;
    fillSel(document.getElementById('mst-emp'), TEAM.map(m => m.name));
    document.getElementById('mst-name').value = '';
    document.getElementById('mst-date').value = TODAY.toISOString().slice(0, 10);
    document.getElementById('mst-est').value = '';
    document.getElementById('mst-act').value = '0';
    document.getElementById('mst-err').style.display = 'none';
    openM('m-subtask');
}
window.quickAdd = quickAdd;

/* ════ SPRINT ════ */
let activeSprint = SPRINTS[0]?.name || null;
function renderSprint() {
    if (!SPRINTS.length) { document.getElementById('sprint-board').innerHTML = `<div class="empty">No sprints. Create one above.</div>`; return; }
    if (!SPRINTS.some(s => s.name === activeSprint)) activeSprint = SPRINTS[0].name;
    const sp = SPRINTS.find(s => s.name === activeSprint);
    const st = TASKS.filter(t => t.sprint === sp.name);
    const tot = st.length, done = st.filter(t => t.stage === 'Completed').length;
    const avg = tot ? Math.round(st.reduce((s, t) => s + SP[t.stage], 0) / tot) : 0;
    const dl2 = Math.round((new Date(sp.end) - TODAY) / 86400000);
    const totD = Math.max(1, Math.round((new Date(sp.end) - new Date(sp.start)) / 86400000));
    const el = Math.min(totD, Math.max(0, Math.round((TODAY - new Date(sp.start)) / 86400000)));
    const rem = tot ? +(tot - (avg / 100) * tot).toFixed(1) : 0;

    document.getElementById('sprint-pills').innerHTML = SPRINTS.map(s => `
    <button class="btn ${s.name === activeSprint ? 'btn-p' : ''}" data-sp="${s.name}" style="font-size:11.5px;padding:6px 13px;">${s.name} <span class="mono" style="font-size:9px;opacity:.6;">${s.start}→${s.end}</span></button>`).join('');
    document.querySelectorAll('[data-sp]').forEach(b => b.addEventListener('click', () => { activeSprint = b.dataset.sp; renderSprint(); }));

    document.getElementById('sprint-hdr').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div><div class="mono" style="font-size:9.5px;color:var(--cyan);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;">Sprint Goal</div>
        <div class="grotesk" style="font-size:18px;font-weight:700;">${sp.name}</div>
        <div style="color:var(--dim);font-size:13px;margin-top:3px;">${sp.goal}</div></div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        ${[['Tasks', tot], ['Done', done + '/' + tot], ['Progress', avg + '%'], ['Days Left', dl2 >= 0 ? dl2 + 'd' : 'Ended'], ['Budget', fmt$(sp.budget)], ['Spent', fmt$(sp.bspent)]].map(([l, v]) => `<div style="text-align:center;"><div class="grotesk" style="font-size:18px;font-weight:700;">${v}</div><div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;">${l}</div></div>`).join('')}
      </div>
    </div>`;

    document.getElementById('sprint-board').innerHTML = STAGES.map(s => {
        const ct = st.filter(t => t.stage === s);
        const cards = ct.map(t => `<div class="sp-card">
      ${badge(DC[t.dept] || 'b-ns', t.dept.split(' ')[0])}
      <h5>${t.name}</h5>
      <div class="who">${av(t.emp, 20)}${t.emp}</div>
      ${pbar(SP[s])}
      <div style="display:flex;justify-content:space-between;margin-top:7px;"><span class="slot">${t.ss}–${t.se}</span>${badge(STB[statusOf(t)], statusOf(t))}</div>
    </div>`).join('') || `<div style="color:var(--dim);font-size:11.5px;padding:6px 0;">Empty</div>`;
        return `<div class="sp-col gc2" style="--col-c:${SC[s]};"><h4 style="color:${SC[s]};">${s} <span style="color:var(--dim);">(${ct.length})</span></h4>${cards}</div>`;
    }).join('');

    const W = 320, H = 140, P = 26, xf = d => P + (d / totD) * (W - 2 * P), yf = v => H - P - (v / Math.max(1, tot)) * (H - 2 * P);
    document.getElementById('burndown-svg').innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;">
    <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2DE2D0"/><stop offset="100%" stop-color="#9D70FF"/></linearGradient></defs>
    <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
    <line x1="${P}" y1="${P}" x2="${P}" y2="${H - P}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
    <path d="M${xf(0)},${yf(tot)} L${xf(totD)},${yf(0)}" stroke="rgba(255,255,255,.15)" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
    <path d="M${xf(0)},${yf(tot)} L${xf(el)},${yf(rem)}" stroke="url(#cg)" stroke-width="2.5" fill="none"/>
    <circle cx="${xf(el)}" cy="${yf(rem)}" r="4" fill="var(--cyan)"/>
    <text x="${P}" y="${P - 7}" fill="rgba(255,255,255,.3)" font-size="9" font-family="Space Mono">${tot}</text>
    <text x="${W - P}" y="${H - P + 14}" fill="rgba(255,255,255,.3)" font-size="9" font-family="Space Mono" text-anchor="end">Day ${totD}</text>
  </svg>`;
}

/* ════ BUDGET ════ */
let activeBSprint = SPRINTS[0]?.name || null;
function renderBudget() {
    document.getElementById('budget-proj').innerHTML = PROJECTS.map(p => {
        const pct = Math.min(100, Math.round(p.spent / Math.max(1, p.alloc) * 100));
        const rem = p.alloc - p.spent;
        return `<div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px;"><span>${p.name}</span><span class="mono" style="color:${pct >= 90 ? 'var(--rose)' : 'var(--green)'};">${pct}%</span></div>
      <div style="font-size:11px;color:var(--dim);margin-bottom:4px;">${fmt$(p.spent)} of ${fmt$(p.alloc)} · <span style="color:${rem < 0 ? 'var(--rose)' : 'var(--green)'};">${fmt$(Math.abs(rem))} ${rem < 0 ? 'over' : 'left'}</span></div>
      ${bfill(p.spent, p.alloc)}
    </div>`;
    }).join('');

    document.getElementById('budget-dept').innerHTML = DEPT_TREE.map(d => {
        const dp = PROJECTS.filter(p => p.dept === d.name);
        if (!dp.length) return `<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;color:var(--dim);">${d.icon} ${d.name}<span>No projects</span></div>`;
        const a = dp.reduce((s, p) => s + p.alloc, 0), sp = dp.reduce((s, p) => s + p.spent, 0);
        return `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px;"><span>${d.icon} ${d.name}</span><span class="mono" style="color:var(--dim);">${fmt$(sp)}/${fmt$(a)}</span></div>${bfill(sp, a)}</div>`;
    }).join('');

    document.getElementById('budget-emp').innerHTML = TEAM.map(m => `
    <div class="emp-cost-row">
      <span style="display:flex;align-items:center;gap:8px;">${av(m.name, 26)}<span><div style="font-weight:600;font-size:13px;">${m.name}</div><div style="font-size:10.5px;color:var(--dim);">${m.role}</div></span></span>
      <span class="mono" style="font-size:11px;color:var(--cyan);">${fmt$(m.rate)}/hr</span>
      <span class="mono" style="font-size:11px;color:var(--dim);">${m.hrs}h</span>
      <span class="mono" style="font-size:12px;font-weight:700;color:var(--gold);">${fmt$(m.rate * m.hrs)}</span>
    </div>`).join('');

    document.getElementById('bsp-pills').innerHTML = SPRINTS.map(s => `<button class="btn ${s.name === activeBSprint ? 'btn-p' : ''}" data-bsp="${s.name}" style="font-size:11.5px;padding:5px 11px;">${s.name}</button>`).join('');
    document.querySelectorAll('[data-bsp]').forEach(b => b.addEventListener('click', () => { activeBSprint = b.dataset.bsp; renderBudget(); }));
    const sp = SPRINTS.find(s => s.name === activeBSprint);
    if (sp) {
        const totD = Math.max(1, Math.round((new Date(sp.end) - new Date(sp.start)) / 86400000));
        const el = Math.min(totD, Math.max(0, Math.round((TODAY - new Date(sp.start)) / 86400000)));
        const W = 300, H = 130, P = 28, xf = d => P + (d / totD) * (W - 2 * P), yf = v => H - P - (v / Math.max(1, sp.budget)) * (H - 2 * P);
        const rem = Math.max(0, sp.budget - sp.bspent);
        document.getElementById('budget-burn').innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;">
      <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
      <line x1="${P}" y1="${P}" x2="${P}" y2="${H - P}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
      <path d="M${xf(0)},${yf(sp.budget)} L${xf(totD)},${yf(0)}" stroke="rgba(255,255,255,.12)" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
      <path d="M${xf(0)},${yf(sp.budget)} L${xf(el)},${yf(rem)}" stroke="var(--gold)" stroke-width="2.5" fill="none"/>
      <circle cx="${xf(el)}" cy="${yf(rem)}" r="4" fill="var(--gold)"/>
      <text x="${P}" y="${P - 7}" fill="rgba(255,255,255,.3)" font-size="9" font-family="Space Mono">${fmt$(sp.budget)}</text>
      <text x="${W - P}" y="${H - P + 14}" fill="rgba(255,255,255,.3)" font-size="9" font-family="Space Mono" text-anchor="end">Day ${totD}</text>
      <text x="${xf(el) + 8}" y="${yf(rem) - 6}" fill="var(--gold)" font-size="9" font-family="Space Mono">${fmt$(rem)} left</text>
    </svg>`;
    }
}

/* ════ DEPARTMENTS ════ */
function renderDepts() {
    document.getElementById('dept-tree').innerHTML = DEPT_TREE.map(d => {
        const dt = TASKS.filter(t => t.dept === d.name), dm = TEAM.filter(m => m.dept === d.name);
        const da = dt.length ? Math.round(dt.reduce((s, t) => s + SP[t.stage], 0) / dt.length) : 0;
        const id = 'd_' + d.name.replace(/\W+/g, '_');
        const subs = d.subs.map(s => {
            const sm = TEAM.filter(m => m.dept === d.name && m.sub === s.name);
            const st2 = TASKS.filter(t => t.dept === d.name && t.sub === s.name);
            const sa = st2.length ? Math.round(st2.reduce((acc, t) => acc + SP[t.stage], 0) / st2.length) : 0;
            const mlist = sm.length ? sm.map(m => `<span style="display:inline-flex;align-items:center;gap:3px;margin-right:8px;font-size:11px;">${av(m.name, 18)}${m.name}</span>`).join('') : `<span style="color:var(--dim);font-size:11px;">No members</span>`;
            return `<div class="sdcard"><div class="sdname">${badge(DC[d.name] || 'b-ns', '●')} ${s.name} ${wbadge(s.wm)}</div><div class="sdlead">Lead: ${s.lead || '<span style="color:var(--dim)">Unassigned</span>'}</div><div style="margin-bottom:8px;">${mlist}</div>${st2.length ? `${pbar(sa)}<div class="mono" style="font-size:10px;color:var(--dim);margin-top:2px;">${sa}% · ${st2.length}t</div>` : ''}</div>`;
        }).join('');
        const dprojs = PROJECTS.filter(p => p.dept === d.name);
        const projlist = dprojs.map(p => `${badge(DC[d.name] || 'b-ns', p.name)} ${wbadge(p.wm)}`).join(' ');
        return `<div class="dept-card">
      <div class="dept-hdr" data-did="${id}">
        <div style="display:flex;align-items:center;gap:12px;flex:1;">
          <div style="font-size:22px;width:36px;text-align:center;">${d.icon}</div>
          <div><div style="font-family:'Space Grotesk';font-weight:700;font-size:16px;">${d.name} ${wbadge(d.wm)}</div>
          <div style="font-size:11.5px;color:var(--dim);margin-top:2px;">${d.subs.length} sub-depts · ${dm.length} people · ${dt.length} tasks</div></div>
        </div>
        <div style="display:flex;gap:18px;align-items:center;">
          ${[['People', dm.length], ['Projects', dprojs.length], ['Progress', da + '%']].map(([l, v]) => `<div style="text-align:center;"><div class="mono" style="font-weight:700;font-size:14px;">${v}</div><div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;">${l}</div></div>`).join('')}
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
      <div class="dept-body" id="${id}">
        <div class="mono" style="font-size:9.5px;color:var(--dim);text-transform:uppercase;letter-spacing:.07em;padding:12px 0 8px;">Sub-Departments</div>
        <div class="subdept-grid">${subs}</div>
        ${dprojs.length ? `<div class="mono" style="font-size:9.5px;color:var(--dim);text-transform:uppercase;letter-spacing:.07em;margin:14px 0 6px;">Projects</div><div style="display:flex;gap:8px;flex-wrap:wrap;">${projlist}</div>` : ''}
      </div>
    </div>`;
    }).join('');
    document.querySelectorAll('.dept-hdr').forEach(h => {
        h.addEventListener('click', () => { h.classList.toggle('open'); document.getElementById(h.dataset.did).classList.toggle('open'); });
    });
}

/* ════ TEAM ════ */
function renderTeam() {
    document.getElementById('team-body').innerHTML = TEAM.map(m => {
        const mt = TASKS.filter(t => t.emp === m.name);
        const ma = mt.length ? Math.round(mt.reduce((s, t) => s + SP[t.stage], 0) / mt.length) : 0;
        return `<tr>
      <td><span style="display:flex;align-items:center;gap:8px;">${av(m.name)}<b>${m.name}</b></span></td>
      <td>${badge(SB[m.role] || 'b-ip', m.role)}</td>
      <td>${badge(DC[m.dept] || 'b-ns', m.dept.split(' ')[0])}</td>
      <td style="color:var(--dim);font-size:12px;">${m.sub || '—'}</td>
      <td>${wbadge(m.wm)}</td>
      <td style="color:var(--dim);font-size:12px;">${m.rep || '—'}</td>
      <td class="mono" style="color:var(--cyan);font-size:11px;">${fmt$(m.rate)}/hr</td>
      <td class="mono" style="color:var(--dim);">${mt.filter(t => t.stage !== 'Completed').length}</td>
      <td style="min-width:90px;">${pbar(ma)}<span class="mono" style="font-size:10px;color:var(--dim);">${ma}%</span></td>
    </tr>`;
    }).join('');
}

/* ════ PROCESS FLOW ════ */
let flowDone = false;
function renderFlow() {
    if (flowDone) return; flowDone = true;
    const W = 1060, H = 560, P = 30;
    const nd = (x, y, w, h, col, tag, title, sub) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(14,18,39,.9)" stroke="${col}" stroke-width="1.8"/>
    <rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" fill="${col}"/>
    <text x="${x + 12}" y="${y + 23}" font-family="Space Mono" font-size="9" fill="${col}" letter-spacing="1">${tag}</text>
    <text x="${x + 12}" y="${y + 43}" font-family="Space Grotesk" font-size="13" font-weight="700" fill="#DDE4FF">${title}</text>
    <text x="${x + 12}" y="${y + 58}" font-family="Inter" font-size="10.5" fill="#6B75A0">${sub}</text>`;
    const arr = (x1, y1, x2, y2, c = '#3A4060') => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="1.8" marker-end="url(#ar)"/>`;
    const elbow = (x1, y1, xm, y2, x2, c = '#3A4060', dash = false) => `<path d="M${x1},${y1} V${y2} H${x2}" stroke="${c}" stroke-width="1.8" fill="none" ${dash ? 'stroke-dasharray="5,4"' : ''} marker-end="url(#ar)"/>`;
    const lbl = (x, y, t, c = '#6B75A0') => `<text x="${x}" y="${y}" font-family="Space Mono" font-size="9.5" fill="${c}" text-anchor="middle">${t}</text>`;

    document.getElementById('flow-root').innerHTML = `<div class="flow-wrap">
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;">
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#3A4060"/></marker>
        <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2DE2D0"/><stop offset="100%" stop-color="#9D70FF"/></linearGradient>
      </defs>
      <text x="${P}" y="20" font-family="Space Mono" font-size="9.5" fill="#3A4060" letter-spacing="2">STEP 1 — STRUCTURE</text>
      ${nd(P, 28, 178, 70, '#4F9CF9', '01', 'Department', 'Corporate / Design…')}
      ${nd(238, 28, 178, 70, '#9D70FF', '02', 'Sub-Department', 'Executive · UI/UX…')}
      ${nd(456, 28, 178, 70, '#F9C74F', '03', 'Project', 'Budget · lead · WM')}
      ${nd(674, 28, 178, 70, '#2DE2D0', '04', 'Sprint', 'Goal · dates · budget')}
      ${arr(208, 63, 238, 63, '#4F9CF9')} ${arr(416, 63, 456, 63, '#9D70FF')} ${arr(634, 63, 674, 63, '#F9C74F')}
      ${elbow(763, 98, 763, 148, 490, 165, '#2DE2D0')}
      ${lbl(840, 148, 'Enters pipeline', '#2DE2D0')}

      <text x="${P}" y="178" font-family="Space Mono" font-size="9.5" fill="#3A4060" letter-spacing="2">STEP 2 — MILESTONE PIPELINE</text>
      ${nd(P, 186, 155, 70, '#6B75A0', '05', 'Not Started', 'Scoped, queued')}
      ${nd(200, 186, 155, 70, '#F9C74F', '06', 'In Progress', 'Active work 🔧')}
      ${nd(400, 186, 155, 70, '#4F9CF9', '07', 'In Review', 'QA / approval 👁')}
      ${nd(600, 186, 155, 70, '#4ADE80', '08', 'Completed', 'Done ✅')}
      ${arr(155, 221, 200, 221, '#6B75A0')} ${arr(355, 221, 400, 221, '#F9C74F')} ${arr(555, 221, 600, 221, '#4F9CF9')}
      ${nd(200, 295, 155, 62, '#FF5C8A', '⏸', 'On Hold', 'Blocked — log reason')}
      ${arr(278, 256, 278, 295, '#FF5C8A')} ${arr(356, 357, 356, 256, '#4ADE80')}
      ${lbl(240, 289, 'Blocked', '#FF5C8A')} ${lbl(400, 374, 'Resume', '#4ADE80')}

      <text x="${P}" y="390" font-family="Space Mono" font-size="9.5" fill="#3A4060" letter-spacing="2">STEP 3 — SIGN-OFF CHAIN</text>
      ${nd(P, 398, 155, 70, '#3A4060', 'EMP', 'Employee', 'Does the work 👤')}
      ${nd(200, 398, 155, 70, '#9D70FF', 'TL', 'Team Lead', 'Reviews & unblocks')}
      ${nd(400, 398, 155, 70, '#4F9CF9', 'MGR', 'Manager', 'Approves scope')}
      ${nd(600, 398, 155, 70, '#F9C74F', 'DIR', 'Director', 'Final sign-off 🎯')}
      ${arr(155, 433, 200, 433, '#3A4060')} ${arr(355, 433, 400, 433, '#9D70FF')} ${arr(555, 433, 600, 433, '#4F9CF9')}
      ${elbow(550, 221, 860, 372, 620, 398, '#4ADE80', true)}
      ${lbl(870, 305, 'Assigned via Project', '#4ADE80')}

      <rect x="820" y="398" width="160" height="130" rx="10" fill="rgba(14,18,39,.9)" stroke="url(#cg2)" stroke-width="2"/>
      <rect x="820" y="398" width="160" height="5" rx="2.5" fill="url(#cg2)"/>
      <text x="834" y="422" font-family="Space Mono" font-size="9" fill="#2DE2D0" letter-spacing="1">DASHBOARD</text>
      <text x="834" y="442" font-family="Space Grotesk" font-size="12" font-weight="700" fill="#DDE4FF">Live Rollup</text>
      ${['Overview', 'Task Tracker', 'Sub-Tasks', 'Sprint', 'Budget'].map((t, i) => `<text x="834" y="${458 + i * 15}" font-family="Inter" font-size="10" fill="#6B75A0">→ ${t}</text>`).join('')}
      ${arr(755, 433, 820, 433, '#F9C74F')} ${arr(755, 221, 820, 463, '#4ADE80')}

      <rect x="${P}" y="500" width="${W - 2 * P}" height="44" rx="8" fill="rgba(14,18,39,.6)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
      <text x="${P + 14}" y="517" font-family="Space Mono" font-size="8.5" fill="#3A4060" letter-spacing="1.5">WORK MODE FLOWS THROUGH EVERY LAYER</text>
      ${['Remote', 'Hybrid', 'On-site'].map((m, i) => `<rect x="${P + 14 + i * 210}" y="523" width="185" height="14" rx="3" fill="${{ 'Remote': 'rgba(157,112,255,.15)', 'Hybrid': 'rgba(45,226,208,.12)', 'On-site': 'rgba(249,199,79,.12)' }[m]}"/>
      <text x="${P + 22 + i * 210}" y="534" font-family="Space Mono" font-size="9.5" font-weight="700" fill="${{ 'Remote': '#9D70FF', 'Hybrid': '#2DE2D0', 'On-site': '#F9C74F' }[m]}">${{ 'Remote': '🌐', 'Hybrid': '🔀', 'On-site': '🏢' }[m]} ${m}</text>`).join('')}
    </svg>
    <div class="flow-legend">
      ${[['#4F9CF9', 'Structure'], ['#9D70FF', 'Sub-Dept / Team Lead'], ['#F9C74F', 'Sprint / Director'], ['#4ADE80', 'Completed / Resume'], ['#FF5C8A', 'On Hold'], ['#2DE2D0', 'Dashboard']].map(([c, l]) => `<span><span class="dot" style="background:${c};"></span>${l}</span>`).join('')}
    </div>
  </div>`;
}

/* ════ TEAM ARCHITECTURE ════ */
let activeArchProj = PROJECTS[0]?.name || null;
function renderArch() {
    const root = document.getElementById('arch-root');
    if (!PROJECTS.length) { root.innerHTML = `<div class="empty">No projects yet.</div>`; return; }
    if (!PROJECTS.some(p => p.name === activeArchProj)) activeArchProj = PROJECTS[0].name;
    const proj = PROJECTS.find(p => p.name === activeArchProj);

    document.getElementById('arch-pills').innerHTML = PROJECTS.map(p => `
    <button class="btn ${p.name === activeArchProj ? 'btn-p' : ''}" data-ap="${p.name}" style="font-size:12px;padding:7px 13px;">${p.name} ${wbadge(p.wm)}</button>`).join('');
    document.querySelectorAll('[data-ap]').forEach(b => b.addEventListener('click', () => { activeArchProj = b.dataset.ap; renderArch(); }));

    function chainTo(name) { const c = []; let cur = TEAM.find(m => m.name === name); while (cur) { c.unshift(cur); cur = cur.rep ? TEAM.find(m => m.name === cur.rep) : null; } return c; }
    const chain = chainTo(proj.lead);
    const pt = TASKS.filter(t => t.proj === proj.name);
    const contribs = [...new Set(pt.map(t => t.emp))].filter(n => n !== proj.lead);

    let html = `<div class="arch-card">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--border);">
      <div><div class="mono" style="font-size:9px;color:var(--cyan);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;">Project Root</div>
        <div class="grotesk" style="font-size:21px;font-weight:800;">${proj.name}</div>
        <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">${wbadge(proj.wm)} ${badge(DC[proj.dept] || 'b-ns', proj.dept)}</div>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        ${[['Tasks', pt.length], ['Done', pt.filter(t => t.stage === 'Completed').length], ['Budget', fmt$(proj.alloc)], ['Spent', fmt$(proj.spent)], ['Due', proj.due]].map(([l, v]) => `<div style="text-align:center;"><div class="grotesk" style="font-size:17px;font-weight:700;">${v}</div><div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;">${l}</div></div>`).join('')}
      </div>
    </div>
    <div class="mono" style="font-size:9px;text-transform:uppercase;letter-spacing:.07em;color:var(--dim);margin-bottom:10px;">Reporting Chain → Project Lead</div>`;

    chain.forEach((m, i) => {
        const isLead = m.name === proj.lead;
        const mt = pt.filter(t => t.emp === m.name);
        const mprog = mt.length ? Math.round(mt.reduce((s, t) => s + SP[t.stage], 0) / mt.length) : 0;
        html += `${i > 0 ? `<div class="arch-conn" style="margin-left:${i * 26 + 18}px;"></div>` : ''}
    <div class="arch-node ${isLead ? 'root-node' : ''}" style="margin-left:${i * 26}px;">
      ${av(m.name, 36)}
      <div class="arch-info" style="flex:1;">
        <div class="role-l" style="color:${ROLE_C[m.role] || 'var(--dim)'};">${m.role}${isLead ? ' · Project Lead' : ''}</div>
        <div class="pname">${m.name}</div>
        <div class="pmeta">${m.sub || m.dept} · ${wbadge(m.wm)}</div>
      </div>
      ${mt.length ? `<div style="min-width:110px;">${pbar(mprog)}<div class="mono" style="font-size:10px;color:var(--dim);margin-top:2px;">${mprog}% · ${mt.length}t</div></div>` : ''}
    </div>`;
    });

    if (contribs.length) {
        html += `<div class="arch-conn dash" style="margin-left:${chain.length * 26 + 18}px;height:22px;"></div>
    <div class="contrib-block" style="margin-left:${chain.length * 26}px;">
      <div class="cb-lbl">Contributors — assigned tasks on this project</div>
      ${contribs.map(cn => {
            const cp = TEAM.find(m => m.name === cn) || { role: '—', sub: '—', wm: 'Remote' };
            const ct = pt.filter(t => t.emp === cn);
            const cp2 = ct.length ? Math.round(ct.reduce((s, t) => s + SP[t.stage], 0) / ct.length) : 0;
            return `<div class="contrib-row">${av(cn, 28)}<div style="flex:1;"><div style="font-weight:700;font-size:13px;">${cn}</div><div style="font-size:11px;color:var(--dim);">${cp.role} · ${cp.sub || '—'}</div></div>${wbadge(cp.wm)}<div style="min-width:100px;">${pbar(cp2)}<span class="mono" style="font-size:10px;color:var(--dim);">${cp2}% · ${ct.length}t</span></div></div>`;
        }).join('')}
    </div>`;
    }
    html += '</div>';
    root.innerHTML = html;
}

/* ════ RENDER ════ */
function render() {
    if (activePage === 'overview') renderOverview();
    if (activePage === 'tasks') renderTasks();
    if (activePage === 'daily') renderDailyTasks();
    if (activePage === 'sprint') renderSprint();
    if (activePage === 'budget') renderBudget();
    if (activePage === 'departments') renderDepts();
    if (activePage === 'team') renderTeam();
    if (activePage === 'flow') renderFlow();
    if (activePage === 'arch') renderArch();
}

/* ════ MODALS ════ */
function openM(id) { document.getElementById(id).classList.add('open'); }
function closeM(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => closeM(b.dataset.close));
document.querySelectorAll('.overlay').forEach(ov => ov.onclick = e => { if (e.target === ov) ov.classList.remove('open'); });
function fillSel(sel, items) { sel.innerHTML = items.map(v => `<option value="${v}">${v}</option>`).join(''); }
function fillSelO(sel, items) { sel.innerHTML = '<option value="">—</option>' + items.map(v => `<option value="${v}">${v}</option>`).join(''); }

document.getElementById('btn-add-task').onclick = () => {
    fillSel(document.getElementById('mt-emp'), TEAM.map(m => m.name));
    fillSel(document.getElementById('mt-dept'), DEPTS);
    fillSelO(document.getElementById('mt-proj'), PROJECTS.map(p => p.name));
    fillSelO(document.getElementById('mt-sprint'), SPRINTS.map(s => s.name));
    document.getElementById('mt-name').value = ''; document.getElementById('mt-due').value = '';
    document.getElementById('mt-err').style.display = 'none'; openM('m-task');
};
document.getElementById('mt-save').onclick = () => {
    const name = document.getElementById('mt-name').value.trim(), due = document.getElementById('mt-due').value;
    if (!name || !due) { document.getElementById('mt-err').style.display = 'block'; return; }
    TASKS.push({
        name, emp: document.getElementById('mt-emp').value, dept: document.getElementById('mt-dept').value, sub: '',
        proj: document.getElementById('mt-proj').value || null, sprint: document.getElementById('mt-sprint').value || null,
        stage: document.getElementById('mt-stage').value, pri: document.getElementById('mt-pri').value,
        ss: document.getElementById('mt-s').value, se: document.getElementById('mt-e').value, due
    });
    closeM('m-task'); render();
};

document.getElementById('btn-add-project').onclick = () => {
    fillSel(document.getElementById('mp-dept'), DEPTS); fillSel(document.getElementById('mp-lead'), TEAM.map(m => m.name));
    ['mp-name', 'mp-alloc', 'mp-spent', 'mp-due'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('mp-err').style.display = 'none'; openM('m-project');
};
document.getElementById('mp-save').onclick = () => {
    const name = document.getElementById('mp-name').value.trim();
    if (!name) { document.getElementById('mp-err').style.display = 'block'; return; }
    PROJECTS.push({
        name, dept: document.getElementById('mp-dept').value, lead: document.getElementById('mp-lead').value,
        alloc: parseFloat(document.getElementById('mp-alloc').value) || 0, spent: parseFloat(document.getElementById('mp-spent').value) || 0,
        due: document.getElementById('mp-due').value, wm: document.getElementById('mp-wm').value
    });
    closeM('m-project'); render();
};

document.getElementById('btn-add-sprint').onclick = () => {
    ['ms-name', 'ms-goal', 'ms-start', 'ms-end', 'ms-budget', 'ms-bspent'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('ms-err').style.display = 'none'; openM('m-sprint');
};
document.getElementById('ms-save').onclick = () => {
    const name = document.getElementById('ms-name').value.trim(), start = document.getElementById('ms-start').value, end = document.getElementById('ms-end').value;
    if (!name || !start || !end) { document.getElementById('ms-err').style.display = 'block'; return; }
    SPRINTS.push({
        name, goal: document.getElementById('ms-goal').value, start, end,
        budget: parseFloat(document.getElementById('ms-budget').value) || 0, bspent: parseFloat(document.getElementById('ms-bspent').value) || 0
    });
    activeSprint = name; activeBSprint = name; closeM('m-sprint'); render();
};

document.getElementById('btn-add-person').onclick = () => {
    fillSel(document.getElementById('mpr-dept'), DEPTS);
    fillSelO(document.getElementById('mpr-rep'), TEAM.map(m => m.name));
    const dt = DEPT_TREE[0]; fillSelO(document.getElementById('mpr-sub'), dt ? dt.subs.map(s => s.name) : []);
    ['mpr-name', 'mpr-rate'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('mpr-err').style.display = 'none'; openM('m-person');
};
document.getElementById('mpr-dept').addEventListener('change', e => {
    const dt = DEPT_TREE.find(d => d.name === e.target.value);
    fillSelO(document.getElementById('mpr-sub'), dt ? dt.subs.map(s => s.name) : []);
});
document.getElementById('mpr-save').onclick = () => {
    const name = document.getElementById('mpr-name').value.trim();
    if (!name) { document.getElementById('mpr-err').style.display = 'block'; return; }
    TEAM.push({
        name, role: document.getElementById('mpr-role').value, dept: document.getElementById('mpr-dept').value,
        sub: document.getElementById('mpr-sub').value || '', rep: document.getElementById('mpr-rep').value || '',
        rate: parseFloat(document.getElementById('mpr-rate').value) || 0, hrs: 0, wm: document.getElementById('mpr-wm').value
    });
    closeM('m-person'); render();
};

document.getElementById('btn-add-subdept').onclick = () => {
    fillSel(document.getElementById('msd-parent'), DEPTS); fillSelO(document.getElementById('msd-lead'), TEAM.map(m => m.name));
    document.getElementById('msd-name').value = ''; document.getElementById('msd-err').style.display = 'none'; openM('m-subdept');
};
document.getElementById('msd-save').onclick = () => {
    const name = document.getElementById('msd-name').value.trim(), parent = document.getElementById('msd-parent').value;
    if (!name || !parent) { document.getElementById('msd-err').style.display = 'block'; return; }
    const dt = DEPT_TREE.find(d => d.name === parent);
    if (dt && !dt.subs.some(s => s.name === name)) dt.subs.push({ name, lead: document.getElementById('msd-lead').value || '', wm: document.getElementById('msd-wm').value });
    closeM('m-subdept'); if (activePage === 'departments') renderDepts();
};

document.getElementById('btn-add-subtask').onclick = () => {
    fillSel(document.getElementById('mst-parent'), TASKS.map(t => t.name));
    fillSel(document.getElementById('mst-emp'), TEAM.map(m => m.name));
    document.getElementById('mst-name').value = ''; document.getElementById('mst-date').value = TODAY.toISOString().slice(0, 10);
    document.getElementById('mst-est').value = ''; document.getElementById('mst-act').value = '0';
    document.getElementById('mst-err').style.display = 'none'; openM('m-subtask');
};
document.getElementById('mst-save').onclick = () => {
    const name = document.getElementById('mst-name').value.trim(), date = document.getElementById('mst-date').value, parent = document.getElementById('mst-parent').value;
    if (!name || !date || !parent) { document.getElementById('mst-err').style.display = 'block'; return; }
    const newId = Math.max(0, ...SUBTASKS.map(s => s.id)) + 1;
    SUBTASKS.push({
        id: newId, pt: parent, name, emp: document.getElementById('mst-emp').value, date,
        est: parseFloat(document.getElementById('mst-est').value) || 0, act: parseFloat(document.getElementById('mst-act').value) || 0,
        status: document.getElementById('mst-status').value
    });
    closeM('m-subtask'); if (activePage === 'daily') renderDailyTasks();
};

/* ════ INIT ════ */
render();
