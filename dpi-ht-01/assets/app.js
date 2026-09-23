const root = document.body.dataset.page === 'review' ? '../submission.json' : 'submission.json';
const money = (value) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
const effectValue = (value) => value == null ? '—' : money(value);
const label = (text) => text.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
const ledger = (entries, total) => `${entries.map(([name, value]) => `<div class="ledger-row"><span>${name}</span><strong>${money(value)}</strong></div>`).join('')}<div class="ledger-row total emphasis"><span>${total[0]}</span><strong>${money(total[1])}</strong></div>`;
const statementRows = (entries) => entries.map(([name, value, kind = '']) => `<div class="ledger-row ${kind}"><span>${name}</span><strong>${money(value)}</strong></div>`).join('');

const renderMain = (data) => {
  const pnl = data.statements.profitAndLoss, bs = data.statements.balanceSheet;
  document.querySelector('#metrics').innerHTML = [
    ['Corrected profit', pnl.netProfit, 'source-only; see limitations'], ['Closing cash', bs.cash, 'bank-confirmed'], ['Net receivables', bs.tradeReceivablesNet, 'after R-17 impairment'], ['Owner distributions', data.schedules.equityAndDistributions.distributions, 'villa + owner card']
  ].map(([name, value, note]) => `<article class="metric"><div class="label">${name}</div><div class="value">${money(value)}</div><p class="note">${note}</p></article>`).join('');
  document.querySelector('#pnl').innerHTML = statementRows([
    ['Revenue', pnl.revenue], ['Direct costs', -pnl.directCosts], ['Gross profit', pnl.grossProfit, 'subtotal'],
    ['Operating expenses', -pnl.operatingExpenses], ['Depreciation', -pnl.depreciation], ['Bad debt expense', -pnl.badDebtExpense], ['Inventory write-down', -pnl.inventoryWriteDown], ['Legal provision', -pnl.legalProvision], ['Interest expense', -pnl.interestExpense], ['Net profit', pnl.netProfit, 'total emphasis']
  ]);
  document.querySelector('#balance').innerHTML = `<h3 class="ledger-heading">Assets</h3>${ledger([['Cash', bs.cash], ['Net receivables', bs.tradeReceivablesNet], ['Inventory', bs.inventory], ['Net PPE', bs.netPpe]], ['Total assets', bs.totalAssets])}<h3 class="ledger-heading">Liabilities and equity</h3>${ledger([['Trade payables', bs.tradePayables], ['Payroll accrual', bs.payrollAccrual], ['Customer deposits', bs.customerDeposits], ['Interest payable', bs.interestPayable], ['Bank loan', bs.bankLoan], ['Legal provision', bs.legalProvision], ['Equity', bs.equity]], ['Total liabilities and equity', bs.totalLiabilitiesAndEquity])}`;
  const cf = data.statements.cashFlow;
  document.querySelector('#cashflow').innerHTML = statementRows([['Opening cash', cf.openingCash], ['Customer and deposit receipts', cf.customerAndDepositReceipts], ['Operating payments', cf.operatingPayments], ['Net operating cash flow', cf.netOperatingCashFlow, 'subtotal'], ['Investing cash flow', cf.investingCashFlow], ['Financing cash flow', cf.financingCashFlow], ['Net cash movement', cf.netCashMovement, 'subtotal'], ['Closing cash', cf.closingCash, 'total emphasis']]);
  document.querySelector('#reconciliations').innerHTML = data.reconciliations.map(item => `<article class="check-row"><strong>${item.name}</strong><p>${item.detail}</p><span class="status ${item.status}">${item.status}</span></article>`).join('');
  document.querySelector('#schedules').innerHTML = Object.entries(data.schedules).map(([name, values]) => `<article class="schedule"><h3>${label(name)}</h3><dl class="schedule-details">${Object.entries(values).map(([key, value]) => `<div><dt>${label(key)}</dt><dd>${money(value)}</dd></div>`).join('')}</dl></article>`).join('');
  document.querySelector('#evidence').innerHTML = data.evidence.map(source => `<article class="source-row ${source.reliability}"><span class="source-dot"></span><div><strong>${source.file}</strong><p>${source.reliability === 'high' ? 'Higher-reliability evidence reviewed' : 'Supporting evidence reviewed'}</p></div></article>`).join('');
  document.querySelector('#uncertainties').innerHTML = data.uncertainties.map(item => `<article class="uncertainty"><strong>${item.area}</strong><span class="impact">Potential impact: ${item.impact}</span><p>${item.detail}</p></article>`).join('');
  const materialCount = data.decisions.filter(d => d.reviewTier === 'material_judgment').length;
  const lowCount = data.decisions.filter(d => d.confidence === 'low').length;
  document.querySelector('#decisionSummary').innerHTML = `<p><strong>${data.decisions.length} decisions are present.</strong> All ${materialCount} material judgments include two AI positions and a student certification. ${lowCount} decisions remain low confidence and are disclosed in the review trail.</p><a href="review/">Open review queue →</a>`;
  document.querySelector('#board').innerHTML = `<p class="lede">${data.boardRecommendation.conclusion}</p><ul>${data.boardRecommendation.actions.map(a => `<li>${a}</li>`).join('')}</ul>`;
};

