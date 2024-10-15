const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".boton");

// Variable para controlar el estado del resultado
let resultadoVisible = false;

// Para llevar el Control del último elemento ingresado
let ultimoElemento = "";

//Codigo de los botones de la calculadora

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonOn = boton.textContent;

        //Programación boton "C"
        if (boton.id === "limpiar") {
            pantalla.textContent = "0";
            setFontSize(); // Ajusta el tamaño de la fuente al reiniciar
            resultadoVisible = false; // Reinicia el estado
            ultimoElemento = ""; // Reinicia el último elemento
            return
        }

        //Programación boton borrar "←"
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 ) {
                pantalla.textContent = "0";  
            } else {
            pantalla.textContent = pantalla.textContent.slice(0, -1);
            }   
            setFontSize(); // Ajusta el tamaño de la fuente al borrar
            resultadoVisible = false; // Reinicia el estado
            ultimoElemento = pantalla.textContent.slice(-1); // Actualiza el último elemento
            return;
        }

        //Programación boton igual "="
        if (boton.id === "igual") {
            try {
                 //Configuración del error de los simbolos consecutivos de división //
                if (/\//.test(pantalla.textContent) && (/\/{2,}/.test(pantalla.textContent) || /\/0(?![0-9])/.test(pantalla.textContent))) {
                    throw new Error("¡Error!");
                }
                //Configuración del error de los numeros divididos entre 0
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
            ultimoElemento = pantalla.textContent.slice(-1); // Actualiza el último elemento
            return;
        }

        //Programación para al hacer click en un boton se muestre el numero seleccionado en pantalla
        if (resultadoVisible) {
            // Si ya hay un resultado visible, reinicia la pantalla con el nuevo número
            pantalla.textContent = botonOn;
            resultadoVisible = false; // Reinicia el estado
            ultimoElemento = botonOn;
        } else {
            if (pantalla.textContent === "0" || pantalla.textContent === "¡Error!") {
                
                if (/[+\-*/.]/.test(botonOn)) {
                    pantalla.textContent = "0" + botonOn; // Agrega el operador después del 0       
            
                } else {

                pantalla.textContent = botonOn; // Reinicia con el nuevo número
            }

            } else if (pantalla.textContent === "¡Error!") {
                pantalla.textContent = botonOn; //

            } else {

                // Evitar dos operadores consecutivos
                if (/[+\-*/.]/.test(pantalla.textContent.slice(-1)) && /[+\-*/.]/.test(botonOn)) {
                    return;
                }
                
                // Evitar múltiples puntos
                if (botonOn === ".") {
                    // Separa el contenido actual en números y operadores
                    const partes = pantalla.textContent.split(/([+\-*/])/);
                    const ultimaParte = partes[partes.length - 1];
                    
                    // Verifica que la última parte no tenga un punto
                    if (!ultimaParte.includes(".")) {
                        pantalla.textContent += botonOn;
                        ultimoElemento = botonOn; // Actualiza el último elemento
                    }
                    return; // No hacer nada más si se agregó un punto
                }



                // Se establece que el contenido de la pantalla debe ser menor a 20 
                if (pantalla.textContent.length < 20) {  
                    pantalla.textContent += botonOn;
                    ultimoElemento = botonOn;
                }
            }
        }
    
        // Números se salen de la pantalla
        setFontSize();
        // Función para ajustar el tamaño de la fuente
        function setFontSize() {
            const length = pantalla.textContent.length;
            if (length > 12) {
                pantalla.style.fontSize = `${2.5 - (length - 12) * 0.1}rem`; // Reduce el tamaño de 2.5rem a 1.5rem (aprox)
            } else {
                pantalla.style.fontSize = "2.5rem"; // Tamaño original
            }
        }

    })

})