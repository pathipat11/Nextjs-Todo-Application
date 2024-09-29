/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import { NextRequest, NextResponse } from "next/server";


//CRUD =>
//READ data
//url => api/v1/todo
export async function GET() {
  try {
    await connectToDatabase();
    const todoResult = await Todo.find({});
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}

//Create
//req => { name:"", note:""}
//url => api/v1/todo
export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const res = await Todo.create(body);
    return NextResponse.json({ data: res });
  }catch(error){
    return NextResponse.json({
      error: error,
    });
  }
}

//Update
//url => api/v1/todo
export async function PUT(req: NextRequest){
  try{
    const body = await req.json();
    const res = await Todo.updateOne(body);
    return NextResponse.json({ data: res });
  }catch(error){
    return NextResponse.json({
      error: error,
    });
  }
}

//Delete
//url => api/v1/todo
export async function DELETE(req: NextRequest){
  try{
    const body = await req.json();
    const res = await Todo.deleteOne(body);
    return NextResponse.json({ data: res });
  }catch(error){
    return NextResponse.json({
      error: error,
    });
  }
}