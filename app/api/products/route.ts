import { db } from "@/db";
import { products } from "@/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(products);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db.insert(products).values(body).returning();
  return NextResponse.json(inserted[0]);
}
