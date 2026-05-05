# 🎄 Holiday Theme UI Kit

Komponen UI dengan tema pixelated/holiday untuk aplikasi MOOB.

## 📋 Daftar Komponen

### 1. **HolidayWindow**

Window utama dengan tombol kontrol (Minimize, Maximize, Close).

**Penggunaan:**

```tsx
import { HolidayWindow } from "@/components/holiday";

<HolidayWindow title="MAIN_APP.EXE">{/* Konten Anda di sini */}</HolidayWindow>;
```

**Props:**

- `title`: string - Judul window
- `children`: React.ReactNode - Konten window
- `className?`: string - Class tambahan

---

### 2. **HolidaySidePanel**

Panel samping tanpa tombol kontrol, judul di tengah.

**Penggunaan:**

```tsx
import { HolidaySidePanel } from "@/components/holiday";

<HolidaySidePanel title="INVENTORY">{/* Konten panel */}</HolidaySidePanel>;
```

**Props:**

- `title`: string - Judul panel
- `children`: React.ReactNode - Konten panel
- `className?`: string - Class tambahan

---

### 3. **ToyBuyButton**

Tombol aksi dengan tema holiday.

**Penggunaan:**

```tsx
import { ToyBuyButton } from "@/components/holiday";

<ToyBuyButton label="BUY MOOB" onClick={() => console.log("Clicked!")} />;
```

**Props:**

- `label?`: string - Label tombol (default: "CLICK ME")
- `onClick?`: () => void - Handler klik

---

### 4. **PixelText**

Teks dengan efek pixelated/stroke.

**Penggunaan:**

```tsx
import { PixelText } from "@/components/holiday";

<PixelText size="text-xl">HELLO WORLD</PixelText>;
```

**Props:**

- `children`: React.ReactNode - Teks yang akan ditampilkan
- `size?`: string - Ukuran teks (Tailwind class, default: "text-xl")
- `className?`: string - Class tambahan

---

### 5. **ContentPlaceholder**

Placeholder untuk area konten.

**Penggunaan:**

```tsx
import { ContentPlaceholder } from "@/components/holiday";

<ContentPlaceholder label="KONTEN ANDA DISINI" />;
```

**Props:**

- `label?`: string - Label placeholder (default: "[ AREA KONTEN WEB ANDA ]")

---

### 6. **InstructionBadge**

Badge untuk instruksi atau informasi.

**Penggunaan:**

```tsx
import { InstructionBadge } from "@/components/holiday";

<InstructionBadge text="TERAPKAN DI: MAIN WINDOW" type="success" />;
```

**Props:**

- `text`: string - Teks badge
- `type?`: "success" | "warning" | "info" - Tipe badge (default: "success")

---

### 7. **PixelUI**

Halaman showcase/contoh penggunaan semua komponen.

**Penggunaan:**

```tsx
import PixelUI from "@/components/holiday/PixelUI";

// Di halaman Anda
<PixelUI />;
```

---

## 🎨 Karakteristik Desain

### Warna Tema:

- **Gold/Yellow**: `#F5BE3C` - Border utama
- **Green**: `#2E8B57` - Background header/button
- **Dark Green**: `#226640` - Pattern lines
- **Gold Accent**: `#D4AF37` - Border konten

### Fitur Visual:

- ✅ Pixelated text dengan stroke hitam
- ✅ Drop shadow 8px untuk efek 3D
- ✅ Pattern background (striped dan dot)
- ✅ Animated gif background (subtle)
- ✅ Hover effects pada tombol
- ✅ Active state animation

---

## 📝 Contoh Penggunaan Lengkap

```tsx
import {
	HolidayWindow,
	HolidaySidePanel,
	ToyBuyButton,
	PixelText,
} from "@/components/holiday";

export default function MyPage() {
	return (
		<div className="flex gap-4">
			{/* Side Panel */}
			<HolidaySidePanel title="INVENTORY">
				<div>
					<PixelText>Items</PixelText>
					{/* Konten inventory */}
				</div>
			</HolidaySidePanel>

			{/* Main Window */}
			<HolidayWindow title="GAME_SCREEN.EXE">
				<div>
					<PixelText size="text-2xl">Welcome</PixelText>
					<ToyBuyButton
						label="START GAME"
						onClick={() => alert("Game started!")}
					/>
				</div>
			</HolidayWindow>
		</div>
	);
}
```

---

## 🔗 Integrasi dengan Komponen Existing

Komponen holiday theme dapat digunakan bersama komponen Windows 98 theme yang sudah ada:

```tsx
// Contoh: Menggabungkan theme
import { HolidayWindow } from "@/components/holiday";
import SocialButtons from "@/components/SocialButtons";

<HolidayWindow title="MOOB 🥛">
	<SocialButtons />
</HolidayWindow>;
```

---

## ⚠️ Catatan Penting

1. **Legacy ToyFrame**: Komponen `ToyFrame` yang disebutkan di showcase adalah legacy dan tidak digunakan sebagai komponen utama.

2. **Style Inline**: Beberapa styling menggunakan inline styles untuk efek visual spesifik (pattern, gradient, dll).

3. **External GIF**: Background menggunakan GIF dari Giphy yang di-load secara eksternal. Pastikan koneksi internet tersedia.

4. **Responsive**: Komponen sudah responsive dan menggunakan Tailwind classes.

---

## 📚 Dokumentasi Tambahan

Lihat juga:

- [DOCUMENTATION.md](../../DOCUMENTATION.md) - Dokumentasi komponen utama
- [WINDOWS_DOCUMENTATION.md](../../WINDOWS_DOCUMENTATION.md) - Dokumentasi window classes

---

**Last Updated**: 2024  
**Version**: 1.0.0
