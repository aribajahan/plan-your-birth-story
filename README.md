# Plan Your Birth Story

The first prototype of Asha, an AI-assisted tool for building a birth plan.

This version is retired. It's here because it's where the product started, and because the questions it got wrong shaped what Asha became.

## What it did

You answered questions about your preferences for labor, pain management, delivery, and post-birth care, and it produced a birth plan you could bring to a provider. A chat interface handled the parts people don't know how to ask about, and progress tracking let you come back to a plan over several sessions rather than filling in a long form once.

## How it was built

React, TypeScript, Vite, and Tailwind on the front end. Supabase for auth, Postgres, and edge functions, with row-level security on every table so a plan is readable only by the person who wrote it. Two edge functions call OpenAI: one drafts plan language from the answers, one generates imagery. The API key lives in Supabase secrets and never touches this repo.

Five tables: profiles, birth_plans, chat_sessions, chat_messages, progress_tracking.

The initial scaffold came from Lovable, which is why the early commits are authored by its bot.

## Status

Retired. The Supabase project behind it has been shut down, so cloning this and running it will not connect to anything. The `.env` in the git history holds only the publishable client keys for that dead project, which were designed to be visible in the browser bundle.

Asha continues as a separate build.
