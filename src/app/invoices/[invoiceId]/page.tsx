
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { AVAILABLE_STATUSES } from "@/data/invoices";



export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
    const { userId } = await auth();

    if (!userId) {
        return;
    }
    const invoiceId = Number(params.invoiceId);

    console.log("params.invoiceId", params.invoiceId)
    console.log("invoiceId", invoiceId)
    console.log("!isNaN(invoiceId)", !isNaN(invoiceId))
    if (isNaN(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }

    const [result] = await db.select()
        .from(Invoices)
        .where(
            and(
                eq(Invoices.id, invoiceId),
                eq(Invoices.userId, userId)
            )
        )
        .limit(1);

    console.log("result", result);

    if (!result) {
        notFound();
    }


    return (
        <main className="w-full h-full">
            <Container>
                <div className="flex justify-between mb-8">
                    <h1 className="flex items-center gap-4 text-3xl font-semibold text-left">
                        Invoices #{invoiceId}
                        <Badge className={cn(
                            "rounded-full text-white capitalize",
                            result.status === 'open' && ' bg-blue-500',
                            result.status === 'paid' && ' bg-green-600',
                            result.status === 'void' && ' bg-zinc-700',
                            result.status === 'uncollectible' && ' bg-red-500',
                        )}>
                            {result.status}
                        </Badge>
                    </h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2" variant="outline">
                                Change Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {AVAILABLE_STATUSES.map((status) => {
                                return (
                                    <DropdownMenuItem key={status.id}>
                                        <form>
                                            <input type="hidden" name="id" value={invoiceId} />
                                            <input type="hidden" name="status" value={status.id} />
                                            <button>{status.label}</button>
                                        </form>
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

                <p className="text-3xl">
                    ${(result.value / 100).toFixed(2)}
                </p>

                <p className="text-lg mb-8">
                    {result.description}
                </p>

                <h2 className='font-bold text-lg mb-4'>
                    Billing Details
                </h2>

                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w28 flex-shrink-0 font-medium text-sm">
                            Invoice ID
                        </strong>
                        <span>
                            {invoiceId}
                        </span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w28 flex-shrink-0 font-medium text-sm">
                            Invoice Date
                        </strong>
                        <span>{new Date(result.createTs).toLocaleDateString()}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w28 flex-shrink-0 font-medium text-sm">
                            Billing Name
                        </strong>
                        <span></span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w28 flex-shrink-0 font-medium text-sm">
                            Billing Email
                        </strong>
                        <span></span>
                    </li>
                </ul>
            </Container>
        </main>
    );
}
