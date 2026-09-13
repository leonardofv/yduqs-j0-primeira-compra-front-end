
//simulação de ida e volta da rede para que a interface possa exibir o estado de carregamento.
export function simulateRequest(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 800));
}