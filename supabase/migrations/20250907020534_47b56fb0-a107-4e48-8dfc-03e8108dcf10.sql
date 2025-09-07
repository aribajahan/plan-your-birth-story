-- Create enum for birth plan status
CREATE TYPE public.birth_plan_status AS ENUM ('draft', 'in_progress', 'completed', 'exported');

-- Create enum for chat message types
CREATE TYPE public.chat_message_type AS ENUM ('text', 'reality-check', 'summary', 'script-preview');

-- Create enum for chat message roles
CREATE TYPE public.chat_message_role AS ENUM ('user', 'assistant');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create birth_plans table
CREATE TABLE public.birth_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_session_id TEXT, -- For guest users before account creation
  title TEXT NOT NULL DEFAULT 'My Birth Plan',
  data JSONB NOT NULL DEFAULT '{}',
  status birth_plan_status NOT NULL DEFAULT 'draft',
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  exported_at TIMESTAMP WITH TIME ZONE,
  
  -- Ensure either user_id or guest_session_id is provided
  CONSTRAINT birth_plans_user_or_guest CHECK (
    (user_id IS NOT NULL AND guest_session_id IS NULL) OR 
    (user_id IS NULL AND guest_session_id IS NOT NULL)
  )
);

-- Create chat_sessions table
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  birth_plan_id UUID NOT NULL REFERENCES public.birth_plans(id) ON DELETE CASCADE,
  session_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role chat_message_role NOT NULL,
  content TEXT NOT NULL,
  message_type chat_message_type NOT NULL DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create progress_tracking table
CREATE TABLE public.progress_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  birth_plan_id UUID NOT NULL REFERENCES public.birth_plans(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  completed_topics JSONB NOT NULL DEFAULT '[]',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(birth_plan_id, section_name)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birth_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for birth_plans
CREATE POLICY "Users can view their own birth plans" 
ON public.birth_plans 
FOR SELECT 
USING (auth.uid() = user_id OR guest_session_id IS NOT NULL);

CREATE POLICY "Users can create birth plans" 
ON public.birth_plans 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR guest_session_id IS NOT NULL);

CREATE POLICY "Users can update their own birth plans" 
ON public.birth_plans 
FOR UPDATE 
USING (auth.uid() = user_id OR guest_session_id IS NOT NULL);

CREATE POLICY "Users can delete their own birth plans" 
ON public.birth_plans 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for chat_sessions
CREATE POLICY "Users can access their chat sessions" 
ON public.chat_sessions 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.birth_plans 
    WHERE birth_plans.id = chat_sessions.birth_plan_id 
    AND (birth_plans.user_id = auth.uid() OR birth_plans.guest_session_id IS NOT NULL)
  )
);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can access their chat messages" 
ON public.chat_messages 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_sessions 
    JOIN public.birth_plans ON birth_plans.id = chat_sessions.birth_plan_id
    WHERE chat_sessions.id = chat_messages.chat_session_id 
    AND (birth_plans.user_id = auth.uid() OR birth_plans.guest_session_id IS NOT NULL)
  )
);

-- Create RLS policies for progress_tracking
CREATE POLICY "Users can access their progress tracking" 
ON public.progress_tracking 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.birth_plans 
    WHERE birth_plans.id = progress_tracking.birth_plan_id 
    AND (birth_plans.user_id = auth.uid() OR birth_plans.guest_session_id IS NOT NULL)
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_birth_plans_updated_at
  BEFORE UPDATE ON public.birth_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'display_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_birth_plans_user_id ON public.birth_plans(user_id);
CREATE INDEX idx_birth_plans_guest_session ON public.birth_plans(guest_session_id);
CREATE INDEX idx_birth_plans_status ON public.birth_plans(status);
CREATE INDEX idx_chat_sessions_birth_plan_id ON public.chat_sessions(birth_plan_id);
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(chat_session_id);
CREATE INDEX idx_progress_tracking_birth_plan_id ON public.progress_tracking(birth_plan_id);