import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });


    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.rewrite(new URL("/login", req.url));
    }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
}