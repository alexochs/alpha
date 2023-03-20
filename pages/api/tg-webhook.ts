import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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
  const supabase = createClient('https://mdopedudnlhzrldtwitv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kb3BlZHVkbmxoenJsZHR3aXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3ODY2NjcsImV4cCI6MTk4NjM2MjY2N30.eFUHbA23jNK42RGhpKCIJ89oRnoRPS-BilMV5MSxFYU');
  const update = req.body as Update;

  if (update.message.text === '/start') {
    const  { data: linkedData, error: linkedError } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram', update.message.chat.id)
      .single();

    if (linkedData) {
      const  { data, error } = await supabase
      .from('started-bot')
      .select('started')
      .eq('telegram', update.message.chat.id);

      if (!data || error || data.length === 0) {
        const { data, error } = await supabase
          .from('started-bot')
          .upsert([
            { telegram: update.message.chat.id, started: true },
          ]);
	
		if (error) {
			console.log(error);
			const messageRes = await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Seems like there was an error. Please send /start again.");
		} else {
			const messageRes = await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello, " + update.message.chat.first_name + ". You have successfully linked your account.");
		}
      } else {
			const messageRes = await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello again, " + update.message.chat.first_name + ". You have already linked your account.");
      }
    } else {
		const messageRes = await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello, " + update.message.chat.first_name + ". Please link your account first.");
    }
  }

  res.json({ success: true })
}