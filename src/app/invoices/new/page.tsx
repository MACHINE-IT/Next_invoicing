'use client'

import { startTransition, SyntheticEvent, useState } from 'react';
import {sql} from 'drizzle-orm';
import {db} from '@/db';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createAction } from "@/app/actions";
import SubmitButton from '@/components/SubmitButton';


const Home = () => {
    const [state, setState] = useState('ready');

    const handleOnSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if(state === 'pending') return;
        setState('pending');
        const target = e.target as HTMLFormElement;


        startTransition(async () => {
        const formData = new FormData(target);
        await createAction(formData);
        });
    }

    return (
        <main className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold text-left">
                    Create a New Invoice
                </h1>
            </div>


            <form action={createAction} onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
                <div>
                    <Label htmlFor="name" className="block font-semibold mb-2 text-sm">Billing Name</Label>
                    <Input id="name" name="name" type="text" />
                </div>
                <div>
                    <Label htmlFor="email" className="block font-semibold mb-2 text-sm">Billing Email</Label>
                    <Input id="email" name="email" type="text" />
                </div>
                <div>
                    <Label htmlFor="value" className="block font-semibold mb-2 text-sm">Billing Value</Label>
                    <Input id="value" name="value" type="text" />
                </div>
                <div>
                    <Label htmlFor="description" className="block font-semibold mb-2 text-sm">Description</Label>
                    <Textarea id="description" name="description" />
                </div>
                <div>
                    <SubmitButton />
                </div>
            </form>
        </main>
    );
};

export default Home;
