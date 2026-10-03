# Pasta de Imagens Kids (Área Kids)

Coloque aqui as suas imagens para a **Área Kids**.

## Como utilizar as suas imagens:

1. Guarde os seus ficheiros de imagem nesta pasta (`public/kids/`), por exemplo:
   - `desenho1.jpg`
   - `desenho2.png`
   - `arca-de-noe.png`
   - `criacao.jpg`

2. Para associar a imagem a um desenho específico, abra o ficheiro `src/data/kidsColoringData.ts` e adicione a propriedade `image`:

```ts
{
  id: 1,
  title: "A Arca de Noé e o Arco-Íris",
  reference: "Gênesis 9:13",
  category: "Antigo Testamento",
  verse: "O meu arco tenho posto nas nuvens; este será por sinal da aliança.",
  summary: "A grande arca flutuando sobre as águas com a pombinha e o arco-íris da promessa de Deus.",
  image: "/kids/desenho1.jpg", // <--- Adicione aqui o caminho da imagem
  svgPath: `...`
}
```

Qualquer imagem colocada nesta pasta fica imediatamente acessível no navegador pelo endereço `/kids/nome-do-arquivo.extensao`.
Se um item tiver o campo `image` preenchido, a imagem será exibida diretamente no cartão, na tela de ampliação e na folha de impressão!
