const sequelize = require('bb-common/sequelize');

module.exports = {

  clona(instance) {

    return JSON.parse(JSON.stringify(instance));

  },

  getParamsAcesso({ usuario, acessos }) {

    const { TipoRestricaoArquivo } = sequelize.models;

    const paramsAcesso = [
      {
        usuarioInclusao_id: usuario.id,
      },
      {
        tipoRestricao_id: TipoRestricaoArquivo.PUBLICO,
      },
      sequelize.literal(`"compartilhamentosUOR"."uor_id" = ${usuario.uor_id}`),
      sequelize.literal(`"compartilhamentosPrefixo"."prefixo" = ${usuario.prefixo}`),
      sequelize.literal(`"compartilhamentosUsuario"."usuario_id" = ${usuario.id}`),
    ];

    if (acessos.length) {

      paramsAcesso.push(sequelize.literal(`"compartilhamentosTransacao.transacao"."sigla" in ('${acessos.join("','")}')`));

    }

    return paramsAcesso;

  },

  getIncludesAcessoDiretorio() {

    const { CompartilhamentoUOR, CompartilhamentoUsuario, CompartilhamentoPrefixo, CompartilhamentoTransacao, Transacao, Usuario } = sequelize.models;

    return [
      {
        model: Usuario,
        as: 'usuarioInclusao',
        attributes: ['id', 'chave', 'nome', 'nomeExibicao'],
      },
      {
        model: CompartilhamentoUOR,
        as: 'compartilhamentosUOR',
      },
      {
        model: CompartilhamentoPrefixo,
        as: 'compartilhamentosPrefixo',
      },
      {
        model: CompartilhamentoUsuario,
        as: 'compartilhamentosUsuario',
      },
      {
        model: CompartilhamentoTransacao,
        as: 'compartilhamentosTransacao',
        include: [
          {
            model: Transacao,
            as: 'transacao',
            attributes: ['sigla'],
          },
        ],
      },
    ];

  },


  temAcesso({ diretorio, usuario, acessos, tipoAcesso }) {

    if (diretorio.usuarioInclusao_id == usuario.id) return true;

    const { TipoRestricaoArquivo } = sequelize.models;

    if (diretorio.tipoRestricao_id === TipoRestricaoArquivo.PUBLICO && !tipoAcesso) return true;

    const { compartilhamentosUOR, compartilhamentosUsuario, compartilhamentosPrefixo, compartilhamentosTransacao } = diretorio;

    const acessoUOR = compartilhamentosUOR.some(compartilhamento => compartilhamento.uor_id == usuario.uor_id && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

    if (acessoUOR) return true;

    const acessoUsuario = compartilhamentosUsuario.some(compartilhamento => compartilhamento.usuario_id == usuario.id && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

    if (acessoUsuario) return true;

    const acessoPrefixo = compartilhamentosPrefixo.some(compartilhamento => compartilhamento.prefixo == usuario.prefixo && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

    if (acessoPrefixo) return true;

    const acessoTransacao = compartilhamentosTransacao.some(compartilhamento => acessos.indexOf(compartilhamento.transacao.sigla) > -1 && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

    return acessoTransacao;

  },

}
;
