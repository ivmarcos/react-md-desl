const Tipo = {
  MB: {
    valor: 1024 * 1024,
    sigla: 'mb',
    decimal: 1,
  },
  KB: {
    valor: 1024,
    sigla: 'kb',
    decimal: 0,
  },
  B: {
    valor: 1,
    sigla: 'b',
    decimal: 0,
  },
};

const Tamanho = (tamanho) => {

  let escala = Tipo.KB;

  // eslint-disable-next-line
  for (const p in Tipo) {

    if (Tipo[p].valor < tamanho) {

      escala = Tipo[p];
      break;

    }

  }


  return `${(tamanho / escala.valor).toFixed(escala.decimal).replace('.', ',')} ${escala.sigla}`;


};

export default Tamanho;
