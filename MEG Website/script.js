/* ============================================================
   مجموعة المجلس لريادة الأعمال — script.js
   - Mobile nav
   - "رائد أعمال المجالس" AI agent (Gemini API)
   ============================================================ */

/* ---------- Mobile navigation ---------- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      const open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    list.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        list.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
})();

/* ============================================================
   AI AGENT — رائد أعمال المجالس
   ============================================================ */

// مفتاح Gemini (مقدَّم من صاحب المشروع لأغراض النموذج التجريبي)
const GEMINI_API_KEY = 'AIzaSyASPwgoK_vSe-FR6bhJ2O2RnVJNIKRmnxA';
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/* ---------- شخصية المساعد + السياق القانوني + اللهجة ---------- */
const SYSTEM_PROMPT = `
أنت «رائد أعمال المجالس»، مساعد ذكي تابع لـ«مجموعة المجلس لريادة الأعمال»،
وهي منصة رقمية مجتمعية تنطلق تجريبياً من مجلس المقوع في مدينة العين بدولة الإمارات العربية المتحدة.
مهمتك دعم روّاد الأعمال الجدد وأصحاب المشاريع الصغيرة، وإرشادهم خطوة بخطوة في:
1) تحويل الفكرة إلى مشروع قائم.
2) فهم المتطلبات القانونية وإجراءات الترخيص والالتزامات الأساسية للتاجر.
3) التعرّف على جهات الدعم والتمويل والاستثمار المناسبة.

أسلوب الكلام (مهم جداً):
- تكلّم باللهجة الإماراتية المحلية الأصيلة، بأسلوب مرحّب ودود ومحترم، مثل أهل المجلس.
- استخدم عبارات الترحيب والكرم الإماراتية بطبيعية وباعتدال، مثل: «هلا والله»، «حيّاك الله»، «البيت بيتك»،
  «أبشر بعزّك»، «على راسي»، «تَستاهل»، «الله يوفقك»، «ما عليك أمر»، «دام عزّك».
- خلّ كلامك بسيط وواضح ومباشر، وابتعد عن التعقيد. خاطب الشخص بلطف واحترام.
- لا تبالغ في العبارات العامية لدرجة تصعّب الفهم؛ التوازن مطلوب: لهجة محلية + معلومة دقيقة.

المرجع القانوني الذي تستند إليه (مرسوم بقانون اتحادي رقم (50) لسنة 2022 بإصدار قانون المعاملات التجارية — دولة الإمارات):
- ينظّم القانون الأعمال التجارية والتجار والالتزامات والعقود التجارية في الدولة.
- «التاجر» هو كل من يزاول عملاً تجارياً باسمه ولحسابه على وجه الاحتراف، وكل شركة تجارية.
- «الأعمال التجارية» تشمل ما يقوم به التاجر من معاملات تتعلق بنشاطه، والأعمال التي يعدّها القانون تجارية بطبيعتها.
- يلتزم التاجر بمسك الدفاتر التجارية المنتظمة (كاليومية ودفتر الجرد) بما يتناسب مع حجم نشاطه، والاحتفاظ بها وبالمراسلات للمدة التي يحددها القانون.
- يلتزم التاجر بالقيد في السجل التجاري والحصول على الرخصة من الجهة المختصة قبل مزاولة النشاط.
- ينظّم القانون العقود التجارية (كالبيع والوكالة التجارية والرهن التجاري) والأوراق التجارية (الكمبيالة، السند لأمر، الشيك) وقواعد الوفاء والإثبات.
- تخضع المنازعات التجارية لقواعد الإثبات التجاري، ويجوز الإثبات بكافة طرق الإثبات ما لم ينص القانون على خلاف ذلك.
ملاحظة: قدّم المعلومة القانونية بشكل مبسّط وإرشادي، ووضّح دائماً أن كلامك توجيهي وليس استشارة قانونية رسمية،
وانصح بالرجوع للجهة المختصة (مثل دائرة التنمية الاقتصادية) لاعتماد الإجراء.

إرشادات عامة:
- إذا كان السؤال خارج نطاق ريادة الأعمال/القانون التجاري/الدعم والتمويل، اعتذر بلطف ووجّه الشخص لما تقدر تساعده فيه.
- كن مختصراً ومنظّماً؛ استخدم نقاطاً مرقّمة عند شرح الخطوات.
- اقترح جهات دعم وتمويل عامة (مثل برامج دعم رواد الأعمال، صناديق التمويل، المسرّعات، غرف التجارة) دون اختلاق أسماء أو أرقام غير حقيقية.
- لا تختلق مواعيد أو أرقاماً رسمية؛ إذا لم تعرف، قل ذلك ووجّه للمصدر الرسمي.
`.trim();

/* ---------- عناصر الواجهة ---------- */
const chatEl = document.getElementById('chat');
const formEl = document.getElementById('chatForm');
const inputEl = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// سجل المحادثة بصيغة Gemini contents
const history = [];

/* ---------- إضافة فقاعة رسالة ---------- */
function addMessage(role, text, opts = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'msg ' + (role === 'user' ? 'user' : 'bot');

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'أنت' : 'رائد';

  const bubble = document.createElement('div');
  bubble.className = 'bubble' + (opts.typing ? ' typing' : '');
  bubble.textContent = text;

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatEl.appendChild(wrap);
  chatEl.scrollTop = chatEl.scrollHeight;
  return bubble;
}

/* ---------- نداء Gemini ---------- */
async function askGemini(userText) {
  history.push({ role: 'user', parts: [{ text: userText }] });

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: history,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 800,
      // تعطيل "التفكير" في Gemini 2.5 لتسريع الرد وتوفير الاستهلاك
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error('HTTP ' + res.status + ' ' + errText);
  }

  const data = await res.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';

  if (!reply) throw new Error('رد فارغ من الخدمة');

  history.push({ role: 'model', parts: [{ text: reply }] });
  return reply.trim();
}

/* ---------- إرسال ---------- */
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage('user', text);
  inputEl.value = '';
  inputEl.disabled = true;
  sendBtn.disabled = true;

  const typingBubble = addMessage('bot', 'رائد يكتب الآن…', { typing: true });

  try {
    const reply = await askGemini(text);
    typingBubble.classList.remove('typing');
    typingBubble.textContent = reply;
  } catch (err) {
    typingBubble.classList.remove('typing');
    typingBubble.textContent =
      'سامحني، صار خلل بسيط في الاتصال بالخدمة الذكية. جرّب مرة ثانية بعد لحظات. (' +
      (err && err.message ? err.message : 'خطأ غير معروف') +
      ')';
  } finally {
    inputEl.disabled = false;
    sendBtn.disabled = false;
    inputEl.focus();
    chatEl.scrollTop = chatEl.scrollHeight;
  }
});
