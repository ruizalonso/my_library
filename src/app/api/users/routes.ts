import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: any) {
  return NextResponse.json({ msg: 'done' }, { status: 201 })
}
