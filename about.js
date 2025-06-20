 window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    const textElement = document.getElementById("typewriter");
    const cursor = document.querySelector(".cursor");
    const lines = [
      "DR PRASAD PATNAIK B S V",
      "Professor"
    ];
    const professorText = "Department of Applied Mechanics & BioMedical Engineering";
    let lineIndex = 0;
    let charIndex = 0;
  
    // Show splash for 2 seconds, then fade out and start typewriter
    setTimeout(() => {
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => {
          splash.style.display = 'none';
          typeInitialLines();
        }, 800); // match the CSS transition duration
      } else {
        typeInitialLines();
      }
    }, 2000);
  
    function typeInitialLines() {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          textElement.innerHTML += lines[lineIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeInitialLines, 50);
        } else {
          textElement.innerHTML += "<br>";
          lineIndex++;
          charIndex = 0;
          setTimeout(typeInitialLines, 400);
        }
      } else {
        typeProfessorText();
      }
    }
  
    function typeProfessorText() {
      let profIndex = 0;
      function typeProf() {
        if (profIndex <= professorText.length) {
          textElement.innerHTML = lines.join("<br>") + "<br>" + professorText.substring(0, profIndex);
          profIndex++;
          setTimeout(typeProf, 50);
        } else {
          // Stop blinking cursor after typing is done
          if (cursor) cursor.style.visibility = "hidden";
        }
      }
      typeProf();
    }
  });