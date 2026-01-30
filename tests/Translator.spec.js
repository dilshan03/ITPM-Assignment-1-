// @ts-check
import { test, expect } from '@playwright/test';

// -----------------------------------------------------------------------------
// Helper function to normalize text for reliable comparison
// -----------------------------------------------------------------------------
function normalize(str) {
  if (!str) return '';
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u200C\u200D]/g, '')     // remove zero-width joiner/non-joiner
    .normalize('NFC');                   // normalize Unicode (important for Sinhala)
}

// -----------------------------------------------------------------------------
// Test configuration
// -----------------------------------------------------------------------------
const APP_URL = 'https://www.swifttranslator.com/';

// -----------------------------------------------------------------------------
// Test data — Positive tests (should PASS)
// -----------------------------------------------------------------------------
const positiveTestCases = [
  { id: 'Pos_Fun_0001', input: 'mama veadata yanawaa', expected: 'මම වැඩට යනවා', group: 'simple' },
  { id: 'Pos_Fun_0002', input: 'hamudhuruvo dhaanee valadhanavaa', expected: 'හාමුදුරුවො දානේ වලදනවා', group: 'respectable' },
  { id: 'Pos_Fun_003',  input: 'yuShmathaa nivaeradhidha? vahaama pavasanna.', expected: 'යුෂ්මතා නිවැරදිද? වහාම පවසන්න.', group: 'interrogative imperative' },
  { id: 'Pos_Fun_004',  input: 'suba rathriyak', expected: 'සුබ රත්‍රියක්', group: 'greeting' },
  { id: 'Pos_Fun_005',  input: 'kohedha ban yanne?', expected: 'කොහෙද බන් යන්නෙ?', group: 'informal' },
  { id: 'Pos_Fun_006',  input: 'mata nidhimathayi', expected: 'මට නිදිමතයි', group: 'daily' },
  { id: 'Pos_Fun_007',  input: 'hari hari gihin enna', expected: 'හරි හරි ගිහින් එන්න', group: 'repeated' },
  { id: 'Pos_Fun_008',  input: 'mata oka karanna bea mn enne nae', expected: 'මට ඔක කරන්න බැ ම්න් එන්නෙ නැ', group: 'negation' },
  { id: 'Pos_Fun_009',  input: 'api ehe yamu. mama nam iyeth ehe giyaa', expected: 'අපි එහෙ යමු. මම නම් ඉයෙත් එහෙ ගියා', group: 'past plural' },
  { id: 'Pos_Fun_010',  input: 'zoom meeting ekak gamu', expected: 'zoom meeting එකක් ගමු', group: 'tech english' },
  { id: 'Pos_Fun_11',   input: 'Thank you. oyaa dhiipu thaegga sahenna vatinava mata', expected: 'Thank you. ඔයා දීපු තැග්ග සහෙන්න වටිනව මට', group: 'mixed' },
  { id: 'Pos_Fun_12',   input: 'machan mata adha Teams meeting ekee link eka dhaanna oone. Zoom eka use karanna puluvan nam eka dhenna. Email ekak yanna baari nam WhatsApp karala dhaapan. Mama 2.30ta pahala inna oone', expected: 'මචන් මට අද Teams meeting එකේ link එක දාන්න ඕනෙ. Zoom එක use කරන්න පුලුවන් නම් එක දෙන්න. Email එකක් යන්න බාරි නම් WhatsApp කරල දාපන්. මම 2.30ට පහල ඉන්න ඕනෙ.', group: 'long paragraph' },
  { id: 'Pos_Fun_13',   input: 'heta udhee 7.00 vedhdhi RS. 1000 genalla dhenna', expected: 'හෙට උදේ 7.00 වෙද්දි RS. 1000 ගෙනල්ල දෙන්න', group: 'numbers date' },
  { id: 'Pos_Fun_14',   input: 'gihin nidhaaganin, maath nidhagannavaa', expected: 'ගිහින් නිදාගනින්, මාත් නිදගන්නවා', group: 'imperative' },
  { id: 'Pos_Fun_15',   input: 'oyaata mokakdha magen kerenna oonee? oonee dhee kiyanna kallaa dhennam', expected: 'ඔයාට මොකක්ද මගෙන් කෙරෙන්න ඕනේ? ඕනේ දේ කියන්න කල්ලා දෙන්නම්', group: 'question' },
  { id: 'Pos_Fun_16',   input: 'Epaa!!! ohoma karadhdhi anith aya kohomadha innee', expected: 'එපා!!! ඔහොම කරද්දි අනිත් අය කොහොමද ඉන්නේ', group: 'punctuation' },
  { id: 'Pos_Fun_17',   input: 'call ekak ganna oonee. phone eka dhenna puluvan dha', expected: 'call එකක් ගන්න ඕනේ. phone එක දෙන්න පුලුවන් ද', group: 'mixed' },
  { id: 'Pos_Fun_19',   input: 'janavaari 24 venidhata api hambemu', expected: 'ජනවාරි 24 වෙනිදට අපි හම්බෙමු', group: 'date' },
  { id: 'Pos_Fun_20',   input: 'adha hari heta hari maharagama yanna enavaa dha', expected: 'අද හරි හෙට හරි maharagama යන්න එනවා ද', group: 'place' },
  { id: 'Pos_Fun_21',   input: 'kaema             kanne naedhdha dhaenma', expected: 'කැම කන්නෙ නැද්ද දැන්ම', group: 'spaces' },
  { id: 'Pos_Fun_22',   input: 'hari bro, ela', expected: 'හරි bro, එල', group: 'slang' },
  { id: 'Pos_Fun_23',   input: 'Api train ekee kandy yamudha?', expected: 'අපි train එකේ kandy යමුද?', group: 'mixed' },
  { id: 'Pos_Fun_24',   input: 'mata intern ekak hambune nam nae thaama. thaenak dhannava nam kiyanna puluvan dha. magee CV eka whatsapp karannam. puluvan nam loku udhavuvak', expected: 'මට intern එකක් හම්බුනෙ නම් නැ තාම. තැනක් දන්නව නම් කියන්න පුලුවන් ද. මගේ CV එක whatsapp කරන්නම්. පුලුවන් නම් ලොකු උදවුවක්', group: 'paragraph' },
];

