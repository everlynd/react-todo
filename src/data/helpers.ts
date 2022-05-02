type GenerateId = () => string;


export const generateId: GenerateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)

export const generateSubId: GenerateId = () => (
    'sub-' + Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)