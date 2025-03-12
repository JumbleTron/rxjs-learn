interface Lesson {
  id: string;
  title: string;
  description: string;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Wprowadzenie do RxJS',
    description: 'Podstawy Observable i pierwsza subskrypcja'
  },
  {
    id: '2',
    title: 'Observable',
    description: 'Poszerzenie wiedzy o Observable'
  },
  {
    id: '3',
    title: 'Subscription',
    description: 'Podstawy Subscription'
  },
  {
    id: '4',
    title: 'Type of Observable',
    description: 'Typy obiektu Observable'
  },
  {
    id: '5',
    title: 'Creation Functions',
    description: 'Tworzenie observable za pomocą RxJS'
  },
  {
    id: '6',
    title: 'Pipeable operators',
    description: 'Tworzenie podstawowych funckji przekształącajacych obiekty Observable'
  },
  {
    id: '7',
    title: 'Flatting operators',
    description: 'Tworzenie podstawowych funckji łączących obiekty Observable'
  },
];

export const LOG_LEVEL_ERROR = 'ERROR';
export const LOG_LEVEL_DEBUG = 'DEBUG';
export const LOG_LEVEL_SPY = 'SPY';

export type LogLevel = typeof LOG_LEVEL_ERROR | typeof LOG_LEVEL_DEBUG | typeof LOG_LEVEL_SPY;

export const logMessage = (message: string, level: LogLevel = LOG_LEVEL_DEBUG) => {
  console.log(message, `[${level}]`)
  const debugWindow = document.getElementById('debugWindow');
  if (!debugWindow) return;
  debugWindow.append(`[${level}] ${message} \n\r`)
}

export const clearMessages = () => {
  const debugWindow = document.getElementById('debugWindow');
  if (!debugWindow) return;
  debugWindow.textContent = '';
}

function createLessonsList() {
  const lessonsListElement = document.getElementById('lessonsList');
  if (!lessonsListElement) return;

  lessons.forEach(lesson => {
    const lessonElement = document.createElement('a');
    lessonElement.href = `/lessons/${lesson.id}/index.html`;
    lessonElement.className = 'list-group-item list-group-item-action';
    lessonElement.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Lekcja ${lesson.id}: ${lesson.title}</h5>
      </div>
      <p class="mb-1">${lesson.description}</p>
    `;
    lessonsListElement.appendChild(lessonElement);
  });
}

export const randomNumber = (min = 1000, max = 5000) => Math.floor(Math.random() * (max - min + 1) + min)

document.addEventListener('DOMContentLoaded', createLessonsList); 