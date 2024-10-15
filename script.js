const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".boton");

// Variable para controlar el estado del resultado
let resultadoVisible = false;

// Código de los botones de la calculadora
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonOn = boton.textContent;

        // Programación botón "C"
        if (boton.id === "limpiar") {
            pantalla.textContent = "0";
            setFontSize(); // Ajusta el tamaño de la fuente al reiniciar
            resultadoVisible = false; // Reinicia el estado
            return;
        }

        // Programación botón borrar "←"
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1) {
                pantalla.textContent = "0";  
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }   
            setFontSize(); // Ajusta el tamaño de la fuente al borrar
            return;
        }

        // Programación botón igual "="
        if (boton.id === "igual") {
            try {
                // Configuración del error de los símbolos consecutivos de división
                if (/\//.test(pantalla.textContent) && (/\/{2,}/.test(pantalla.textContent) || /\/0(?![0-9])/.test(pantalla.textContent))) {
                    throw new Error("¡Error!");
                }
                // Configuración del error de los números divididos entre 0
                if (eval(pantalla.textContent) === Infinity || eval(pantalla.textContent) === -Infinity) {
                    throw new Error("¡Error!");
                }   
                pantalla.textContent = eval(pantalla.textContent);
                resultadoVisible = true; // Establece el estado como resultado visible
            } catch (error) {
                pantalla.textContent = "¡Error!";
                resultadoVisible = false; // Reinicia el estado
            }
            setFontSize(); // Ajusta el tamaño de la fuente después del resultado
            return;
        }

        // Manejo de números y operadores
        if (resultadoVisible) {
            // Si ya hay un resultado visible y se presiona un operador, se acumula
            if (/[+\-*/]/.test(botonOn)) {
                pantalla.textContent += botonOn; // Agrega el operador
                resultadoVisible = false; // Permitir que se siga operando
            } else {
                // Si se presiona un número, se reinicia con ese número
                pantalla.textContent = botonOn; 
                resultadoVisible = false; // Permite que se siga operando
            }
        } else {
            // Si la pantalla muestra 0 o un error, reiniciar con el nuevo número
            if (pantalla.textContent === "0" || pantalla.textContent === "¡Error!") {
                pantalla.textContent = botonOn; // Reinicia con el nuevo número directamente
            } else {
                // Evitar dos operadores consecutivos
                if (/[+\-*/]/.test(pantalla.textContent.slice(-1)) && /[+\-*/]/.test(botonOn)) {
                    return;
                }
                
                // Evitar múltiples puntos
                if (botonOn === ".") {
                    const partes = pantalla.textContent.split(/([+\-*/])/);
                    const ultimaParte = partes[partes.length - 1];
                    if (!ultimaParte.includes(".")) {
                        pantalla.textContent += botonOn; // Acumula el punto
                    }
                    return; // No hacer nada más si se agregó un punto
                }

                // Se establece que el contenido de la pantalla debe ser menor a 20 
                if (pantalla.textContent.length < 20) {  
                    pantalla.textContent += botonOn; // Acumula el número
                }
            }
        }

        // Números se salen de la pantalla
        setFontSize();
    });
});

// Función para ajustar el tamaño de la fuente
function setFontSize() {
    const length = pantalla.textContent.length;
    if (length > 12) {
        pantalla.style.fontSize = `${2.5 - (length - 12) * 0.1}rem`; // Reduce el tamaño de 2.5rem a 1.5rem (aprox)
    } else {
        pantalla.style.fontSize = "2.5rem"; // Tamaño original
    }
}