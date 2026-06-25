export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "db.json");

function readDB() {
  if (!fs.existsSync(dbPath)) {
    return { meetings: [], contacts: [], applications: [] };
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

// NOTE: fs.writeFileSync fails on Vercel production because the filesystem
// is read-only. For real persistence you need a database (e.g. Vercel KV,
// Supabase, PlanetScale). This implementation works in local dev only.
function writeDB(data: object) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

function isAdmin(request: Request) {
  const authHeader = request.headers.get("authorization");
  return authHeader === "Bearer jwt_mock_admin_token";
}

// POST /api/submissions/meetings — public, used by the contact form
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, country, email, serviceNeeded, projectStage, budgetRange, timeline, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const db = readDB();
    const newMeeting = {
      id: `meeting-${Date.now()}`,
      name,
      company: company || "",
      country: country || "",
      email,
      serviceNeeded: serviceNeeded || "",
      projectStage: projectStage || "",
      budgetRange: budgetRange || "",
      timeline: timeline || "",
      message: message || "",
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "Pending",
      notes: [],
    };

    db.meetings = [newMeeting, ...(db.meetings || [])];
    writeDB(db);

    return NextResponse.json({ success: true, meeting: newMeeting });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit meeting request." },
      { status: 500 }
    );
  }
}

// GET /api/submissions/meetings — admin only, for the admin dashboard
export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = readDB();
    return NextResponse.json({ success: true, meetings: db.meetings || [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch meetings." },
      { status: 500 }
    );
  }
}

// PUT /api/submissions/meetings — admin only, update status/notes/schedule
export async function PUT(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, status, notes, scheduledDate, scheduledTime } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Meeting ID required." }, { status: 400 });
    }

    const db = readDB();
    const idx = (db.meetings || []).findIndex((m: any) => m.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Meeting not found." }, { status: 404 });
    }

    const meeting = db.meetings[idx];
    db.meetings[idx] = {
      ...meeting,
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
      ...(scheduledDate !== undefined && { scheduledDate }),
      ...(scheduledTime !== undefined && { scheduledTime }),
    };
    writeDB(db);

    return NextResponse.json({ success: true, meeting: db.meetings[idx] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update meeting." },
      { status: 500 }
    );
  }
}