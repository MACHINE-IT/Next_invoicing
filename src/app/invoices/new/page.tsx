import {sql} from 'drizzle-orm';
import {db} from '@/db';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const Home = async () => {
    const results = await db.execute(sql`SELECT current_database()`);
    console.log("results are:", results);
    return (
        <main className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold text-left">
                    Create a New Invoice
                </h1>
            </div>

          { JSON.stringify(results) }

            <form className="grid gap-4 max-w-xs">
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
                    <Button className="font-semibold py-2 px-4 rounded w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default Home;
