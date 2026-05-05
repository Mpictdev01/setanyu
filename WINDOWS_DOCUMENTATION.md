# 🪟 Dokumentasi Window dan Kelas CSS

Dokumentasi lengkap semua window yang ada dalam aplikasi MOOB beserta kelas CSS-nya.

## 📋 Daftar Window

1. [MainWindow](#1-mainwindow)
2. [SidePanel - Slider Window](#2-sidepanel---slider-window)
3. [SidePanel - MOOB TV Window](#3-sidepanel---moob-tv-window)
4. [HashWindow](#4-hashwindow)
5. [DexWindow](#5-dexwindow)

---

## 1. MainWindow

**File**: `components/MainWindow.tsx`  
**Lokasi**: Tengah, antara dua SidePanel

### Kelas CSS Utama

```tsx
<div className="main-window window w-full h-full p-2">
```

### Struktur Kelas CSS Lengkap

| Elemen                   | Kelas CSS                  | Keterangan                                |
| ------------------------ | -------------------------- | ----------------------------------------- |
| **Container**            | `main-window`              | Container utama MainWindow                |
|                          | `window`                   | Base class dari 98.css untuk semua window |
|                          | `w-full`                   | Width 100% (Tailwind)                     |
|                          | `h-full`                   | Height 100% (Tailwind)                    |
|                          | `p-2`                      | Padding 2 (Tailwind)                      |
| **Window Content**       | `window-content`           | Wrapper untuk konten window               |
| **Title Bar**            | `title-bar`                | Bar judul window (dari 98.css)            |
|                          | `title-bar-text`           | Text di title bar                         |
|                          | `title-bar-controls`       | Container untuk tombol controls           |
| **Window Body**          | `window-body`              | Body content window (dari 98.css)         |
|                          | `h-full`                   | Height 100% (Tailwind)                    |
| **Background Video**     | `bg-video`                 | Video background                          |
|                          | `p-2`                      | Padding (Tailwind)                        |
| **Background Container** | `bg-container`             | Container untuk background                |
| **Content Overlay**      | `content-overlay`          | Overlay untuk konten utama                |
| **Text Content**         | `text-content`             | Container untuk text content              |
| **Main Title**           | `main-title`               | Judul utama "$MOOB"                       |
| **Character Section**    | `character-section-bottom` | Section untuk character image             |
| **Character Image**      | `character-image`          | Image karakter (herio.png)                |

### CSS Custom (global.css)

```css
.main-window {
	height: 100%;
	min-height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
}

.window-content {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.bg-video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 0;
}

.bg-container {
	position: relative;
	flex: 1;
	border-radius: 4px;
	overflow: hidden;
	z-index: 1;
}

.content-overlay {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 20px;
	gap: 20px;
}

.character-section-bottom {
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	z-index: 3;
}

.character-image {
	width: 400px;
	height: auto;
	max-width: 100%;
	border-radius: 8px;
	transition: none;
}
```

### CSS Base (98.css)

```css
.window {
	font-size: 11px;
	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
		inset -2px -2px grey, inset 2px 2px #fff;
	background: silver;
	padding: 3px;
}

.title-bar {
	font-size: 11px;
	background: linear-gradient(90deg, navy, #1084d0);
	padding: 3px 2px 3px 3px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.window-body {
	margin: 8px;
}
```

---

## 2. SidePanel - Slider Window

**File**: `components/SidePanel.tsx`  
**Lokasi**: Kiri dan kanan MainWindow (2 instance)

### Kelas CSS Utama

```tsx
<div className="window sm:w-[250px] w-full">
```

### Struktur Kelas CSS Lengkap

| Elemen              | Kelas CSS          | Keterangan                                |
| ------------------- | ------------------ | ----------------------------------------- |
| **Container**       | `window`           | Base class dari 98.css                    |
|                     | `sm:w-[250px]`     | Width 250px pada desktop (Tailwind)       |
|                     | `w-full`           | Width 100% pada mobile (Tailwind)         |
| **Title Bar**       | `title-bar`        | Bar judul window                          |
|                     | `title-bar-text`   | Text "🥛 MOOB 🥛"                         |
| **Window Body**     | `window-body`      | Body content window                       |
| **Text**            | `text-md`          | Text "How MOOB are you?"                  |
| **Field Row**       | `field-row`        | Container untuk range input (dari 98.css) |
| **Input Range**     | -                  | Range input dengan id `range26`           |
| **MOOB Level Text** | `text-center`      | Center alignment (Tailwind)               |
|                     | `text-sm`          | Small text (Tailwind)                     |
|                     | `mt-2`             | Margin top 2 (Tailwind)                   |
| **Status Bar**      | `status-bar`       | Status bar di bawah window (dari 98.css)  |
| **Status Fields**   | `status-bar-field` | Field di status bar                       |

### CSS Custom (global.css)

```css
.status-bar {
	display: flex;
	gap: 1px;
	margin: 0 1px;
}

.status-bar-field {
	box-shadow: inset -1px -1px #dfdfdf, inset 1px 1px grey;
	flex-grow: 1;
	padding: 2px 3px;
	margin: 0;
	font-size: 11px;
}
```

---

## 3. SidePanel - MOOB TV Window

**File**: `components/SidePanel.tsx`  
**Lokasi**: Kiri dan kanan MainWindow (2 instance)

### Kelas CSS Utama

```tsx
<div className="window sm:w-[250px] w-full">
```

### Struktur Kelas CSS Lengkap

| Elemen              | Kelas CSS                      | Keterangan                       |
| ------------------- | ------------------------------ | -------------------------------- |
| **Container**       | `window`                       | Base class dari 98.css           |
|                     | `sm:w-[250px]`                 | Width 250px pada desktop         |
|                     | `w-full`                       | Width 100% pada mobile           |
| **Title Bar**       | `title-bar`                    | Bar judul window                 |
|                     | `title-bar-text`               | Text "🥛 MOOB TV 🥛"             |
| **Window Body**     | `window-body`                  | Body content window              |
|                     | `flex`                         | Flexbox (Tailwind)               |
|                     | `flex-col`                     | Flex direction column (Tailwind) |
|                     | `gap-3`                        | Gap 12px (Tailwind)              |
| **Video Container** | `relative`                     | Relative positioning (Tailwind)  |
|                     | `rounded-large`                | Border radius (Tailwind)         |
| **Video Element**   | `relative`                     | Relative positioning             |
|                     | `z-10`                         | Z-index 10                       |
|                     | `opacity-100`                  | Opacity 100%                     |
|                     | `transition-transform-opacity` | Transition effect                |
|                     | `rounded-none`                 | No border radius                 |
|                     | `sm:aspect-auto`               | Aspect ratio auto pada desktop   |
|                     | `aspect-square`                | Aspect ratio square pada mobile  |

---

## 4. HashWindow

**File**: `components/HashWindow.tsx`  
**Lokasi**: Bottom section

### Kelas CSS Utama

```tsx
<div className="hash-window window w-full relative" style={{ zIndex: 30 }}>
```

### Struktur Kelas CSS Lengkap

| Elemen                  | Kelas CSS             | Keterangan                     |
| ----------------------- | --------------------- | ------------------------------ |
| **Container**           | `hash-window`         | Custom class untuk HashWindow  |
|                         | `window`              | Base class dari 98.css         |
|                         | `w-full`              | Width 100%                     |
|                         | `relative`            | Relative positioning           |
| **Title Bar**           | `title-bar`           | Bar judul window               |
|                         | `title-bar-text`      | Text "🥛 MOOB 🥛"              |
|                         | `title-bar-controls`  | Container untuk controls       |
| **Window Body**         | `window-body`         | Body content window            |
| **Terminal Container**  | `terminal-container`  | Container untuk terminal style |
| **Terminal Content**    | `terminal-content`    | Content terminal               |
| **Terminal Line**       | `terminal-line`       | Baris terminal                 |
| **Terminal Prompt**     | `terminal-prompt`     | Prompt "🥛"                    |
| **Terminal Text**       | `terminal-text`       | Text contract address          |
| **Copy Button Wrapper** | `copy-button-wrapper` | Wrapper untuk copy button      |
| **Copy Button**         | `copy-btn`            | Tombol copy                    |

### CSS Custom (global.css)

```css
.hash-window {
	/* Menggunakan base .window styles */
	/* z-index: 30 (inline style) */
}

.terminal-container {
	/* Terminal theme styling */
}

.terminal-content {
	/* Terminal content styling */
}

.terminal-line {
	/* Terminal line styling */
}

.terminal-prompt {
	/* Prompt emoji styling */
}

.terminal-text {
	/* Contract text styling */
}

.copy-button-wrapper {
	/* Copy button wrapper */
}

.copy-btn {
	/* Copy button styling */
}
```

---

## 5. DexWindow

**File**: `components/DexWindow.tsx`  
**Lokasi**: Fixed overlay (default: hidden)

### Kelas CSS Utama

```tsx
<div id="dex-window" className="window dex-window" style={{ display: 'none' }}>
```

### Struktur Kelas CSS Lengkap

| Elemen              | Kelas CSS            | Keterangan                     |
| ------------------- | -------------------- | ------------------------------ |
| **Container**       | `window`             | Base class dari 98.css         |
|                     | `dex-window`         | Custom class untuk DexWindow   |
| **Title Bar**       | `title-bar`          | Bar judul window               |
|                     | `title-bar-text`     | Text "📊 MOOB Chart 📊"        |
|                     | `title-bar-controls` | Container untuk controls       |
| **Window Body**     | `window-body-chart`  | Custom body untuk chart window |
| **Chart Container** | `chart-container`    | Container untuk chart          |
| **Chart Embed**     | `chart-embed`        | Container untuk iframe chart   |
| **Chart Footer**    | `chart-footer`       | Footer dengan buttons          |
| **Chart Buttons**   | `chart-btn`          | Base class untuk chart buttons |
|                     | `buy-btn`            | Buy button variant             |
|                     | `dex-btn`            | DEX button variant             |
| **Button Layers**   | `chart-btn-top`      | Top layer button               |
|                     | `chart-btn-bottom`   | Bottom layer button            |
|                     | `chart-btn-base`     | Base layer button              |

### CSS Custom (global.css)

```css
.dex-window {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) !important;
	width: 90vw;
	max-width: 1000px;
	height: 80vh;
	max-height: 700px;
	z-index: 1000;
	display: none;
	pointer-events: auto;
}

.dex-window.active {
	display: block;
}

.dex-window .title-bar {
	cursor: default !important;
	pointer-events: none;
}

.dex-window .title-bar-controls {
	pointer-events: auto;
}

.window-body-chart {
	height: 100%;
}

.chart-container {
	height: calc(100% - 100px);
	padding: 10px;
	background: #f0f0f0;
	border: 2px inset #c0c0c0;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
}

.chart-embed {
	width: 100%;
	height: 100%;
	border: 1px solid #999;
	background: #fff;
	display: flex;
	justify-content: center;
	position: relative;
	flex: 1;
	min-height: 100%;
	align-items: center;
	align-content: center;
}

.chart-footer {
	display: flex;
	gap: 10px;
	/* ... other styles */
}
```

---

## 📐 Base Window Classes (98.css)

### `.window`

```css
.window {
	font-size: 11px;
	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
		inset -2px -2px grey, inset 2px 2px #fff;
	background: silver;
	padding: 3px;
	font-family: "Pixelated MS Sans Serif", Arial;
	-webkit-font-smoothing: none;
}
```

### `.title-bar`

```css
.title-bar {
	font-size: 11px;
	background: linear-gradient(90deg, navy, #1084d0);
	padding: 3px 2px 3px 3px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
```

### `.title-bar-text`

```css
.title-bar-text {
	font-weight: 700;
	color: #fff;
	letter-spacing: 0;
	margin-right: 24px;
}
```

### `.title-bar-controls`

```css
.title-bar-controls {
	display: flex;
}

.title-bar-controls button {
	padding: 0;
	display: block;
	min-width: 16px;
	min-height: 14px;
}
```

### `.window-body`

```css
.window-body {
	margin: 8px;
	color: #000;
}
```

### `.status-bar`

```css
.status-bar {
	margin: 0 1px;
	display: flex;
	gap: 1px;
}
```

### `.status-bar-field`

```css
.status-bar-field {
	box-shadow: inset -1px -1px #dfdfdf, inset 1px 1px grey;
	flex-grow: 1;
	padding: 2px 3px;
	margin: 0;
}
```

---

## 🎨 Window States

### `.window.active`

```css
.window.active {
	z-index: 1000; /* Window aktif di atas */
}
```

### `.window:hover`

```css
.window:hover {
	transform: translateY(-2px);
	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
		inset -2px -2px grey, inset 2px 2px #fff, 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

---

## 🔢 Z-Index Hierarchy

| Window             | Z-index | Keterangan                 |
| ------------------ | ------- | -------------------------- |
| **DexWindow**      | `1000`  | Fixed, highest priority    |
| **Active Window**  | `1000`  | Window yang sedang di-drag |
| **HashWindow**     | `30`    | Inline style               |
| **Default Window** | `1`     | Base z-index dari 98.css   |

---

## 📋 Summary Table

| Window             | Container Classes                      | Ukuran                                    | Lokasi        |
| ------------------ | -------------------------------------- | ----------------------------------------- | ------------- |
| **MainWindow**     | `main-window window w-full h-full p-2` | Flex-1 (fleksibel)                        | Tengah        |
| **Slider Window**  | `window sm:w-[250px] w-full`           | 250px (desktop) / 100% (mobile)           | SidePanel     |
| **MOOB TV Window** | `window sm:w-[250px] w-full`           | 250px (desktop) / 100% (mobile)           | SidePanel     |
| **HashWindow**     | `hash-window window w-full relative`   | 100% width, max-w-[1400px]                | Bottom        |
| **DexWindow**      | `window dex-window`                    | 90vw, max-w-[1000px], 80vh, max-h-[700px] | Fixed overlay |

---

## 🔗 Komponen Internal

### Window Controls

Semua window memiliki:

- **Minimize Button**: `aria-label="Minimize"` (placeholder)
- **Maximize Button**: `aria-label="Maximize"` (placeholder)
- **Close Button**: `aria-label="Close"` (aktif untuk DexWindow)

### Window Dragging

- Semua `.window` elements bisa di-drag
- Function: `initWindowDragging()` di `main.js`
- Window yang di-drag otomatis mendapat class `.active`

---

**Last Updated**: 2024  
**Version**: 1.0.0
