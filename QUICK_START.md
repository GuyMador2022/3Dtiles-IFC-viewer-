# 🚀 הפעלה מהירה - Unified Viewer עם Vite

## ✅ השלבים שבוצעו

1. **יצירת package.json** עם תלויות מתאימות
2. **הגדרת Vite** עם תמיכה ב-WASM ו-Three.js  
3. **הגדרת Tailwind CSS** עם PostCSS
4. **עדכון HTML** להשתמש במודולים מקומיים במקום CDN
5. **יצירת נקודת כניסה** (`src/main.js`) עבור Vite

## 🛠️ איך להפעיל

```bash
# 1. התקנת תלויות (פעם ראשונה בלבד)
npm install

# 2. הפעלת שרת פיתוח עם Hot Reload
npm run dev
# ✅ פותח ב-http://localhost:3000

# 3. בניית גרסת production
npm run build

# 4. תצוגה מקדימה של build
npm run preview
```

## 📁 קבצים שנוצרו/עודכנו

### חדשים:
- `package.json` - תלויות npm
- `vite.config.js` - הגדרות Vite
- `tailwind.config.js` - הגדרות Tailwind
- `postcss.config.js` - הגדרות PostCSS
- `src/main.js` - נקודת כניסה ראשית
- `src/styles.css` - Tailwind CSS
- `.gitignore` - קבצים להתעלמות

### עודכנו:
- `index.html` - הסרת Import Map, הוספת link ל-CSS מקומי
- `README_VITE.md` - מדריך מלא

## 🎯 מה השתפר?

- **⚡ פיתוח מהיר**: HMR מאפשר עדכונים בזמן אמת
- **📦 בנדלינג מיטבי**: קבצים מוקטנים ומוקצים לייצור  
- **🔗 ניהול תלויות**: npm packages במקום CDN
- **🎨 Tailwind מקומי**: עיצוב מתקדם עם purging
- **🧮 WASM תמיכה**: web-ifc עובד בצורה מיטבית

## ⚠️ שינויים בגרסאות

- `three@0.149.0` (במקום 0.160.1) לתאימות עם web-ifc-three
- `web-ifc-three@0.0.126` (הגרסה הגבוהה ביותר הזמינה)

## 🎮 שימוש בפועל

1. פתח http://localhost:3000  
2. לחץ על "העלה IFC" כדי לטעון קובץ IFC
3. לחץ על "טען 3D Tiles מ-URL" לטעינת 3D Tiles
4. השתמש במקש `H` להצגת מקשי עזרה לניווט

---

**כל מה שצריך עכשיו הוא להריץ `npm run dev` ולהתחיל לפתח! 🎉**