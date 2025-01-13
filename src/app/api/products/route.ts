import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handler para el método GET
export async function GET() {
    try {
        const products = await prisma.products.findMany();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}

// Handler para el método POST
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, image, price } = body;

        const newProduct = await prisma.products.create({
            data: { name, image, price },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}
