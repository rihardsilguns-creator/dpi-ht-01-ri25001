import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const templatePath = process.argv[2] || resolve(here, '../../../work/codex-files/04 CODEX FILES - Give These to Codex/01 GIVE TO CODEX - Answer Template.json');
const outputPath = resolve(here, '../submission.json');
const template = JSON.parse(await readFile(templatePath, 'utf8'));

const E = {
  bank: '02 Bank Export August.csv', contracts: '04 Contracts Returns and Angry Customers.pdf',
  warehouse: '05 Warehouse Count Marta Notes.pdf', purchases: '06 Purchases Invoices and Goods Received.pdf',
  payroll: '07 Payroll Bonuses Contractors NEW.xlsx', assets: '08 Assets Repairs Leases Maybe.xlsx',
  loans: '09 Loans Owner Card and Legal Problems.pdf', post: '11 Evidence Received After Takeover.pdf',
  crm: '03 CRM Export Cleaned FINAL.xlsx', management: '01 USE THIS NUMBERS FINAL v9.xlsx',
  board: '00 BOARD ORDER READ FIRST.pdf'
};
const row = (answer, evidence, confidence = 'high') => ({ answer, evidence: Array.isArray(evidence) ? evidence : [evidence], confidence });
const answers = {
  D001: row('NorthStar receipt is collection of delivered INV-26012 revenue: EUR 180,000.', [E.bank, E.contracts, E.crm]),
  D002: row('Freedom receipt is EUR 142,000 collection on delivered INV-26031; EUR 58,000 remains receivable.', [E.bank, E.contracts, E.crm]),
  D003: row('Phoenix receipt is EUR 70,000 collection on completed INV-26047; EUR 30,000 remains receivable.', [E.bank, E.contracts, E.crm]),
  D004: row('Liberty receipt is EUR 95,000 collection on delivered INV-26063; EUR 25,000 remains receivable.', [E.bank, E.contracts, E.crm]),
  D005: row('EUR 35,000 is collection of opening trade receivable, not current-period revenue.', E.bank),
  D006: row('Finally Single web sales are EUR 270,000 revenue, EUR 250,000 cash settled and EUR 20,000 platform receivable.', [E.bank, E.crm]),
  D007: row('Never Call Back web sales are EUR 90,000 revenue, EUR 37,000 cash settled and EUR 53,000 gross receivable; EUR 18,000 is impaired.', [E.bank, E.crm, E.post]),
  D008: row('New Beginnings EUR 60,000 is a September customer deposit and contract liability.', [E.bank, E.contracts]),
  D009: row('Fresh Freedom EUR 30,000 is a September customer deposit and contract liability.', [E.bank, E.contracts]),
  D010: row('BoxWorks payment is EUR 105,000 trade-supplier settlement; EUR 25,000 remains payable.', [E.bank, E.purchases]),
  D011: row('Glass & Drama payment is EUR 92,000 trade-supplier settlement; EUR 28,000 remains payable.', [E.bank, E.purchases]),
  D012: row('Print Again payment is EUR 81,000 trade-supplier settlement; EUR 14,000 remains payable.', [E.bank, E.purchases]),
  D013: row('Event Things payment is EUR 100,000 trade-supplier settlement; EUR 59,000 remains payable.', [E.bank, E.purchases]),
  D014: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a January allocation.', [E.bank, E.payroll], 'low'),
  D015: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a February allocation.', [E.bank, E.payroll], 'low'),
  D016: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a March allocation.', [E.bank, E.payroll], 'low'),
  D017: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent an April allocation.', [E.bank, E.payroll], 'low'),
  D018: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a May allocation.', [E.bank, E.payroll], 'low'),
  D019: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a June allocation.', [E.bank, E.payroll], 'low'),
  D020: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent a July allocation.', [E.bank, E.payroll], 'low'),
  D021: row('Monthly payroll detail is not available. Preserve the combined Jan-Aug cash evidence and do not invent an August allocation.', [E.bank, E.payroll], 'low'),
  D022: row('Rent paid is EUR 48,000 operating expense.', E.bank),
  D023: row('Meta, TikTok and influencer payments total EUR 55,000 marketing expense.', E.bank),
  D024: row('Software subscriptions total EUR 16,000 operating expense.', E.bank),
  D025: row('Utilities total EUR 12,000 operating expense.', E.bank),
  D026: row('EUR 10,000 machine belt, cleaning and calibration is repair expense, not PPE.', [E.bank, E.purchases, E.assets]),
  D027: row('Pack-O-Matic payment is EUR 60,000 PPE capital expenditure.', [E.bank, E.purchases, E.assets]),
  D028: row('Regret Photo Booth payment is EUR 20,000 PPE capital expenditure.', [E.bank, E.purchases, E.assets]),
  D029: row('EUR 50,000 receipt is new bank borrowing, not income.', [E.bank, E.loans]),
  D030: row('EUR 19,000 payment is loan principal repayment.', [E.bank, E.loans]),
  D031: row('Interest cash paid is EUR 10,000; total period interest expense is EUR 12,000.', [E.bank, E.loans, E.post]),
  D032: row('EUR 70,000 villa reservation is an owner distribution.', [E.bank, E.loans]),
  D033: row('EUR 40,000 owner-card charge is an owner distribution. Do not also count the unsupported EUR 110,000 bonus as separate cash.', [E.bank, E.payroll, E.loans], 'medium'),
  D034: row('No insurance policy, invoice, cash payment or opening prepaid balance is supplied. Do not recognise an insurance amount; disclose the evidence gap.', [E.board, E.management], 'low'),
  D035: row('Damaged basement inventory carrying value EUR 22,000 is written down to nil.', [E.warehouse, E.post]),
  D036: row('Customer R-17 receivable EUR 18,000 is fully impaired/write-off required.', [E.contracts, E.post]),
  D037: row('Former employee claim requires EUR 25,000 provision at 31 August.', [E.loans, E.post]),
  D038: row('Materials purchases are EUR 459,000; closing supplier payable is EUR 126,000.', E.purchases),
  D039: row('Customer cash collections total EUR 809,000: EUR 35,000 opening AR plus EUR 774,000 current delivered sales.', [E.bank, E.crm]),
  D040: row('Closing bank balance is EUR 60,000.', [E.bank, E.post]),
  D050: row('Sales and partnerships payroll of EUR 72,000 is operating expense.', E.payroll),
  D051: row('Office and finance payroll of EUR 96,000 is operating expense.', E.payroll),
  D052: row('Rent is operating expense of EUR 48,000.', E.bank), D053: row('Marketing is operating expense of EUR 55,000.', E.bank),
  D054: row('Software is operating expense of EUR 16,000.', E.bank), D055: row('Utilities are operating expense of EUR 12,000.', E.bank),
  D060: row('No insurance expense is recognised because the supplied evidence contains no amount or policy period.', [E.board, E.management], 'low'),
  D061: row('Unpaid interest is EUR 2,000 payable.', [E.loans, E.post]), D062: row('Accrued payroll is EUR 32,000.', E.payroll),
  D063: row('Unpaid suppliers are EUR 126,000.', E.purchases), D069: row('Loan principal payment is financing cash outflow of EUR 19,000.', [E.bank, E.loans]),
  D070: row('Equipment purchases total EUR 80,000 and are investing cash outflows/PPE additions.', [E.bank, E.assets]),
  D076: row('Closing trade receivables are EUR 168,000 net of EUR 18,000 impairment.', [E.crm, E.post]),
  D077: row('Repair expense is EUR 10,000; no amount qualifies as an improvement.', [E.purchases, E.assets]),
  D078: row('Insurance expense and prepaid insurance cannot be estimated reliably from the supplied records; no amount is recognised.', [E.board, E.management], 'low'),
  D079: row('Interest payable is EUR 2,000.', [E.loans, E.post]), D080: row('Closing accrued payroll is EUR 32,000.', E.payroll),
  D081: row('Customer deposit liability is EUR 90,000 for undelivered September work.', E.contracts),
  D082: row('Closing PPE cost is EUR 260,000: opening EUR 180,000 plus EUR 80,000 additions.', E.assets),
  D083: row('Closing accumulated depreciation is EUR 69,000: opening EUR 45,000 plus EUR 24,000 period charge.', E.assets),
  D084: row('Closing supplier payable is EUR 126,000.', E.purchases), D085: row('Closing loan principal is EUR 131,000.', [E.loans, E.post]),
  D086: row('Physical-material COGS is EUR 405,000. This conflicts by EUR 9,000 with the conservative inventory roll-forward and remains flagged.', E.warehouse, 'medium'),
  D087: row('Service direct payroll is EUR 80,000 for event-delivery staff.', E.payroll),
  D088: row('Owner distributions are EUR 110,000: villa EUR 70,000 and owner-card EUR 40,000.', [E.bank, E.loans]),
  D089: row('Corrected net profit is EUR 65,000. No insurance expense is recognised because no insurance amount is supplied.', [E.bank, E.contracts, E.crm, E.warehouse, E.purchases, E.payroll, E.assets, E.loans, E.post], 'medium'),
  D090: row('Closing cash is EUR 60,000.', [E.bank, E.post]),
  D092: row('Yes. Freeze owner-card access immediately.', [E.bank, E.loans]), D093: row('Yes. Reclassify EUR 90,000 September deposits to contract liabilities.', E.contracts),
  D094: row('Yes. Begin a weekly 13-week cash forecast because cash is only EUR 60,000 against significant payables and obligations.', [E.post, E.purchases]),
  D095: row('Yes. Stop additional credit sales to insolvent/high-risk customers and apply credit controls.', [E.contracts, E.post]),
  D096: row('Yes. Dispose of damaged stock after recognising its EUR 22,000 write-down; separately approve any disposal cost.', E.warehouse),
  D097: row('Yes. Investigate management override, unsupported classifications and conflicting sources.', [E.management, E.loans]),
  D098: row('Yes. Renegotiate supplier terms given EUR 126,000 outstanding payables and EUR 60,000 cash.', [E.purchases, E.post]),
  D099: row('Yes, conditionally. Continue the core delivered-product and event operations subject to cash controls and corrected accounts.', [E.contracts, E.post])
};

