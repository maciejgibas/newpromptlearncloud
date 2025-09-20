document.addEventListener("DOMContentLoaded", () => {
  const lessonList = document.getElementById("lessonList");
  const video = document.getElementById("lessonVideo");
  const downloadLink = document.getElementById("downloadPdf");
  const checkbox = document.getElementById("markCompleted");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");

  const progressKey = "ai-in-education-progress";

  function loadProgress() {
    const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
    return saved;
  }

  function saveProgress(state) {
    localStorage.setItem(progressKey, JSON.stringify(state));
  }

  function updateProgressDisplay(state) {
    const percent = Math.round((state.length / lessons.length) * 100);
    progressText.textContent = `${percent}% ukończono`;
    progressBar.value = percent;
  }

  function renderLessons() {
  const progress = loadProgress();

  lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.textContent = lesson.title;

    // Styl: ukończone lekcje
    li.className = progress.includes(lesson.id) ? "completed" : "";

    // Jeśli to quiz – przekieruj
    if (lesson.isQuiz) {
      li.addEventListener("click", () => {
        window.location.href = lesson.link;
      });
      li.classList.add("quiz-link"); // Możesz dodać specjalną klasę do stylowania
    } else {
      li.addEventListener("click", () => loadLesson(index));
    }

    lessonList.appendChild(li);
  });

  updateProgressDisplay(progress);
}

  function loadLesson(index) {
    const lesson = lessons[index];
    video.src = lesson.videoSrc;
    downloadLink.href = lesson.pdfSrc || "#";
    downloadLink.style.display = lesson.pdfSrc ? "inline-block" : "none";

    checkbox.checked = loadProgress().includes(lesson.id);
    checkbox.onchange = () => toggleCompleted(lesson.id);

    [...lessonList.children].forEach((li, i) => {
      li.classList.toggle("active", i === index);
    });
  }

  function toggleCompleted(id) {
    let progress = loadProgress();
    if (checkbox.checked) {
      if (!progress.includes(id)) progress.push(id);
    } else {
      progress = progress.filter(item => item !== id);
    }
    saveProgress(progress);
    renderLessonList();
    updateProgressDisplay(progress);
  }

  function renderLessonList() {
    lessonList.innerHTML = "";
    renderLessons();
  }

  renderLessons();
  loadLesson(0);
});
