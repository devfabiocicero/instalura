
export function lista(fotos) {
    return { type: 'LISTAGEM', fotos };
}

export function like(fotoId, liker) {
    return { type: 'LIKE', fotoId, liker };
}

export function comenta(fotoId, comentario) {
    return { type: 'COMENTARIO', fotoId, comentario };
}