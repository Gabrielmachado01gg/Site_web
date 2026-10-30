/* Yume Sushi — comportamento do site (JavaScript sem dependências) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Menu mobile ---------- */
  var botaoMenu = document.querySelector(".nav__toggle");
  var listaMenu = document.getElementById("menu-principal");

  function fecharMenu() {
    if (!botaoMenu || !listaMenu) return;
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    listaMenu.classList.remove("aberta");
  }

  if (botaoMenu && listaMenu) {
    botaoMenu.addEventListener("click", function () {
      var abrir = botaoMenu.getAttribute("aria-expanded") !== "true";
      botaoMenu.setAttribute("aria-expanded", String(abrir));
      botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
      listaMenu.classList.toggle("aberta", abrir);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        fecharMenu();
        botaoMenu.focus();
      }
    });
    listaMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });
  }

  /* ---------- Detalhes expansíveis (cartões da culinária) ---------- */
  document.querySelectorAll(".detalhes__botao").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      botao.textContent = aberto ? "Saiba mais" : "Mostrar menos";
    });
  });

  /* ---------- Filtro do cardápio ---------- */
  var filtros = document.querySelectorAll(".filtro");
  var pratos = document.querySelectorAll(".prato");
  var aviso = document.querySelector(".aviso-vazio");
  var contador = document.getElementById("contador-pratos");

  function aplicarFiltro(categoria) {
    var visiveis = 0;
    pratos.forEach(function (prato) {
      var mostrar = categoria === "todos" || prato.dataset.categoria === categoria;
      prato.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });
    if (aviso) aviso.style.display = visiveis === 0 ? "block" : "none";
    if (contador) {
      contador.textContent = visiveis + (visiveis === 1 ? " opção" : " opções");
    }
  }

  filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
      filtros.forEach(function (f) { f.setAttribute("aria-pressed", "false"); });
      filtro.setAttribute("aria-pressed", "true");
      aplicarFiltro(filtro.dataset.filtro);
    });
  });

  /* ---------- Animação ao rolar ---------- */
  var alvos = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
    alvos.forEach(function (el) { observador.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- Formulário de contato (validação no navegador) ---------- */
  var formulario = document.getElementById("form-contato");
  if (formulario) {
    var status = document.getElementById("status-envio");
    var mensagens = {
      nome: "Informe seu nome.",
      email: "Informe um e-mail válido, como nome@exemplo.com.",
      mensagem: "Escreva uma mensagem com pelo menos 10 caracteres."
    };

    function validar(campo) {
      var valido = campo.checkValidity();
      if (campo.name === "mensagem" && campo.value.trim().length < 10) valido = false;
      var erro = document.getElementById("erro-" + campo.name);
      campo.setAttribute("aria-invalid", String(!valido));
      if (erro) erro.textContent = valido ? "" : mensagens[campo.name];
      return valido;
    }

    formulario.querySelectorAll("input, textarea").forEach(function (campo) {
      campo.addEventListener("blur", function () { validar(campo); });
      campo.addEventListener("input", function () {
        if (campo.getAttribute("aria-invalid") === "true") validar(campo);
      });
    });

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      var campos = Array.prototype.slice.call(formulario.querySelectorAll("input, textarea"));
      var resultados = campos.map(validar);
      var primeiroInvalido = campos[resultados.indexOf(false)];
      if (primeiroInvalido) {
        primeiroInvalido.focus();
        return;
      }
      /* Site estático: não há servidor para receber a mensagem. */
      formulario.reset();
      status.textContent = "Obrigado! Este é um site de demonstração, então a mensagem não foi enviada a ninguém.";
      status.classList.add("visivel");
    });
  }
})();
