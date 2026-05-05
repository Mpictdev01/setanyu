# 📚 Dokumentasi Panel, Window, dan Komponen MOOB

Dokumentasi lengkap untuk semua panel, window, dan komponen yang digunakan dalam aplikasi MOOB.

## 📋 Daftar Isi

1. [Struktur Layout](#struktur-layout)
2. [Panel Components](#panel-components)
3. [Window Components](#window-components)
4. [Sub-Components](#sub-components)
5. [Background & Effects](#background--effects)
6. [Styling & CSS](#styling--css)
7. [State Management](#state-management)
8. [Interaksi & Event Handlers](#interaksi--event-handlers)

> 📖 **Lihat juga**: [WINDOWS_DOCUMENTATION.md](./WINDOWS_DOCUMENTATION.md) untuk dokumentasi lengkap semua window dan kelas CSS-nya.

---

## 🏗️ Struktur Layout

### Halaman Utama (`app/page.tsx`)

Layout utama aplikasi dengan struktur hierarki berikut:

```
app/page.tsx
├── BackgroundVideo (z-index: -2)
│   ├── Background Image (bg.png)
│   ├── Snowfall Animation (z-index: -1)
│   └── Background Images (floating images)
├── Preloader (z-index: 50)
└── Main Content Container (z-index: 10)
    ├── Header Logo
    ├── Main Content Section
    │   ├── SidePanel (Kiri) - flex-shrink-0
    │   ├── MainWindow (Tengah) - flex-1 (mengisi ruang tersisa)
    │   └── SidePanel (Kanan) - flex-shrink-0
    └── Bottom Section
        └── HashWindow
```

### Container Specifications

- **Main Content Container**: `max-w-[1400px]`, `min-w-[1400px]`
- **Layout**: Flexbox horizontal (`sm:flex-row`) pada layar besar, vertikal pada mobile
- **Gap**: `gap-3` (12px) antar elemen
- **Height**: MainWindow mengisi tinggi penuh dengan `flex-1` dan `items-stretch`

---

## 🎛️ Panel Components

### 1. SidePanel (`components/SidePanel.tsx`)

**Lokasi**: Kiri dan kanan MainWindow

**Ukuran**: `sm:w-[250px]` (250px pada layar desktop, `w-full` pada mobile)

**Fungsi**: Menampilkan slider MOOB level dan slideshow meme images

#### Struktur Internal:

```tsx
<SidePanel>
  ├── Slider Window (window)
  │   ├── Title Bar: "🥛 MOOB 🥛"
  │   ├── Window Body
  │   │   ├── Text: "How MOOB are you?"
  │   │   ├── Range Input (1-11)
  │   │   └── MOOB Level Display
  │   └── Status Bar: "TRUST IN MOOB"
  └── Meme Images Window (window)
      ├── Title Bar: "🥛 MOOB TV 🥛"
      └── Window Body
          ├── Slideshow Component
          └── Video Player (coding.mp4)
```

#### State Management:

- **`moobLevel`**: String level MOOB saat ini (default: `'60% — Moobinator'`)
- **`sliderValue`**: Nilai slider 1-11 (default: `7`)

#### MOOB Levels:

| Value | Level            |
| ----- | ---------------- |
| 1     | 0% — Moobless    |
| 2     | 10% — Mooblet    |
| 3     | 20% — Moobing    |
| 4     | 30% — Moobster   |
| 5     | 40% — Mooblord   |
| 6     | 50% — Moobzilla  |
| 7     | 60% — Moobinator |
| 8     | 70% — Moobaholic |
| 9     | 80% — Moobfather |
| 10    | 90% — MoobKing   |
| 11    | 100% — Moobgod   |

#### Event Handlers:

- **`handleSliderChange`**: Update level MOOB berdasarkan nilai slider

---

## 🪟 Window Components

### 1. MainWindow (`components/MainWindow.tsx`)

**Lokasi**: Tengah, antara dua SidePanel

**Ukuran**: Fleksibel (`flex-1`), mengisi ruang tersisa

**Height**: Mengisi tinggi penuh container (`h-full`)

**Fungsi**: Window utama dengan konten branding, social buttons, dan buy button

#### Struktur Internal:

```tsx
<MainWindow>
  └── window-content
      ├── Title Bar
      │   ├── Title: "🥛 MOOB 🥛"
      │   └── Controls (Minimize, Maximize, Close)
      └── window-body (h-full)
          ├── Video Background (bg.mp4)
          ├── bg-container
          │   └── content-overlay
          │       └── text-content
          │           ├── Main Title: "$MOOB"
          │           ├── SocialButtons Component
          │           └── BuyButton Component
          └── character-section-bottom
              └── Character Image (herio.png)
```

#### Styling:

- **Background Video**: Absolute positioned, `z-index: 0`
- **Content Overlay**: `z-index: 1`, centered dengan flexbox
- **Character Image**: Absolute positioned bottom, `z-index: 3`
- **Height**: `100%` untuk mengisi container penuh

#### CSS Classes:

- `.main-window`: `height: 100%`, `display: flex`, `flex-direction: column`
- `.window-content`: `display: flex`, `flex-direction: column`, `height: 100%`
- `.bg-video`: Absolute positioning, full coverage
- `.bg-container`: `flex: 1`, untuk mengisi ruang tersisa
- `.content-overlay`: Centered content dengan flexbox

---

### 2. HashWindow (`components/HashWindow.tsx`)

**Lokasi**: Bottom section

**Ukuran**: `w-full`, `max-w-[1400px]`

**Fungsi**: Menampilkan contract address dengan terminal-style interface

#### Struktur Internal:

```tsx
<HashWindow>
  ├── Title Bar
  │   ├── Title: "🥛 MOOB 🥛"
  │   └── Controls (Minimize, Maximize, Close)
  └── window-body
      └── terminal-container
          └── terminal-content
              └── terminal-line
                  ├── Prompt: "🥛"
                  ├── Contract Display Text
                  └── Copy Button (conditional)
```

#### State Management:

- **`contractText`**: Text contract address (default: `"Coming Soon"`)
- **`showCopyButton`**: Boolean untuk menampilkan tombol copy (default: `false`)

#### Configuration Integration:

- Menggunakan `window.MOOB_CONFIG` untuk:
  - `getContractDisplayText()`: Mengambil text contract
  - `hasContractAddress()`: Cek apakah contract address tersedia

#### Event Handlers:

- **`handleCopy`**: Memanggil `window.copyCA()` untuk copy contract address

#### Styling:

- **Z-index**: `30` (fixed)
- **Terminal Theme**: Windows 98 terminal style dengan prompt emoji

---

### 3. DexWindow (`components/DexWindow.tsx`)

**Lokasi**: Fixed overlay (default: `display: none`)

**Ukuran**: `90vw`, `max-w-[1000px]`, `height: 80vh`, `max-height: 700px`

**Fungsi**: Menampilkan DexScreener chart dalam modal window

#### Struktur Internal:

```tsx
<DexWindow>
  ├── Title Bar
  │   ├── Title: "📊 MOOB Chart 📊"
  │   └── Controls (Minimize, Maximize, Close)
  └── window-body-chart
      ├── chart-container
      │   └── chart-embed (iframe container)
      └── chart-footer
          ├── Buy Button
          └── Open DEX Button
```

#### State Management:

- **`isOpen`**: Boolean untuk status window (dikelola oleh `dex-chart.js`)

#### Window Manager Integration:

- Menggunakan `window.dexChartManager` untuk:
  - `close()`: Menutup window
  - `openBuyLink()`: Membuka link buy
  - `openDexLink()`: Membuka link DEX

#### Styling:

- **Z-index**: `1000` (fixed, highest)
- **Position**: `fixed`, centered dengan `transform: translate(-50%, -50%)`
- **Display**: `none` by default, dikontrol oleh `dex-chart.js`

#### Event Handlers:

- **`handleClose`**: Menutup chart window
- **`handleBuy`**: Membuka buy link
- **`handleDex`**: Membuka DEX link

---

## 🧩 Sub-Components

### 1. Slideshow (`components/Slideshow.tsx`)

**Digunakan oleh**: SidePanel (dalam MOOB TV window)

**Fungsi**: Menampilkan slideshow gambar dan video dengan navigasi

#### Struktur:

```tsx
<Slideshow>
  ├── slideshow-container
  │   ├── slideshow-slide (multiple, hanya active yang terlihat)
  │   │   ├── Image slides (7 images)
  │   │   └── Video slides (2 videos)
  │   ├── slideshow-nav
  │   │   ├── Prev Button (❮)
  │   │   └── Next Button (❯)
  │   └── slideshow-indicators
  │       └── Indicator dots (13 dots)
```

#### Slide Content:

- **Images**: 7 gambar (.avif format)
- **Videos**: 2 video (ridinghorses.mp4, coding.mp4)
- **Total**: 13 slides

#### State Management:

- **`currentSlide`**: Index slide aktif (0-12), default: `0`

#### Auto-advance:

- **Interval**: 5000ms (5 detik)
- **Direction**: Forward (increment)

#### Functions:

- **`changeSlide(direction)`**: Navigasi prev/next dengan wrapping
- **`goToSlide(index)`**: Langsung ke slide tertentu

#### Styling:

- **Container**: `relative`, `rounded-large`
- **Slides**: Absolute positioned, hanya `.active` yang visible
- **Navigation**: Windows 98 style buttons dengan 3D effect
- **Indicators**: Dot indicators di bawah slideshow

---

### 2. SocialButtons (`components/SocialButtons.tsx`)

**Digunakan oleh**: MainWindow

**Fungsi**: Menampilkan tombol social media dan chart button

#### Struktur:

```tsx
<SocialButtons>
  └── social-section
      ├── Social Button (dynamic, berdasarkan config)
      │   └── Link (platform name)
      └── Chart Button (always present)
```

#### State Management:

- **`socialLinks`**: Object dengan key-value pairs `{platform: url}`

#### Configuration Integration:

- Menggunakan `window.MOOB_CONFIG.getActiveSocialLinks()` untuk mendapatkan links aktif
- Menampilkan semua platform yang ada di config
- Chart button selalu ditampilkan sebagai tombol terakhir

#### Event Handlers:

- **`handleChartClick`**: Memanggil `window.openDexWindow()` untuk membuka chart

#### Supported Platforms:

Platform ditentukan oleh `config.js`. Contoh:

- Twitter/X
- Telegram
- Discord
- Website
- dll.

---

### 3. BuyButton (`components/BuyButton.tsx`)

**Digunakan oleh**: MainWindow

**Fungsi**: Tombol untuk membeli token MOOB

#### Struktur:

```tsx
<BuyButton>
  └── buy-section
      └── buy-button (link)
          ├── buy-button-top ("BUY MOOB")
          ├── buy-button-bottom
          └── buy-button-base
```

#### State Management:

- **`buyLink`**: URL untuk buy link (default: `'#'`)

#### Configuration Integration:

- Menggunakan `window.MOOB_CONFIG.getPumpfunLink()` untuk mendapatkan link

#### Styling:

- **3D Button Effect**: Menggunakan multiple layers untuk efek 3D
- **Gradient Background**: Radial gradient pada top layer
- **Hover Effects**: Transform dan shadow effects

---

## 🎨 Background & Effects

### 1. BackgroundVideo (`components/BackgroundVideo.tsx`)

**Lokasi**: Background layer (z-index: -2)

**Fungsi**: Background image dan efek visual

#### Struktur:

```tsx
<BackgroundVideo>
  ├── Background Image (bg.png)
  ├── Snowfall Component
  └── Background Images (floating images)
      ├── bg-img-1 (display: none)
      ├── bg-img-2 (display: none)
      └── bg-img-3 (display: none)
```

#### Background Image:

- **Source**: `/img/bg.png`
- **Position**: `fixed`, `inset-0`
- **Size**: `w-full h-full`
- **Object Fit**: `cover`
- **Z-index**: `-2`

#### Floating Images:

- **Sources**: `/img/float/1.png`, `/img/float/2.png`, `/img/float/3.png`
- **Display**: Hidden by default (`display: none`)
- **Parallax**: Dikontrol oleh `main.js` untuk efek parallax

---

### 2. Snowfall (`components/Snowfall.tsx`)

**Lokasi**: Di atas background, di bawah panels (z-index: -1)

**Fungsi**: Animasi hujan salju efek

#### Struktur:

```tsx
<Snowfall>
  └── snowfall-container (created dynamically)
      └── snowflake (50 instances)
```

#### Properties:

- **Count**: 50 snowflakes aktif
- **Size**: Random 2-8px
- **Duration**: Random 10-20 detik
- **Drift**: Random horizontal drift -25px to +25px
- **Opacity**: Random 0.2-1.0
- **Rotation**: 360° selama animasi

#### Animation:

- **Keyframes**: `snowfall`
- **Direction**: Top to bottom
- **Effect**: Rotasi + horizontal drift + opacity fade

#### CSS Classes:

- **`.snowfall-container`**: `fixed`, `inset-0`, `z-index: -1`, `pointer-events: none`
- **`.snowflake`**: `absolute`, `border-radius: 50%`, white background dengan shadow

---

### 3. Preloader (`components/Preloader.tsx`)

**Lokasi**: Overlay layer (z-index: 50)

**Fungsi**: Preloader video sebelum konten utama muncul

#### Struktur:

```tsx
<Preloader>
  └── preloader (fixed overlay)
      └── video (preloader.mp4)
```

#### Behavior:

- Tampil saat halaman load
- Otomatis hilang setelah video selesai atau error/timeout
- Menampilkan main content setelah preloader selesai

---

## 🎨 Styling & CSS

### Layout System

#### Container Hierarchy:

```css
#main-content {
	z-index: 10;
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.main-content-section {
	flex: 1; /* Mengisi ruang tersisa */
	display: flex;
	flex-direction: row; /* Horizontal pada desktop */
	align-items: stretch; /* Semua child sama tinggi */
	min-height: 0; /* Mencegah overflow */
}
```

#### Window Styling:

```css
.window {
	position: relative;
	z-index: 1;
}

.window.active {
	z-index: 1000; /* Window aktif di atas */
}
```

#### MainWindow Specific:

```css
.main-window {
	height: 100%;
	min-height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
}
```

### Z-Index Layers

| Layer           | Z-index | Component         |
| --------------- | ------- | ----------------- |
| Background      | -2      | Background Image  |
| Snowfall        | -1      | Snow Animation    |
| Floating Images | 1-3     | Background Images |
| Windows         | 1       | Default window    |
| Active Window   | 1000    | Window yang aktif |
| Preloader       | 50      | Preloader overlay |
| DexWindow       | 1000    | Chart window      |
| HashWindow      | 30      | Contract window   |

---

## 🔄 State Management

### React State (Components)

#### SidePanel:

- `moobLevel`: String level MOOB
- `sliderValue`: Number (1-11)

#### HashWindow:

- `contractText`: String contract address
- `showCopyButton`: Boolean

#### DexWindow:

- `isOpen`: Boolean window status

#### Slideshow:

- `currentSlide`: Number (0-12)

#### SocialButtons:

- `socialLinks`: Object dengan platform links

#### BuyButton:

- `buyLink`: String URL

### Global State (Window Objects)

#### `window.MOOB_CONFIG`:

- Configuration object dengan methods:
  - `getActiveSocialLinks()`: Return object links
  - `getPumpfunLink()`: Return buy link
  - `getContractDisplayText()`: Return contract text
  - `hasContractAddress()`: Return boolean

#### `window.dexChartManager`:

- Chart window manager dengan methods:
  - `open()`: Buka chart window
  - `close()`: Tutup chart window
  - `openBuyLink()`: Buka buy link
  - `openDexLink()`: Buka DEX link

#### `window.openDexWindow`:

- Function untuk membuka DexWindow

#### `window.copyCA`:

- Function untuk copy contract address

---

## 🎯 Interaksi & Event Handlers

### Window Dragging

- **Library**: Vanilla JS di `main.js`
- **Function**: `initWindowDragging()`
- **Behavior**: Semua `.window` elements bisa di-drag
- **Z-index**: Window yang di-drag otomatis menjadi active (z-index: 1000)

### Window Controls

- **Minimize**: Tidak aktif (placeholder)
- **Maximize**: Tidak aktif (placeholder)
- **Close**: Menutup window (untuk DexWindow)

### Slider Interaction

- **Event**: `onChange` pada range input
- **Handler**: `handleSliderChange` di SidePanel
- **Update**: Real-time update MOOB level display

### Slideshow Navigation

- **Auto-advance**: Setiap 5 detik
- **Manual Navigation**: Prev/Next buttons
- **Indicator Click**: Langsung ke slide tertentu

### Chart Window

- **Open**: Via SocialButtons Chart button
- **Close**: Via Close button di title bar
- **Chart Embed**: DexScreener iframe via `dex-chart.js`

---

## 📐 Responsive Design

### Breakpoints

- **Mobile**: Default (column layout)
- **Desktop**: `sm:` prefix (≥640px) - row layout

### Layout Behavior

#### Desktop (`sm:` breakpoint):

- SidePanel: Fixed width 250px
- MainWindow: Flex-1 (mengisi ruang tersisa)
- Container: Horizontal row layout
- Max width: 1400px

#### Mobile:

- SidePanel: Full width
- MainWindow: Full width
- Container: Vertical column layout
- Padding: 16px (p-4)

---

## 🔧 Configuration

### Config File (`public/config.js`)

```javascript
window.MOOB_CONFIG = {
  contractAddress: "...",
  socialLinks: {...},
  pumpfunLink: "...",
  // ... other config
}
```

### Methods:

- `getActiveSocialLinks()`: Filter dan return active links
- `getPumpfunLink()`: Return buy link
- `getContractDisplayText()`: Format contract untuk display
- `hasContractAddress()`: Cek apakah contract tersedia

---

## 📝 Notes

### CSS Dependencies

- **98.css**: Windows 98 theme library (global styles)
- **global.css**: Custom styles untuk komponen
- **Tailwind CSS**: Via CDN (utility classes)

### JavaScript Dependencies

- **main.js**: Window interactions, parallax, slideshow (vanilla)
- **config.js**: Configuration object
- **dex-chart.js**: Chart window manager

### Asset Paths

- **Images**: `/img/...`
- **Videos**: `/img/vid/...` atau `/img/preloader/...`
- **Favicon**: `/img/favico/...`

---

## 🚀 Best Practices

1. **Component Structure**: Gunakan 'use client' untuk semua components yang menggunakan hooks
2. **State Management**: Gunakan `useEffect` untuk sync dengan global window objects
3. **Configuration**: Selalu check `window.MOOB_CONFIG` sebelum digunakan
4. **Styling**: Kombinasi Tailwind classes dan custom CSS
5. **Performance**: Animasi menggunakan CSS keyframes untuk performa optimal
6. **Responsive**: Test pada mobile dan desktop breakpoints

---

**Last Updated**: 2024
**Version**: 1.0.0
