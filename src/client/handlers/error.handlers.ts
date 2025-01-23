import { AxiosError } from "axios";
import { ZodError } from "zod";

export function handleAllValidationsError(error: Error) {
    if (!(error instanceof ZodError))
        return;
    
    for (let { message, ...issue } of error.issues) {
        const path = issue.path.join(".")

        const bag = document.getElementById(`${path}-errors`)

        const err = document.createElement("p");
        err.innerText = message;

        bag?.replaceChildren(err)
    }
}

export function handleOneValidationError(field: string, error: Error) {
    if (!(error instanceof ZodError))
        return;

    for (let { message } of error.issues) {
        const bag = document.getElementById(`${field}-errors`)

        const err = document.createElement("p");
        err.innerText = message;

        bag?.replaceChildren(err)
    }
}

type AlertOptions = {
    type: "error";
    title: string;
    description: string;
}

function createAlert({ type, title, description }: AlertOptions) {
    const alert = document.createElement("div");

    const alertTitle = document.createElement("h3");
    alertTitle.innerText = title

    const alertDescription = document.createElement("p");
    alertDescription.innerText = description;

    const alertSeparator = document.createElement("hr")

    if (type === "error") {
        alertTitle.classList.add("font-bold", "text-red-500")
        alertDescription.classList.add("text-red-400")
    }

    alert.classList.add("py-1", "px-4", "fixed", "bottom-4", "right-4", "border", "rounded-lg", "shadow", "animate-fadeIn")

    alert.appendChild(alertTitle)
    alert.appendChild(alertSeparator)
    alert.appendChild(alertDescription)

    return alert;
}

function removeAlert(alert: HTMLDivElement) {
    alert.classList.remove("animate-fadeIn");
    alert.classList.add("animate-fadeOut");
    alert.addEventListener("animationend", () => alert.remove());
}

export function handleServerError(error: Error) {
    const alertOptions: AlertOptions = {
        type: "error",
        title: "Something went wrong...",
        description: "We are working on it."
    }

    if (error instanceof AxiosError) {
        const {
            title = alertOptions.title,
            detail = alertOptions.description
        } = error.response?.data;

        alertOptions.title = title;
        alertOptions.description = detail;
    }

    const alert = createAlert(alertOptions);
    document.body.appendChild(alert);

    const timeout = setTimeout(() => {
        removeAlert(alert);
        clearTimeout(timeout);
    }, 3000)
}