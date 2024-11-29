### **شرح كامل لمشروع Pixelore (بالعربية)**

---

### **1. نظرة عامة على المشروع**
**Pixelore** هو تطبيق ويب يتيح للمستخدمين:
- إنشاء فنون رقمية (Pixel Art) باستخدام شبكة 10x10.
- حفظ وتسميات الأعمال الفنية.
- عرض الأعمال المحفوظة في معرض الصور.
- استخدام وظائف التراجع/الإعادة (Undo/Redo) أثناء التحرير.
- مشاركة وتحرير الأعمال الفنية باستخدام المحرر.

المشروع يستخدم **HTML وCSS وJavaScript** بالإضافة إلى localStorage لتخزين البيانات محليًا بين الجلسات.

---

### **2. هيكل المشروع**
#### **الملفات الرئيسية:**
1. **ملفات HTML:**
   - **index.html**: الصفحة الرئيسية التي تُقدّم التطبيق.
   - **editor.html**: المحرر حيث يقوم المستخدمون بإنشاء الفن.
   - **gallery.html**: يعرض الأعمال المحفوظة في واجهة منظمة.

2. **ملفات CSS:**
   - **styles.css**: التنسيقات المشتركة بين الصفحات.
   - **editor.css**: تنسيقات خاصة بالمحرر.
   - **gallery.css**: تنسيقات خاصة بمعرض الصور.

3. **ملفات JavaScript:**
   - **main.js**: لإدارة الخلفيات في الصفحة الرئيسية.
   - **editor.js**: المنطق الأساسي للمحرر، مثل الشبكة، التراجع/الإعادة، والحفظ.
   - **gallery.js**: عرض الأعمال المحفوظة وتعديلها أو حذفها.

4. **الأصول (Assets):**
   - **الصور**: للخلفيات والشعارات.
   - **ملفات SVG**: للرسومات المتجهية.

---

### **3. شرح تفصيلي للكود**
#### **index.html**
- الصفحة الرئيسية لتطبيق Pixelore.
- المكونات الرئيسية:
  - **شريط التنقل (Navigation Bar)**: يحتوي على روابط للمحرر والمعرض.
  - **الشعار والخلفية المتحركة**: تستخدم تأثيرات CSS وجافا سكريبت.
  - **زر "ابدأ في الإنشاء"**: يوجه المستخدم إلى المحرر.

- السكربت:
  - **main.js**: يقوم بتغيير خلفية الصفحة بشكل عشوائي كل 5 ثوانٍ باستخدام `setInterval()`.

---

#### **editor.html**
- تتيح للمستخدمين الرسم وحفظ الأعمال الفنية.
- الأقسام الرئيسية:
  - **صندوق التسمية (Caption Box)**: إدخال اسم للعمل الفني مع التحقق من الإدخال.
  - **الشبكة (Grid)**: شبكة 10x10 يمكن للمستخدم النقر على خلاياها لتلوينها.
  - **التحكم السفلي (Bottom Controls):**
    - **منتقي الألوان (Color Picker)**: اختيار الألوان.
    - **أزرار التراجع/الإعادة (Undo/Redo)**: إدارة التغييرات.

- السكربت:
  - **editor.js**: يتضمن وظائف الرسم والحفظ.

---

#### **gallery.html**
- يعرض الأعمال الفنية المحفوظة بطريقة منظمة.
- الميزات:
  - **عرض الشبكة (Grid Display)**: يعرض الأعمال الفنية المصغرة.
  - **التراكب (Overlay)**: يحتوي على أزرار التعديل والحذف لكل عمل فني.
  - **شريط العرض البارالاكسي (Parallax Slider)**: يعرض الرسومات بشكل متحرك.

- السكربت:
  - **gallery.js**: لتحميل، تعديل، وحذف الأعمال المحفوظة.

---