// Material statement-effect arrays are maintained in EUR thousands for concise
// source data, then converted to whole EUR when writing submission.json.
const material = {
  D041: ['Classify EUR 90,000 as contract liability, not revenue.', E.contracts, [-90, 0, 0, 90, -90]],
  D042: ['Classify EUR 50,000 as bank loan, not income.', E.loans, [-50, 0, 0, 50, -50]],
  D043: ['Capitalize the EUR 60,000 packaging machine as PPE.', E.purchases, [60, 0, 60, 0, 60]],
  D044: ['Capitalize the EUR 20,000 photo booth as PPE.', E.purchases, [20, 0, 20, 0, 20]],
  D045: ['Expense EUR 10,000 machine repair because it restored normal output.', E.purchases, [-10, 0, -10, 0, -10]],
  D046: ['Classify EUR 70,000 villa payment as owner distribution.', E.loans, [0, -70, -70, 0, -70]],
  D047: ['Classify EUR 40,000 owner-card spending as owner distribution.', E.loans, [0, -40, -40, 0, -40]],
  D048: ['Classify EUR 405,000 of materials as physical-product COGS, subject to inventory variance.', E.warehouse, [-405, 0, -405, 0, -405]],
  D049: ['Classify EUR 80,000 event-delivery payroll as direct service cost.', E.payroll, [0, 0, 0, 0, 0]],
  D056: ['Recognise EUR 24,000 depreciation expense and accumulated depreciation.', E.assets, [-24, 0, -24, 0, -24]],
  D057: ['Write off/allow EUR 18,000 for R-17 insolvency.', E.post, [-18, 0, -18, 0, -18]],
  D058: ['Write down damaged inventory by EUR 22,000.', E.warehouse, [-22, 0, -22, 0, -22]],
  D059: ['Recognise EUR 25,000 legal provision.', E.post, [-25, 0, 0, 25, -25]],
  D064: ['Recognise EUR 180,000 NorthStar revenue on delivery and acceptance.', E.contracts, [180, 180, 180, 0, 180]],
  D065: ['Recognise EUR 200,000 Freedom revenue on delivery and acceptance.', E.contracts, [200, 142, 200, 0, 200]],
  D066: ['Recognise EUR 100,000 Phoenix event revenue on completion.', E.contracts, [100, 70, 100, 0, 100]],
  D067: ['Recognise EUR 120,000 Liberty revenue on delivery and acceptance.', E.contracts, [120, 95, 120, 0, 120]],
  D068: ['Defer EUR 90,000 undelivered September events as contract liabilities.', E.contracts, [-90, 0, 0, 90, -90]],
  D071: ['Estimate bad-debt write-off at EUR 18,000 using the liquidator notice.', E.post, [-18, 0, -18, 0, -18]],
  D072: ['Estimate damaged-stock write-down at EUR 22,000 to nil recoverable value.', E.warehouse, [-22, 0, -22, 0, -22]],
  D073: ['Estimate legal provision at counsel’s EUR 25,000 best estimate.', E.loans, [-25, 0, 0, 25, -25]],
  D074: ['Estimate period depreciation at EUR 24,000 per independent schedule.', E.assets, [-24, 0, -24, 0, -24]],
  D075: ['Use conservative closing inventory of EUR 112,000 from roll-forward after EUR 22,000 write-down; disclose the EUR 9,000 count conflict.', E.warehouse, [null, null, null, null, null]],
  D091: ['Approve corrected accounts before valuation or any earn-out analysis.', [E.management, E.post], [null, null, null, null, null]],
  D100: ['Do not use management’s claimed EUR 312,000 profit for earn-out.', E.management, [null, null, null, null, null]]
};

