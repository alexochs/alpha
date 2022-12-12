// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mdopedudnlhzrldtwitv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

type MasteryChecklistTask = {
  address: string,
  task: object,
  date: number,
  completed: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MasteryChecklistTask[]>) {
  const { address } = req.query;

  const { data, error } = await supabase
    .from('mastery-checklist')
    .select('*')
    .eq('address', address);

  if (error) {
    console.log(error);
    res.status(500).json([]);
    return;
  }

  res.status(200).json(data);
}
