
  // -------------------------
  // THEME TOGGLE
  // -------------------------

  function toggleTheme(){
    document.body.classList.toggle("light");
  }

  // -------------------------
  // PASSWORD STRENGTH
  // -------------------------

  const password = document.getElementById("password");
  const strengthBar = document.getElementById("strengthBar");

  password.addEventListener("input", () => {

    let value = password.value;
    let strength = 0;

    if(value.length >= 6) strength += 25;
    if(/[A-Z]/.test(value)) strength += 25;
    if(/[0-9]/.test(value)) strength += 25;
    if(/[^A-Za-z0-9]/.test(value)) strength += 25;

    strengthBar.style.width = strength + "%";

    if(strength <= 25){
      strengthBar.style.background = "red";
    }
    else if(strength <= 50){
      strengthBar.style.background = "orange";
    }
    else if(strength <= 75){
      strengthBar.style.background = "yellow";
    }
    else{
      strengthBar.style.background = "lime";
    }
  });

  // -------------------------
  // LIVE PREVIEW
  // -------------------------

  const fields = ["name","email","role","bio"];

  fields.forEach(id => {
    document.getElementById(id).addEventListener("input", updatePreview);
  });

  function updatePreview(){

    document.getElementById("preview").style.display = "block";

    document.getElementById("previewName").textContent =
      document.getElementById("name").value;

    document.getElementById("previewEmail").textContent =
      document.getElementById("email").value;

    document.getElementById("previewRole").textContent =
      document.getElementById("role").value;

    document.getElementById("previewBio").textContent =
      document.getElementById("bio").value;
  }

  // -------------------------
  // FORM VALIDATION
  // -------------------------

  document.getElementById("userForm").addEventListener("submit", function(e){

    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    clearErrors();

    // Name Validation
    if(name.length < 3){
      showError("nameError","Name must contain at least 3 characters");
      isValid = false;
    }

    // Email Validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
      showError("emailError","Invalid email address");
      isValid = false;
    }

    // Password Validation
    const passPattern =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{6,}$/;

    if(!passPattern.test(password)){
      showError(
        "passwordError",
        "Password must contain uppercase, number & special character"
      );
      isValid = false;
    }

    // Role Validation
    if(role === ""){
      showError("roleError","Please select a role");
      isValid = false;
    }

    if(isValid){

      const userData = {
        name,
        email,
        role,
        bio: document.getElementById("bio").value
      };

      // Save to Local Storage
      localStorage.setItem(
        "userProfile",
        JSON.stringify(userData)
      );

      document.getElementById("successMsg").innerText =
        "Profile created successfully!";

      document.getElementById("userForm").reset();

      strengthBar.style.width = "0%";
    }

  });

  function showError(id,message){
    document.getElementById(id).innerText = message;
  }

  function clearErrors(){

    const errors = document.querySelectorAll(".error");

    errors.forEach(error => {
      error.innerText = "";
    });

    document.getElementById("successMsg").innerText = "";
  }

  