/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


//CRUD =>
//READ data
// url => api/v1/todo/pid
export async function GET(
  req: NextRequest,
  { params }: { params: { pid: string } }
){
  try {
    const pid = params.pid;
    await connectToDatabase();
    const todoResult = await Todo.findByIdAndUpdate({_id:pid});
    
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}

//Upaate
// url => api/v1/todo/pid
export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const body = await req.json()
    await connectToDatabase();
    const updatedTodo = await Todo.findByIdAndUpdate(pid, body, {
      new: true, 
      runValidators: true,
    });
    return NextResponse.json({ data: updatedTodo });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}

//Delete
// url => api/v1/todo/pid
export async function DELETE(
  req: NextRequest,
  { params }: { params: { pid: string } }
){
  try {
    const pid = params.pid;
    await connectToDatabase();
    const todoResult = await Todo.deleteOne({_id:pid});
    
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}