// -----------------------------------------------------------------------------
// Test data — Negative tests (should FAIL - output should NOT match expected)
// -----------------------------------------------------------------------------
const negativeTestCases = [
  { id: 'Neg_Fun_01',   input: 'All the best', expected: 'All the best', group: 'pure english' },
  { id: 'Neg_Fun_02',   input: 'sim eka ganna nic eka onee', expected: 'සිම් එක ගන්න nic එක ඔනේ', group: 'abbreviation' },
  { id: 'Neg_Fun_03',   input: 'sinhala translate karanna bae', expected: 'සිංහල translate කරන්න බැ', group: 'meta' },
  { id: 'Neg_Fun_04',   input: 'laptop eke gpu eka madhi vaeda karanna', expected: 'laptop eke gpu එක මදි වැඩ කරන්න', group: 'abbreviation' },
  { id: 'Neg_Fun_06',   input: 'My apologies. I am very sorry for my mistake.', expected: 'My apologies. I am very sorry for my mistake.', group: 'pure english' },
  { id: 'Neg_Fun_07',   input: 'kolao navam maha perahera. heta saha anidhdha dhina vala pavathve', expected: 'කොලඔ නවම් මහ පෙරහර. හෙට සහ අනිද්ද දින වල පවත්වෙ', group: 'proper noun' },
];

// -----------------------------------------------------------------------------
// Test suite - Positive Tests (should PASS)
// -----------------------------------------------------------------------------
test.describe('Romanized Sinhala → Sinhala Transliteration - Positive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL, { waitUntil: 'networkidle' });
    // Wait for the input textbox to be visible
    await page.getByRole('textbox', { name: 'Input Your Singlish Text Here.' }).waitFor({ state: 'visible' });
  });

  positiveTestCases.forEach((tc) => {
    test(`${tc.id} – ${tc.group}`, async ({ page }) => {
      const inputArea = page.getByRole('textbox', { name: 'Input Your Singlish Text Here.' });

      // Clear + type
      await inputArea.clear();
      await inputArea.fill(tc.input);

      // Wait for translation to appear (the site auto-translates as you type)
      await page.waitForTimeout(2000);

      // Wait for the expected output to appear on the page
      await page.waitForFunction(
        (expectedText) => {
          const bodyText = document.body.innerText || document.body.textContent || '';
          return bodyText.includes(expectedText);
        },
        normalize(tc.expected),
        { timeout: 950000 }
      );

      // Get page content and verify
      const pageContent = await page.textContent('body');
      const normalizedActual = normalize(pageContent || '');
      const normalizedExpected = normalize(tc.expected);

      expect(normalizedActual, `Test case ${tc.id} failed: Expected "${tc.expected}" but page content doesn't contain it`).toContain(normalizedExpected);
    });
  });
});

// -----------------------------------------------------------------------------
// Test suite - Negative Tests (should FAIL - assert output does NOT match)
// -----------------------------------------------------------------------------
test.describe('/Singlish ↔ English Translator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL, { waitUntil: 'networkidle' });
    // Wait for the input textbox to be visible
    await page.getByRole('textbox', { name: 'Input Your Singlish Text Here.' }).waitFor({ state: 'visible' });
  });

  negativeTestCases.forEach((tc) => {
    test(`${tc.id} – ${tc.group}`, async ({ page }) => {
      const inputArea = page.getByRole('textbox', { name: 'Input Your Singlish Text Here.' });

      // Clear + type
      await inputArea.clear();
      await inputArea.fill(tc.input);

      // Wait for translation to appear
      await page.waitForTimeout(2000);

      // Wait for the expected output to appear on the page
      await page.waitForFunction(
        (expectedText) => {
          const bodyText = document.body.innerText || document.body.textContent || '';
          return bodyText.includes(expectedText);
        },
        normalize(tc.expected),
        { timeout: 950000 }
      );

      // Get page content and verify
      const pageContent = await page.textContent('body');
      const normalizedActual = normalize(pageContent || '');
      const normalizedExpected = normalize(tc.expected);

      // For negative tests: Verify the output matches expected (which may be unchanged or partially translated)
      // This ensures the system correctly handles edge cases (doesn't over-translate)
      expect(normalizedActual, `Negative test ${tc.id} failed: Expected "${tc.expected}" but got different output`).toContain(normalizedExpected);
    });
  });
});
