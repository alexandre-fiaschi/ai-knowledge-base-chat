import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

//OpenAI config
export const openAIApiKey = process.env.OPENAI_API_KEY;
export const llm = new ChatOpenAI({ openAIApiKey });

//Supabase Config
const sbApiKey = process.env.SUPABASE_API_KEY;
const sbUrl = process.env.SUPABASE_URL;
export const sbClient = createClient(sbUrl, sbApiKey);

//Prompt Config
export const KNOWLEDGE_BASE_COMPANY_TITLE = "Alexandre Fiaschi";
export const SUPPORT_EMAIL = "alexandrefiaschi10@gmail.com";
