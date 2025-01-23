import { ZodType } from "zod";

export function handleDataExtraction<T>(
    form: HTMLFormElement
): T {
    const formData = new FormData(form);
    return Object.fromEntries(formData) as T;
}

export function handleInputExtraction(form: HTMLFormElement, ...fields: string[]) {
    const selectors = fields.map(field => `input[id="${field}"]`).join(",");
    const inputs = form.querySelectorAll<HTMLInputElement>(selectors);

    return Array.from(inputs)
        .reduce<{[key: string]: HTMLInputElement}>((final, input) => ({...final, [input.id]: input}), {})
}

export function handleInputValidation<T>(
    schema: ZodType<T>,
    data: T
) {
    return (onSuccess: (data: T) => void | Promise<void>, onError?: (error: Error) => void | Promise<void>) => {
        const parsed = schema.safeParse(data);

        if (parsed.success) {
            onSuccess(parsed.data);
        } else {
            onError ? onError(parsed.error) : console.error(parsed.error);
        }
    }
}

export function handleCleaningOfInputs(form: HTMLFormElement) {
    const errorBags = form.querySelectorAll('[id$="-errors"]')

    for (const bag of errorBags) {
        bag.replaceChildren();
    }
}

export function handleCleaningOfInput(field: string, form: HTMLFormElement) {
    const errorBag = form.querySelector(`[id="${field}-errors"]`)
    errorBag?.replaceChildren();
}