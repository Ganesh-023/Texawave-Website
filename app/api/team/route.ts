export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "team.json");

function isAdmin(request: Request) {
  const authHeader = request.headers.get("authorization");
  return authHeader === "Bearer jwt_mock_admin_token";
}

function readTeam() {
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  const fileContent = fs.readFileSync(dbPath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    return [];
  }
}

function writeTeam(team: any[]) {
  fs.writeFileSync(dbPath, JSON.stringify(team, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const team = readTeam();
    // Sort by displayOrder ascending
    const sortedTeam = [...team].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return NextResponse.json({ success: true, team: sortedTeam });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const { name, department, role, description, skills, experience, linkedinUrl, profileImage, displayOrder } = data;

    if (!name || !department || !role) {
      return NextResponse.json(
        { success: false, error: "Name, Department, and Designation are required" },
        { status: 400 }
      );
    }

    const team = readTeam();
    const newMember = {
      id: `team-${Date.now()}`,
      name,
      department,
      role,
      description: description || "",
      skills: Array.isArray(skills) ? skills : (skills ? String(skills).split(",").map(s => s.trim()).filter(Boolean) : []),
      experience: experience || "",
      linkedinUrl: linkedinUrl || "",
      profileImage: profileImage || "",
      displayOrder: typeof displayOrder === "number" ? displayOrder : team.length + 1
    };

    team.push(newMember);
    writeTeam(team);

    return NextResponse.json({ success: true, member: newMember });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();

    // Check if we are reordering the entire list or updating one item
    if (Array.isArray(body)) {
      // Direct rewrite for reorder/overwrite
      writeTeam(body);
      return NextResponse.json({ success: true, message: "Team list updated successfully" });
    }

    const { id, name, department, role, description, skills, experience, linkedinUrl, profileImage, displayOrder } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Team member ID is required for editing" },
        { status: 400 }
      );
    }

    const team = readTeam();
    const idx = team.findIndex((t: any) => t.id === id);

    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }

    team[idx] = {
      ...team[idx],
      name: name !== undefined ? name : team[idx].name,
      department: department !== undefined ? department : team[idx].department,
      role: role !== undefined ? role : team[idx].role,
      description: description !== undefined ? description : team[idx].description,
      skills: skills !== undefined ? (Array.isArray(skills) ? skills : String(skills).split(",").map(s => s.trim()).filter(Boolean)) : team[idx].skills,
      experience: experience !== undefined ? experience : team[idx].experience,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : team[idx].linkedinUrl,
      profileImage: profileImage !== undefined ? profileImage : team[idx].profileImage,
      displayOrder: typeof displayOrder === "number" ? displayOrder : team[idx].displayOrder
    };

    writeTeam(team);
    return NextResponse.json({ success: true, member: team[idx] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update team member" },
      { status: 500 }
    );
  }
}
