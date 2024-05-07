/** @type {import('tailwindcss').Config} */
module.exports = { // Конфигурация tailwindcss
  content: [
    "./src/**/*.{html,ts,js,jsx,tsx}", // Путь к файлам, которые будут использоваться для построения стилей
  ],
  theme: {
    extend: {
      // Особые цвета проекта (для использования в tailwind)
      colors: {
        'custom-green': '#5C8083',
        'custom-white': '#F2E5D7',
        'custom-black': '#4B5966',
        'custom-button': '#425157',
        'custom-blue': '#64748B',
        'custom-grey': '#DACEC1',
        'custom-green-dark-1': '#4e6d6f',
        'custom-green-dark-2': '#4a6669',
        'custom-green-dark-3': '#446062',
        'custom-white-dark-1': '#e1c3a3',
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