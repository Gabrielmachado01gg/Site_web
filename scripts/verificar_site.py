"""Verifica se todos os arquivos referenciados nas páginas HTML existem
e se as imagens têm texto alternativo. Uso: python scripts/verificar_site.py"""
import pathlib
import re
import sys
from html.parser import HTMLParser

RAIZ = pathlib.Path(__file__).resolve().parent.parent


class Coletor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.referencias = []
        self.imagens_sem_alt = []

    def handle_starttag(self, tag, attrs):
        atributos = dict(attrs)
        for chave in ("href", "src"):
            valor = atributos.get(chave)
            if valor and not re.match(r"^(https?:|mailto:|tel:|#|data:)", valor):
                self.referencias.append(valor.split("#")[0])
        if tag == "img" and "alt" not in atributos:
            self.imagens_sem_alt.append(atributos.get("src", "?"))


erros = []
paginas = sorted(RAIZ.glob("*.html"))
for pagina in paginas:
    coletor = Coletor()
    coletor.feed(pagina.read_text(encoding="utf-8"))
    for ref in coletor.referencias:
        if ref and not (RAIZ / ref).exists():
            erros.append(f"{pagina.name}: arquivo não encontrado -> {ref}")
    for src in coletor.imagens_sem_alt:
        erros.append(f"{pagina.name}: imagem sem atributo alt -> {src}")

if erros:
    print("\n".join(erros))
    sys.exit(1)
print(f"OK: {len(paginas)} páginas verificadas, sem links quebrados nem imagens sem alt.")