// Each material effect uses one declared basis. This prevents a transaction's
// cash movement being mixed with a correction to management's prior entry.
const effectContext = {
  D041: ['Correction of management’s revenue entry', 'Reclassifies cash already received from revenue to a contract liability; it does not create new cash.'],
  D042: ['Correction of management’s income entry', 'Reclassifies the bank receipt from income to a repayment obligation; the cash receipt is already recorded.'],
  D043: ['Correction of management’s repair-expense entry', 'Reverses the EUR 60,000 expense and recognises PPE; the original cash payment is unchanged.'],
  D044: ['Correction of management’s marketing-expense entry', 'Reverses the EUR 20,000 expense and recognises PPE; the original cash payment is unchanged.'],
  D045: ['Correction of management’s PPE entry', 'Removes a capitalised repair and recognises an expense; the original cash payment is unchanged.'],
  D046: ['Original cash distribution transaction', 'The company paid cash for a non-business villa reservation, reducing cash, total assets and equity.'],
  D047: ['Original cash distribution transaction', 'The company paid cash for owner-card spending, reducing cash, total assets and equity.'],
  D048: ['Materials-consumption adjustment', 'Recognises EUR 405,000 of materials consumed in delivered products as COGS and reduces inventory. This is consumption, not a presentation-only reclassification; no additional cash payment occurs in this correction.'],
  D049: ['Presentation reclassification only', 'Moves payroll within expenses; total profit, cash, assets, liabilities and equity do not change.'],
  D056: ['Correction of omitted period-end depreciation', 'Records the period-end non-cash depreciation charge and reduces PPE carrying value.'],
  D057: ['Correction of omitted receivable impairment', 'Records the R-17 impairment at 31 August; it does not represent a new cash payment.'],
  D058: ['Correction of omitted inventory write-down', 'Reduces damaged inventory to its recoverable value; it does not represent a new cash payment.'],
  D059: ['Correction of omitted legal provision', 'Records the period-end expense and liability before any legal settlement cash is paid.'],
  D064: ['Original delivered-sale transaction', 'EUR 180,000 cash was collected on an accepted delivery, increasing total assets and equity.'],
  D065: ['Original delivered-sale transaction', 'EUR 142,000 cash plus EUR 58,000 receivable increases total assets by EUR 200,000.'],
  D066: ['Original delivered-sale transaction', 'EUR 70,000 cash plus EUR 30,000 receivable increases total assets by EUR 100,000.'],
  D067: ['Original delivered-sale transaction', 'EUR 95,000 cash plus EUR 25,000 receivable increases total assets by EUR 120,000.'],
  D068: ['Correction of management’s revenue entry', 'Reclassifies cash already received from revenue to a contract liability; it does not create new cash.'],
  D071: ['Correction of omitted receivable impairment', 'Records the R-17 impairment at 31 August; it does not represent a new cash payment.'],
  D072: ['Correction of omitted inventory write-down', 'Reduces damaged inventory to its recoverable value; it does not represent a new cash payment.'],
  D073: ['Correction of omitted legal provision', 'Records the period-end expense and liability before any legal settlement cash is paid.'],
  D074: ['Correction of omitted period-end depreciation', 'Records the period-end non-cash depreciation charge and reduces PPE carrying value.'],
  D075: ['Closing-balance measurement selection — not a new journal entry', 'EUR 112,000 is the selected closing inventory balance. Its component adjustments are D048 and D058; the EUR 9,000 count conflict is disclosed, not booked.'],
  D091: ['Governance approval conclusion — not a journal entry', 'This decision controls whether the corrected accounts are approved for valuation; it has no direct statement effect.'],
  D100: ['Governance comparison — not a journal entry', 'This decision rejects an unreliable management-profit benchmark for earn-out purposes; it has no direct statement effect.']
};

