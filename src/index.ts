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
];

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

document.addEventListener('DOMContentLoaded', createLessonsList); 