# Unified Viewer

צופה 3D מאוחד להצגת קבצי IFC ו-3D Tiles באמצעות Three.js עם Vite.

## ✨ תכונות

- 🏗️ טעינת קבצי IFC עם ספריית web-ifc-three
- 🌐 תמיכה ב-3D Tiles (Cesium Tiles) ללא צורך בספריית Cesium
- 🔤 ממשק משתמש בעברית עם תמיכה מלאה ב-RTL
- 🛠️ כלים מתקדמים למדידה וניתוח
- 🚶 ניווט תלת-ממדי משולב עם WASD
- ⚡ סביבת פיתוח מודרנית עם Vite
- 🎨 Bundling אוטומטי עם Tailwind CSS

## 🚀 התקנה והפעלה

### דרך מודרנית (Vite) - מומלצת

```bash
# התקנת תלויות
npm install

# הפעלת שרת פיתוח עם Hot Reload
npm run dev
```

🌐 פותח אוטומטי ב: **http://localhost:3000**

### 📦 בניית גרסת production

```bash
npm run build    # בונה לתיקיית dist/
npm run preview  # תצוגה מקדימה של build
```

### 🔄 דרכים נוספות (legacy)

#### עם Python
```bash
npm run serve
# או
python serve_local.py
```

#### עם Node.js
```bash
npx http-server .
```

## 📁 מבנה התיקיות

```
UnifiedViewer/
├── 📄 index.html                  # דף הבית
├── 📦 package.json               # תלויות npm
├── ⚙️ vite.config.js            # הגדרות Vite  
├── 🎨 tailwind.config.js        # הגדרות Tailwind CSS
├── 🔧 postcss.config.js         # הגדרות PostCSS
├── 📂 src/
│   ├── 🚀 main.js               # נקודת כניסה ראשית
│   ├── 💅 styles.css           # עיצוב Tailwind
│   ├── 🏗️ UnifiedViewer.js     # המחלקה הראשית
│   └── 📂 loaders/
│       ├── 📊 DataLoader.js       # טוען קבצי נתונים
│       ├── 🏢 SanoDataLoader.js   # טוען נתוני Sano
│       └── 🌐 ThreeDTilesLoader.js # טוען 3D Tiles
├── 🐍 serve_local.py            # שרת Python מקומי
└── 📂 public/                   # קבצים סטטיים (ייווצר עם build)
```

## 🎯 יתרונות הגישה החדשה

- **⚡ פיתוח מהיר**: Hot Module Replacement (HMR) עם Vite
- **📦 בנדלינג מיטבי**: קבצים מקובצים ומוקטנים לייצור
- **🔗 ניהול תלויות**: npm packages במקום CDN
- **📘 תמיכה בטייפ סקריפט**: מוכן להרחבה
- **🚀 Build מהיר**: Vite מהיר פי 10-100 מ-webpack
- **🧮 WASM support**: תמיכה מובנית ב-WebAssembly לweb-ifc
- **🎨 עיצוב מתקדם**: Tailwind CSS עם purging אוטומטי

## 🎮 שימוש

1. **📁 טעינת IFC**: לחץ על כפתור "העלה IFC" ובחר קובץ .ifc
2. **🌐 טעינת 3D Tiles**: לחץ על "טען 3D Tiles מ-URL" והזן URL ל-tileset.json
3. **🚶 ניווט**: השתמש בעכבר או במצב הליכה WASD (מקש H לעזרה)

### ⌨️ מקשי קיצור

- `H` - הצגת עזרת ניווט
- `N` - מעבר למצב הליכה WASD  
- `ESC` - יציאה ממצב הליכה
- `W/A/S/D` - תנועה במצב הליכה
- `Q/E` - למטה/למעלה
- `Shift` - ריצה מהירה

## 🌐 הגדרות CORS ל-3D Tiles

אם אתה מטען 3D Tiles מ-S3, וודא שה-bucket מוגדר עם:

```json
{
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"]
}
```

## 📜 Scripts זמינים

| Script | תיאור |
|--------|--------|
| `npm run dev` | 🔥 הפעלת שרת פיתוח עם HMR |
| `npm run build` | 📦 בניית גרסת production |
| `npm run preview` | 👁️ תצוגה מקדימה של build |
| `npm run serve` | 🐍 הפעלה עם Python (legacy) |

## 🔧 תצורת פיתוח

הפרויקט מוגדר עם:
- **Vite 5.x** - Build tool מהיר
- **Three.js 0.160.x** - ספריית 3D
- **web-ifc-three** - טעינת IFC
- **Tailwind CSS** - עיצוב utility-first
- **PostCSS** - עיבוד CSS מתקדם

## 🎯 מה הושבח בגרסה זו?

✅ **טעינת מודולים**: עדכון Import Map ל-three + examples ול-web-ifc-three  
✅ **Tailwind**: תיקון מ-CDN לטעינה מקומית עם Vite  
✅ **UI חסר**: הוספת פקד tilesQuality למניעת שגיאות JS  
✅ **Null-safety**: הגנה על עדכוני DOM  
✅ **שרת מקומי**: serve_local.py להפעלה מהירה על HTTP  
✅ **Vite Integration**: סביבת פיתוח מודרנית עם HMR  
✅ **Bundle Optimization**: קבצים מוקטנים לייצור