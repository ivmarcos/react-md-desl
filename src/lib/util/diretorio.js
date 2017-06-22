/*eslint-disable*/
import { RESTRICAO_PUBLICO } from 'lib/constants';

export function temAcesso(diretorio, usuario, acessos, tipoAcesso) {

  console.log('verificando acesso ao diretorio', diretorio)

  if (!diretorio) return false;

  if (diretorio.usuarioInclusao_id == usuario.id) return true;

  if (diretorio.tipoRestricao_id == RESTRICAO_PUBLICO && !tipoAcesso) return true;

  const { compartilhamentosUOR, compartilhamentosUsuario, compartilhamentosPrefixo, compartilhamentosTransacao } = diretorio;

  if (!compartilhamentosUOR) return false;

  const acessoUOR = compartilhamentosUOR.some(compartilhamento => compartilhamento.uor_id == usuario.uor_id && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

  if (acessoUOR) return true;

  const acessoUsuario = compartilhamentosUsuario.some(compartilhamento => compartilhamento.usuario_id == usuario.id && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

  if (acessoUsuario) return true;

  const acessoPrefixo = compartilhamentosPrefixo.some(compartilhamento => compartilhamento.prefixo == usuario.prefixo && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

  if (acessoPrefixo) return true;

  const acessoTransacao = compartilhamentosTransacao.some(compartilhamento => acessos.indexOf(compartilhamento.transacao.sigla) > -1 && (compartilhamento.tipo_id == tipoAcesso || compartilhamento.tipo_id));

  return acessoTransacao; 

}
