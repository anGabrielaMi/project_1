//Formulario de registro
$(document).ready(function () {
    // Mostrar u ocultar el campo de código según el tipo de usuario
    $("#tipo-usuario").on("change", function () {
        const tipo = $(this).val();
        if (tipo === "admin") {
            $("#codigo-admin-container").removeClass("d-none");
        } else {
            $("#codigo-admin-container").addClass("d-none");
            $("#codigo-admin").val("");
        }
    });

    // Validación visual del email en tiempo real
    $("#email-registro").on("input", function () {
        const valor = $(this).val();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });

    // Procesar el formulario de registro
    $("#formulario-registro").on("submit", function (e) {
        e.preventDefault();

        const nombre = $("#nombre-registro").val().trim();
        const email = $("#email-registro").val().trim();
        const password = $("#password-registro").val().trim();
        const tipoUsuario = $("#tipo-usuario").val();
        const codigoAdmin = $("#codigo-admin").val().trim();
        const codigoEsperado = "FICCIONA2025";

        let errores = [];

        if (nombre === "") errores.push("El nombre es obligatorio.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("Correo inválido.");
        if (password.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
        if (!tipoUsuario) errores.push("Debes seleccionar el tipo de usuario.");
        if (tipoUsuario === "admin" && codigoAdmin !== codigoEsperado) {
            errores.push("Código de administrador incorrecto.");
        }

        if (errores.length > 0) {
            alert("⚠️ " + errores.join("\n"));
            return;
        }

        const nuevoUsuario = {
            nombre,
            email,
            password,
            tipo: tipoUsuario
        };

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registro exitoso");
        this.reset();
        $("#codigo-admin-container").addClass("d-none");
        $("#formulario-registro .form-control").removeClass("is-valid is-invalid");
    });

    // Botón para limpiar el formulario
    $("#limpiar-registro").on("click", function () {
        $("#formulario-registro")[0].reset();
        $("#codigo-admin-container").addClass("d-none");
        $("#formulario-registro .form-control").removeClass("is-valid is-invalid");
    });
});

// Validación al enviar formulario de sesión
$("#formulario-sesion").on("submit", function (e) {
    e.preventDefault();

    let nombre = $("#nombre-sesion").val().trim();
    let email = $("#email-sesion").val().trim();
    let password = $("#password-sesion").val().trim();
    let errores = [];

    if (nombre === "") errores.push("El nombre es obligatorio.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("Correo inválido.");
    if (password.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        alert("Formulario de inicio de sesión enviado correctamente 🎉");
    }
});

// Validación visual del email en tiempo real (sesión)
$("#email-sesion").on("input", function () {
    let valor = $(this).val();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        $(this).removeClass("is-invalid").addClass("is-valid");
    } else {
        $(this).removeClass("is-valid").addClass("is-invalid");
    }
});

// Botón para limpiar el formulario de sesión
$("#limpiar-sesion").on("click", function () {
    $("#formulario-sesion")[0].reset();
    $("#formulario-sesion .form-control").removeClass("is-valid is-invalid");
});


//Recuperar contraseña
$(document).ready(function () {
    // Validación al enviar
    $("#formulario-recuperar").on("submit", function (e) {
        e.preventDefault();

        let email = $("#email-recuperar").val().trim();
        let errores = [];

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errores.push("Correo inválido.");
        }

        if (errores.length > 0) {
            alert(errores.join("\n"));
        } else {
            alert("Enlace de recuperación enviado ✅");
            // Aquí podrías hacer un AJAX si lo conectas a backend
        }
    });

    // Validación visual del email
    $("#email-recuperar").on("input", function () {
        let valor = $(this).val();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });

    // Botón para limpiar el formulario
    $("#limpiar-recuperar").on("click", function () {
        $("#formulario-recuperar")[0].reset();
        $("#formulario-recuperar .form-control").removeClass("is-valid is-invalid");
    });
});


//Modificar perfil

$(document).ready(function () {
    $("#formulario-perfil").on("submit", function (e) {
        e.preventDefault();

        let nombre = $("#nombre-perfil").val().trim();
        let email = $("#email-perfil").val().trim();
        let password = $("#password-perfil").val().trim();
        let errores = [];

        if (nombre === "") errores.push("El nombre es obligatorio.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("Correo inválido.");
        if (password.length > 0 && password.length < 6) errores.push("La nueva contraseña debe tener al menos 6 caracteres.");

        if (errores.length > 0) {
            alert(errores.join("\n"));
        } else {
            alert("Perfil actualizado correctamente 🎉");

        }
    });

    $("#email-perfil").on("input", function () {
        let valor = $(this).val();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });

    $("#limpiar-perfil").on("click", function () {
        $("#formulario-perfil")[0].reset();
        $("#formulario-perfil .form-control").removeClass("is-valid is-invalid");
    });
});

$("#imagen-perfil").on("change", function () {
    const archivo = this.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (e) {
            $("#preview-imagen").attr("src", e.target.result).show();
        };
        lector.readAsDataURL(archivo);
    } else {
        $("#preview-imagen").hide();
    }
});


//Reseñas

$(document).ready(function () {
    inicializarTodasLasReseñasDeEjemplo();
    // Detectar categoría desde el título
    const tituloPagina = document.title.toLowerCase();
    const categoria = tituloPagina.match(/matemáticas|medicina|ciencia|arte|literatura|historia/)?.[0] || "general";
    const claveStorage = "reseñas_" + categoria;

    // Si estamos en una página de categoría
    if ($("#form-reseña").length && $("#contenedor-reseñas").length) {
        inicializarReseñaEjemplo();
        mostrarReseñas();

        $("#form-reseña").on("submit", function (e) {
            e.preventDefault();

            const titulo = $("#titulo").val().trim();
            const comentario = $("#comentario").val().trim();
            const estrellas = parseInt($("#estrellas").val(), 10);

            if (titulo && comentario && !isNaN(estrellas)) {
                const nuevaReseña = { titulo, comentario, estrellas };
                guardarReseña(nuevaReseña);
                mostrarReseñas();
                this.reset();
            }
        });
    }

    // Si estamos en index.html, activar buscador
    if ($("#form-busqueda").length && $("#resultados-busqueda").length) {
        $("#form-busqueda").on("submit", function (e) {
            e.preventDefault();

            const termino = $("#input-busqueda").val()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();
            const contenedor = $("#resultados-busqueda");
            contenedor.empty();

            if (!termino) return;

            const categorias = ["matemáticas", "medicina", "ciencia", "arte", "literatura", "historia", "general"];
            let coincidencias = [];

            categorias.forEach((cat) => {
                const clave = "reseñas_" + cat;
                const reseñas = JSON.parse(localStorage.getItem(clave)) || [];

                reseñas.forEach((r) => {
                    if (
                        r.titulo.toLowerCase().includes(termino) ||
                        r.comentario.toLowerCase().includes(termino)
                    ) {
                        coincidencias.push({ ...r, categoria: cat });
                    }
                });
            });

            if (coincidencias.length === 0) {
                contenedor.append(`
          <div class="alert alert-warning text-center" role="alert">
            No se encontraron coincidencias con "${termino}".
          </div>
        `);
                return;
            }

            contenedor.append(`<h4 class="mb-3">Resultados de búsqueda:</h4>`);

            coincidencias.forEach((r) => {
                contenedor.append(`
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${r.titulo}</h5>
              <p class="card-text">${r.comentario}</p>
              <p class="card-text"><small class="text-muted">Categoría: ${r.categoria}</small></p>
              <div class="text-warning">${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</div>
            </div>
          </div>
        `);
            });
        });
    }

    // Funciones compartidas
    function guardarReseña(reseña) {
        let reseñas = JSON.parse(localStorage.getItem(claveStorage)) || [];
        reseñas.push(reseña);
        localStorage.setItem(claveStorage, JSON.stringify(reseñas));
    }

    function mostrarReseñas() {
        const contenedor = $("#contenedor-reseñas");
        contenedor.empty();

        const reseñas = JSON.parse(localStorage.getItem(claveStorage)) || [];

        if (reseñas.length === 0) {
            contenedor.append(`
        <div class="col-12 text-center text-muted">
          <p>Aún no hay reseñas en esta categoría.</p>
        </div>
      `);
            return;
        }

        reseñas.forEach((r) => {
            const tarjeta = $(`
        <div class="col-md-6 mb-4">
          <div class="card h-100 aparecer">
            <div class="card-body">
              <h5 class="card-title">${r.titulo}</h5>
              <p class="card-text">${r.comentario}</p>
              <div class="text-warning">${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</div>
            </div>
          </div>
        </div>
      `);
            contenedor.append(tarjeta);
        });
    }

    function inicializarReseñaEjemplo() {
        const reseñasExistentes = JSON.parse(localStorage.getItem(claveStorage)) || [];

        if (reseñasExistentes.length === 0 && categoria === "matemáticas") {
            const reseñaEjemplo = {
                titulo: "Fundamentos de Álgebra Lineal – David Poole",
                comentario: "Un libro claro y progresivo que introduce los conceptos clave del álgebra lineal con ejemplos visuales y aplicaciones reales. Ideal para estudiantes que buscan entender más allá de la mecánica.",
                estrellas: 5
            };

            localStorage.setItem(claveStorage, JSON.stringify([reseñaEjemplo]));
        }
    }
});


//Revisar reseñas guardadas  desde el navegador
function mostrarReseñasGuardadasEnConsola() {
    const categorias = ["matemáticas", "medicina", "ciencia", "arte", "literatura", "historia", "general"];

    categorias.forEach((cat) => {
        const clave = "reseñas_" + cat;
        const reseñas = JSON.parse(localStorage.getItem(clave)) || [];

        console.log(`🔍 ${clave}:`);
        if (reseñas.length === 0) {
            console.log("  (sin reseñas)");
        } else {
            reseñas.forEach((r, i) => {
                console.log(`  ${i + 1}. ${r.titulo} — ${r.estrellas}★`);
            });
        }
    });
}

//Forzar creación de reseñas de ejemplo
function inicializarTodasLasReseñasDeEjemplo() {
    const ejemplos = {
        matemáticas: {
            titulo: "Fundamentos de Álgebra Lineal – David Poole",
            comentario: "Un libro claro y progresivo que introduce los conceptos clave del álgebra lineal con ejemplos visuales y aplicaciones reales.",
            estrellas: 5
        },
        medicina: {
            titulo: "Anatomía Humana – Gray",
            comentario: "Clásico imprescindible para estudiantes de medicina. Detallado, visual y riguroso.",
            estrellas: 4
        },
        ciencia: {
            titulo: "Breve historia del tiempo – Stephen Hawking",
            comentario: "Una introducción accesible a los misterios del universo. Ideal para curiosos.",
            estrellas: 5
        },
        arte: {
            titulo: "Arte y belleza en la estética medieval – Umberto Eco–",
            comentario: "Es una lectura esencial para quienes buscan comprender el vínculo entre arte, espiritualidad y filosofía en la tradición occidental.",
            estrellas: 5
        },
        literatura: {
            titulo: "La hora de la estrella – Clarice Lispector–",
            comentario: "Con una prosa introspectiva y poética, Lispector transforma lo invisible en esencial",
            estrellas: 5
        },
        historia: {
            titulo: "Humanos – Tom Phillips–",
            comentario: "Una crónica ingeniosa y provocadora sobre cómo los humanos han tropezado con su propia genialidad,"
                + "dejando un rastro de errores tan absurdos como fascinantes.",
            estrellas: 5

        }// Otras reseñas
    };

    Object.entries(ejemplos).forEach(([categoria, reseña]) => {
        const clave = "reseñas_" + categoria;
        const existentes = JSON.parse(localStorage.getItem(clave)) || [];

        if (existentes.length === 0) {
            localStorage.setItem(clave, JSON.stringify([reseña]));
            console.log(`Reseña de ejemplo creada en ${clave}`);
        }
    });
}

//Prueba
// Simulación: el usuario está logueado si existe 'usuarioActivo' en localStorage
const logueado = localStorage.getItem('usuarioActivo');

if (logueado) {
    // Habilitar campos
    document.querySelectorAll('#form-reseña [disabled]').forEach(el => {
        el.removeAttribute('disabled');
    });

    // Ocultar mensaje
    document.getElementById('mensaje-login').style.display = 'none';
}

//Botón cerrar sesión
document.getElementById('cerrar-sesion')?.addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    location.reload(); // Recarga la página para aplicar los cambios
});

