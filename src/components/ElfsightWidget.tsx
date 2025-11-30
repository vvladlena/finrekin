// src/components/ElfsightWidget.tsx

// Цей компонент буде рендеритися лише на клієнті
"use client";

export default function ElfsightWidget() {
  return (
    <>
      {/* 1. Скрипт */}
      <script src="https://elfsightcdn.com/platform.js" async />

      {/* 2. Контейнер віджету */}
      <div
        className="elfsight-app-45eb0560-689a-4fcf-a355-5fd5bba4787d"
        data-elfsight-app-lazy
      />
    </>
  );
}
