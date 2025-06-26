import type { PageLoad } from './$types';
import { API_ELYSIA } from '$lib/config';

export const load: PageLoad = async ({ fetch, params }) => {

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

    const getuser = async (id: string) => {
        const response = await fetch(`${API_ELYSIA}/dev/user/${id}`, {
            method: "GET",
            headers: {}
        })
        const data = await response.json()
        return data
    }

    const getbase = async () => {
        const response = await fetch(`${API_ELYSIA}/dev/base/`, {
            method: "GET",
            headers: {}
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
    const completedBase = checkUserCompletion(user.events, bases)
    const data = {
        "studentId": user.studentId,
        "name": user.name,
        "surname": user.surname,
        "events": completedBase,
        "baseNum": completedBase.length 
    }
    return data
}