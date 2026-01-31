import { test, expect } from '@playwright/test';

/* -------------------- Setup -------------------- */
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

async function verifyTranslation(page, input, expected) {
  const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
  const outputBox = page.locator(
    'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
  );
await inputBox.fill(input);

// wait until translation appears
await expect(outputBox).not.toHaveText('', { timeout: 30000 });

// then assert expected value
await expect(outputBox).toContainText(expected);

}


/* --- Positive Functional - New --- */

test('Pos_Fun_0001 - Simple daily sentence', async ({ page }) => {
  await verifyTranslation(page,
    'mama vaedata yanavaa',
    'මම වැඩට යනවා'
  );
});

test('Pos_Fun_0002 - Complex sentence', async ({ page }) => {
  await verifyTranslation(page,
    'haamudhuruvo dhaanee valadhanavaa',
    'හාමුදුරුවො දානේ වලදනවා'
  );
});

test('Pos_Fun_0003 - Interrogative + Imperative', async ({ page }) => {
  await verifyTranslation(page,
    'yuShmathaa nivaeradhidha? vahaama pavasanna.',
    'යුෂ්මතා නිවැරදිද? වහාම පවසන්න.'
  );
});

test('Pos_Fun_0004 - Greeting', async ({ page }) => {
  await verifyTranslation(page,
    'suba rathriyak',
    'සුබ රත්‍රියක්'
  );
});

test('Pos_Fun_0005 - Informal phrase', async ({ page }) => {
  await verifyTranslation(page,
    'kohedha ban yanne?',
    'කොහෙද බන් යන්නෙ?'
  );
});

test('Pos_Fun_0006 - Day to day expression', async ({ page }) => {
  await verifyTranslation(page,
    'mata nidhimathayi',
    'මට නිදිමතයි'
  );
});

test('Pos_Fun_0007 - Repeated word expression', async ({ page }) => {
  await verifyTranslation(page,
    'hari hari gihin enna',
    'හරි හරි ගිහින් එන්න'
  );
});

test('Pos_Fun_0008 - Negation pattern', async ({ page }) => {
  await verifyTranslation(page,
    'mata ooka karanna baee api enne naee',
    'මට ඕක කරන්න බෑ අපි එන්නෙ නෑ'
  );
});

test('Pos_Fun_0009 - Plural + past tense', async ({ page }) => {
  await verifyTranslation(page,
    'api ehe yamu. mama nam iiyeth ehe giyaa',
    'අපි එහෙ යමු. මම නම් ඊයෙත් එහෙ ගියා'
  );
});

test('Pos_Fun_0010 - English technical term', async ({ page }) => {
  await verifyTranslation(page,
    'zoom meeting ekak gamu',
    'zoom meeting එකක් ගමු'
  );
});

test('Pos_Fun_0011 - Common English words', async ({ page }) => {
  await verifyTranslation(page,
    'Thank you. oyaa dhiipu thaegga sahenna vatinava mata',
    'Thank you. ඔයා දීපු තැග්ග සහෙන්න වටිනව මට'
  );
});

test('Pos_Fun_0012 - Long office/apps paragraph M', async ({ page }) => {
  await verifyTranslation(page,
    'machan mata adha Teams meeting ekee link eka dhaanna oone. Zoom eka use karanna puluvan nam eka dhenna. Email ekak yanna baari nam WhatsApp karala dhaapan. Mama 2.30ta pahala inna oone',
    'මචන් මට අද Teams meeting එකේ link එක දාන්න ඕනෙ. Zoom එක use කරන්න පුලුවන් නම් එක දෙන්න. Email එකක් යන්න බාරි නම් WhatsApp කරල දාපන්. මම 2.30ට පහල ඉන්න ඕනෙ'
  );
});

test('Pos_Fun_0013 - Currency + date', async ({ page }) => {
  await verifyTranslation(page,
    'heta udhee 7.00 vedhdhi RS. 1000 genalla dhenna',
    'හෙට උදේ 7.00 වෙද්දි RS. 1000 ගෙනල්ල දෙන්න'
  );
});

test('Pos_Fun_0014 - Informal frequent expression', async ({ page }) => {
  await verifyTranslation(page,
    'gihin nidhaaganin, maath nidhagannavaa',
    'ගිහින් නිදාගනින්, මාත් නිදගන්නවා'
  );
});

test('Pos_Fun_0015 - Simple sentence request', async ({ page }) => {
  await verifyTranslation(page,
    'oyaata mokakdha magen kerenna oonee? oonee dhee kiyanna kallaa dhennam',
    'ඔයාට මොකක්ද මගෙන් කෙරෙන්න ඕනේ? ඕනේ දේ කියන්න කල්ලා දෙන්නම්'
  );
});

test('Pos_Fun_0016 - Punctuation heavy', async ({ page }) => {
  await verifyTranslation(page,
    'Epaa!!! ohoma karadhdhi anith aya kohomadha innee',
    'එපා!!! ඔහොම කරද්දි අනිත් අය කොහොමද ඉන්නේ'
  );
});

test('Pos_Fun_0017 - Mixed English words', async ({ page }) => {
  await verifyTranslation(page,
    'call ekak ganna oonee. phone eka dhenna puluvan dha',
    'call එකක් ගන්න ඕනේ. phone එක දෙන්න පුලුවන් ද'
  );
});