#### **ملفات CSS**
1. **styles.css**:
   - التنسيقات المشتركة مثل شريط التنقل وتصميم الصفحات العامة.
   - يتضمن أيضًا تصميمًا متجاوبًا لتوافق مختلف أحجام الشاشات.

2. **editor.css**:
   - تصميم الشبكة وعناصر التفاعل مثل منتقي الألوان والأزرار.
   - تأثيرات التمرير لجعل التجربة تفاعلية.

3. **gallery.css**:
   - تصميم معرض الصور.
   - تأثيرات متحركة على العناصر.

---

### **4. ميزات JavaScript الرئيسية**
#### **editor.js**
1. **تهيئة الشبكة:**
   ```javascript
   function initializeGrid() {
     const savedGrid = localStorage.getItem("autoSave");
     return savedGrid ? JSON.parse(savedGrid) : Array.from({ length: gridSize }, () => Array(gridSize).fill("transparent"));
   }
   ```
   - تستعيد الشبكة من localStorage أو تُنشئ شبكة فارغة جديدة.

2. **وظيفة التراجع/الإعادة:**
   ```javascript
   let undoStack = [];
   let redoStack = [];

   function saveToUndoStack() {
     undoStack.push(JSON.parse(JSON.stringify(grid))); // نسخة عميقة
     if (undoStack.length > 50) undoStack.shift(); // الحد من الحجم
   }

   function undo() {
     if (undoStack.length > 0) {
       saveToRedoStack();
       grid = undoStack.pop();
       refreshGrid();
     }
   }
   ```
   - تستخدم مكدسات (Stacks) لتخزين حالات الشبكة.

3. **حفظ العمل الفني:**
   ```javascript
   function saveArt(artName, gridData) {
     const arts = JSON.parse(localStorage.getItem("arts") || "[]");
     arts.push({ caption: artName, data: gridData });
     localStorage.setItem("arts", JSON.stringify(arts));
   }
   ```

#### **gallery.js**
1. **تحميل الأعمال:**
   ```javascript
   let arts = JSON.parse(localStorage.getItem("arts"));

   function updateUI() {
     gallerySection.innerHTML = "";
     arts.forEach((art, i) => {
       const artElement = createArtShow(art, i);
       // إضافة أزرار التعديل والحذف
     });
   }
   ```

2. **حذف الأعمال:**
   ```javascript
   function deleteArt(artName) {
     arts = arts.filter((art) => art["caption"] != artName);
     localStorage.setItem("arts", JSON.stringify(arts));
     updateUI();
   }
   ```

#### **main.js**
- **خلفيات ديناميكية:**
   ```javascript
   function randomizeBg() {
     let chosenIndex = Math.floor(Math.random() * bgs.length);
     setPseudoElementBackground('.banner', '::before', bgs[chosenIndex]);
   }
   setInterval(randomizeBg, 5000);
   ```

---

### **5. تدفق العمل**
1. **الصفحة الرئيسية:**
   - يتم الترحيب بالمستخدمين وتشجيعهم على البدء.
2. **المحرر:**
   - يقوم المستخدمون بالرسم على الشبكة، اختيار الألوان، وحفظ الأعمال.
3. **المعرض:**
   - يتم عرض الأعمال المحفوظة مع خيارات التعديل أو الحذف.

---

### **6. ملاحظات تقنية**
- **localStorage**:
   - تُستخدم لتخزين حالات الشبكة (`autoSave`) والأعمال الفنية (`arts`).
   - تُمكّن الاستمرارية بين الجلسات دون الحاجة إلى خادم.

- **القابلية للتوسّع:**
   - يمكن تعديل حجم الشبكة أو الإعدادات بسهولة من خلال المتغيرات.

- **التجاوب:**
   - يتم ضمان التوافق مع جميع الأجهزة باستخدام استعلامات الوسائط (Media Queries).

---

هذا الشرح يضمن فهمًا كاملًا للمشروع ومكوناته. إذا كنت بحاجة إلى توضيح إضافي لأي جزء، فلا تتردد في طلب ذلك!