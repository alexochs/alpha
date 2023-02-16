// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mdopedudnlhzrldtwitv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { profileId, name, difficulty, importance, date, completed } =
        req.query;

    const { error } = await supabase.from("mastery-checklist").insert([
        {
            profile_id: profileId,
            date,
            name,
            difficulty,
            importance,
            completed,
        },
    ]);

    if (error) {
        console.log(error);
        res.status(500).json({ success: false });
        return;
    }

    res.status(200).json({ success: true });
}