//Comentarios reseñas


function insertarReseña(titulo, comentario, estrellas, autor) {
    const contenedor = document.getElementById('contenedor-reseñas');

    const reseñaHTML = `
    <div class="col-md-6 mb-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${comentario}</p>
          <p class="text-muted" style="font-size: 0.85rem;">Puntuación: ${estrellas} ★</p>
          <p class="text-muted" style="font-size: 0.85rem;">Reseña por: ${autor}</p>

          <div class="comentarios mt-3">
            <h6 style="font-family: 'Special Elite', monospace;">Escribe una respuesta a esta reseña</h6>
            <textarea class="form-control mt-2" rows="2" placeholder="Escribe una respuesta..." disabled></textarea>
            <button class="btn btn-sm btn-outline-secondary mt-1" disabled>Enviar respuesta</button>
          </div>
        </div>
      </div>
    </div>
  `;

    contenedor.insertAdjacentHTML('beforeend', reseñaHTML);
}

function activarComentarios() {
    if (localStorage.getItem('usuarioActivo')) {
        document.querySelectorAll('.comentarios textarea').forEach(el => el.removeAttribute('disabled'));
        document.querySelectorAll('.comentarios button').forEach(el => el.removeAttribute('disabled'));
    }
}

function activarComentarios() {
    if (localStorage.getItem('usuarioActivo')) {
        document.querySelectorAll('.comentarios textarea').forEach(el => el.removeAttribute('disabled'));
        document.querySelectorAll('.comentarios button').forEach(el => {
            el.removeAttribute('disabled');

            // Agregar funcionalidad al botón
            el.addEventListener('click', () => {
                const respuesta = el.previousElementSibling.value.trim();
                if (respuesta) {
                    alert(`Respuesta enviada: ${respuesta}`);
                    el.previousElementSibling.value = ""; // Limpia el campo
                } else {
                    alert("Por favor escribe una respuesta antes de enviar.");
                }
            });
        });
    }
}

//Identificar autor de reseñas
const autor = localStorage.getItem('usuarioActivo') || 'Anónimo';

// Mostrar en el formulario
const etiquetaAutor = document.getElementById('autor-reseña');
if (etiquetaAutor) {
    etiquetaAutor.textContent = `Reseña por: ${autor}`;
}

// Usar al publicar la reseña
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-reseña');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const titulo = document.getElementById('titulo').value.trim();
      const comentario = document.getElementById('comentario').value.trim();
      const estrellas = document.getElementById('estrellas').value;
      const autor = localStorage.getItem('usuarioActivo') || 'Anónimo';

      insertarReseña(titulo, comentario, estrellas, autor);
      activarComentarios();
    });
  }
});