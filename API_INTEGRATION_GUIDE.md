# 🔗 API Integration Guide

## ✅ Создан хук для загрузки данных

Файл `src/hooks/useApiData.js` содержит готовые хуки для всех сущностей:

- `useProjects()` - проекты
- `useTestimonies()` - свидетельства
- `useTrainingPrograms()` - программы обучения
- `useProducts()` - товары магазина
- `useContactInfo()` - контактная информация

## 📝 Как использовать

### 1. Projects Page (`src/pages/Projects/index.jsx`)

✅ **УЖЕ ИНТЕГРИРОВАНО**

Страница Projects уже использует API напрямую через `useEffect` и `api.getProjects()`.

### 2. Testimonies Page (`src/pages/Testimonies/index.jsx`)

Замените статические данные на хук:

```javascript
import { useTestimonies } from '../../hooks/useApiData';

const TestimoniesPage = () => {
  const { data: apiTestimonies, loading } = useTestimonies();

  // Если данные из API загружены, используем их, иначе fallback
  const testimoniesData =
    apiTestimonies.length > 0
      ? apiTestimonies
      : [
          // Статические fallback данные...
        ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  // Далее используйте testimoniesData как обычно
};
```

### 3. Training Page (`src/pages/Training/index.jsx`)

```javascript
import { useTrainingPrograms } from '../../hooks/useApiData';

const TrainingPrograms = () => {
  const { data: apiPrograms, loading } = useTrainingPrograms();

  const trainingPrograms =
    apiPrograms.length > 0
      ? apiPrograms
      : [
          // Статические fallback данные...
        ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  // Далее используйте trainingPrograms как обычно
};
```

### 4. Shop Page (`src/pages/Shop/index.jsx`)

```javascript
import { useProducts } from '../../hooks/useApiData';

const Shop = () => {
  const { data: apiProducts, loading } = useProducts();

  const products =
    apiProducts.length > 0
      ? apiProducts
      : [
          // Статические fallback данные...
        ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  // Далее используйте products как обычно
};
```

### 5. Contact Info в Footer

Создайте компонент-обертку для футера:

**src/components/common/FooterWithAPI.jsx**:

```javascript
import React from 'react';
import { useContactInfo } from '../../hooks/useApiData';

const FooterWithAPI = ({ children }) => {
  const { data: contact } = useContactInfo();

  // Передайте contact через context или props вниз
  // Или замените статический текст напрямую
  return children({ contact });
};

export default FooterWithAPI;
```

Или напрямую в каждой странице с футером:

```javascript
import { useContactInfo } from '../../hooks/useApiData';

const YourPage = () => {
  const { data: contact } = useContactInfo();

  // В футере используйте:
  // {contact?.phone_number}
  // {contact?.email}
  // {contact?.address_line1}
  // etc.
};
```

## 🎨 Структура возвращаемых данных

### Projects

```javascript
{
  id: number,
  title: string,        // автоматически на текущем языке
  description: string,  // автоматически на текущем языке
  image: string,
  link: string,
  slug: string
}
```

### Testimonies

```javascript
{
  id: number,
  name: string,
  title: string,      // автоматически на текущем языке
  testimony: string,  // автоматически на текущем языке
  image: string
}
```

### Training Programs

```javascript
{
  id: number,
  title: string,       // автоматически на текущем языке
  description: string, // автоматически на текущем языке
  duration: string,    // автоматически на текущем языке
  image: string
}
```

### Products

```javascript
{
  id: number,
  name: string,        // автоматически на текущем языке
  description: string, // автоматически на текущем языке
  price: number,
  currency: string,
  image: string,
  inStock: boolean,
  stockQuantity: number
}
```

### Contact Info

```javascript
{
  phone_number: string,
  email: string,
  address_line1: string,
  address_line2: string,
  city: string,
  country: string,
  facebook_url: string,
  twitter_url: string,
  youtube_url: string
}
```

## ⚡ Преимущества хуков

1. **Автоматическая обработка языков** - данные приходят на текущем языке
2. **Loading states** - встроенная индикация загрузки
3. **Error handling** - автоматическая обработка ошибок
4. **Fallback** - если API не работает, используйте статические данные
5. **Реактивность** - данные обновляются при смене языка

## 📋 Checklist интеграции

- [x] Projects page - ✅ Готово
- [ ] Testimonies page - использовать `useTestimonies()`
- [ ] Training page - использовать `useTrainingPrograms()`
- [ ] Shop page - использовать `useProducts()`
- [ ] Contact Info в footers - использовать `useContactInfo()`

## 🚀 Быстрый старт

1. **Импортируйте хук:**

```javascript
import { useProjects } from '../../hooks/useApiData';
```

2. **Используйте в компоненте:**

```javascript
const { data, loading, error } = useProjects();
```

3. **Добавьте loading state:**

```javascript
if (loading) return <LoadingSpinner />;
```

4. **Используйте данные:**

```javascript
data.map((item) => <YourComponent key={item.id} {...item} />);
```

## 💡 Примеры использования

### Пример 1: С fallback данными

```javascript
const { data: apiData, loading } = useProjects();
const projects = apiData.length > 0 ? apiData : STATIC_FALLBACK_DATA;
```

### Пример 2: С обработкой ошибок

```javascript
const { data, loading, error } = useProjects();

if (error) {
  console.error('API Error:', error);
  // Используйте статические данные
}
```

### Пример 3: Условный рендеринг

```javascript
const { data, loading } = useProjects();

return (
  <>
    {loading && <LoadingSpinner />}
    {!loading && data.map((project) => <ProjectCard {...project} />)}
  </>
);
```

## 🎉 Готово!

После интеграции всех 5 пунктов, сайт будет полностью работать с админ-панелью!

Все изменения в админке будут автоматически отображаться на сайте. 🚀


