'use server';

import { Invoices } from "@/db/schema";
import { db } from "@/db";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User not authenticated');
    }
    const valueEntry = formData.get('value');
    const value = valueEntry !== null && !isNaN(Number(valueEntry)) ? Math.floor(parseFloat(String(valueEntry)) * 100) : 0;
    const description = formData.get('description') as string;

    
    // if (isNaN(value)) {
    //     throw new Error('Invalid value: must be a number');
    // }

    const results = await db.insert(Invoices)
        .values({
            value,
            description,
            userId,
            status: 'open',
        })
        .returning({
            id: Invoices.id
        });

        redirect(`/invoices/${results[0].id}`);
}


export async function updateStatusAction(formData: FormData, invoiceId: number) {
    const { userId } = await auth();

    if ( !userId ) {
        return
    };

    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    
}