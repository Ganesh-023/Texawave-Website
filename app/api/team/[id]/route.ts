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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter is required" }, { status: 400 });
    }

    const team = readTeam();
    const filteredTeam = team.filter((t: any) => t.id !== id);

    if (team.length === filteredTeam.length) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }

    writeTeam(filteredTeam);
    return NextResponse.json({ success: true, message: "Team member deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete team member" },
      { status: 500 }
    );
  }
}
