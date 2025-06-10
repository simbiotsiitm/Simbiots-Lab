document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("typewriter");
    const lines = [
      "DR PRASAD PATNAIK B S V",
      "Professor"
    ];
  
    let lineIndex = 0;
    let charIndex = 0;
    let loopProfessor = false;
    const professorText = "Department of Applied Mechanics & BioMedical";
    let professorIndex = 0;
    let isDeleting = false;
  
    function typeInitialLines() {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          // Append one char at a time
          textElement.innerHTML += lines[lineIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeInitialLines, 70);
        } else {
          textElement.innerHTML += "<br>";
          lineIndex++;
          charIndex = 0;
          setTimeout(typeInitialLines, 500);
        }
      } else {
        loopProfessor = true;
        typeProfessorLoop();
      }
    }
  
    function typeProfessorLoop() {
      if (loopProfessor) {
        const current = professorText.substring(0, professorIndex);
        textElement.innerHTML = lines.join("<br>") + "<br>" + current;
  
        if (!isDeleting && professorIndex < professorText.length) {
          professorIndex++;
          setTimeout(typeProfessorLoop, 100);
        } else if (!isDeleting && professorIndex === professorText.length) {
          isDeleting = true;
          setTimeout(typeProfessorLoop, 1000);
        } else if (isDeleting && professorIndex > 0) {
          professorIndex--;
          setTimeout(typeProfessorLoop, 60);
        } else {
          isDeleting = false;
          setTimeout(typeProfessorLoop, 500);
        }
      }
    }
  
    typeInitialLines();
  });
  