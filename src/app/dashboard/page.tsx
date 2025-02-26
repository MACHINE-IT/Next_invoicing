import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import Link from "next/link";
import Container from '@/components/Container';

import { Invoices } from "@/db/schema";
import { db } from "@/db";
import { cn } from "@/lib/utils";



export default async function Home() {
    const results = await db.select().from(Invoices);
    return (
        <main className="h-full text-center">
            <Container>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-left">
                        Invoices
                    </h1>
                    <p>
                        <Link href="/invoices/new">
                            <Button variant="ghost" className="inline-flex gap-2">
                                <CirclePlus /> Create Invoice
                            </Button>
                        </Link>
                    </p>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] p-4">Date</TableHead>
                            <TableHead className="p-4">Customer</TableHead>
                            <TableHead className="p-4">Email</TableHead>
                            <TableHead className="p-4">Status</TableHead>
                            <TableHead className="text-right p-4">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result) => {
                            return (
                                <TableRow key={result.id}>
                                    <TableCell className="font-medium text-left p-0">
                                        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                            {new Date(result.createTs).toLocaleDateString()}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                            Yogesh kumar
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link href={`/invoices/${result.id}`} className="block p-4 ">
                                            yk@email.com
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-left p-0">
                                        <Link href={`/invoices/${result.id}`} className="block p-4">
                                            <Badge className={cn(
                                                "rounded-full text-white",
                                                result.status === 'open' && ' bg-blue-500',
                                                result.status === 'paid' && ' bg-green-600',
                                                result.status === 'void' && ' bg-zinc-700',
                                                result.status === 'uncollectible' && ' bg-red-500',
                                            )}>
                                                {result.status}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right p-0">
                                        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
                                            ${(result.value / 100).toFixed(2)}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Container>
        </main>
    );
}