test('Pos_Fun_0018 - Sentence with time', async ({ page }) => {
  await verifyTranslation(page,
    'adhagedharakaemahadhanne nae',
    'අදගෙදරකැමහදන්නෙ නැ'
  );
});

test('Pos_Fun_0019 - Sentence with date', async ({ page }) => {
  await verifyTranslation(page,
    'janavaari 24 venidhata api hambemu',
    'ජනවාරි 24 වෙනිදට අපි හම්බෙමු'
  );
});

test('Pos_Fun_0020 - Sentence with place', async ({ page }) => {
  await verifyTranslation(page,
    'adha hari heta hari maharagama yanna enavaa dha',
    'අද හරි හෙට හරි maharagama යන්න එනවා ද'
  );
});

test('Pos_Fun_0021 - Multiple spaces', async ({ page }) => {
  await verifyTranslation(page,
    'kaema             kanne naedhdha dhaenma',
    'කැම             කන්නෙ නැද්ද දැන්ම'
  );
});

test('Pos_Fun_0022 - Slang', async ({ page }) => {
  await verifyTranslation(page,
    'hari bro, ela',
    'හරි bro, එල'
  );
});

test('Pos_Fun_0023 - Common English in question', async ({ page }) => {
  await verifyTranslation(page,
    'Api train ekee kandy yamudha?',
    'අපි train එකේ kandy යමුද?'
  );
});

test('Pos_Fun_0024 - Paragraph style mixed', async ({ page }) => {
  await verifyTranslation(page,
    'mata intern ekak hambune nam nae thaama. thaenak dhannava nam kiyanna puluvan dha. magee CV eka whatsapp karannam. puluvan nam loku udhavuvak',
    'මට intern එකක් හම්බුනෙ නම් නැ තාම. තැනක් දන්නව නම් කියන්න පුලුවන් ද. මගේ CV එක whatsapp කරන්නම්. පුලුවන් නම් ලොකු උදවුවක්'
  );
});

/* --- Negative Cases - New --- */

test('Neg_Fun_0001 - Pure English greeting', async ({ page }) => {
  await verifyTranslation(page,
    'All the best',
    'All the best'
  );
});

test('Neg_Fun_0002 - English abbreviation', async ({ page }) => {
  await verifyTranslation(page,
    'sim eka ganna nic eka onee',
    'සිම් එක ගන්න nic එක ඔනේ'
  );
});

test('Neg_Fun_0003 - Unsupported phrase', async ({ page }) => {
  await verifyTranslation(page,
    'sinhala translate karanna bae',
    'සිංහල translate කරන්න බැ'
  );
});

test('Neg_Fun_0004 - Mixed abbreviation', async ({ page }) => {
  await verifyTranslation(page,
    'laptop eke gpu eka madhi vaeda karanna',
    'laptop eke gpu එක මදි වැඩ කරන්න'
  );
});

test('Neg_Fun_0005 - Long mixed paragraph', async ({ page }) => {
  await verifyTranslation(page,
    'oyaa campus ekata avilla mata call ekak dhenna. man avilla inne dhenatamath. Lectures yanna onee. Oyata lectures thiyenavadha? kaema geenna epaa. man genavaa',
    'ඔයා campus එකට අවිල්ල මට call එකක් දෙන්න. මන් අවිල්ල ඉන්නේ දෙනටමත්. Lectures යන්න ඔනේ. ඔයට lectures තියෙනවද? කැම ගේන්න එපා. මන් ගෙනවා'
  );
});

test('Neg_Fun_0006 - Pure English apology', async ({ page }) => {
  await verifyTranslation(page,
    'My apologies. I am very sorry for my mistake.',
    'My apologies. I am very sorry for my mistake.'
  );
});

test('Neg_Fun_0007 - Place + event name', async ({ page }) => {
  await verifyTranslation(page,
    'kolao navam maha perahera. heta saha anidhdha dhina vala pavathve',
    'කොලඔ නවම් මහ පෙරහර. හෙට සහ අනිද්ද දින වල පවත්වෙ'
  );
});

test('Neg_Fun_0008 - Phrases with missing spaces', async ({ page }) => {
  await verifyTranslation(page,
    'mama adha gedharayanvaa',
    'මම අද ගෙදර යනවා'
  );
});

test('Neg_Fun_0009 - English short form', async ({ page }) => {
  await verifyTranslation(page,
    'mee cgpa eka nedha balanne ',
    'මේ cgpa එක නේද බලන්නෙ'
  );
});

test('Neg_Fun_0010 - English phrase with date', async ({ page }) => {
  await verifyTranslation(page,
    'His birthday is on 2003.12.13',
    'His birthday is on 2003.12.13'
  );
});

/* ---------------- UI ---------------- */
test('Pos_UI_0001 - Clear button should clear input and output fields', async ({ page }) => {
  const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
  const outputBox = page.locator(
    'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
  );
  const clearButton = page.locator('button:has-text("Clear")');

  // Step 1: Enter text
  await inputBox.fill('mama gedhara yanavaa');

  // Step 2: Wait for translation to appear
  await expect(outputBox).not.toHaveText('', { timeout: 30000 });

  // Step 3: Click Clear button
  await clearButton.click();

  // Step 4: Validate input box is cleared
  await expect(inputBox).toHaveValue('');

  // Step 5: Validate output box is cleared
  await expect(outputBox).toHaveText('');
});
