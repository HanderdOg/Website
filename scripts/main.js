const dropdownbtn = document.getElementById("dropdown-btn");
const dropdown = document.getElementById("dropdown");
const textdropdown = document.getElementById("text-dropdown-btn");

dropdownbtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
  if (dropdown.classList.contains("show")) {
    textdropdown.innerText = "X";
    textdropdown.style.animation = "rotate 0.8s ease";
  }
    else {
      textdropdown.innerText = "=";
      textdropdown.style.fontWeight = "bold";
      textdropdown.style.animation = "rotatesback 0.8s ease";
      textdropdown.style.visibility = "visible"
    }
});
AOS.init();