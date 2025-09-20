const lessons = [
  {
    title: "Wprowadzenie do Sztucznej Inteligencji",
    video: "intro.mp4",
    pdf: "intro.pdf"
  },
  {
    title: "Pierwsze kroki",
    video: "pierwsze_kroki.mp4",
    pdf: "pierwsze_kroki.pdf"
  },
  {
    title: "Zakończenie",
    video: "zakonczenie.mp4",
    pdf: null
  }
];

function loadLesson(index) {
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

  // update active class
  const items = document.querySelectorAll("#lessonList li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}
