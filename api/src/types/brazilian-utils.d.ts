// O arquivo index.d.ts do próprio pacote reexporta './src/index' sem extensão de arquivo,
// o que "moduleResolution": "nodenext" não consegue resolver; portanto, nenhuma exportação recebe tipagem.
declare module '@brazilian-utils/brazilian-utils' {
  export function isValidCpf(cpf: string): boolean;
  export function isValidMobilePhone(phone: string): boolean;
}