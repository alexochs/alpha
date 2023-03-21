import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from "openai";

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
	const configuration = new Configuration({
		organization: "org-mtrBPfW5SKWxHXJ2HTpD49GD",
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);
	
	const supabase = createClient('https://mdopedudnlhzrldtwitv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kb3BlZHVkbmxoenJsZHR3aXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3ODY2NjcsImV4cCI6MTk4NjM2MjY2N30.eFUHbA23jNK42RGhpKCIJ89oRnoRPS-BilMV5MSxFYU');
	
  const update = req.body as Update;

  console.log("Received update: " + JSON.stringify(update, null, 2));

  if (update && update.message && update.message.text === '/start') {
	  console.log("Received /start command");

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
			 await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Seems like there was an error. Please send /start again.");
		} else {
      await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello, " + update.message.chat.first_name + ". You have successfully linked your account.");
		}
      } else {
        await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello again, " + update.message.chat.first_name + ". You have already linked your account.");
      }
    } else {
      await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Hello, " + update.message.chat.first_name + ". Please link your account first.");
    }
  } else if (update && update.message && update.message.text === '/tasks') {
    console.log("Received /tasks command");

    const  { data: profileIdData, error: profileIdError } = await supabase
      .from('profiles')
      .select('id')
      .eq('telegram', update.message.chat.id)
      .single();

    const profileId = profileIdData?.id;

    console.log("Telegram ID: " + update.message.chat.id);
    console.log("Profile ID: " + profileId);


    const { data, error } = await supabase
      .from("mastery-checklist")
      .select("*")
      .eq("profile_id", profileId);

    if (error) {
        console.log(error);
        return;
    }

    const tasks = data
      .map((task: any) => {
          return {
              id: task.id,
              date: task.date,
              name: task.name,
              difficulty: task.difficulty,
              importance: task.importance,
              completed: task.completed,
          };
      })
      .filter((task: any) => new Date(task.date).getTime() == new Date(new Date().setHours(0, 0, 0, 0)).getTime());

    console.log("Tasks: " + JSON.stringify(tasks, null, 2));
    
    const text = tasks.map((task: any) => {
        return task.name + " - " + (task.completed ? "✅" : "❌");
    }).join("\n");

    await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + text);

  } else if(update && update.message && update.message.text) {
	  console.log("Received message for AI: " + update.message.text);

	/*const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{"role": "system", "content": "You are Sensei. The helpful AI assistant by Master Yourself. Master Yourself is a platform developed by Alex Ochs that helps people to improve there productivy, mental and physical health."},
			{"role": "user", "content": update.message.text},
		],
		user: update.message.chat.id.toString(),
	});

	console.log("AI response received");

	if (!response.data.choices[0].message?.content) {
		fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Sorry, I was in deep meditation. Can you repeat that for me?");
	} else {
		fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + response.data.choices[0].message?.content);
	}*/

    // call api for ai
    /*const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt: update.message.text,
      temperature: 0.5,
      max_tokens: 256,
    });

    const text = response.data.choices[0].text || "undefined";
    console.log("AI response received: " + text);

    if (text === "undefined") {
      res.status(400).json({
        message: "Error creating completion!",
        error: true
      });
      await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + "Sorry, I was in deep meditation. Can you repeat that for me?");
      return;
    }

    await fetch(process.env.TELEGRAM_API + "sendMessage" + "?chat_id=" + update.message.chat.id + "&text=" + text);*/
    //console.log("")
  } else {
    console.log("Received error message!");
  }

  res.json({ success: true })
}