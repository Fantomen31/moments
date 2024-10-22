import { rest } from "msw"

const baseURL = "https://drf-api-fantomen-82373067f7b7.herokuapp.com/"


export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json())
    })
];