const renderReview = (data) => {
  const decisions = data.decisions;
  const material = decisions.filter(d => d.reviewTier === 'material_judgment');
  const low = decisions.filter(d => d.confidence === 'low');
  const open = data.uncertainties.filter(u => u.status !== 'closed');
  document.querySelector('#reviewCounts').innerHTML = [[`${decisions.length}`, 'decisions'], [`${material.length}`, 'independent reviews recorded'], [`${low.length}`, 'low-confidence answers'], [`${open.length}`, 'disclosed limitations']].map(([n,l]) => `<div class="count-chip"><strong>${n}</strong>${l}</div>`).join('');
  const list = document.querySelector('#decisionList');
  const draw = (filter) => {
    const shown = decisions.filter(d => filter === 'all' || (filter === 'low' && d.confidence === 'low') || (filter === 'material_judgment' && d.reviewTier === 'material_judgment') || (filter === 'open' && (d.agentDisagreement || d.changedFromAI || d.confidence === 'low')));
    list.innerHTML = shown.map(d => `<article class="decision"><header><div><div class="decision-id">${d.id} · ${label(d.category)}</div><h3>${d.question}</h3></div><div class="badges"><span class="badge ${d.reviewTier === 'material_judgment' ? 'material' : ''}">${d.reviewTier.replace('_',' ')}</span><span class="badge ${d.confidence === 'low' ? 'low' : ''}">${d.confidence}</span>${d.agentDisagreement ? '<span class="badge open">agent disagreement</span>' : ''}${d.changedFromAI ? '<span class="badge open">student override</span>' : ''}</div></header><p class="answer"><b>Certified answer:</b> ${d.answer}</p><p class="evidence"><b>Evidence:</b> ${d.evidence.join(' · ')}</p>${d.reviewTier === 'material_judgment' ? `<section class="review-trail"><div><span>AI proposal</span><p>${d.aiProposal.replace('Agent 1 proposal: ', '')}</p></div><div><span>Independent AI position</span><p>${d.independentChallenge}</p></div><div><span>Student certification</span><p>${d.studentReasoning}</p></div><div><span>Statement-effect basis</span><p><strong>${d.effectBasis}</strong><br>${d.statementEffectNote}</p></div><div><span>Statement effect (EUR, whole euros)</span>${Object.values(d.statementEffect).every(value => value == null) ? '<p>No direct journal entry.</p>' : `<dl class="effect-grid">${Object.entries(d.statementEffect).map(([name, value]) => `<div><dt>${label(name)}</dt><dd>${effectValue(value)}</dd></div>`).join('')}</dl>`}</div></section>` : ''}</article>`).join('');
  };
  draw('all');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('selected')); button.classList.add('selected'); draw(button.dataset.filter); }));
};

try { const data = await fetch(root).then(r => r.ok ? r.json() : Promise.reject(new Error('Submission data unavailable'))); document.body.dataset.page === 'review' ? renderReview(data) : renderMain(data); } catch (error) { document.querySelector('main').innerHTML = `<section class="panel"><h2>Submission data could not be loaded.</h2><p>Open this site through a local web server or its Vercel deployment.</p></section>`; }
