import type { NextApiRequest, NextApiResponse } from 'next';

type Update = {
  update_id: number;
  message: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name: string;
      username: string;
      language_code: string;
    };
    chat: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      type: string;
    };
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