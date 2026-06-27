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

// نقطة النهاية الآمنة (Netlify Function). المفتاح والسياق محفوظان على الخادم فقط،
// ولا يظهران أبداً في المتصفح.
const CHAT_ENDPOINT = '/.netlify/functions/chat';

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

/* ---------- نداء المساعد عبر الوسيط الآمن ---------- */
async function askGemini(userText) {
  history.push({ role: 'user', parts: [{ text: userText }] });

  const res = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.reply) {
    // أزل آخر رسالة مستخدم حتى لا يبقى السجل غير متوازن عند الفشل
    history.pop();
    throw new Error(data.error || ('HTTP ' + res.status));
  }

  history.push({ role: 'model', parts: [{ text: data.reply }] });
  return data.reply;
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
