import { db } from "@/db";
import { products } from "@/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const data = await db.select().from(products);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db.insert(products).values(body).returning();
  return NextResponse.json(inserted[0]);
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}