const reviewNotes = {
  D041: ['Agent 2 agrees: September delivery dates make the August deposits unearned.', 'I classify the deposits as contract liabilities because delivery is after 31 August.', 'high'],
  D042: ['Agent 2 agrees: the repayment obligation outweighs management’s income label.', 'I classify the receipt as a loan because it must be repaid.', 'high'],
  D043: ['Agent 2 agrees: the installed machine is a long-term productive asset.', 'I capitalise the separately identified machine as PPE.', 'high'],
  D044: ['Agent 2 agrees: the photo booth is equipment, not a one-period marketing cost.', 'I capitalise the photo booth because it is available for use.', 'medium'],
  D045: ['Agent 2 agrees: the work restored output without improving capacity or useful life.', 'I expense the repair because it only restores normal output.', 'high'],
  D046: ['Agent 2 agrees: the villa is in the founder’s name and has no evidenced business purpose.', 'I classify the villa payment as an owner distribution, not a business expense.', 'high'],
  D047: ['Agent 2 agrees: the owner-card spending has no evidenced business purpose.', 'I classify the owner-card payment as an owner distribution.', 'high'],
  D048: ['Agent 2 agrees: warehouse evidence reports EUR 405,000 consumed before impairment.', 'I use EUR 405,000 as materials COGS and disclose the count difference.', 'medium'],
  D049: ['Agent 2 agrees: event staff work directly on paid events.', 'I present EUR 80,000 as direct payroll; total payroll and cash do not change.', 'medium'],
  D056: ['Agent 2 agrees: the independent schedule supports EUR 24,000 depreciation.', 'I record EUR 24,000 depreciation and disclose the limited useful-life detail.', 'medium'],
  D057: ['Agent 2 agrees: the liquidator notice confirms the receivable was irrecoverable at 31 August.', 'I write off EUR 18,000 because recovery is not expected.', 'high'],
  D058: ['Agent 2 agrees: warehouse evidence supports nil recoverable value for the wet stock.', 'I write down EUR 22,000 to nil; disposal cost remains separate.', 'high'],
  D059: ['Agent 2 agrees: counsel assesses the claim as probable with a EUR 25,000 best estimate.', 'I recognise EUR 25,000 and disclose the EUR 20,000-30,000 range.', 'high'],
  D064: ['Agent 2 agrees: delivery and acceptance satisfy the performance obligation.', 'I recognise EUR 180,000 on delivery and acceptance.', 'high'],
  D065: ['Agent 2 agrees: delivery, not collection, determines revenue recognition.', 'I recognise EUR 200,000 and retain EUR 58,000 as a receivable.', 'high'],
  D066: ['Agent 2 agrees: completion and customer acceptance support revenue recognition.', 'I recognise EUR 100,000 because the event was completed by 29 April.', 'high'],
  D067: ['Agent 2 agrees: delivery and acceptance support the full EUR 120,000.', 'I recognise EUR 120,000 and retain EUR 25,000 as a receivable.', 'high'],
  D068: ['Agent 2 agrees: the September events were unperformed at 31 August.', 'I defer EUR 90,000 until the events are delivered.', 'high'],
  D071: ['Agent 2 agrees: the liquidator notice supports a full EUR 18,000 write-off.', 'I use EUR 18,000 because no distribution is expected.', 'high'],
  D072: ['Agent 2 agrees: count evidence supports zero recoverable value.', 'I estimate the write-down at EUR 22,000 and disclose disposal separately.', 'high'],
  D073: ['Agent 2 agrees: EUR 25,000 is counsel’s best estimate within the range.', 'I use the external EUR 25,000 best estimate.', 'high'],
  D074: ['Agent 2 agrees: the EUR 24,000 independent schedule is stronger than management’s zero entry.', 'I record EUR 24,000 and disclose limited useful-life detail.', 'medium'],
  D075: ['Agent 2 disagrees: it prefers the EUR 121,000 physical count and a EUR 9,000 COGS reduction.', 'I retain EUR 112,000 until the EUR 9,000 difference is investigated; I do not record an unsupported gain.', 'medium'],
  D091: ['Agent 2 agrees: valuation cannot use management figures contradicted by stronger evidence.', 'I require corrected accounts and stated uncertainties before valuation.', 'high'],
  D100: ['Agent 2 agrees: the claimed EUR 312,000 omits known adjustments and uses unsupported classifications.', 'I reject the claimed profit for earn-out purposes.', 'high']
};

