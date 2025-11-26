export let send = false;
export const atualizar  = (newValue) => {
    send = newValue;
    return send;
}