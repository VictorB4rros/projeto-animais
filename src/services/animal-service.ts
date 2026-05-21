import { type AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import type { AnimalDTO } from "../models/animal";

export function findAll() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/animais"
    }
    return requestBackend(config);
}

export function findById(id?: string) {
    return requestBackend({ url: `/animais/${id}` });
}

export function deleteById(id: string) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/animais/${id}`
    }
    return requestBackend(config);
}

export function updateRequest(obj: AnimalDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/animais/${obj.id}`,
        data: obj
    }
    return requestBackend(config);
}

export function insertRequest(obj: AnimalDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/animais",
        data: obj
    }
    return requestBackend(config);
}