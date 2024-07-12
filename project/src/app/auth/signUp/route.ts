import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookies();
    const formData = await req.formData();

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    console.log("Email received:", email);
    console.log("Password received:", password);

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${url.origin}/auth/callback`
        }
    });

    if (error) {
        console.error("SignUp Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("SignUp Data:", data);

    return NextResponse.redirect(url.origin, {
        status: 301
    });
}
