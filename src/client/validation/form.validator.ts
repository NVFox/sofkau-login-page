import { ZodObject, ZodType } from "zod";
import { EventEmitter } from "@/events/event.emitter";
import { handleCleaningOfInput, handleCleaningOfInputs, handleDataExtraction, handleInputExtraction } from "@/helpers/function.helpers";
import { handleAllValidationsError, handleOneValidationError } from "@/handlers/error.handlers";

class FormControl<T> extends EventEmitter<T> {
    public valid = false;
    public dirty = false;

    public constructor(
        private input: HTMLInputElement
    ) {
        super();
        this.setup();
    }

    public value(): T {
        return this.input.value as T;
    }

    private setup() {
        this.input.addEventListener("input", () => {
            if (!this.dirty) {
                this.dirty = true;
                this.emit("touched");
            }

            this.emit("change", this.input.value as T);
        })
    }
}

type ValueOf<T> = T[keyof T]

export class FormValidator<T> {
    public dirty = false;
    private values: Map<keyof T, ValueOf<T>> = new Map();
    private controls: Map<keyof T, FormControl<ValueOf<T>>> = new Map();

    public constructor(
        private form: HTMLFormElement,
        private schema: ZodObject<{[K in keyof T]: ZodType<T[K]>}>
    ) {
        this.setup();
    }

    public validated(): Partial<T> {
        return Object.fromEntries(this.values.entries()) as T;
    }

    public valid() {
        return this.dirty && (this.values.size === this.controls.size)
    }

    public forceValidation() {
        this.dirty = true;

        const data = handleDataExtraction(this.form);
        const validation = this.schema.safeParse(data);

        handleCleaningOfInputs(this.form);

        const errors = validation.error?.issues
            .map(({ path }) => path.join(".")) || []

        const invalid = new Set(errors);

        this.controls.forEach((control, key) => {
            control.valid = validation.success || invalid.has(key as string)
        })

        if (validation.success) {
            this.values = 
                new Map(Object.entries(validation.data)) as Map<keyof T, ValueOf<T>>
        } else {
            handleAllValidationsError(validation.error)
        }
    }

    private handleInputValidation(key: keyof T, control: FormControl<ValueOf<T>>) {
        return (value?: ValueOf<T>) => {
            if (!value) return;

            const schema = this.schema.shape[key];
            const validation = schema.safeParse(value);

            handleCleaningOfInput(key as string, this.form);

            if (validation.success) {
                control.valid = true;
                this.values.set(key, value);
            } else {
                control.valid = false;
                this.values.delete(key);
                handleOneValidationError(key as string, validation.error)
            }
        }
    }

    private setup() {
        const keys = Object.keys(this.schema.shape);
        const inputs = handleInputExtraction(this.form, ...keys);

        for (const [ key, input ] of Object.entries(inputs)) {
            const control = new FormControl<ValueOf<T>>(input);

            control.on("touched", () => this.dirty = true)
            control.on("change", this.handleInputValidation(key as keyof T, control));

            this.controls.set(key as keyof T, control);
        }
    }
}