for (const decision of template.decisions) {
  const detail = answers[decision.id] || material[decision.id] && row(material[decision.id][0], material[decision.id][1], 'medium') || row('Draft answer pending evidence reconciliation.', E.management, 'low');
  Object.assign(decision, detail);
  if (decision.reviewTier === 'material_judgment') {
    const [proposal, evidence, effect] = material[decision.id];
    const [independentChallenge, studentReasoning, confidence] = reviewNotes[decision.id];
    decision.answer = proposal;
    decision.evidence = Array.isArray(evidence) ? evidence : [evidence];
    decision.confidence = confidence;
    decision.aiProposal = `Agent 1 proposal: ${proposal}`;
    decision.independentChallenge = independentChallenge;
    decision.studentReasoning = studentReasoning;
    decision.statementEffect = Object.fromEntries(['profit', 'cash', 'assets', 'liabilities', 'equity'].map((key, i) => [key, effect[i] == null ? null : effect[i] * 1000]));
    const [effectBasis, statementEffectNote] = effectContext[decision.id];
    decision.effectBasis = effectBasis;
    decision.statementEffectNote = statementEffectNote;
    decision.changedFromAI = false;
    decision.agentDisagreement = decision.id === 'D075';
    decision.certificationStatus = 'student_certified';
  }
}

