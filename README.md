# Promise Lab 🚀

An advanced React and TypeScript application built to master complex asynchronous JavaScript/TypeScript patterns, robust error handling, custom hooks architecture, and multi-API integrations.

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, Vite
* **State Management & Custom Hooks:** `useAsync` with `useRef`, `AbortController` patterns
* **Asynchronous Concurrency:** `Promise.allSettled`, `Promise.any`
* **APIs Integrated:**
  * [Open-Meteo](https://open-meteo.com/) (Weather forecasts)
  * [Open Exchange Rates / Frankfurter](https://api.frankfurter.app/) (Currency rates with redundant sources)
  * [DummyJSON](https://dummyjson.com/) (Quotes and batch fetching)

---

## ✨ Key Features & Architectural Highlights

### 1. Custom `useAsync<T>` Hook
A powerful, reusable hook designed to eliminate common async pitfalls in React:
* **Lifecycle & States:** Manages `idle` $\rightarrow$ `loading` $\rightarrow$ `success` | `error` lifecycle stages safely.
* **Race Condition Prevention:** Utilizes cancellation flags and `AbortSignal` support to prevent state updates on unmounted components or outdated requests.
* **Infinite Loop Protection:** Implements `useRef` for tracking callback functions alongside a `tick` counter mechanism for reliable manual reloads (`reload()`).

### 2. Concurrent Redundancy with `Promise.any` (Currency Module)
* Implements resilient currency fetching by querying two independent providers (`open.er-api.com` and `frankfurter.app`) simultaneously.
* Uses `Promise.any` to instantly resolve with the fastest successful response while normalizing disparate data structures into a unified `CurrencyData` type.

### 3. Batch Synchronization with `Promise.allSettled` ("Refresh All")
* A global control panel action that triggers updates across all independent widget modules concurrently.
* Employs `Promise.allSettled` to ensure that even if one API endpoint times out or returns a network error, other widgets continue to function and update normally.

### 4. Lifting State Up Architecture
* Strict separation of concerns: the root `App` component acts as the container managing asynchronous states, while `WeatherCard`, `CurrencyCard`, and `QuoteCard` serve as pure presentation components relying entirely on props.

---

## 📂 Project Structure

```text
src/
├── api/
│   ├── fetchJson.ts      # Core fetch wrapper with response and signal handling
│   ├── weather.ts        # Open-Meteo API integration
│   ├── currency.ts       # Multi-source currency API with Promise.any
│   └── quote.ts          # DummyJSON quotes integration
├── components/
│   ├── Card.ts           # Reusable container wrapper with error/loading states
│   ├── WeatherCard.tsx   # Weather presentation component
│   ├── CurrencyCard.tsx  # Currency exchange rates presentation component
│   └── QuoteCard.tsx     # Random quote presentation component
├── hooks/
│   └── useAsync.ts       # Core asynchronous custom hook
├── types/
│   └── index.ts          # Shared TypeScript interfaces & types
└── App.tsx               # Root container orchestrating state & concurrency


# Promise Lab 🚀

Продвинутое приложение на React и TypeScript, созданное для освоения сложных асинхронных паттернов JavaScript/TypeScript, надежной обработки ошибок, архитектуры кастомных хуков и интеграции с несколькими API.

## 🛠 Технологический стек

- **Фронтенд:** React, TypeScript, Vite
- **Управление состоянием и кастомные хуки:** `useAsync` с `useRef` и паттернами `AbortController`
- **Асинхронная конкурентность:** `Promise.allSettled`, `Promise.any`
- **Интегрированные API:**
  * [Open-Meteo](https://open-meteo.com/) (Прогнозы погоды)
  * [Open Exchange Rates / Frankfurter](https://api.frankfurter.app/) (Курсы валют с резервными источниками)
  * [DummyJSON](https://dummyjson.com/) (Цитаты и пакетная загрузка)

---

## ✨ Ключевые особенности и архитектурные решения

### 1. Кастомный хук `useAsync<T>`
Мощный переиспользуемый хук, созданный для устранения частых асинхронных проблем в React:
- **Жизненный цикл и состояния:** Безопасное управление этапами `idle` $\rightarrow$ `loading` $\rightarrow$ `success` | `error`.
- **Предотвращение гонки запросов (Race Conditions):** Использование флагов отмены и поддержки `AbortSignal` для предотвращения обновления состояния на размонтированных компонентах или устаревших запросах.
- **Защита от бесконечных циклов:** Применение `useRef` для отслеживания колбэков вместе с механизмом счетчика `tick` для надежной ручной перезагрузки (`reload()`).

### 2. Параллельное резервирование с `Promise.any` (Модуль валют)
- Реализует отказоустойчивую загрузку курсов валют путем одновременного запроса к двум независимым провайдерам (`open.er-api.com` и `frankfurter.app`).
- Использует `Promise.any` для мгновенного получения самого быстрого успешного ответа с нормализацией различных структур данных в единый тип `CurrencyData`.

### 3. Пакетная синхронизация с `Promise.allSettled` («Обновить всё»)
- Глобальное действие панели управления, запускающее параллельное обновление всех независимых виджетов.
- Использует `Promise.allSettled` для гарантии того, что даже при таймауте или сетевой ошибке одного из API остальные виджеты продолжат нормально работать и обновляться.

### 4. Архитектура поднятия состояния (Lifting State Up)
- Строгое разделение ответственности: корневой компонент `App` выступает в роли контейнера, управляющего асинхронными состояниями, а `WeatherCard`, `CurrencyCard` и `QuoteCard` являются чистыми презентационными компонентами, полностью зависящими от пропсов.

---

## 📂 Структура проекта

```text
src/
├── api/
│   ├── fetchJson.ts      # Основная обертка fetch с обработкой ответов и сигналов
│   ├── weather.ts        # Интеграция с Open-Meteo API
│   ├── currency.ts       # Мультиисточниковый API валют с Promise.any
│   └── quote.ts          # Интеграция с цитатами DummyJSON
├── components/
│   ├── Card.ts           # Переиспользуемый контейнер-обертка с состояниями ошибки/загрузки
│   ├── WeatherCard.tsx   # Презентационный компонент