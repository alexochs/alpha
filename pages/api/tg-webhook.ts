import type { NextApiRequest, NextApiResponse } from 'next';

type Update = {
  update_id: number;
  message: {
    message_id: number;
    from: any;
    chat: any;
    date: number;
    text: string;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const update = req.body as Update;

  console.log(JSON.stringify(update, null, 2));

  res.json({ success: true })
}