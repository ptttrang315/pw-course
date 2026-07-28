import { APIRequestContext } from '@playwright/test';
import { UserInfo } from '../data-test/user-data';

export class ApiUtils {
    private request: APIRequestContext;
    private baseURL: string = 'https://material.playwrightvn.com/api/user-management/v1';
    
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    login = async (email: string, pwd: string) => {
        const response = await this.request.post(`${this.baseURL}/login.php`, {
                data: {
                    email: email,
                    password: pwd
                }
        });
        return {
            status: response.status(), 
            body: await response.json()
        };
    }

    createUser = async (user: UserInfo, token: string) => {
        const response = await this.request.post(`${this.baseURL}/users.php`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: user
            }
        )
        return {
            status: response.status(),
            body: await response.json()
        } 
    }

    getUser = async (token: string) => {
        const response = await this.request.get(`${this.baseURL}/users.php`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    deleteUser = async (userId: number, token: string) => {
        const response = await this.request.delete(`${this.baseURL}/users.php`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    "id": userId
                }
            }
        )
        return {
            status: response.status(),
            body: await response.json()
        } 
    }
}