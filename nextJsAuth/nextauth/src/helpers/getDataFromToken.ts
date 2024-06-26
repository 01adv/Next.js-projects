import { request } from 'http'
import {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {id: string}
        return decoded
    } catch (error:any) {
        throw new Error(error.message)
    }
}