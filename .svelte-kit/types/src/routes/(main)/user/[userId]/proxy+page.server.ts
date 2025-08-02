// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load = async ({ params, cookies }: Parameters<PageServerLoad>[0]) => {

    type Events = {
        id: number;
        completedOn: string;
        baseId: number;
        userId: string;
    };

    type BaseStatus = {
        id: number;
        name: string;
        desc: string;
        location: string;
        completed: boolean;
    };

    const username = params.userId
    const token = cookies.get('jwt')
    if (!token) {
        redirect(307, "/")
    }
    const res = await fetch(`${API_ELYSIA}/auth/verify`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
        body: JSON.stringify({username})
    })

    if (!res.ok) {
        redirect(303, "/")
    }

    const getuser = async (id: string) => {
        const response = await fetch(`${API_ELYSIA}/api/v1/user/${id}`, {
            method: "GET",
            headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
        })
        const data = await response.json()
        return data
    }

    const getbase = async () => {
        const response = await fetch(`${API_ELYSIA}/api/v1/base/`, {
            method: "GET",
            headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
        })
        const data = await response.json()
        return data
    }

    const user = await getuser(params.userId)
    const bases = await getbase()

    const checkUserCompletion = (user: Events[], bases: BaseStatus[]) => {
        const userCompleted: number[] = []
        const baseArr: BaseStatus[] = []
        for (var events of user) {
            userCompleted.push(events.baseId)
        }
        for (var base of bases) {
            const eachBase: BaseStatus = {
                id: base.id,
                name: base.name,
                desc: base.desc,
                location: base.location,
                completed: userCompleted.includes(base.id)
            }
            baseArr.push(eachBase)
        }

        return baseArr
    }

    const prefixHandle = () => {
        switch (user.prefix) {
            case "DekChai":
                return "ด.ช."
            case "DekYing":
                return "ด.ญ."
            case "NangSao":
                return "นางสาว"
            case "Nang":
                return "นาง"
            case "Nai":
                return "นาย"
            default:
                return "อื่นๆ"
        }
    }

    const completedBase = checkUserCompletion(user.events, bases)
    const data = {
        "studentId": user.studentId,
        "name": user.name,
        "surname": user.surname,
        "events": completedBase,
        "baseNum": completedBase.length,
        "doneNum": user.events.length,
        "role": user.role,
        "prefix": prefixHandle()
    }

    return data
}