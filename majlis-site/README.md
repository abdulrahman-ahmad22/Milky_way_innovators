# مجموعة المجلس لريادة الأعمال — موقع تجريبي

موقع حكومي الطابع (بسيط ومهني على نمط u.ae) مبني بـ HTML / CSS / JS، مع مساعد ذكي
«رائد أعمال المجالس» يتحدث باللهجة الإماراتية. **مفتاح Gemini محفوظ على الخادم فقط**
عبر دالة Netlify، ولا يظهر إطلاقاً في المتصفح.

## ⚠️ مهم — المفتاح القديم مكشوف ومُعطّل
المفتاح الذي كان مضمّناً في الواجهة سابقاً تم الإبلاغ عنه كمسرّب من Google وأصبح معطّلاً
(`API key was reported as leaked`). يجب إنشاء **مفتاح جديد**:
1. أنشئ مفتاحاً جديداً من https://aistudio.google.com/app/apikey
2. ضعه في متغيّر البيئة `GEMINI_API_KEY` (محلياً في `.env`، وعلى Netlify في إعدادات الموقع).
3. لا تضعه في أي ملف يُرفع إلى Git أو في كود الواجهة.

## البنية (كيف أصبح المفتاح آمناً)
- المتصفح يرسل المحادثة إلى `/.netlify/functions/chat` فقط.
- الدالة على الخادم تقرأ `GEMINI_API_KEY` من البيئة، وتضيف السياق القانوني وتعليمات اللهجة،
  ثم تنادي Gemini وتعيد الرد. المفتاح والـ system prompt لا يصلان للمتصفح.

## النشر على Netlify
1. ارفع مجلد `majlis-site` كمستودع Git (ملف `.env` لن يُرفع بفضل `.gitignore`).
2. على Netlify: **Add new site → Import** واختر المستودع.
3. الإعدادات تُقرأ تلقائياً من `netlify.toml` (publish = الجذر، functions = `netlify/functions`).
4. **Site settings → Environment variables → Add variable**:
   - Key: `GEMINI_API_KEY`
   - Value: مفتاحك الجديد
5. Deploy. سيعمل المساعد عبر الدالة مباشرة.

> بدون خطوة الإنشاء/الرفع على Git، يمكنك أيضاً السحب والإفلات لمجلد الموقع في Netlify،
> لكن يبقى ضبط متغيّر البيئة `GEMINI_API_KEY` ضرورياً ليعمل المساعد.

## التشغيل محلياً (مع الدالة)
يتطلب Netlify CLI لتشغيل الدالة محلياً:
```bash
npm install -g netlify-cli
cd majlis-site
# املأ .env بمفتاحك الجديد، ثم:
netlify dev      # يفتح الموقع مع الدالة على http://localhost:8888
```
> فتح `index.html` مباشرة (double-click) سيعرض الموقع لكن **المساعد لن يعمل**،
> لأن الدالة تحتاج بيئة Netlify. استخدم `netlify dev`.

## الملفات
- `index.html` — الصفحة والمحتوى (4 أقسام).
- `styles.css` — التصميم الحكومي المبسّط.
- `script.js` — التنقل + استدعاء الدالة الآمنة (لا مفتاح، لا system prompt).
- `netlify/functions/chat.js` — الوسيط الآمن: المفتاح + السياق القانوني + اللهجة (نموذج `gemini-2.5-flash`).
- `netlify.toml` — إعداد النشر والدوال.
- `.env` — مفتاحك (محلي فقط، مُستثنى من Git).
- `.env.example` — قالب للمتغيّر.
- `.gitignore` — يمنع رفع `.env` والأسرار.
- `assets/majlis-exterior.jpeg` — خلفية الواجهة (مبنى المجلس).
- `assets/majlis-interior.jpeg` — خلفية قسم التحديات (داخل المجلس).
