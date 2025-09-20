const lessonIds = ["Wprowadzenie", "Pierwsze kroki", "Zakończenie"];
let currentLessonIndex = 0;

function loadLesson(index) {
  currentLessonIndex = index;
  const lesson = lessons[index];

  document.getElementById("lessonTitle").textContent = `Kurs: ${lesson.title}`;
  document.getElementById("videoPlayer").src = lesson.video;

  const pdfLink = document.getElementById("pdfLink");
  if (lesson.pdf) {
    pdfLink.href = lesson.pdf;
    pdfLink.style.display = "inline-block";
  } else {
    pdfLink.style.display = "none";
  }

  const items = document.querySelectorAll("#lessonList li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  // Oznaczenie jako ukończone
  const checkbox = document.getElementById("markDone");
  checkbox.checked = getCompletion(index);
  updateProgress();
}

function toggleCompletion() {
  const checked = document.getElementById("markDone").checked;
  localStorage.setItem(`lesson_done_${currentLessonIndex}`, checked);
  updateProgress();
}

function getCompletion(index) {
  return localStorage.getItem(`lesson_done_${index}`) === "true";
}

function updateProgress() {
  const total = lessonIds.length;
  let completed = 0;
  for (let i = 0; i < total; i++) {
    if (getCompletion(i)) completed++;
  }
  const percent = Math.round((completed / total) * 100);
  document.getElementById("progressText").textContent = `${percent}% ukończono`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

// Domyślnie załaduj pierwszą lekcję
window.onload = () => {
  loadLesson(0);
};
