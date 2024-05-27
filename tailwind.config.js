/** @type {import('tailwindcss').Config} */
module.exports = { // Конфигурация tailwindcss
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,js,jsx,tsx}", // Путь к файлам, которые будут использоваться для построения стилей
  ],
  theme: {
    extend: {
      // Особые цвета проекта (для использования в tailwind)
      colors: {
        'custom-green-100': '#5C8083',
        'custom-green-200': '#537376',
        'custom-green-300': '#4e6d6f',
        'custom-green-400': '#4a6669',
        'custom-green-500': '#405a5c',
        'custom-green-1100': '#70979a',
        'custom-white': '#F2E5D7',
        'custom-black': '#4B5966',
        'custom-button': '#425157',
        'custom-blue': '#64748B',
        'custom-grey': '#DACEC1',
        'custom-white-dark-1': '#e1c3a3',
        'custom-white-light-1': '#f8f2eb',
        'custom-dark': '#364760',
      },
      // Дополнительный размер для высоты
      maxHeight: {
        '750': '750px',
      },
      backgroundColor: {
        'completed': '#F2E5D7', // Особый цвет для заполнения кружков требований к паролю,
                                // Используется на странице (в форме) регистрации
      },
    },
  },
  plugins: [],
}