'use client'

import { SyntheticEvent, useState } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form"

import { createAction } from "@/app/actions";
import SubmitButton from '@/components/SubmitButton';
import Container from '@/components/Container';


const Home = () => {
    const [state, setState] = useState('ready');

    const handleOnSubmit = async (e: SyntheticEvent) => {
        // e.preventDefault();
        console.log('state', state);
        if (state === 'pending') {
            // e.preventDefault();
            return;
        };
        setState('pending');
    }

    return (
        <main className="h-full">
            <Container>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-left">
                        Create a New Invoice
                    </h1>
                </div>


                <Form action={createAction} onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
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
                </Form>
            </Container>
        </main>
    );
};

export default Home;