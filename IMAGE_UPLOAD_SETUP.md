# 📸 Image Upload Feature - Setup Guide

## ✨ Что добавлено

Теперь в админке можно **загружать фотографии напрямую**, а не указывать URL!

### Новые файлы:

- `src/services/storageService.js` - Сервис для работы с Supabase Storage
- `src/components/ImageUpload.jsx` - Компонент для загрузки изображений
- `supabase_3_storage.sql` - SQL для настройки хранилища

### Обновлённые формы:

- ✅ ProjectForm - загрузка изображений проектов
- ✅ TestimonyForm - загрузка фото свидетельств
- ✅ ProductForm - загрузка фото товаров
- ✅ TrainingForm - загрузка изображений программ

---

## 🚀 Быстрая установка

### Шаг 1: Создай Storage Bucket в Supabase

1. Открой Supabase Dashboard
2. Перейди в **Storage** (слева в меню)
3. Нажми **Create a new bucket**
4. Заполни:
   - **Name**: `raphael-mission-images`
   - **Public bucket**: ✅ **Включи** (чтобы изображения были доступны всем)
5. Нажми **Create bucket**

### Шаг 2: Настрой политики безопасности

1. Открой **SQL Editor**
2. New query → вставь содержимое файла `supabase_3_storage.sql`
3. Нажми **Run**

ИЛИ настрой вручную через UI:

1. В Storage → выбери bucket `raphael-mission-images`
2. Вкладка **Policies**
3. Создай 4 политики:

**Policy 1: Public Read**

- Name: `Public can view images`
- Target roles: `public`
- Policy command: `SELECT`
- Policy expression: `true`

**Policy 2: Authenticated Upload**

- Name: `Authenticated users can upload`
- Target roles: `authenticated`
- Policy command: `INSERT`
- Policy expression: `true`

**Policy 3: Authenticated Update**

- Name: `Authenticated users can update`
- Target roles: `authenticated`
- Policy command: `UPDATE`
- Policy expression: `true`

**Policy 4: Authenticated Delete**

- Name: `Authenticated users can delete`
- Target roles: `authenticated`
- Policy command: `DELETE`
- Policy expression: `true`

---

## 🎯 Как использовать

### В админке:

1. Зайди в админку (`/admin/login`)
2. Открой любую форму (Projects, Testimonies, Shop, Training)
3. Увидишь новый блок **"Image Upload"**
4. Клик на область загрузки или перетащи файл
5. Изображение автоматически загрузится в Supabase
6. URL подставится в поле `image_url`

### Поддерживаемые форматы:

- PNG
- JPG/JPEG
- GIF
- WEBP
- Max размер: **5MB**

### Организация файлов:

Файлы автоматически организуются по папкам:

```
raphael-mission-images/
├── projects/
│   ├── 1234567890-abc123.jpg
│   └── ...
├── testimonies/
│   ├── 1234567891-def456.jpg
│   └── ...
├── products/
│   └── ...
└── training/
    └── ...
```

---

## 🔧 Технические детали

### storageService API:

```javascript
import { storageService } from '../services/storageService';

// Загрузить изображение
const { url, path } = await storageService.uploadImage(file, 'projects');

// Удалить изображение
await storageService.deleteImage(path);

// Получить публичный URL
const url = storageService.getPublicUrl(path);
```

### ImageUpload Component:

```jsx
<ImageUpload
  currentImage={formData.image_url}
  onImageUpload={(url) => setFormData({ ...formData, image_url: url })}
  folder="projects"
  label="Project Image"
/>
```

Props:

- `currentImage` - Текущий URL изображения (для preview)
- `onImageUpload` - Callback с URL загруженного файла
- `folder` - Папка в Storage (projects/testimonies/products/training)
- `label` - Заголовок поля

---

## 🐛 Troubleshooting

### "Failed to upload image"

- Проверь, что bucket создан и называется `raphael-mission-images`
- Проверь, что bucket **публичный**
- Проверь политики безопасности в Storage

### "Invalid file type"

- Загружай только изображения (PNG, JPG, GIF, WEBP)
- Файл не должен быть больше 5MB

### Изображения не показываются

- Проверь, что bucket публичный
- Проверь политики: public должен иметь доступ SELECT

### URL не сохраняется

- Проверь, что функция `onImageUpload` вызывается
- Проверь браузерную консоль на ошибки

---

## 📦 Структура Storage

После загрузки нескольких файлов, в Supabase Storage → `raphael-mission-images` увидишь:

```
raphael-mission-images/
├── projects/
│   ├── 1696877890123-a7b2c9.jpg
│   └── 1696877891234-d8e3f1.png
├── testimonies/
│   └── 1696877892345-g4h5i6.jpg
├── products/
│   └── 1696877893456-j7k8l9.jpg
└── training/
    └── 1696877894567-m1n2o3.png
```

Каждый файл имеет уникальное имя:
`{timestamp}-{random}.{extension}`

---

## 🎉 Готово!

Теперь админы могут:

- ✅ Загружать фото прямо из браузера
- ✅ Видеть preview перед сохранением
- ✅ Удалять/заменять изображения
- ✅ Не думать об URL и хостинге картинок

Все изображения хранятся в Supabase Storage и доступны через CDN!