const submission = {
  schemaVersion: '1.0', caseId: 'DPI-HT-01',
  currency: { code: 'EUR', unit: 'whole euros', display: '€', note: 'All monetary values in this JSON, including statement effects, are whole EUR amounts, not thousands.' },
  student: { id: 'ri25001', name: 'Rihards Ilguns' },
  evidence: Object.entries(E).map(([id, file]) => ({ id, file, status: 'reviewed', reliability: ['bank', 'contracts', 'post'].includes(id) ? 'high' : 'supporting' })),
  decisions: template.decisions,
  schedules: {
    openingBalanceBridge: { openingCash: 80000, openingTradeReceivables: 35000, openingInventory: 80000, openingNetPpe: 135000, openingAssets: 330000, openingTradePayables: 45000, openingPayrollAccrual: 15000, openingLoan: 100000, openingEquity: 170000 },
    revenueAndReceivables: { openingTradeReceivables: 35000, revenue: 960000, totalCashCollections: 809000, cashCollectionsOnCurrentRevenue: 774000, grossReceivables: 186000, badDebtAllowance: -18000, netReceivables: 168000, customerDeposits: 90000 },
    inventoryAndCogs: { openingInventory: 80000, purchases: 459000, materialsConsumed: 405000, damagedStockWriteDown: 22000, rollForwardClosingInventory: 112000, normalPhysicalCount: 121000, physicalCountConflict: 9000 },
    supplierPayables: { openingTradePayables: 45000, periodPurchases: 459000, cashPaidToSuppliers: 378000, closingTradePayables: 126000 },
    payroll: { expense: 248000, cashPaid: 231000, openingAccrual: 15000, closingAccrual: 32000, directPayroll: 80000 },
    operatingExpenses: { rent: 48000, marketing: 55000, software: 16000, utilities: 12000, repairs: 10000, salesAndOfficePayroll: 168000, insuranceRecognised: 0 },
    ppe: { openingCost: 180000, additions: 80000, closingCost: 260000, openingAccumulatedDepreciation: 45000, depreciation: 24000, closingAccumulatedDepreciation: 69000, netPpe: 191000 },
    debtAndInterest: { openingLoan: 100000, newBorrowing: 50000, principalRepaid: 19000, closingLoan: 131000, interestExpense: 12000, interestPaid: 10000, interestPayable: 2000 },
    equityAndDistributions: { openingEquity: 170000, profit: 65000, distributions: 110000, closingEquity: 125000 }
  },
  statements: {
    profitAndLoss: { revenue: 960000, directCosts: 485000, grossProfit: 475000, operatingExpenses: 309000, depreciation: 24000, badDebtExpense: 18000, inventoryWriteDown: 22000, legalProvision: 25000, interestExpense: 12000, netProfit: 65000 },
    cashFlow: { method: 'direct', openingCash: 80000, customerAndDepositReceipts: 899000, operatingPayments: -760000, netOperatingCashFlow: 139000, investingCashFlow: -80000, financingCashFlow: -79000, netCashMovement: -20000, closingCash: 60000 },
    balanceSheet: { cash: 60000, tradeReceivablesNet: 168000, inventory: 112000, netPpe: 191000, totalAssets: 531000, tradePayables: 126000, payrollAccrual: 32000, customerDeposits: 90000, interestPayable: 2000, bankLoan: 131000, legalProvision: 25000, totalLiabilities: 406000, equity: 125000, totalLiabilitiesAndEquity: 531000 }
  },
  reconciliations: [
    { name: 'Opening balances', status: 'pass', detail: 'Opening assets of EUR 330,000 less EUR 160,000 liabilities, including EUR 45,000 implied opening trade payables, equal EUR 170,000 opening equity.' },
    { name: 'Cash', status: 'pass', detail: 'EUR 80,000 opening cash less EUR 20,000 net movement equals EUR 60,000 bank-confirmed closing cash.' },
    { name: 'Receivables', status: 'pass', detail: 'EUR 186,000 gross receivables less EUR 18,000 R-17 impairment equals EUR 168,000 net.' },
    { name: 'Inventory', status: 'warning', detail: 'Student-selected EUR 112,000 roll-forward value is EUR 9,000 below the normal-stock count of EUR 121,000. The difference is disclosed and not recorded as an unsupported gain.' },
    { name: 'PPE', status: 'pass', detail: 'EUR 260,000 cost less EUR 69,000 accumulated depreciation equals EUR 191,000 net PPE.' },
    { name: 'Debt', status: 'pass', detail: 'EUR 100,000 opening loan plus EUR 50,000 advance less EUR 19,000 principal repayment equals EUR 131,000.' },
    { name: 'Equity', status: 'pass', detail: 'EUR 170,000 opening equity plus EUR 65,000 profit less EUR 110,000 owner distributions equals EUR 125,000.' }
  ],
  uncertainties: [
    { area: 'Inventory', impact: 'EUR 9,000', status: 'disclosed', detail: 'Student decision: retain the EUR 112,000 roll-forward value. The conflict with the EUR 121,000 count is disclosed; no unsupported gain is recorded.' },
    { area: 'Insurance', impact: 'Unquantified', status: 'disclosed', detail: 'No insurance policy, invoice, cash payment or opening prepaid balance is present in the supplied data room. No amount is recognised.' }
  ],
  boardRecommendation: { conclusion: 'Continue core operations only with corrected accounts, weekly cash controls and immediate governance remediation.', actions: ['Freeze owner-card access', 'Reclassify September deposits to contract liabilities', 'Start a 13-week cash forecast', 'Stop high-risk credit sales', 'Renegotiate supplier terms and investigate management override'], earnOut: 'Do not use management’s claimed profit.' },
  submissionStatus: 'STUDENT CERTIFIED - source-only reconstruction. EUR 112,000 inventory retained with a disclosed EUR 9,000 count difference; insurance is unquantified and not recognised without evidence.'
};

await writeFile(outputPath, `${JSON.stringify(submission, null, 2)}\n`);
console.log(`Wrote ${outputPath} with ${submission.decisions.length} decisions.`);
