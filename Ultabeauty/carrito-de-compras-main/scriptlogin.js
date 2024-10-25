const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");


registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// AQUI COMIENZA EL SCRIPT DE LAS VALIDACIONES
// Usuarios predeterminados
const users = [
    { email: "20635@utsc.com", password: "contraseña123" },
    { email: "jaqui07elote@gmail.com", password: "evento07" },
    { email: "jackyycoder@outlook.com", password: "evento08" }
  ];
  
  // Obtén los elementos del DOM
  const signInForm = document.querySelector(".sign-in form");
  const emailInput = signInForm.querySelector("input[type='text']");
  const passwordInput = signInForm.querySelector("input[type='password']");
  const signInButton = signInForm.querySelector("button");
  const errorMessage = document.createElement("p");
  const verificationDiv = document.getElementById("verification");
  const codeInput = document.getElementById("codeInput");
  const verifyButton = document.getElementById("verifyButton");
  let verificationCode = "";
  
  
  signInForm.appendChild(errorMessage);
  errorMessage.style.color = "red";
  
  // Validación de email en tiempo real
  emailInput.addEventListener("keyup", () => {
    if (!validateEmail(emailInput.value)) {
      errorMessage.textContent = "Email inválido.";
    } else {
      errorMessage.textContent = "";
    }
  });
  
  // Validación de contraseña en tiempo real
  passwordInput.addEventListener("keyup", () => {
    if (passwordInput.value.length < 6) {
      errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
    } else {
      errorMessage.textContent = "";
    }
  });
  
  // Evento de click para el botón de inicio de sesión
  signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
  
    if (!validateEmail(email)) {
      errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
      return;
    }
  
    if (password.length < 6) {
      errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
      return;
    }
  
    // Verificación de usuario
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      // Simula el envío de un código de verificación
      verificationCode = generateVerificationCode();
      errorMessage.textContent = `Inicio de sesión exitoso. Se ha enviado un código de verificación a ${email}.`;
      errorMessage.style.color = "green";
  
      
      verificationDiv.style.display = "block";
    } else {
      errorMessage.textContent = "Correo o contraseña incorrectos.";
      errorMessage.style.color = "red";
    }
  });
  
  // código de verificación fijo
const fixedVerificationCode = "cristiano777";

// Evento de click para el botón de verificación
verifyButton.addEventListener("click", (e) => {
  e.preventDefault();
  const enteredCode = codeInput.value;


  if (enteredCode === fixedVerificationCode) {
    errorMessage.textContent = "Verificación exitosa. ¡Bienvenido!";
    errorMessage.style.color = "green";
    
  } else {
    errorMessage.textContent = "Código de verificación incorrecto.";
    errorMessage.style.color = "red";
  }
});

  
  // Función para generar un código de verificación de 6 dígitos
  function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
  }
  
  // Función de validación de email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

 
    document.getElementById("verifyButton").addEventListener("click", function() {
        // Obtén el valor ingresado en el campo de código
        const codeInput = document.getElementById("codeInput").value;
        if (codeInput === "cristiano777") {
            window.location.href = "index.html"; 
        } else {
            document.getElementById("error-message").innerText = "Código de verificación incorrecto. Intenta nuevamente.";
        }
    });

    function checkPasswordStrength() {
      const password = document.getElementById('password').value;
      const strengthBar = document.getElementById('password-strength');
      const strengthIndicator = document.createElement('span');
      const strengthText = document.getElementById('strength-text');
      strengthBar.innerHTML = ''; 
      strengthBar.appendChild(strengthIndicator); 
  
      let strength = 0;
  
      // Comprueba la fortaleza de la contraseña
      if (password.length >= 8) strength++; 
      if (/[A-Z]/.test(password)) strength++; 
      if (/[a-z]/.test(password)) strength++; 
      if (/[0-9]/.test(password)) strength++; 
      if (/[^A-Za-z0-9]/.test(password)) strength++; 
  
      // Establecer el ancho de la barra en función de la fortaleza
      switch (strength) {
          case 0:
          case 1:
              strengthIndicator.style.width = '20%';
              strengthIndicator.style.backgroundColor = 'red'; 
              strengthText.textContent = 'Contraseña débil'; 
              break;
          case 2:
              strengthIndicator.style.width = '50%';
              strengthIndicator.style.backgroundColor = 'orange'; 
              strengthText.textContent = 'Contraseña moderada'; 
              break;
          case 3:
              strengthIndicator.style.width = '75%';
              strengthIndicator.style.backgroundColor = 'yellow'; 
              strengthText.textContent = 'Contraseña razonable'; 
              break;
          case 4:
              strengthIndicator.style.width = '100%';
              strengthIndicator.style.backgroundColor = 'green'; 
              strengthText.textContent = 'Contraseña segura'; 
              break;
          default:
              strengthIndicator.style.width = '0%';
              strengthIndicator.style.backgroundColor = 'transparent'; 
      }
  }
  document.getElementById('signup-btn').addEventListener('click', function() {
    const isTermsChecked = document.getElementById('terms-checkbox').checked;

    if (!isTermsChecked) {
        alert('Por favor, acepta los términos de servicio y la política de privacidad.');
        return; 
    }
    window.location.href = 'index.html'; 
});

// Registro de usuario
document.getElementById("signup-btn").addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.querySelector('.sign-up input[type="text"]').value;
  const password = document.getElementById('password').value;
  const isTermsChecked = document.getElementById('terms-checkbox').checked;

  if (!validateEmail(email)) {
    showError("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  if (users.some(user => user.email === email)) {
    showError("El correo electrónico ya está registrado.");
    return;
  }

  if (!isTermsChecked) {
    alert('Por favor, acepta los términos de servicio y la política de privacidad.');
    return;
  }

  // Agregar nuevo usuario a la lista
  users.push({ email: email, password: password });
  showSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
  container.classList.remove("active");
});
    









  