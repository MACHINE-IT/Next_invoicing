'use server';

import { Invoices } from "@/db/schema";
import { db } from "@/db";

import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
    console.log('formdata', formData);
    const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    
    // if (isNaN(value)) {
    //     throw new Error('Invalid value: must be a number');
    // }

    const results = await db.insert(Invoices)
        .values({
            value,
            description,
            status: 'open',
        })
        .returning({
            id: Invoices.id
        });

        redirect(`/invoices/${results[0].id}`);
}